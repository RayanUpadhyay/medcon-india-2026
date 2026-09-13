/** Maps an accent name from the content module to a themeable CSS variable.
 *  Used with inline `style` instead of dynamic Tailwind classes, which cannot
 *  be generated at runtime. Values point at the raw theme tokens defined in
 *  src/index.css (`:root`), so accents adapt to the active light/dark theme;
 *  use `color-mix()` when an alpha variant is needed (see Events.tsx). */
export const ACCENT_HEX = {
  sage: "var(--sage)",
  periwinkle: "var(--periwinkle)",
  cream: "var(--fg)",
} as const;

export type AccentName = keyof typeof ACCENT_HEX;
