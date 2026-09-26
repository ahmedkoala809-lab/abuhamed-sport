import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { ArticleRow } from "@/components/site/ArticleRow";
import { Ticker } from "@/components/site/Ticker";
import { ARTICLES, CATEGORIES } from "@/lib/content";
import { useState } from "react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "الأخبار | أبو حمد" },
      {
        name: "description",
        content: "آخر أخبار كرة القدم العربية والعالمية: الدوريات الكبرى، الأبطال، والانتقالات.",
      },
      { property: "og:title", content: "الأخبار | أبو حمد" },
      { property: "og:description", content: "تغطية متواصلة لأخبار كرة القدم." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: News,
});

function News() {
  const [filter, setFilter] = useState<string | null>(null);
  const list = filter ? ARTICLES.filter((a) => a.category === filter) : ARTICLES;

  return (
    <Layout>
      <PageHeader
        eyebrow="القسم ٠١"
        title="الأخبار"
        lead="كل ما يحدث في الملاعب، مرتب حسب الأهمية لا حسب الضجيج."
      />
      <Ticker />
      <div className="edge py-12">
        <div className="flex flex-wrap gap-2 pb-8">
          <button
            onClick={() => setFilter(null)}
            className={`border px-3 py-1.5 text-sm transition-colors ${!filter ? "border-signal text-signal" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            الكل
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`border px-3 py-1.5 text-sm transition-colors ${filter === c ? "border-signal text-signal" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            لا توجد مقالات في هذا التصنيف بعد.
          </p>
        ) : (
          list.map((a, i) => <ArticleRow key={a.slug} article={a} index={i} />)
        )}
      </div>
    </Layout>
  );
}
