import type { Theme } from "@/lib/hooks";

/**
 * Presentational light/dark switch. State lives in `useTheme` (mounted once in
 * Nav); this just renders the control. `withLabel` gives the mobile-drawer row
 * a text label, otherwise it is an icon-only button for the desktop nav.
 */
export default function ThemeToggle({
  theme,
  onToggle,
  withLabel = false,
  className = "",
}: {
  theme: Theme;
  onToggle: () => void;
  withLabel?: boolean;
  className?: string;
}) {
  const isLight = theme === "light";
  const next = isLight ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={className}
    >
      {withLabel && <span>{isLight ? "Dark mode" : "Light mode"}</span>}
      {isLight ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.5 13.2A8 8 0 1 1 10.8 3.5a6.2 6.2 0 0 0 9.7 9.7z" />
    </svg>
  );
}
