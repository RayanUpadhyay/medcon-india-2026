import { useEffect, useLayoutEffect, useState } from "react";

/** True when the user has asked the OS to minimise non-essential motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type Theme = "light" | "dark";

const THEME_KEY = "medcon-theme";

/** Reads the theme the pre-paint script in index.html already committed to
 *  <html>, so React's first render matches the painted DOM (no flash/shift). */
function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

/**
 * Light/dark theme state. Dark is the default; the choice is mirrored to
 * <html data-theme>, `color-scheme`, the theme-color meta, and localStorage so
 * it survives reloads and is picked up by the pre-paint script next visit.
 * Mount this once (in Nav) and pass `theme` / `toggle` down.
 */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#F4F1EA" : "#0C1018");

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage blocked — in-memory state still drives this session */
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return { theme, toggle };
}

/** Tracks whether the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 48): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Returns the id of the section currently dominating the viewport, so the
 * nav can highlight the matching link. Falls back to "" before any section
 * intersects.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/**
 * Enables the CSS scroll-reveal transitions by adding a class to <body>,
 * but only when motion is allowed. Without this class every `[data-reveal]`
 * element renders in its final state, so the site degrades safely when JS
 * is disabled or motion is reduced.
 */
export function useRevealEnabled(): void {
  // useLayoutEffect so the class lands before the first paint, avoiding a
  // flash of fully-revealed content on load.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    document.body.classList.add("js-reveal");
    return () => document.body.classList.remove("js-reveal");
  }, []);
}
