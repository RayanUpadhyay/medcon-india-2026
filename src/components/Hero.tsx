import logo from "@/imports/image.png";
import { hero, images, links } from "@/content/site";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col bg-[#0C1018] overflow-hidden">
      {/* Background wash (decorative) */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={images.hero.src}
          alt=""
          className="w-full h-full object-cover object-center opacity-[0.14]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C1018]/80 via-[#0C1018]/40 to-[#0C1018]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1018]/80 via-transparent to-[#0C1018]/50" />
      </div>

      {/* Ambient glows (decorative) */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] max-w-full h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(90,148,136,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] max-w-full h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(123,142,196,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-12 pt-36 pb-16 flex flex-col justify-end">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16 items-end">
          <div>
            {/* Emblem + eyebrow */}
            <div className="flex items-center gap-5 mb-10">
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover flex-shrink-0"
                style={{ filter: "brightness(0.95) contrast(1.05)" }}
              />
              <div>
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#5A9488] mb-1">
                  {hero.eyebrow}
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-10 h-px bg-[#5A9488]/50" aria-hidden="true" />
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#3D5260]">
                    {hero.location}
                  </span>
                </p>
              </div>
            </div>

            {/* Headline */}
            <h1 className="mb-8">
              <span className="sr-only">
                {hero.headlineLead}
                {hero.headlineTail} {hero.year}
              </span>
              <span aria-hidden="true" className="block">
                <span
                  className="font-display font-[700] leading-[0.88] tracking-[-0.03em] text-[#EDE8DF] block"
                  style={{ fontSize: "clamp(76px, 15vw, 220px)" }}
                >
                  {hero.headlineLead}
                </span>
                <span className="flex items-end gap-5 md:gap-8">
                  <span
                    className="font-display font-[700] leading-[0.88] tracking-[-0.03em] text-[#EDE8DF]"
                    style={{ fontSize: "clamp(76px, 15vw, 220px)" }}
                  >
                    {hero.headlineTail}
                  </span>
                  <span className="pb-3 md:pb-5 flex flex-col">
                    <span
                      className="font-display font-[300] italic text-[#5A9488] leading-none"
                      style={{ fontSize: "clamp(30px, 5.5vw, 80px)" }}
                    >
                      {hero.year}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#3D5260] mt-1">
                      {hero.yearPlace}
                    </span>
                  </span>
                </span>
              </span>
            </h1>

            <p className="font-sans text-[16px] md:text-[18px] text-[#6A7882] leading-[1.65] max-w-[520px] mb-12">
              {hero.subtitle}
            </p>

            {/* CTAs */}
            <div id="register" className="flex flex-wrap items-center gap-4 scroll-mt-24">
              <a
                href={links.register}
                className="font-sans text-[12px] tracking-[0.14em] uppercase px-8 py-4 bg-[#5A9488] text-[#0C1018] font-[700] hover:bg-[#6EAAA0] transition-colors duration-200"
              >
                {hero.ctaPrimary}
              </a>
              <a
                href="#events"
                className="font-sans text-[12px] tracking-[0.14em] uppercase px-8 py-4 border border-white/20 text-[#EDE8DF] hover:border-white/50 transition-colors duration-200"
              >
                {hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Event details */}
          <dl className="border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm divide-y divide-white/[0.05]">
            {hero.details.map((row) => (
              <div key={row.label} className="px-6 py-4">
                <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#3D5260] mb-1">
                  {row.label}
                </dt>
                <dd className="font-sans text-[15px] text-[#EDE8DF]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Bottom credits strip */}
      <div className="relative z-10 border-t border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex flex-wrap gap-x-8 gap-y-2 items-center">
          {hero.credits.map((item, i) => (
            <span
              key={item}
              className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#3D5260] flex items-center"
            >
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden md:inline-block w-px h-3 bg-white/10 mr-8"
                />
              )}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
