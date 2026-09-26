import { Link } from "@tanstack/react-router";
import { CATEGORIES, NAV, SOCIAL } from "@/lib/content";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="edge py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark className="h-8" />
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted-foreground">
              لا نكتفي بنقل المباراة. نحن نعيش تفاصيلها.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex max-w-sm items-center border-b border-border focus-within:border-signal"
            >
              <label htmlFor="nl" className="sr-only">
                البريد الإلكتروني
              </label>
              <input
                id="nl"
                type="email"
                required
                placeholder="بريدك الإلكتروني"
                className="w-full bg-transparent py-3 outline-none placeholder:text-muted-foreground/70"
              />
              <button type="submit" className="eyebrow shrink-0 px-2 text-signal">
                اشترك
              </button>
            </form>
          </div>

          <nav className="lg:col-span-2" aria-label="روابط الموقع">
            <h3 className="eyebrow text-muted-foreground">الموقع</h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-sm transition-colors hover:text-signal">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h3 className="eyebrow text-muted-foreground">التصنيفات</h3>
            <ul className="mt-5 space-y-3">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c} className="text-sm text-foreground/80">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="eyebrow text-muted-foreground">تابعنا</h3>
            <ul className="mt-5 grid grid-cols-2 gap-3">
              {SOCIAL.map((s) => (
                <li key={s.handle}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm transition-colors hover:text-signal"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="mailto:hello@abuhamad.media"
              className="mt-6 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              hello@abuhamad.media
            </a>
          </div>
        </div>
      </div>

      <div className="edge flex flex-col gap-3 border-t border-border py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <span>© ٢٠٢٦ أبو حمد. جميع الحقوق محفوظة.</span>
        <div className="flex gap-6">
          <span>سياسة الخصوصية</span>
          <span>شروط الاستخدام</span>
        </div>
      </div>
    </footer>
  );
}
