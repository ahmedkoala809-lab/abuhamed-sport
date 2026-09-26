import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { ALL_ARTICLES } from "@/lib/content";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "قصص | أبو حمد" },
      {
        name: "description",
        content: "قصص كرة القدم: تحقيقات، مقابلات، تاريخ اللعبة وثقافة المدرجات.",
      },
      { property: "og:title", content: "قصص | أبو حمد" },
      { property: "og:description", content: "الجانب الإنساني من كرة القدم." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Stories,
});

function Stories() {
  const stories = ALL_ARTICLES.filter((a) => a.kind === "story" || a.kind === "interview");

  return (
    <Layout>
      <PageHeader
        eyebrow="القسم ٠٤"
        title="قصص"
        lead="ما وراء النتيجة: الناس، المدن، والذاكرة التي تصنع اللعبة."
      />
      <div className="edge py-14">
        {stories.map((s, i) => (
          <Reveal key={s.slug} delay={i * 70}>
            <Link
              to="/article/$slug"
              params={{ slug: s.slug }}
              className="group grid gap-6 border-b border-border py-12 lg:grid-cols-12 lg:items-center"
            >
              <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale-[30%] transition-[transform,filter] duration-[1200ms] group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
              </div>
              <div className="lg:col-span-5">
                <span className="eyebrow text-signal">{s.category}</span>
                <h2 className="display mt-4 text-3xl transition-colors group-hover:text-signal md:text-5xl">
                  {s.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{s.excerpt}</p>
                <span className="mt-5 block text-xs text-muted-foreground">
                  {s.author} · {s.readingTime} دقائق
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Layout>
  );
}
