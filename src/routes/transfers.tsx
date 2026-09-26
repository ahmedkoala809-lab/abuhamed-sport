import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { TRANSFERS } from "@/lib/content";

export const Route = createFileRoute("/transfers")({
  head: () => ({
    meta: [
      { title: "الانتقالات | أبو حمد" },
      {
        name: "description",
        content: "خط زمني لأخبار انتقالات كرة القدم: الصفقات المؤكدة، المفاوضات المتقدمة والشائعات.",
      },
      { property: "og:title", content: "الانتقالات | أبو حمد" },
      { property: "og:description", content: "متابعة سوق انتقالات كرة القدم أولاً بأول." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Transfers,
});

function Transfers() {
  return (
    <Layout>
      <PageHeader
        eyebrow="القسم ٠٣"
        title="الانتقالات"
        lead="خط زمني واحد يجمع الصفقات المؤكدة والمفاوضات والشائعات، بمصادرها."
      />
      <div className="edge py-14">
        <ol className="relative border-e border-border pe-6 md:pe-10">
          {TRANSFERS.map((t, i) => (
            <Reveal key={t.player} delay={i * 70}>
              <li className="relative pb-12">
                <span
                  className="absolute -end-[calc(0.375rem+1px)] top-2 h-3 w-3 rounded-full bg-signal"
                  aria-hidden
                />
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="eyebrow text-signal">{t.status}</span>
                  <span>{t.date}</span>
                  <span>المصدر: {t.source}</span>
                </div>
                <h2 className="display mt-3 text-3xl md:text-5xl">{t.player}</h2>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-lg">
                  <span className="text-muted-foreground">{t.from}</span>
                  <span className="text-signal" aria-hidden>
                    ←
                  </span>
                  <span>{t.to}</span>
                  <span className="latin ms-auto text-sm text-muted-foreground">{t.fee}</span>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Layout>
  );
}
