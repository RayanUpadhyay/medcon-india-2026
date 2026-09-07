import { useEffect, useRef, useState } from "react";
import logo from "@/imports/image.png";
import { links, navLinks } from "@/content/site";
import { useActiveSection, useScrolled, useTheme } from "@/lib/hooks";
import ThemeToggle from "@/components/ThemeToggle";

const SECTION_IDS = navLinks.map((l) => l.id);

export default function Nav() {
  const scrolled = useScrolled(48);
  const active = useActiveSection(SECTION_IDS);
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on Escape, and lock body scroll while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  // Collapse the mobile drawer once the layout reaches the desktop breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled || menuOpen
          ? "bg-bg/95 backdrop-blur-sm border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 flex-shrink-0" aria-label="MEDCON 2026 — home">
          <img src={logo} alt="" className="w-9 h-9 rounded-full object-cover" width={36} height={36} />
          <span className="flex items-baseline gap-2">
            <span className="font-display text-[20px] font-[700] tracking-[-0.025em] text-fg">
              MEDCON
            </span>
            <span className="font-mono text-[10px] text-sage tracking-[0.2em]">2026</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-8">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
              className={`font-sans text-[12px] tracking-[0.14em] uppercase transition-colors duration-200 ${
                active === l.id ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle
            theme={theme}
            onToggle={toggle}
            className="inline-flex items-center justify-center w-8 h-8 text-muted hover:text-fg transition-colors duration-200"
          />
          <a
            href={links.register}
            className="font-sans text-[12px] tracking-[0.14em] uppercase px-5 py-2.5 border border-sage text-sage hover:bg-sage hover:text-on-accent transition-colors duration-200 font-[600]"
          >
            Register
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 -mr-2"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className={`block w-6 h-px bg-fg transition-transform duration-200 origin-center ${
              menuOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-fg transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-fg transition-transform duration-200 origin-center ${
              menuOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`md:hidden overflow-hidden transition-all duration-300 bg-bg-drawer ${
          menuOpen ? "max-h-[70vh] border-b border-line" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-1">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setMenuOpen(false)}
              aria-current={active === l.id ? "true" : undefined}
              className="font-sans text-[13px] tracking-[0.12em] uppercase text-muted hover:text-fg aria-current:text-fg py-3 border-b border-line transition-colors"
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle
            theme={theme}
            onToggle={toggle}
            withLabel
            className="flex items-center justify-between py-3 border-b border-line font-sans text-[13px] tracking-[0.12em] uppercase text-muted hover:text-fg transition-colors"
          />
          <a
            href={links.register}
            onClick={() => setMenuOpen(false)}
            className="mt-4 font-sans text-[13px] tracking-[0.12em] uppercase py-3.5 border border-sage text-sage text-center font-[600]"
          >
            Register
          </a>
        </div>
      </div>
    </nav>
  );
}
