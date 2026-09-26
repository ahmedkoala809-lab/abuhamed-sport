import type { Match } from "@/lib/content";

const STATUS: Record<Match["status"], string> = {
  upcoming: "قادمة",
  live: "مباشر",
  finished: "انتهت",
  postponed: "مؤجلة",
};

export function MatchCard({ match }: { match: Match }) {
  const live = match.status === "live";
  return (
    <article className="group relative border-b border-border py-8 transition-colors hover:bg-secondary/40">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4">
        <span className="eyebrow text-muted-foreground">{match.competition}</span>
        <span
          className={`eyebrow flex items-center gap-2 ${live ? "text-destructive" : "text-muted-foreground"}`}
        >
          {live && (
            <span className="h-1.5 w-1.5 rounded-full bg-destructive live-dot" aria-hidden />
          )}
          {live ? `${STATUS.live} ${match.minute ?? ""}` : STATUS[match.status]}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4">
        <div className="text-start">
          <span className="latin block text-xs text-muted-foreground">{match.homeShort}</span>
          <span className="display text-xl md:text-3xl">{match.home}</span>
        </div>

        <div className="latin min-w-[5.5rem] text-center text-3xl md:text-5xl">
          {match.homeScore === null ? (
            <span className="text-muted-foreground">{match.time}</span>
          ) : (
            <span>
              {match.homeScore}
              <span className="mx-2 text-signal">—</span>
              {match.awayScore}
            </span>
          )}
        </div>

        <div className="text-end">
          <span className="latin block text-xs text-muted-foreground">{match.awayShort}</span>
          <span className="display text-xl md:text-3xl">{match.away}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 px-4 text-xs text-muted-foreground">
        <span>{match.stadium}</span>
        <span>{match.date}</span>
      </div>
    </article>
  );
}
