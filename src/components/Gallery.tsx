import { gallery, links, sectionLabels } from "@/content/site";
import { SectionLabel } from "@/components/primitives";

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
              className="font-sans text-[12px] tracking-[0.14em] uppercase text-sage hover:text-sage-bright transition-colors inline-flex items-center gap-2"
            >
              <span>View all · {links.instagramHandle}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        {/* Editorial mosaic */}
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
      </div>
    </section>
  );
}
