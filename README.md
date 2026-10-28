# MEDCON India 2026

The website for **MEDCON 2026**, India's first student-led medical conference, hosted at The International School Bangalore (TISB) on **Saturday, 31 October 2026**. This year's theme is ***Beyond The White Coat***.

**Live site:** [medcon.tisb.org](https://medcon.tisb.org) · **Register:** [events.tisb.org/medcon26](https://events.tisb.org/medcon26/)

## What's on the site

- **Hero** with the date, time, venue, eligibility (Grades 8–12), entry fee and a registration button.
- **About** the conference and its mission.
- **Programme:** the three main events (Medical Skills Workshop, a panel discussion on *The Modern Health Paradox*, and the *Code Blue* student competition) plus the full event-day itinerary with times and venues.
- **Panel:** confirmed speakers.
- **Sponsors** and a partnership call to action.
- **Gallery** with photos and the latest posts and reels from [@medconindia](https://www.instagram.com/medconindia) on Instagram, synced automatically.
- **Contact** and **Venue** details.
- Light/dark theme toggle.

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`, no config file)
- oxfmt for formatting
- Scaffolded in Figma Make and deployed on Vercel

## Getting started

Requires Node 20+ (pnpm or npm).

```bash
pnpm install
pnpm dev        # local dev server
pnpm build      # production build in dist/
pnpm preview    # preview the build
pnpm format     # format with oxfmt
```

## Editing content

Almost all of the copy lives in one file: **`src/content/site.ts`**. Event details, the itinerary, panelists, sponsors, links and image paths are all there, so the components in `src/components/` don't need to change when details do. Values still waiting to be confirmed are marked with `PLACEHOLDER:` comments; search for that token before publishing changes.

Photos live in `public/media/` (`about/`, `events/`, `gallery/` and so on).

## Instagram sync

`scripts/fetch-reels.mjs` pulls the latest reels and posts from the @medconindia account through the Instagram API, downloads their thumbnails, and writes:

- `src/content/reels.json` + `public/media/reels/`
- `src/content/posts.json` + `public/media/posts/`
- `src/content/instagram-stats.json`

It keeps only content from 2026 (bump `MIN_YEAR` each year) and skips Instagram's tiny placeholder images.

**Automatically:** the GitHub Actions workflow [`.github/workflows/sync-reels.yml`](.github/workflows/sync-reels.yml) runs on every push to `main`, every 6 hours, and on demand from the Actions tab. If anything changed it commits the new files, which triggers a Vercel redeploy. It needs two repository secrets: `IG_USER_ID` and `IG_ACCESS_TOKEN`.

**Locally:** put the same two values in `.env.local` (git-ignored) and run:

```bash
./scripts/run-local.sh
```

Collab posts that the API can't return can be added by hand to `src/content/manual-posts.json`; the gallery merges them in.

## Project structure

```
medcon-india-2026/
├── .github/workflows/sync-reels.yml   Instagram sync job
├── public/media/                      Site photos and synced thumbnails
├── scripts/
│   ├── fetch-reels.mjs                Instagram fetcher
│   └── run-local.sh                   Run the fetcher with .env.local
└── src/
    ├── App.tsx                        Page layout
    ├── components/                    Hero, About, Events, Panel, Sponsors, Gallery,
    │                                  Contact, Venue, Nav, Footer, ThemeToggle
    ├── content/                       site.ts and the synced JSON
    ├── lib/                           Hooks and accent colours
    └── index.css                      Tailwind import and global styles
```

## Credits

Built by **Rayan Upadhyay** for the MEDCON 2026 organising team at TISB.
