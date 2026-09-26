import { Link } from "@tanstack/react-router";

export function SectionHead({
  index,
  title,
  note,
  to,
  cta,
}: {
  index: string;
  title: string;
  note?: string;
  to?: string;
  cta?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
      <div className="flex items-baseline gap-4">
        <span className="latin text-sm text-signal">{index}</span>
        <div>
          <h2 className="display text-3xl md:text-5xl">{title}</h2>
          {note && <p className="mt-2 text-sm text-muted-foreground">{note}</p>}
        </div>
      </div>
      {to && cta && (
        <Link
          to={to}
          className="eyebrow group flex items-center gap-2 text-muted-foreground transition-colors hover:text-signal"
        >
          {cta}
          <span className="transition-transform group-hover:-translate-x-1" aria-hidden>
            ←
          </span>
        </Link>
      )}
    </div>
  );
}
