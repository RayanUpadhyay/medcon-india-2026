// scripts/fetch-reels.mjs
//
// Pulls the latest reels AND regular posts (single images, carousels) from the
// @medconindia Instagram account via the Instagram API (Instagram Login).
// It also TRIES to pull collab posts that other accounts published with this
// account as an accepted collaborator (posts only, never reels). Writes:
//   src/content/reels.json  + public/media/reels/*.jpg
//   src/content/posts.json  + public/media/posts/*.jpg
//   src/content/instagram-stats.json
// which the site imports directly.
//
// Run manually:
//   IG_USER_ID=17841472014740873 IG_ACCESS_TOKEN=xxxx node scripts/fetch-reels.mjs
//
// In CI (see .github/workflows/sync-reels.yml), IG_USER_ID and
// IG_ACCESS_TOKEN come from GitHub Actions secrets — never commit real
// values for these into the repo.

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const IG_USER_ID = process.env.IG_USER_ID;
const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;
const GRAPH_VERSION = "v24.0";

const MAX_REELS = 6;
const MAX_POSTS = 6;
// Only pull content posted for THIS year's event — keeps last year's (2025)
// content from showing up alongside 2026. Bump this each year.
const MIN_YEAR = 2026;
// A real photo is at minimum several KB. Instagram's CDN can return a tiny
// placeholder with a 200 status and a valid image content-type (seen at ~130
// bytes), so never trust the content-type header alone.
const MIN_IMAGE_BYTES = 2048;
const MAX_CAPTION_CHARS = 600;

const REELS_JSON = path.resolve("src/content/reels.json");
const POSTS_JSON = path.resolve("src/content/posts.json");
const STATS_JSON = path.resolve("src/content/instagram-stats.json");
const REEL_DIR = path.resolve("public/media/reels");
const POST_DIR = path.resolve("public/media/posts");

if (!IG_USER_ID || !IG_ACCESS_TOKEN) {
  console.error(
    "Missing IG_USER_ID or IG_ACCESS_TOKEN environment variables. " +
      "Set them locally to test, or check the GitHub Actions secrets.",
  );
  process.exit(1);
}

let ACCOUNT_USERNAME = ""; // set in main() once the account stats come back
let collabLookupWarned = false;

async function graphGet(endpoint, params) {
  const qs = new URLSearchParams({ ...params, access_token: IG_ACCESS_TOKEN });
  const res = await fetch(`https://graph.instagram.com/${GRAPH_VERSION}/${endpoint}?${qs}`);
  return { ok: res.ok, body: await res.json() };
}

async function fetchMedia() {
  const { ok, body } = await graphGet(`${IG_USER_ID}/media`, {
    fields: "id,caption,media_type,media_product_type,thumbnail_url,media_url,permalink,timestamp,username",
    limit: "50",
  });
  if (!ok) {
    console.error("Instagram API error:", JSON.stringify(body, null, 2));
    process.exit(1);
  }
  return body.data ?? [];
}

async function fetchAccountStats() {
  const { ok, body } = await graphGet(IG_USER_ID, { fields: "username,followers_count,media_count" });
  if (!ok) {
    console.error("Instagram API error (account stats):", JSON.stringify(body, null, 2));
    return null;
  }
  return { username: body.username, followers: body.followers_count, posts: body.media_count };
}

/**
 * Collab posts published by ANOTHER account with this one as an accepted
 * collaborator. Instagram's /media list never includes these. Meta documents
 * the `collaborative_media` edge for the Facebook Login version of the API,
 * and nothing says whether the Instagram Login version serves it — so we try,
 * and say plainly in the log what Instagram answered. A refusal never breaks
 * the sync; posts hand-added in manual-posts.json are the fallback.
 */
async function fetchCollabItems() {
  const attempts = [
    "id,caption,media_type,media_product_type,thumbnail_url,media_url,permalink,timestamp,username",
    "id,caption,media_type,media_url,permalink,timestamp,username", // in case some fields aren't allowed here
  ];
  let lastError = null;
  for (const fields of attempts) {
    try {
      const { ok, body } = await graphGet(`${IG_USER_ID}/collaborative_media`, { fields, limit: "50" });
      if (ok) return { items: body.data ?? [], error: null };
      lastError = body?.error ?? body;
    } catch (err) {
      lastError = { message: String(err) };
    }
  }
  return { items: [], error: lastError };
}

