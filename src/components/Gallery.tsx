import { useState, type KeyboardEvent } from "react";
import { gallery, links, sectionLabels } from "@/content/site";
import { SectionLabel } from "@/components/primitives";
import reelsData from "@/content/reels.json";
import postsData from "@/content/posts.json";
import manualData from "@/content/manual-posts.json";
import instagramStats from "@/content/instagram-stats.json";

type Reel = {
  id: string;
  permalink: string;
  thumbnail: string;
  caption: string;
  timestamp: string;
  /** Instagram handles, primary author first. Older entries won't have this. */
  authors?: string[];
};
type Post = Reel & { type: "IMAGE" | "CAROUSEL_ALBUM" | "VIDEO" };
type Tile = Reel & { kind: "reel" | "video" | "album" | "post" };
type TabId = "posts" | "reels";

const reels = reelsData as Reel[];
const posts = postsData as Post[];
const manualPosts = manualData as Post[];

// Posts the sync can't see (e.g. a collab published from another account) live in
// manual-posts.json. If the sync ever picks the same post up, only show it once.
const codeOf = (url: string) => url.match(/\/(?:p|reel)\/([^/?#]+)/)?.[1] ?? url;
const firstLine = (caption: string) => caption.split("\n")[0].trim().toLowerCase();
const synced = new Set(posts.flatMap((p) => [codeOf(p.permalink), firstLine(p.caption)]));
const allPosts: Post[] = [
  ...posts,
  ...manualPosts.filter((m) => !synced.has(codeOf(m.permalink)) && !synced.has(firstLine(m.caption))),
];

// Safari can't parse "+0000" (no colon) offsets, so normalise before parsing.
const when = (s: string) => Date.parse(s.replace(/([+-]\d\d)(\d\d)$/, "$1:$2"));
const newestFirst = (a: Reel, b: Reel) => when(b.timestamp) - when(a.timestamp);

const postTiles: Tile[] = allPosts
  .map((p): Tile => ({
    ...p,
    kind: p.type === "CAROUSEL_ALBUM" ? "album" : p.type === "VIDEO" ? "video" : "post",
  }))
  .sort(newestFirst)
  .slice(0, 8);
const reelTiles: Tile[] = reels
  .map((r): Tile => ({ ...r, kind: "reel" }))
  .sort(newestFirst)
  .slice(0, 8);

/** Only the tabs that have something in them. */
const tabs: { id: TabId; label: string; tiles: Tile[] }[] = [
  { id: "posts" as const, label: "Posts", tiles: postTiles },
  { id: "reels" as const, label: "Reels", tiles: reelTiles },
].filter((t) => t.tiles.length > 0);

/** "@a", "@a and @b", "@a, @b and @c". Falls back to the account itself. */
function credit(authors?: string[]): string {
  const names = (authors?.length ? authors : ["medconindia"]).map((a) => `@${a}`);
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return String(n);
}

function InstagramTile({ tile, aspect, showCaption }: { tile: Tile; aspect: string; showCaption?: boolean }) {
  return (
    <li className="flex flex-col bg-bg border border-line overflow-hidden">
      <a
        href={tile.permalink}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative block w-full overflow-hidden ${aspect}`}
      >
        <img
          src={tile.thumbnail}
          alt={tile.caption || (tile.kind === "reel" ? "Instagram reel" : "Instagram post")}
          loading="lazy"
          decoding="async"
          className="gallery-img absolute inset-0 w-full h-full object-cover bg-panel transition-[transform,opacity] duration-500 group-hover:scale-[1.04]"
        />
        {/* Play icon: a video, opens on Instagram */}
        {(tile.kind === "reel" || tile.kind === "video") && (
          <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white translate-x-[1px]">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        )}
        {/* Stacked-squares icon: a multi-photo carousel */}
        {tile.kind === "album" && (
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white" strokeWidth="2">
              <rect x="8" y="8" width="12" height="12" rx="2" />
              <path d="M16 4H6a2 2 0 0 0-2 2v10" />
            </svg>
          </span>
        )}
      </a>
      <div className="flex flex-col gap-2 min-h-[3rem] px-3 py-3 border-t border-line">
        <p className="font-mono text-[10px] leading-snug tracking-[0.06em] text-sage">{credit(tile.authors)}</p>
        {showCaption && tile.caption && (
          <p className="font-sans text-[13px] leading-[1.5] text-muted line-clamp-3">{tile.caption}</p>
        )}
      </div>
    </li>
  );
}

export default function Gallery() {
  const hasInstagram = Boolean(links.instagramUrl);
  const [active, setActive] = useState<TabId>(tabs[0]?.id ?? "posts");
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  /** Left/right arrows move between tabs, like a native tab control. */
  function onTabKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = tabs.findIndex((t) => t.id === active);
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    setActive(next.id);
    document.getElementById(`ig-tab-${next.id}`)?.focus();
  }

  return (
    <section id="gallery" className="py-28 md:py-44 bg-bg scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <SectionLabel index={sectionLabels.gallery.index} label={sectionLabels.gallery.label} />
          {hasInstagram && (
            <a
              href={links.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[12px] tracking-[0.14em] uppercase text-sage hover:text-sage-bright transition-colors inline-flex items-center gap-3"
            >
              <span>See more @medconindia</span>
              {typeof instagramStats.followers === "number" && (
                <span className="text-[#3D5260] normal-case tracking-normal">
                  {formatCount(instagramStats.followers)} followers
                  {typeof instagramStats.posts === "number" && ` · ${instagramStats.posts} posts`}
                </span>
              )}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        {/* ── Event Day photos ─────────────────────────────────────────── */}
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#3D5260] mb-6">
          Event Day — 2025
        </p>
        <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
          {gallery.map((g) => {
            const inner = (
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                className="gallery-img w-full h-full object-cover bg-panel transition-[transform,opacity] duration-500 group-hover:scale-[1.04]"
              />
            );
            return (
              <li
                key={g.src}
                className="bg-bg border border-line overflow-hidden aspect-[4/3] flex-1 basis-[280px] min-w-[220px]"
              >
                {hasInstagram ? (
                  <a
                    href={links.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block w-full h-full"
                  >
                    {inner}
                  </a>
                ) : (
                  <span className="group block w-full h-full">{inner}</span>
                )}
              </li>
            );
          })}
        </ul>

        {/* ── From Instagram: Posts and Reels in their own tabs ─────────── */}
        {current && (
          <div className="mt-20 md:mt-28">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#3D5260] mb-6">
              From Instagram
            </p>

            {tabs.length > 1 && (
              <div role="tablist" aria-label="Instagram content" className="flex gap-8 mb-8 border-b border-line">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    id={`ig-tab-${t.id}`}
                    aria-selected={active === t.id}
                    aria-controls="ig-panel"
                    tabIndex={active === t.id ? 0 : -1}
                    onClick={() => setActive(t.id)}
                    onKeyDown={onTabKey}
                    className={`relative -mb-px pb-3 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-200 ${
                      active === t.id ? "text-fg" : "text-[#3D5260] hover:text-muted"
                    }`}
                  >
                    {t.label}
                    {active === t.id && (
                      <span aria-hidden="true" className="absolute left-0 right-0 -bottom-px h-px bg-sage" />
                    )}
                  </button>
                ))}
              </div>
            )}

            <div id="ig-panel" role={tabs.length > 1 ? "tabpanel" : undefined} aria-labelledby={tabs.length > 1 ? `ig-tab-${current.id}` : undefined}>
              {current.id === "posts" ? (
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 list-none p-0 m-0">
                  {current.tiles.map((tile) => (
                    <InstagramTile key={tile.id} tile={tile} aspect="aspect-[4/5]" showCaption />
                  ))}
                </ul>
              ) : (
                <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 list-none p-0 m-0">
                  {current.tiles.map((tile) => (
                    <InstagramTile key={tile.id} tile={tile} aspect="aspect-[9/16]" />
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
