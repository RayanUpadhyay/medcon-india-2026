import { eventDetails, events, itinerary, sectionLabels } from "@/content/site";
import { ACCENT_HEX } from "@/lib/accents";
import { Reveal, SectionLabel } from "@/components/primitives";

export default function Events() {
  return (
    <section id="events" className="py-28 md:py-44 bg-bg-alt scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <SectionLabel index={sectionLabels.events.index} label={sectionLabels.events.label} />
          <h2
            className="font-display font-[600] text-fg leading-none tracking-[-0.025em]"
            style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
          >
            What to expect
          </h2>
        </div>

        {/* Cards */}
        <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
          {events.map((ev, i) => {
            const accent = ACCENT_HEX[ev.accent];
            return (
              <Reveal
                as="li"
                key={ev.num}
                delay={i * 90}
                className="bg-bg-alt border border-line flex flex-col group flex-1 min-w-[280px]"
              >
                <div className="relative overflow-hidden bg-panel">
                  <img
                    src={ev.image.src}
                    alt={ev.image.alt}
                    loading="lazy"
                    decoding="async"
                    className="event-img w-full object-cover transition-[transform,opacity] duration-700 group-hover:scale-[1.04]"
                    style={{ aspectRatio: "16 / 10" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-alt to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span
                      className="font-mono text-[10px] tracking-[0.16em] uppercase px-3 py-1.5 border bg-bg-alt/80"
                      style={{
                        borderColor: `color-mix(in srgb, ${accent} 38%, transparent)`,
                        color: accent,
                      }}
                    >
                      {ev.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-5 right-5" aria-hidden="true">
                    <span
                      className="font-display font-[700] leading-none"
                      style={{
                        fontSize: "56px",
                        color: `color-mix(in srgb, ${accent} 7%, transparent)`,
                      }}
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
                    className="font-display font-[600] text-fg leading-[1.2] tracking-[-0.015em] mb-4"
                    style={{ fontSize: "clamp(22px, 2vw, 28px)" }}
                  >
                    {ev.title}
                  </h3>
                  <p className="font-sans text-[14px] text-muted leading-[1.75] flex-1">
                    {ev.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        {/* Details strip */}
        <dl className="mt-6 flex flex-wrap gap-3 m-0">
          {eventDetails.map((d) => (
            <div key={d.label} className="bg-bg-alt border border-line px-6 py-5 flex-1 min-w-[160px]">
              <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-faint mb-2">
                {d.label}
              </dt>
              <dd className="font-sans text-[13px] text-muted-bright m-0">{d.value}</dd>
            </div>
          ))}
        </dl>

        {/* Itinerary */}
        <Reveal className="mt-20 md:mt-28">
          <p className="font-mono text-[11px] tracking-[0.14em] text-sage mb-3">{itinerary.label}</p>
          <h3
            className="font-display font-[600] text-fg leading-[1.1] tracking-[-0.02em] mb-8"
            style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}
          >
            {itinerary.title}
          </h3>

          <div
            aria-hidden="true"
            className="hidden md:grid grid-cols-[180px_minmax(0,1fr)_240px] gap-6 px-6 py-3 bg-surface border border-line font-mono text-[10px] tracking-[0.16em] uppercase text-faint"
          >
            <span>Timing</span>
            <span>Event</span>
            <span>Venue</span>
          </div>

          <ol className="list-none p-0 m-0 border border-line md:border-t-0">
            {itinerary.items.map((it) => (
              <li
                key={it.time}
                className="relative grid grid-cols-1 md:grid-cols-[180px_minmax(0,1fr)_240px] gap-x-6 gap-y-1 px-6 py-4 border-b border-line last:border-b-0"
              >
                {it.main && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-sage"
                  />
                )}
                <span
                  className={`font-mono text-[12px] tracking-[0.04em] ${
                    it.main ? "text-sage" : "text-faint"
                  }`}
                >
                  {it.time}
                </span>
                <span
                  className={`font-sans text-[14px] leading-[1.5] ${
                    it.main ? "text-fg font-[600]" : "text-muted"
                  }`}
                >
                  {it.title}
                </span>
                <span className="font-sans text-[13px] leading-[1.5] text-faint">
                  <span className="sr-only">Venue: </span>
                  {it.venue}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
