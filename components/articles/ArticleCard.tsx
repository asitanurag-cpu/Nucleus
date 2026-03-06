import Link from "next/link";
import { cn } from "@/lib/utils";
import { Article } from "@/lib/types";
import { SectorTag } from "@/components/shared/SectorTag";
import { formatDate } from "@/lib/utils";

export function ArticleCard({
  article,
  featured = false,
  className,
}: {
  article: Article;
  featured?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/analysis/${article.slug}`}
      className={cn(
        "group block rounded-card border border-nucleus-border bg-nucleus-surface transition-all hover:border-nucleus-accent/30 hover:shadow-glow",
        featured && "md:col-span-2 lg:col-span-3",
        className
      )}
    >
      {/* Cover image placeholder */}
      <div
        className={cn(
          "relative overflow-hidden rounded-t-card bg-gradient-to-br from-nucleus-accent-muted to-nucleus-surface",
          featured ? "h-64" : "h-44"
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-display text-4xl text-nucleus-accent/20">N</div>
        </div>
      </div>

      <div className="p-5">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {article.sector_tags.slice(0, 2).map((tag) => (
            <SectorTag key={tag} sector={tag} />
          ))}
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-display tracking-tight text-nucleus-text-primary group-hover:text-nucleus-accent transition-colors",
            featured ? "text-2xl" : "text-lg"
          )}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-nucleus-text-secondary">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-3 text-xs text-nucleus-text-muted">
          <span>{formatDate(article.published_at)}</span>
          <span className="h-1 w-1 rounded-full bg-nucleus-text-muted" />
          <span>{article.reading_time_minutes} min read</span>
          {article.country_tags[0] && (
            <>
              <span className="h-1 w-1 rounded-full bg-nucleus-text-muted" />
              <span>{article.country_tags[0]}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
