import { links, sectionLabels } from "@/content/site";
import { Reveal, SectionLabel } from "@/components/primitives";

export default function Contact() {
  return (
    <section id="contact" className="py-28 md:py-44 bg-bg scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-14 md:mb-24">
          <SectionLabel index={sectionLabels.contact.index} label={sectionLabels.contact.label} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line">
          <Reveal className="bg-bg p-10 md:p-14">
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-sage mb-5">
              Email
            </p>
            <h3
              className="font-display font-[600] text-fg leading-[1.2] mb-4"
              style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
            >
              Questions about MEDCON 2026?
            </h3>
            <a
              href={`mailto:${links.contactEmail}`}
              className="font-sans text-[15px] text-muted hover:text-sage transition-colors break-all"
            >
              {links.contactEmail}
            </a>
          </Reveal>

          {links.instagramUrl && (
            <Reveal delay={70} className="bg-bg p-10 md:p-14">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-sage mb-5">
                Instagram
              </p>
              <h3
                className="font-display font-[600] text-fg leading-[1.2] mb-4"
                style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
              >
                Follow along for updates
              </h3>
              <a
                href={links.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[15px] text-muted hover:text-sage transition-colors"
              >
                {links.instagramHandle}
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
