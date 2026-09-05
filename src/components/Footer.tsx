import logo from "@/imports/image.png";
import { footer, links, navLinks } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-[#080C13] border-t border-white/[0.05]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover opacity-90"
              />
              <div>
                <div className="font-display text-[22px] font-[700] tracking-[-0.025em] text-[#EDE8DF]">
                  MEDCON
                </div>
                <div className="font-mono text-[10px] text-[#5A9488] tracking-[0.2em]">2026</div>
              </div>
            </div>
            <p className="font-sans text-[14px] text-[#3D5260] leading-[1.75] max-w-[280px] mb-6">
              {footer.blurb}
            </p>
            {links.instagramUrl && (
              <a
                href={links.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.15em] text-[#5A9488] hover:text-[#6EAAA0] transition-colors"
              >
                {links.instagramHandle} ↗
              </a>
            )}
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2A3A46] mb-5">
              {footer.navHeading}
            </h2>
            <div className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="font-sans text-[14px] text-[#3D5260] hover:text-[#EDE8DF] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2A3A46] mb-5">
              {footer.contactHeading}
            </h2>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${links.contactEmail}`}
                className="font-sans text-[14px] text-[#3D5260] hover:text-[#EDE8DF] transition-colors break-words"
              >
                {links.contactEmail}
              </a>
              {links.hostWebsiteUrl && (
                <a
                  href={links.hostWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[14px] text-[#3D5260] hover:text-[#EDE8DF] transition-colors"
                >
                  {links.hostWebsiteLabel} ↗
                </a>
              )}
              {links.youtubeUrl && (
                <a
                  href={links.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[14px] text-[#3D5260] hover:text-[#EDE8DF] transition-colors"
                >
                  {links.youtubeLabel} ↗
                </a>
              )}
            </div>
          </div>

          {/* Venue */}
          <div>
            <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2A3A46] mb-5">
              {footer.venueHeading}
            </h2>
            <address className="font-sans text-[14px] text-[#3D5260] leading-[1.75] not-italic">
              {footer.venue.name}
              <br />
              <span className="text-[#253442]">
                {footer.venue.lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < footer.venue.lines.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-[#1E2E3A] tracking-[0.1em]">{footer.copyright}</p>
          <div className="flex gap-6">
            {footer.legalLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-mono text-[10px] text-[#1E2E3A] hover:text-[#3D5260] tracking-[0.1em] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
