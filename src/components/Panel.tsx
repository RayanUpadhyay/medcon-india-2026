import { panel, sectionLabels } from "@/content/site";
import { Reveal, SectionLabel } from "@/components/primitives";

export default function Panel() {
  return (
    <section id="panel" className="py-28 md:py-44 bg-bg scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-12">
          <SectionLabel index={sectionLabels.panel.index} label={sectionLabels.panel.label} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 mb-16 md:mb-20">
          <h2
            className="font-display font-[600] text-fg leading-[1.08] tracking-[-0.025em]"
            style={{ fontSize: "clamp(32px, 4.5vw, 60px)" }}
          >
            {panel.titleLead}
            <br />
            <span className="font-[300] italic text-periwinkle">{panel.titleTail}</span>
          </h2>
          <div className="flex items-end">
            <p className="font-sans text-[16px] md:text-[17px] text-muted leading-[1.75]">
              {panel.intro}
            </p>
          </div>
        </div>

        {/* Panelists */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line list-none p-0 m-0">
          {panel.panelists.map((p, i) => (
            <Reveal
              as="li"
              key={p.name}
              delay={i * 70}
              className="bg-bg p-8 flex flex-col gap-4 hover:bg-surface transition-colors duration-200"
            >
              <span
                aria-hidden="true"
                className="w-10 h-10 rounded-full border border-line-2 flex items-center justify-center flex-shrink-0"
              >
                <span className="font-mono text-[11px] text-sage">0{i + 1}</span>
              </span>
              <div>
                <h3 className="font-display font-[600] text-fg text-[18px] leading-[1.3] tracking-[-0.01em] mb-1.5">
                  {p.name}
                </h3>
                <p className="font-sans text-[13px] text-periwinkle mb-1">{p.role}</p>
                <p className="font-sans text-[12px] text-faint">{p.institution}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <p className="mt-px border border-line border-t-0 px-8 py-5 bg-surface-faint font-mono text-[10px] tracking-[0.14em] text-faint-2">
          {panel.disclaimer}
        </p>
      </div>
    </section>
  );
}
