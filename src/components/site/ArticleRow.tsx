import { Link } from "@tanstack/react-router";
import type { Article } from "@/lib/content";

export function ArticleRow({ article, index }: { article: Article; index: number }) {
  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="group grid items-start gap-5 border-b border-border py-7 md:grid-cols-[auto_1fr_260px] md:gap-8"
    >
      <span className="latin hidden text-xs text-muted-foreground md:block">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="eyebrow text-signal">{article.category}</span>
          <span>{article.date}</span>
          <span>{article.readingTime} دقائق قراءة</span>
        </div>
        <h3 className="display mt-3 text-2xl transition-colors group-hover:text-signal md:text-3xl">
          {article.title}
        </h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{article.excerpt}</p>
        <span className="mt-4 block text-xs text-muted-foreground">بقلم {article.author}</span>
      </div>

      <div className="aspect-[16/10] overflow-hidden md:aspect-[4/3]">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[35%] transition-[transform,filter] duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>
    </Link>
  );
}
