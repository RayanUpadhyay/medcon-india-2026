#!/usr/bin/env bash
# Loads .env.local and runs the reel-fetch script locally, for testing.
set -euo pipefail
cd "$(dirname "$0")/.."
export $(grep -v '^#' .env.local | xargs)
node scripts/fetch-reels.mjs
