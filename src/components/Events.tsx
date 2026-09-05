import { eventDetails, events, sectionLabels } from "@/content/site";
import { ACCENT_HEX } from "@/lib/accents";
import { Reveal, SectionLabel } from "@/components/primitives";

export default function Events() {
  return (
    <section id="events" className="py-28 md:py-44 bg-[#0F141D] scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <SectionLabel index={sectionLabels.events.index} label={sectionLabels.events.label} />
          <h2
            className="font-display font-[600] text-[#EDE8DF] leading-none tracking-[-0.025em]"
            style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
          >
            What to expect
          </h2>
        </div>

        {/* Cards */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05] list-none p-0 m-0">
          {events.map((ev, i) => {
            const accent = ACCENT_HEX[ev.accent];
            return (
              <Reveal
                as="li"
                key={ev.num}
                delay={i * 90}
                className="bg-[#0F141D] flex flex-col group"
              >
                <div className="relative overflow-hidden bg-[#141C29]">
                  <img
                    src={ev.image.src}
                    alt={ev.image.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] opacity-50 group-hover:opacity-70"
                    style={{ aspectRatio: "16 / 10" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F141D] to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span
                      className="font-mono text-[10px] tracking-[0.16em] uppercase px-3 py-1.5 border bg-[#0F141D]/80"
                      style={{ borderColor: `${accent}60`, color: accent }}
                    >
                      {ev.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-5 right-5" aria-hidden="true">
                    <span
                      className="font-display font-[700] leading-none"
                      style={{ fontSize: "56px", color: `${accent}10` }}
                    >
                      {ev.num}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <span
                    className="font-mono text-[10px] tracking-[0.18em] uppercase mb-4 block"
                    style={{ color: accent }}
                  >
                    {ev.category}
                  </span>
                  <h3
                    className="font-display font-[600] text-[#EDE8DF] leading-[1.2] tracking-[-0.015em] mb-4"
                    style={{ fontSize: "clamp(22px, 2vw, 28px)" }}
                  >
                    {ev.title}
                  </h3>
                  <p className="font-sans text-[14px] text-[#5A6872] leading-[1.75] flex-1">
                    {ev.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        {/* Details strip */}
        <dl className="mt-px grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05] m-0">
          {eventDetails.map((d) => (
            <div key={d.label} className="bg-[#0F141D] px-6 py-5">
              <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#3D5260] mb-2">
                {d.label}
              </dt>
              <dd className="font-sans text-[13px] text-[#8A9AA8] m-0">{d.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
