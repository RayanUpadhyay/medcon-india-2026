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
const GRAPH_VERSION = "v24.0";

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

async function main() {
  const media = await fetchMedia();

  const reels = media
    .filter((item) => item.media_product_type === "REELS")
    .slice(0, MAX_REELS)
    .map(toReel);

  if (reels.length === 0) {
    console.warn(
      "No reels found. Leaving existing src/content/reels.json untouched " +
        "so the site doesn't lose its last-known-good data.",
    );
    return;
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(reels, null, 2) + "\n", "utf-8");
  console.log(`Wrote ${reels.length} reel(s) to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
