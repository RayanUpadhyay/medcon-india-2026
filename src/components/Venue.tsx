import { footer, sectionLabels } from "@/content/site";
import { Reveal, SectionLabel } from "@/components/primitives";

export default function Venue() {
  return (
    <section id="venue" className="py-28 md:py-44 bg-bg-alt scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-14 md:mb-24">
          <SectionLabel index={sectionLabels.venue.index} label={sectionLabels.venue.label} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <Reveal>
            <h3
              className="font-display font-[600] text-fg leading-[1.2] tracking-[-0.015em] mb-6"
              style={{ fontSize: "clamp(24px, 3vw, 34px)" }}
            >
              {footer.venue.name}
            </h3>
            <address className="font-sans text-[16px] text-muted leading-[1.9] not-italic">
              {footer.venue.lines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < footer.venue.lines.length - 1 && <br />}
                </span>
              ))}
            </address>
          </Reveal>

          {footer.venueMapEmbedUrl && (
            <Reveal delay={70} className="rounded-md overflow-hidden border border-line">
              <iframe
                src={footer.venueMapEmbedUrl}
                title={`Map to ${footer.venue.name}`}
                width="100%"
                height="340"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
