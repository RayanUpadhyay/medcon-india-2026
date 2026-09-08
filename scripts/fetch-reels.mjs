// scripts/fetch-reels.mjs
//
// Pulls the latest reels from the @medconindia Instagram account via the
// Instagram Graph API (API setup with Instagram Login) and writes them to
// src/content/reels.json, which the site imports directly.
//
// Run manually:
//   IG_USER_ID=17841472014740873 IG_ACCESS_TOKEN=xxxx node scripts/fetch-reels.mjs
//
// In CI (see .github/workflows/sync-reels.yml), IG_USER_ID and
// IG_ACCESS_TOKEN come from GitHub Actions secrets — never commit real
// values for these into the repo.

import { writeFile } from "node:fs/promises";
import path from "node:path";

const IG_USER_ID = process.env.IG_USER_ID;
const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;
const MAX_REELS = 6;
const OUTPUT_PATH = path.resolve("src/content/reels.json");
const STATS_OUTPUT_PATH = path.resolve("src/content/instagram-stats.json");
const GRAPH_VERSION = "v24.0";
// Only pull reels posted for THIS year's event — keeps last year's
// (2025) reels from showing up alongside 2026 content. Bump this each
// year, or change to a cutoff date if you want more control.
const MIN_YEAR = 2026;

if (!IG_USER_ID || !IG_ACCESS_TOKEN) {
  console.error(
    "Missing IG_USER_ID or IG_ACCESS_TOKEN environment variables. " +
      "Set them locally to test, or check the GitHub Actions secrets.",
  );
  process.exit(1);
}

/** @typedef {{ id: string; permalink: string; thumbnail: string; caption: string; timestamp: string }} Reel */

async function fetchMedia() {
  const fields = [
    "id",
    "caption",
    "media_type",
    "media_product_type",
    "thumbnail_url",
    "media_url",
    "permalink",
    "timestamp",
  ].join(",");

  const url =
    `https://graph.instagram.com/${GRAPH_VERSION}/${IG_USER_ID}/media` +
    `?fields=${fields}&access_token=${IG_ACCESS_TOKEN}&limit=25`;

  const res = await fetch(url);
  const body = await res.json();

  if (!res.ok) {
    console.error("Instagram API error:", JSON.stringify(body, null, 2));
    process.exit(1);
  }

  return body.data ?? [];
}

function toReel(item) {
  // Reels are VIDEO media with media_product_type "REELS".
  // thumbnail_url is the still frame; media_url on a reel is the raw video
  // file, which we don't need for a link-out tile.
  return {
    id: item.id,
    permalink: item.permalink,
    thumbnail: item.thumbnail_url ?? item.media_url ?? "",
    caption: (item.caption ?? "").slice(0, 200),
    timestamp: item.timestamp,
  };
}

async function fetchAccountStats() {
  const fields = "username,followers_count,media_count";
  const url =
    `https://graph.instagram.com/${GRAPH_VERSION}/${IG_USER_ID}` +
    `?fields=${fields}&access_token=${IG_ACCESS_TOKEN}`;

  const res = await fetch(url);
  const body = await res.json();

  if (!res.ok) {
    console.error("Instagram API error (account stats):", JSON.stringify(body, null, 2));
    return null;
  }

  return {
    username: body.username,
    followers: body.followers_count,
    posts: body.media_count,
  };
}

async function main() {
  const media = await fetchMedia();

  const stats = await fetchAccountStats();
  if (stats) {
    await writeFile(STATS_OUTPUT_PATH, JSON.stringify(stats, null, 2) + "\n", "utf-8");
    console.log(`Wrote account stats to ${STATS_OUTPUT_PATH}:`, stats);
  } else {
    console.warn(
      "Couldn't fetch account stats this run — leaving existing " +
        "src/content/instagram-stats.json untouched.",
    );
  }

  if (media.length === 0) {
    // Empty response from the API itself is more likely a transient glitch
    // than "the account genuinely has zero posts" — don't wipe good data.
    console.warn(
      "Instagram API returned no media at all. Leaving existing " +
        "src/content/reels.json untouched so the site doesn't lose its " +
        "last-known-good data.",
    );
    return;
  }

  const reels = media
    .filter((item) => item.media_product_type === "REELS")
    .filter((item) => new Date(item.timestamp).getFullYear() >= MIN_YEAR)
    .slice(0, MAX_REELS)
    .map(toReel);

  // Here, an empty result is a deliberate outcome of the year filter (e.g.
  // no 2026 reels posted yet), so we DO write it — this is what clears out
  // stale reels from a previous year.
  await writeFile(OUTPUT_PATH, JSON.stringify(reels, null, 2) + "\n", "utf-8");
  console.log(`Wrote ${reels.length} reel(s) to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
