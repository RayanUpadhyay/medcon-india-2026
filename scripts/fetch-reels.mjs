// scripts/fetch-reels.mjs
//
// Pulls the latest reels AND regular posts (single images, carousels) from the
// @medconindia Instagram account via the Instagram Graph API (API setup with
// Instagram Login). Writes:
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

async function graphGet(endpoint, params) {
  const qs = new URLSearchParams({ ...params, access_token: IG_ACCESS_TOKEN });
  const res = await fetch(`https://graph.instagram.com/${GRAPH_VERSION}/${endpoint}?${qs}`);
  return { ok: res.ok, body: await res.json() };
}

async function fetchMedia() {
  const { ok, body } = await graphGet(`${IG_USER_ID}/media`, {
    fields: "id,caption,media_type,media_product_type,thumbnail_url,media_url,permalink,timestamp",
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
 * Which URL is an actual IMAGE for this item?
 *  - Reels and videos: thumbnail_url only. For a video, media_url is the raw
 *    MP4 — saving that as a .jpg "succeeds" but produces a broken image.
 *  - Single images and carousels: media_url (for a carousel, its cover image).
 */
function imageSource(item, isReel) {
  if (isReel || item.media_type === "VIDEO") return item.thumbnail_url ?? "";
  return item.media_url ?? "";
}

/** The bulk /media list sometimes omits the image URL; re-fetch that one item. */
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

async function toRecord(item, { isReel }) {
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
      caption: (item.caption ?? "").slice(0, 200),
      timestamp: new Date(item.timestamp).toISOString(),
    };
    if (!isReel) record.type = item.media_type;
    return record;
  } catch (err) {
    console.warn(`Couldn't save the image for ${kind} ${item.id}, skipping it:`, err.message);
    return null;
  }
}

const isFromThisYear = (item) => new Date(item.timestamp).getFullYear() >= MIN_YEAR;

async function main() {
  await mkdir(REEL_DIR, { recursive: true });
  await mkdir(POST_DIR, { recursive: true });

  const media = await fetchMedia();

  const stats = await fetchAccountStats();
  if (stats) {
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
  console.log("(A collab post only appears here if this account was the one that published it.)");

  const reelItems = media.filter((i) => i.media_product_type === "REELS").filter(isFromThisYear).slice(0, MAX_REELS);
  const postItems = media
    .filter((i) => i.media_product_type !== "REELS" && i.media_product_type !== "STORY")
    .filter(isFromThisYear)
    .slice(0, MAX_POSTS);

  const reels = (await Promise.all(reelItems.map((i) => toRecord(i, { isReel: true })))).filter(Boolean);
  const posts = (await Promise.all(postItems.map((i) => toRecord(i, { isReel: false })))).filter(Boolean);

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
