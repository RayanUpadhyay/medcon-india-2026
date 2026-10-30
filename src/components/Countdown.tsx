import { useEffect, useState } from "react";
import { eventTimes } from "@/content/site";

const START = Date.parse(eventTimes.start);
const END = Date.parse(eventTimes.end);
const pad = (n: number) => String(n).padStart(2, "0");

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

/** Counts down to the opening of MEDCON, says so while it's on, and disappears once it's over. */
export default function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now >= END) return null;

  const card = "border border-line bg-surface backdrop-blur-sm px-6 py-5";

  if (now >= START) {
    return (
      <div className={card}>
        <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-sage mb-3">
          <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-sage motion-safe:animate-pulse" />
          Happening now
        </p>
        <p className="font-sans text-[15px] text-fg leading-snug mb-3">MEDCON 2026 is on today at TISB, until 3:00 PM.</p>
        <a
          href="#events"
          className="font-mono text-[11px] tracking-[0.16em] uppercase text-sage hover:text-sage-bright transition-colors"
        >
          See the itinerary →
        </a>
      </div>
    );
  }

  const { d, h, m, s } = split(START - now);
  const units = [
    ...(d > 0 ? [{ label: "Days", value: d }] : []),
    { label: "Hours", value: h },
    { label: "Mins", value: m },
    { label: "Secs", value: s },
  ];

  return (
    <div className={card}>
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-sage mb-4">Starts in</p>
      <div role="timer" aria-live="off" className="flex items-start gap-3">
        <span className="sr-only">
          {d > 0 ? `${d} ${d === 1 ? "day" : "days"}, ` : ""}
          {h} hours and {m} minutes until MEDCON 2026 starts
        </span>
        {units.map((u, i) => (
          <div key={u.label} className="flex items-start gap-3" aria-hidden="true">
            {i > 0 && (
              <span className="font-display text-faint leading-none pt-[3px]" style={{ fontSize: "clamp(26px, 3vw, 34px)" }}>
                :
              </span>
            )}
            <div className="flex flex-col">
              <span
                className="font-display font-[600] text-fg leading-none tabular-nums"
                style={{ fontSize: "clamp(34px, 4vw, 46px)" }}
              >
                {pad(u.value)}
              </span>
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-faint mt-2">{u.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
