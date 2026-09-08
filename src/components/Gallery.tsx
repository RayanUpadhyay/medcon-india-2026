import { gallery, links, sectionLabels } from "@/content/site";
import { SectionLabel } from "@/components/primitives";
import reelsData from "@/content/reels.json";
import instagramStats from "@/content/instagram-stats.json";

type Reel = {
  id: string;
  permalink: string;
  thumbnail: string;
  caption: string;
  timestamp: string;
};

const reels = reelsData as Reel[];

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
              <span>View all · {links.instagramHandle}</span>
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
          Event Day
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-px bg-line list-none p-0 m-0">
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
                className={`bg-bg overflow-hidden ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
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

        {/* ── From Instagram (reels) ───────────────────────────────────── */}
        {reels.length > 0 && (
          <div className="mt-20 md:mt-28">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#3D5260] mb-6">
              From Instagram
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line list-none p-0 m-0">
              {reels.map((reel) => (
                <li key={reel.id} className="bg-bg overflow-hidden aspect-[9/16]">
                  <a
                    href={reel.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block w-full h-full"
                  >
                    <img
                      src={reel.thumbnail}
                      alt={reel.caption || "Instagram reel"}
                      loading="lazy"
                      decoding="async"
                      className="gallery-img w-full h-full object-cover bg-panel transition-[transform,opacity] duration-500 group-hover:scale-[1.04]"
                    />
                    {/* Play icon overlay — signals "this is a video, leaves the site" */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white translate-x-[1px]">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
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
