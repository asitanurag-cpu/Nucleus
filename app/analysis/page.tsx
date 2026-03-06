import { ArticleCard } from "@/components/articles/ArticleCard";
import { articles } from "@/lib/data/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Analysis | Nucleus",
  description: "Investment-grade narrative analysis of European startups. Deep dives into business models, competitive dynamics, and funding trajectories.",
};

export default function AnalysisPage() {
  const published = articles
    .filter((a) => a.status === "published")
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-4xl tracking-tight text-nucleus-text-primary md:text-5xl">
          Startup Analysis
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-nucleus-text-secondary">
          Investment-grade narrative analysis of European startups. Business models,
          competitive dynamics, and what investors should watch.
        </p>
      </div>

      {/* Articles grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {published.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {published.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-nucleus-text-muted">No articles published yet.</p>
        </div>
      )}
    </div>
  );
}
