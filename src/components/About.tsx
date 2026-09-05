import { about, images, sectionLabels } from "@/content/site";
import { ACCENT_HEX } from "@/lib/accents";
import { Reveal, SectionLabel } from "@/components/primitives";

export default function About() {
  return (
    <section id="about" className="py-28 md:py-44 bg-[#0C1018] scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-14 md:mb-24">
          <SectionLabel index={sectionLabels.about.index} label={sectionLabels.about.label} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-28 items-start">
          <Reveal>
            <h2
              className="font-display font-[600] text-[#EDE8DF] leading-[1.08] tracking-[-0.025em] mb-10"
              style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}
            >
              {about.headline}
            </h2>

            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`font-sans text-[16px] md:text-[17px] text-[#6A7882] leading-[1.75] ${
                  i < about.paragraphs.length - 1 ? "mb-6" : ""
                }`}
              >
                {p}
              </p>
            ))}

            {/* Stats */}
            <div className="mt-16 pt-12 border-t border-white/[0.07] grid grid-cols-2 gap-8">
              {about.stats.map((s) => (
                <div key={s.value}>
                  <div
                    className="font-display font-[700] leading-none mb-3"
                    style={{ fontSize: "clamp(48px, 7vw, 88px)", color: ACCENT_HEX[s.accent] }}
                  >
                    {s.value}
                  </div>
                  <p className="font-sans text-[13px] text-[#3D5260] leading-[1.6]">{s.caption}</p>
                </div>
              ))}
            </div>

            {/* Affiliation */}
            <div className="mt-12 flex items-start gap-4 p-6 border border-white/[0.06]">
              <span className="w-px self-stretch bg-[#5A9488] flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#5A9488] mb-2">
                  {about.affiliationLabel}
                </p>
                <p className="font-sans text-[14px] text-[#8A9AA8] leading-[1.7]">
                  {about.affiliationValue}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal className="relative" delay={80}>
            <figure className="relative overflow-hidden bg-[#141C29] m-0">
              <img
                src={images.about.src}
                alt={images.about.alt}
                loading="lazy"
                decoding="async"
                className="w-full object-cover"
                style={{ aspectRatio: "4 / 5", objectPosition: "center top", opacity: 0.75 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1018]/90 via-[#0C1018]/20 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-8">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#5A9488] block mb-3">
                  {about.missionLabel}
                </span>
                <p className="font-display font-[300] italic text-[#EDE8DF] text-[20px] md:text-[22px] leading-[1.35]">
                  &ldquo;{about.missionQuote}&rdquo;
                </p>
              </figcaption>
            </figure>
            <span
              aria-hidden="true"
              className="absolute -top-6 -right-2 md:-right-8 font-display font-[700] leading-none tracking-[-0.04em] select-none pointer-events-none"
              style={{ fontSize: "clamp(72px, 12vw, 160px)", color: "rgba(90,148,136,0.05)" }}
            >
              {sectionLabels.about.index}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
