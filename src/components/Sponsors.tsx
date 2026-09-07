import { links, partners, sectionLabels, sponsorsCta } from "@/content/site";
import { Reveal, SectionLabel } from "@/components/primitives";

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-28 md:py-44 bg-bg-alt scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-14 md:mb-24">
          <SectionLabel index={sectionLabels.sponsors.index} label={sectionLabels.sponsors.label} />
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line mb-20 md:mb-24 list-none p-0 m-0">
          {partners.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 70} className="bg-bg-alt p-10">
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-sage mb-5">
                {p.tier}
              </div>
              <h3
                className="font-display font-[600] text-fg leading-[1.2] mb-3"
                style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
              >
                {p.name}
              </h3>
              <p className="font-sans text-[13px] text-faint">{p.note}</p>
            </Reveal>
          ))}
        </ul>

        {/* Partner CTA */}
        <div className="border border-line p-8 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-sage mb-4">
              {sponsorsCta.eyebrow}
            </div>
            <h3
              className="font-display font-[600] text-fg leading-[1.2] tracking-[-0.015em] mb-3"
              style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
            >
              {sponsorsCta.title}
            </h3>
            <p className="font-sans text-[15px] text-muted">{sponsorsCta.body}</p>
          </div>
          <a
            href={`mailto:${links.contactEmail}`}
            className="flex-shrink-0 font-sans text-[12px] tracking-[0.14em] uppercase px-8 py-4 border border-sage text-sage hover:bg-sage hover:text-on-accent transition-colors duration-200 font-[600] whitespace-nowrap"
          >
            {sponsorsCta.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
