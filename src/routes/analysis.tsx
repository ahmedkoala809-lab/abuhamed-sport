import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { ArticleRow } from "@/components/site/ArticleRow";
import { ALL_ARTICLES } from "@/lib/content";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "تحليلات | أبو حمد" },
      {
        name: "description",
        content: "تحليلات تكتيكية معمقة لمباريات ولاعبي كرة القدم، بالأرقام وبالعين المدربة.",
      },
      { property: "og:title", content: "تحليلات | أبو حمد" },
      { property: "og:description", content: "قراءة تكتيكية لما يحدث داخل الملعب." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Analysis,
});

function Analysis() {
  const list = ALL_ARTICLES.filter((a) => a.kind === "analysis");
  return (
    <Layout>
      <PageHeader
        eyebrow="القسم ٠٥"
        title="تحليلات"
        lead="لماذا حدث ما حدث؟ قراءة في البنية التكتيكية لا في النتيجة فقط."
      />
      <div className="edge py-14">
        {list.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">لا توجد تحليلات منشورة بعد.</p>
        ) : (
          list.map((a, i) => <ArticleRow key={a.slug} article={a} index={i} />)
        )}
      </div>
    </Layout>
  );
}