/** Posts only: single images and carousels (and feed videos). Never reels or stories. */
const isCollabPost = (i) =>
  i.media_product_type !== "REELS" &&
  i.media_product_type !== "STORY" &&
  (i.media_type === "IMAGE" ||
    i.media_type === "CAROUSEL_ALBUM" ||
    (i.media_type === "VIDEO" && i.media_product_type === "FEED"));

/**
 * Who is this post by? The account itself, plus anyone who accepted a collab
 * invite on it. Best-effort: if Instagram won't tell us about collaborators,
 * we fall back to just the account.
 */
async function resolveAuthors(item) {
  const owner = item.username || ACCOUNT_USERNAME;
  const authors = [owner];
  try {
    const { ok, body } = await graphGet(`${item.id}/collaborators`, { fields: "username,invite_status" });
    if (ok) {
      for (const c of body.data ?? []) {
        if (c.username && (c.invite_status ?? "Accepted") === "Accepted") authors.push(c.username);
      }
    } else if (!collabLookupWarned) {
      collabLookupWarned = true;
      console.warn("Couldn't read collaborators (showing the account only):", JSON.stringify(body?.error ?? body));
    }
  } catch {
    // network hiccup: carry on with what we have
  }
  // A post in THIS account's feed that someone else published is a collab with this account.
  if (ACCOUNT_USERNAME && !authors.includes(ACCOUNT_USERNAME)) authors.push(ACCOUNT_USERNAME);
  return [...new Set(authors.filter(Boolean))];
}

/**
 * Which URL is an actual IMAGE for this item?
 *  - Reels and videos: thumbnail_url only. For a video, media_url is the raw
 *    MP4 — saving that as a .jpg "succeeds" but produces a broken image.
 *  - Single images and carousels: media_url (for a carousel, its cover image).
 */
function imageSource(item, isReel) {
  if (isReel || item.media_type === "VIDEO") return item.thumbnail_url ?? "";
  return item.media_url ?? "";
}

/** The bulk list sometimes omits the image URL; re-fetch that one item. */
async function resolveImageUrl(item, isReel) {
  const direct = imageSource(item, isReel);
  if (direct) return direct;
  try {
    const { ok, body } = await graphGet(item.id, { fields: "media_url,thumbnail_url" });
    if (ok) return imageSource({ ...item, media_url: body.media_url, thumbnail_url: body.thumbnail_url }, isReel);
  } catch {
    // handled by the caller dropping items with no usable image
  }
  return "";
}

/**
 * Instagram image URLs are SIGNED and expire (often within a day or two), so
 * hotlinking them breaks. Download each image once per run and serve it from
 * /public instead, like the other real event photos.
 */
async function saveImage(url, dir, urlPrefix, id) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`Expected an image, got content-type "${contentType}"`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.length < MIN_IMAGE_BYTES) {
    throw new Error(`Image is only ${buffer.length} bytes — a placeholder, not a real image`);
  }

  const filename = `${id}.jpg`;
  await writeFile(path.join(dir, filename), buffer);
  return `${urlPrefix}/${filename}`;
}

async function toRecord(item, { isReel, collab = false }) {
  const kind = isReel ? "reel" : "post";
  const dir = isReel ? REEL_DIR : POST_DIR;
  const prefix = isReel ? "/media/reels" : "/media/posts";

  const url = await resolveImageUrl(item, isReel);
  if (!url) {
    console.warn(`The ${kind} ${item.id} has no usable image URL — dropping it from the site.`);
    return null;
  }

  try {
    const thumbnail = await saveImage(url, dir, prefix, item.id);
    const record = {
      id: item.id,
      permalink: item.permalink,
      thumbnail,
      caption: (item.caption ?? "").slice(0, MAX_CAPTION_CHARS),
      timestamp: new Date(item.timestamp).toISOString(),
      // A collab post lists whoever published it plus this account; for our own
      // posts we ask Instagram who accepted a collab invite.
      authors: collab
        ? [...new Set([item.username, ACCOUNT_USERNAME].filter(Boolean))]
        : await resolveAuthors(item),
    };
    if (!isReel) record.type = item.media_type;
    return record;
  } catch (err) {
    console.warn(`Couldn't save the image for ${kind} ${item.id}, skipping it:`, err.message);
    return null;
  }
}

