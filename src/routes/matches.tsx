import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageHeader } from "@/components/site/Layout";
import { MatchCard } from "@/components/site/MatchCard";
import { MATCHES, type Match } from "@/lib/content";

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "مركز المباريات | أبو حمد" },
      {
        name: "description",
        content: "نتائج مباشرة، مواعيد المباريات القادمة، والملاعب في دوريات كرة القدم الكبرى.",
      },
      { property: "og:title", content: "مركز المباريات | أبو حمد" },
      { property: "og:description", content: "نتائج ومواعيد مباريات كرة القدم." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Matches,
});

const TABS: { key: Match["status"] | "all"; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "live", label: "مباشر" },
  { key: "upcoming", label: "قادمة" },
  { key: "finished", label: "انتهت" },
];

function Matches() {
  const [tab, setTab] = useState<Match["status"] | "all">("all");
  const list = tab === "all" ? MATCHES : MATCHES.filter((m) => m.status === tab);

  return (
    <Layout>
      <PageHeader
        eyebrow="القسم ٠٢"
        title="مركز المباريات"
        lead="من صافرة البداية حتى الوقت بدل الضائع."
      />
      <div className="paper">
        <div className="edge py-12">
          <div className="flex gap-2 border-b border-border pb-6">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`eyebrow px-3 py-2 transition-colors ${tab === t.key ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {list.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">لا توجد مباريات في هذه الحالة.</p>
          ) : (
            list.map((m) => <MatchCard key={`${m.home}-${m.away}`} match={m} />)
          )}
        </div>
      </div>
    </Layout>
  );
}
