import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { IMAGES, SOCIAL } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن أبو حمد" },
      {
        name: "description",
        content: "أبو حمد منصة عربية لصحافة كرة القدم: فلسفتنا التحريرية، رسالتنا، وطرق التواصل.",
      },
      { property: "og:title", content: "عن أبو حمد" },
      { property: "og:description", content: "لا نكتفي بنقل المباراة. نحن نعيش تفاصيلها." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: IMAGES.stadium },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: IMAGES.stadium },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="edge pb-16 pt-36 md:pt-48">
        <h1 className="display max-w-5xl text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-8xl">
          لا نكتفي بنقل المباراة.
          <br />
          <span className="text-signal">نحن نعيش تفاصيلها.</span>
        </h1>
      </section>

      <div className="h-[55vh] w-full overflow-hidden md:h-[75vh]">
        <img
          src={IMAGES.stadium}
          alt="ملعب كرة قدم قبل المباراة"
          className="h-full w-full object-cover"
        />
      </div>

      <section className="edge grid gap-12 py-20 lg:grid-cols-12 md:py-28">
        <div className="lg:col-span-4">
          <span className="eyebrow text-signal">الحكاية</span>
        </div>
        <div className="space-y-6 text-lg leading-relaxed lg:col-span-8">
          <p>
            بدأ «أبو حمد» من فكرة بسيطة: أن الجمهور العربي يستحق صحافة كرة قدم تُكتب بعناية، لا
            عناوين تُنسخ في دقيقة. نحن نغطي المباراة، ثم نبقى بعدها لنفهم ما الذي تغيّر.
          </p>
          <p className="text-muted-foreground">
            نكتب عن التكتيك كما نكتب عن المدرجات، وعن الأرقام كما نكتب عن الناس. لكل قصة سبب لوجودها،
            ولكل صورة مكان مقصود.
          </p>
        </div>
      </section>

      <section className="paper py-20 md:py-28">
        <div className="edge grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">فلسفتنا التحريرية</span>
          </div>
          <ol className="lg:col-span-8">
            {[
              ["الدقة قبل السرعة", "لا ننشر خبراً دون مصدر يمكن الرجوع إليه."],
              ["السياق قبل الضجيج", "النتيجة رقم، أما المعنى فيحتاج قراءة."],
              ["الاحترام للقارئ", "لا عناوين مضللة، ولا صفحات مزدحمة بلا فائدة."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <li className="flex gap-6 border-b border-border py-8">
                  <span className="latin text-sm text-signal">{`0${i + 1}`}</span>
                  <div>
                    <h3 className="display text-2xl md:text-3xl">{t}</h3>
                    <p className="mt-2 text-muted-foreground">{d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="edge py-20 md:py-24">
        <div className="grid gap-8 border-y border-border py-14 lg:grid-cols-2">
          <div>
            <span className="eyebrow text-signal">تواصل معنا</span>
            <a
              href="mailto:hello@abuhamad.media"
              className="display mt-4 block text-3xl hover:text-signal md:text-5xl"
            >
              hello@abuhamad.media
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-4 lg:justify-end">
            {SOCIAL.map((s) => (
              <li key={s.handle}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="latin text-lg text-muted-foreground transition-colors hover:text-signal"
                >
                  {s.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
