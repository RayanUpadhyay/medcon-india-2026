/** Maps an accent name from the content module to its hex value.
 *  Used with inline `style` instead of dynamic Tailwind classes, which
 *  cannot be generated at runtime. */
export const ACCENT_HEX = {
  sage: "#5A9488",
  periwinkle: "#7B8EC4",
  cream: "#EDE8DF",
} as const;

export type AccentName = keyof typeof ACCENT_HEX;
