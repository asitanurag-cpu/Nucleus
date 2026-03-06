import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { articles } from "@/lib/data/articles";
import { SectorTag } from "@/components/shared/SectorTag";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found | Nucleus" };
  return {
    title: article.seo_title,
    description: article.seo_description,
    openGraph: {
      title: article.seo_title,
      description: article.seo_description,
      type: "article",
      publishedTime: article.published_at,
      authors: [article.author],
    },
  };
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

function renderMarkdown(body: string) {
  return body.split("\n").map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("## ")) {
      return <h2 key={i}>{trimmed.slice(3)}</h2>;
    }
    if (trimmed.startsWith("### ")) {
      return <h3 key={i}>{trimmed.slice(4)}</h3>;
    }
    if (trimmed.startsWith("- **") || trimmed.startsWith("- ")) {
      const text = trimmed.slice(2);
      const boldMatch = text.match(/^\*\*(.+?)\*\*:?\s*(.*)$/);
      if (boldMatch) {
        return (
          <li key={i}>
            <strong>{boldMatch[1]}</strong>
            {boldMatch[2] ? `: ${boldMatch[2]}` : ""}
          </li>
        );
      }
      return <li key={i}>{text}</li>;
    }
    // Handle inline bold
    const parts = trimmed.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={i}>
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.status === "published")
    .slice(0, 2);

  return (
    <article className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6 lg:py-12">
      {/* Back link */}
      <Link
        href="/analysis"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-nucleus-text-muted transition-colors hover:text-nucleus-text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Analysis
      </Link>

      {/* Article header */}
      <header className="mx-auto max-w-reading">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {article.sector_tags.map((tag) => (
            <SectorTag key={tag} sector={tag} />
          ))}
        </div>

        <h1 className="font-display text-3xl tracking-tight text-nucleus-text-primary md:text-4xl lg:text-5xl">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="mt-3 text-lg text-nucleus-text-secondary">
            {article.subtitle}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-nucleus-border pb-6 text-sm text-nucleus-text-muted">
          <span className="font-medium text-nucleus-text-secondary">
            {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {formatDate(article.published_at)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {article.reading_time_minutes} min read
          </span>
          {article.country_tags[0] && <span>{article.country_tags.join(", ")}</span>}
        </div>
      </header>

      {/* Article body */}
      <div className="prose-nucleus mx-auto mt-8 max-w-reading">
        {renderMarkdown(article.body)}
      </div>

      {/* Newsletter CTA */}
      <div className="mx-auto mt-12 max-w-reading">
        <NewsletterCTA />
      </div>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <div className="mx-auto mt-16 max-w-[1200px]">
          <h3 className="mb-6 font-display text-2xl tracking-tight text-nucleus-text-primary">
            Related Analysis
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
