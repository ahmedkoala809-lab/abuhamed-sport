import { TICKER } from "@/lib/content";

export function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative flex items-stretch border-y border-border bg-background">
      <div className="flex shrink-0 items-center gap-2 bg-signal px-4 py-3 text-signal-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-signal-foreground live-dot" aria-hidden />
        <span className="eyebrow">عاجل</span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-10 py-3 ps-10">
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap text-sm">
              <span className="text-foreground/80">{t}</span>
              <span className="h-1 w-1 rounded-full bg-signal" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