const isFromThisYear = (item) => new Date(item.timestamp).getFullYear() >= MIN_YEAR;
const newestFirst = (a, b) => new Date(b.timestamp) - new Date(a.timestamp);

async function main() {
  await mkdir(REEL_DIR, { recursive: true });
  await mkdir(POST_DIR, { recursive: true });

  const media = await fetchMedia();

  const stats = await fetchAccountStats();
  if (stats) {
    if (stats.username) ACCOUNT_USERNAME = stats.username;
    await writeFile(STATS_JSON, JSON.stringify(stats, null, 2) + "\n", "utf-8");
    console.log(`Wrote account stats to ${STATS_JSON}:`, stats);
  } else {
    console.warn("Couldn't fetch account stats this run — leaving the existing file untouched.");
  }

  if (media.length === 0) {
    // An empty response from the API itself is more likely a transient glitch
    // than "the account has zero posts" — don't wipe good data.
    console.warn("Instagram API returned no media at all. Leaving reels.json and posts.json untouched.");
    return;
  }

  // Inventory, so it's obvious in the Actions log what Instagram actually returned.
  console.log(`Instagram returned ${media.length} item(s):`);
  for (const item of media) {
    console.log(`  ${String(item.timestamp).slice(0, 10)}  ${item.media_product_type}/${item.media_type}  ${item.permalink}`);
  }

  // Collab posts published by other accounts (posts only — never reels).
  const collab = await fetchCollabItems();
  let collabPosts = [];
  if (collab.error) {
    console.warn(
      "Collab posts: Instagram refused the lookup, so collab posts published from other accounts " +
        "can't be picked up automatically with this login. Add them to src/content/manual-posts.json instead. " +
        "Instagram said:",
      JSON.stringify(collab.error),
    );
  } else {
    const ownIds = new Set(media.map((i) => i.id));
    collabPosts = collab.items.filter((i) => !ownIds.has(i.id)).filter(isCollabPost);
    console.log(`Collab posts from other accounts: ${collabPosts.length} (of ${collab.items.length} collab item(s) returned)`);
    for (const item of collabPosts) {
      console.log(`  ${String(item.timestamp).slice(0, 10)}  by @${item.username}  ${item.permalink}`);
    }
  }

  const reelItems = media.filter((i) => i.media_product_type === "REELS").filter(isFromThisYear).sort(newestFirst).slice(0, MAX_REELS);
  const ownPostItems = media.filter((i) => i.media_product_type !== "REELS" && i.media_product_type !== "STORY");
  const postJobs = [
    ...ownPostItems.map((item) => ({ item, collab: false })),
    ...collabPosts.map((item) => ({ item, collab: true })),
  ]
    .filter((j) => isFromThisYear(j.item))
    .sort((a, b) => newestFirst(a.item, b.item))
    .slice(0, MAX_POSTS);

  const reels = (await Promise.all(reelItems.map((i) => toRecord(i, { isReel: true })))).filter(Boolean);
  const posts = (await Promise.all(postJobs.map((j) => toRecord(j.item, { isReel: false, collab: j.collab })))).filter(Boolean);

  // An empty result here is a deliberate outcome of the year filter (e.g. no
  // 2026 posts yet), so we DO write it — that clears out stale content.
  await writeFile(REELS_JSON, JSON.stringify(reels, null, 2) + "\n", "utf-8");
  await writeFile(POSTS_JSON, JSON.stringify(posts, null, 2) + "\n", "utf-8");
  console.log(`Wrote ${reels.length} reel(s) to ${REELS_JSON}`);
  console.log(`Wrote ${posts.length} post(s) to ${POSTS_JSON}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
