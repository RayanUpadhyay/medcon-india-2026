import { panel, sectionLabels } from "@/content/site";
import { Reveal, SectionLabel } from "@/components/primitives";

export default function Panel() {
  return (
    <section id="panel" className="py-28 md:py-44 bg-[#0C1018] scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-12">
          <SectionLabel index={sectionLabels.panel.index} label={sectionLabels.panel.label} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 mb-16 md:mb-20">
          <h2
            className="font-display font-[600] text-[#EDE8DF] leading-[1.08] tracking-[-0.025em]"
            style={{ fontSize: "clamp(32px, 4.5vw, 60px)" }}
          >
            {panel.titleLead}
            <br />
            <span className="font-[300] italic text-[#7B8EC4]">{panel.titleTail}</span>
          </h2>
          <div className="flex items-end">
            <p className="font-sans text-[16px] md:text-[17px] text-[#6A7882] leading-[1.75]">
              {panel.intro}
            </p>
          </div>
        </div>

        {/* Panelists */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] list-none p-0 m-0">
          {panel.panelists.map((p, i) => (
            <Reveal
              as="li"
              key={p.name}
              delay={i * 70}
              className="bg-[#0C1018] p-8 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors duration-200"
            >
              <span
                aria-hidden="true"
                className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center flex-shrink-0"
              >
                <span className="font-mono text-[11px] text-[#5A9488]">0{i + 1}</span>
              </span>
              <div>
                <h3 className="font-display font-[600] text-[#EDE8DF] text-[18px] leading-[1.3] tracking-[-0.01em] mb-1.5">
                  {p.name}
                </h3>
                <p className="font-sans text-[13px] text-[#7B8EC4] mb-1">{p.role}</p>
                <p className="font-sans text-[12px] text-[#3D5260]">{p.institution}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <p className="mt-px border border-white/[0.05] border-t-0 px-8 py-5 bg-white/[0.01] font-mono text-[10px] tracking-[0.14em] text-[#2A3A46]">
          {panel.disclaimer}
        </p>
      </div>
    </section>
  );
}
