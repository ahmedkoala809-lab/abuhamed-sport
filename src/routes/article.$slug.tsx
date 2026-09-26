import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ALL_ARTICLES } from "@/lib/content";

export const Route = createFileRoute("/article/$slug")({
  loader: ({ params }) => {
    const article = ALL_ARTICLES.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => {
    const a = loaderData;
    if (!a) return {};
    return {
      meta: [
        { title: `${a.title} | أبو حمد` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:image", content: a.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: a.image },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const a = Route.useLoaderData();
  const related = ALL_ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  const index = ALL_ARTICLES.findIndex((x) => x.slug === a.slug);
  const prev = ALL_ARTICLES[index - 1];
  const next = ALL_ARTICLES[index + 1];

  return (
    <Layout>
      <article>
        <header className="edge pb-10 pt-36 md:pt-44">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="مسار">
            <Link to="/" className="hover:text-foreground">
              الرئيسية
            </Link>
            <span aria-hidden>/</span>
            <span className="text-signal">{a.category}</span>
          </nav>
          <h1 className="display mt-6 max-w-5xl text-4xl leading-[1.05] md:text-7xl">{a.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            {a.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-6 border-t border-border pt-5 text-xs text-muted-foreground">
            <span>بقلم {a.author}</span>
            <span>{a.date}</span>
            <span>{a.readingTime} دقائق قراءة</span>
          </div>
        </header>

        <div className="h-[50vh] w-full overflow-hidden md:h-[80vh]">
          <img src={a.image} alt={a.title} className="h-full w-full object-cover" />
        </div>

        <div className="edge py-16">
          <div className="mx-auto max-w-3xl space-y-7 text-lg leading-[2] md:text-xl">
            {a.body.map((p, i) => (
              <p key={i} className={i === 0 ? "text-2xl leading-[1.8] md:text-3xl" : undefined}>
                {p}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center gap-4 border-y border-border py-5">
            <span className="eyebrow text-muted-foreground">شارك المقال</span>
            {["X", "Facebook", "WhatsApp", "Telegram"].map((s) => (
              <span key={s} className="latin text-sm text-muted-foreground hover:text-signal">
                {s}
              </span>
            ))}
          </div>

          <nav className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2" aria-label="تنقل">
            {prev && (
              <Link
                to="/article/$slug"
                params={{ slug: prev.slug }}
                className="group border border-border p-5 transition-colors hover:border-signal"
              >
                <span className="eyebrow text-muted-foreground">السابق</span>
                <span className="display mt-2 block text-lg group-hover:text-signal">
                  {prev.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                to="/article/$slug"
                params={{ slug: next.slug }}
                className="group border border-border p-5 text-end transition-colors hover:border-signal"
              >
                <span className="eyebrow text-muted-foreground">التالي</span>
                <span className="display mt-2 block text-lg group-hover:text-signal">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        </div>

        <section className="edge border-t border-border py-16">
          <h2 className="display text-3xl md:text-4xl">اقرأ أيضاً</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/article/$slug"
                params={{ slug: r.slug }}
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="eyebrow mt-4 block text-signal">{r.category}</span>
                <h3 className="display mt-2 text-xl group-hover:text-signal">{r.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </Layout>
  );
}
