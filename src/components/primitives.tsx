import { useEffect, useRef, useState, type ReactNode } from "react";

/* ── SectionLabel ─────────────────────────────────────────────────────────
 * The small "03 — Programme" editorial marker used above each section.
 */
export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[11px] tracking-[0.2em] text-[#5A9488]">{index}</span>
      <span className="w-10 h-px bg-white/10" aria-hidden="true" />
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#3D5260]">
        {label}
      </span>
    </div>
  );
}

/* ── Reveal ───────────────────────────────────────────────────────────────
 * Fades + lifts its children into view once, when scrolled near. The actual
 * transition lives in index.css and only engages when `body.js-reveal` is
 * set (see useRevealEnabled), so this is inert under reduced-motion / no-JS.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Stagger, in milliseconds. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      className={`${className ?? ""} ${visible ? "is-visible" : ""}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
