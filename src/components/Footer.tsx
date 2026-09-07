import logo from "@/imports/image.png";
import { footer, links, navLinks } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-bg-deep border-t border-line">
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
                <div className="font-display text-[22px] font-[700] tracking-[-0.025em] text-fg">
                  MEDCON
                </div>
                <div className="font-mono text-[10px] text-sage tracking-[0.2em]">2026</div>
              </div>
            </div>
            <p className="font-sans text-[14px] text-faint leading-[1.75] max-w-[280px] mb-6">
              {footer.blurb}
            </p>
            {links.instagramUrl && (
              <a
                href={links.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[0.15em] text-sage hover:text-sage-bright transition-colors"
              >
                {links.instagramHandle} ↗
              </a>
            )}
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-faint-2 mb-5">
              {footer.navHeading}
            </h2>
            <div className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="font-sans text-[14px] text-faint hover:text-fg transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-faint-2 mb-5">
              {footer.contactHeading}
            </h2>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${links.contactEmail}`}
                className="font-sans text-[14px] text-faint hover:text-fg transition-colors break-words"
              >
                {links.contactEmail}
              </a>
              {links.hostWebsiteUrl && (
                <a
                  href={links.hostWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[14px] text-faint hover:text-fg transition-colors"
                >
                  {links.hostWebsiteLabel} ↗
                </a>
              )}
            </div>
          </div>

          {/* Venue */}
          <div>
            <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-faint-2 mb-5">
              {footer.venueHeading}
            </h2>
            <address className="font-sans text-[14px] text-faint leading-[1.75] not-italic">
              {footer.venue.name}
              <br />
              <span className="text-faint-3">
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
        <div className="pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-faint-4 tracking-[0.1em]">{footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-6">
            {footer.legalLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-mono text-[10px] text-faint-4 hover:text-faint tracking-[0.1em] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`mailto:${footer.credit.email}`}
              className="font-mono text-[10px] text-faint-4 hover:text-faint tracking-[0.1em] transition-colors"
            >
              {footer.credit.label}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
