import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { Ticker } from "@/components/site/Ticker";
import { SectionHead } from "@/components/site/SectionHead";
import { ArticleRow } from "@/components/site/ArticleRow";
import { MatchCard } from "@/components/site/MatchCard";
import { Reveal } from "@/components/site/Reveal";
import { ALL_ARTICLES, ARTICLES, HERO, IMAGES, MATCHES, SOCIAL, TRANSFERS } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "أبو حمد | كرة القدم كما تُروى" },
      {
        name: "description",
        content:
          "منصة أبو حمد: قصة الغلاف، آخر الأخبار، مركز المباريات، الانتقالات والتحليلات التكتيكية بالعربية.",
      },
      { property: "og:title", content: "أبو حمد | كرة القدم كما تُروى" },
      {
        property: "og:description",
        content: "قصص وتحليلات وأخبار كرة القدم بعين تحريرية عربية.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: IMAGES.hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: IMAGES.hero },
    ],
  }),
  component: Home,
});

function Hero() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
      <img
        src={IMAGES.hero}
        alt="مدرجات ملعب ليلاً قبل انطلاق المباراة"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: `scale(1.08) translateY(${y * 0.15}px)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/25" />

      <div className="edge absolute inset-x-0 bottom-0 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <div className="rise flex items-center gap-4">
            <span className="eyebrow bg-signal px-2.5 py-1 text-signal-foreground">
              {HERO.category}
            </span>
            <span className="text-xs text-muted-foreground">{HERO.date}</span>
          </div>

          <h1
            className="display rise mt-6 text-[3.25rem] leading-[0.92] sm:text-7xl lg:text-[7.5rem]"
            style={{ animationDelay: "120ms" }}
          >
            {HERO.title}
          </h1>

          <p
            className="rise mt-7 max-w-xl text-lg leading-relaxed text-foreground/80"
            style={{ animationDelay: "240ms" }}
          >
            {HERO.excerpt}
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-6"
            style={{ animationDelay: "340ms" }}
          >
            <Link
              to="/article/$slug"
              params={{ slug: HERO.slug }}
              className="eyebrow group flex items-center gap-3 border-b-2 border-signal pb-2 transition-colors hover:text-signal"
            >
              اقرأ القصة كاملة
              <span className="transition-transform group-hover:-translate-x-1.5" aria-hidden>
                ←
              </span>
            </Link>
            <span className="text-xs text-muted-foreground">
              {HERO.author} · {HERO.readingTime} دقائق
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 hidden flex-col items-center gap-3 md:flex">
        <span className="eyebrow [writing-mode:vertical-rl] text-muted-foreground">SCROLL</span>
        <span className="h-16 w-px bg-gradient-to-b from-signal to-transparent" aria-hidden />
      </div>
    </section>
  );
}

function Feature() {
  const a = ARTICLES[2];
  return (
    <section className="edge py-20 md:py-28">
      <Reveal>
        <Link
          to="/article/$slug"
          params={{ slug: a.slug }}
          className="group grid gap-8 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <div className="aspect-[4/3] overflow-hidden md:aspect-[16/10]">
              <img
                src={a.image}
                alt={a.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
            </div>
          </div>
          <div className="lg:col-span-5 lg:pb-6">
            <span className="eyebrow text-signal">{a.category}</span>
            <h2 className="display mt-4 text-4xl transition-transform duration-500 group-hover:-translate-x-2 md:text-6xl">
              {a.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{a.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-6 border-t border-border pt-5 text-xs text-muted-foreground">
              <span>{a.author}</span>
              <span>{a.date}</span>
              <span>{a.readingTime} دقائق قراءة</span>
            </div>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}

function Home() {
  const latest = ARTICLES.filter((a) => a.kind === "news" || a.kind === "analysis");
  const stories = ALL_ARTICLES.filter((a) => a.kind === "story" || a.kind === "interview");

  return (
    <Layout>
      <Hero />
      <Ticker />
      <Feature />

      <section className="edge py-16 md:py-24">
        <SectionHead
          index="01"
          title="آخر الأخبار"
          note="تغطية متواصلة من الملاعب وغرف الأخبار"
          to="/news"
          cta="كل الأخبار"
        />
        <div>
          {latest.map((a, i) => (
            <Reveal key={a.slug} delay={i * 60}>
              <ArticleRow article={a} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="paper py-16 md:py-24">
        <div className="edge">
          <SectionHead
            index="02"
            title="مركز المباريات"
            note="نتائج مباشرة، مواعيد، وملاعب"
            to="/matches"
            cta="كل المباريات"
          />
          <div className="mt-4">
            {MATCHES.map((m, i) => (
              <Reveal key={`${m.home}-${m.away}`} delay={i * 60}>
                <MatchCard match={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="edge py-16 md:py-24">
        <SectionHead
          index="03"
          title="قصص كرة القدم"
          note="تحقيقات، مقابلات، وثقافة اللعبة"
          to="/stories"
          cta="كل القصص"
        />
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {stories.slice(0, 2).map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <Link
                to="/article/$slug"
                params={{ slug: s.slug }}
                className={`group block ${i === 1 ? "md:mt-20" : ""}`}
              >
                <div className="aspect-[3/4] overflow-hidden md:aspect-[4/5]">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <span className="eyebrow mt-6 block text-signal">{s.category}</span>
                <h3 className="display mt-3 text-3xl transition-colors group-hover:text-signal md:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{s.subtitle}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="edge py-16 md:py-24">
        <SectionHead
          index="04"
          title="سوق الانتقالات"
          note="حركة اللاعبين لحظة بلحظة"
          to="/transfers"
          cta="كل الانتقالات"
        />
        <ul className="mt-2">
          {TRANSFERS.slice(0, 4).map((t, i) => (
            <Reveal key={t.player} delay={i * 50}>
              <li className="grid grid-cols-2 items-center gap-4 border-b border-border py-6 md:grid-cols-[1fr_auto_1fr_auto]">
                <span className="display text-xl md:text-2xl">{t.player}</span>
                <span className="text-sm text-muted-foreground">
                  {t.from} <span className="mx-2 text-signal">←</span> {t.to}
                </span>
                <span className="latin text-sm text-muted-foreground">{t.fee}</span>
                <span className="eyebrow justify-self-end text-signal">{t.status}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="edge py-20 md:py-28">
        <Reveal>
          <div className="grid gap-10 border-y border-border py-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="eyebrow text-signal">تابع أبو حمد</span>
              <h2 className="display mt-4 text-4xl md:text-6xl">
                الكرة لا تتوقف.
                <br />
                ولا نحن.
              </h2>
            </div>
            <ul className="flex flex-wrap gap-x-8 gap-y-4 lg:col-span-6 lg:justify-end">
              {SOCIAL.map((s) => (
                <li key={s.handle}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="latin text-lg text-muted-foreground transition-colors hover:text-signal md:text-2xl"
                  >
                    {s.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
