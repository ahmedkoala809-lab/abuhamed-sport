import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { ALL_ARTICLES, CATEGORIES, MATCHES, TRANSFERS } from "@/lib/content";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const term = q.trim();
  const results = useMemo(() => {
    if (!term) return { articles: [], others: [] as string[] };
    const t = term.toLowerCase();
    return {
      articles: ALL_ARTICLES.filter((a) =>
        [a.title, a.excerpt, a.category, a.author].join(" ").toLowerCase().includes(t),
      ),
      others: [
        ...CATEGORIES.filter((c) => c.includes(term)).map((c) => `تصنيف · ${c}`),
        ...MATCHES.filter((m) => (m.home + m.away + m.competition).includes(term)).map(
          (m) => `مباراة · ${m.home} × ${m.away}`,
        ),
        ...TRANSFERS.filter((tr) => (tr.player + tr.from + tr.to).includes(term)).map(
          (tr) => `انتقال · ${tr.player}`,
        ),
      ],
    };
  }, [term]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-background/97 backdrop-blur-lg rise">
      <div className="edge flex items-center justify-between py-6">
        <span className="eyebrow text-muted-foreground">بحث في أبو حمد</span>
        <button
          onClick={onClose}
          aria-label="إغلاق البحث"
          className="grid h-10 w-10 place-items-center border border-border"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="edge mx-auto max-w-4xl">
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث عن مقال، لاعب، فريق، أو بطولة…"
          aria-label="حقل البحث"
          className="display w-full border-b border-border bg-transparent pb-6 text-3xl outline-none placeholder:text-muted-foreground/60 focus:border-signal md:text-5xl"
        />

        <div className="mt-10 max-h-[55vh] overflow-y-auto">
          {!term && (
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setQ(c)}
                  className="border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-signal hover:text-foreground"
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {term && results.articles.length === 0 && results.others.length === 0 && (
            <p className="text-muted-foreground">لا توجد نتائج مطابقة لـ «{term}».</p>
          )}

          <ul className="divide-y divide-border">
            {results.articles.map((a) => (
              <li key={a.slug}>
                <Link
                  to="/article/$slug"
                  params={{ slug: a.slug }}
                  onClick={onClose}
                  className="group flex items-baseline justify-between gap-6 py-5"
                >
                  <span className="display text-xl transition-colors group-hover:text-signal md:text-2xl">
                    {a.title}
                  </span>
                  <span className="eyebrow shrink-0 text-muted-foreground">{a.category}</span>
                </Link>
              </li>
            ))}
            {results.others.map((o) => (
              <li key={o} className="py-4 text-muted-foreground">
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
