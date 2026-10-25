import { gallery, links, sectionLabels } from "@/content/site";
import { SectionLabel } from "@/components/primitives";
import reelsData from "@/content/reels.json";
import postsData from "@/content/posts.json";
import instagramStats from "@/content/instagram-stats.json";

type Reel = {
  id: string;
  permalink: string;
  thumbnail: string;
  caption: string;
  timestamp: string;
};
type Post = Reel & { type: "IMAGE" | "CAROUSEL_ALBUM" | "VIDEO" };
type Tile = Reel & { kind: "reel" | "album" | "post" };

const reels = reelsData as Reel[];
const posts = postsData as Post[];

// Safari can't parse "+0000" (no colon) offsets, so normalise before parsing.
const when = (s: string) => Date.parse(s.replace(/([+-]\d\d)(\d\d)$/, "$1:$2"));

/** Reels and posts together, newest first. */
const instagramTiles: Tile[] = [
  ...reels.map((r): Tile => ({ ...r, kind: "reel" })),
  ...posts.map(
    (p): Tile => ({
      ...p,
      kind: p.type === "CAROUSEL_ALBUM" ? "album" : p.type === "VIDEO" ? "reel" : "post",
    }),
  ),
]
  .sort((a, b) => when(b.timestamp) - when(a.timestamp))
  .slice(0, 8);

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return String(n);
}

export default function Gallery() {
  const hasInstagram = Boolean(links.instagramUrl);

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

        {/* ── From Instagram (reels + posts) ───────────────────────────── */}
        {instagramTiles.length > 0 && (
          <div className="mt-20 md:mt-28">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#3D5260] mb-6">
              From Instagram
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 list-none p-0 m-0">
              {instagramTiles.map((tile) => (
                <li key={tile.id} className="bg-bg border border-line overflow-hidden aspect-[3/4]">
                  <a
                    href={tile.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block w-full h-full"
                  >
                    <img
                      src={tile.thumbnail}
                      alt={tile.caption || (tile.kind === "reel" ? "Instagram reel" : "Instagram post")}
                      loading="lazy"
                      decoding="async"
                      className="gallery-img w-full h-full object-cover bg-panel transition-[transform,opacity] duration-500 group-hover:scale-[1.04]"
                    />
                    {/* Play icon: a video, opens on Instagram */}
                    {tile.kind === "reel" && (
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
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
