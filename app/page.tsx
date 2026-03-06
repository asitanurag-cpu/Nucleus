import Link from "next/link";
import { ArrowRight, TrendingUp, Globe, Zap } from "lucide-react";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { SignalCard } from "@/components/signals/SignalCard";
import { SectorTag } from "@/components/shared/SectorTag";
import { StageTag } from "@/components/shared/StageTag";
import { MetricCard } from "@/components/shared/MetricCard";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";
import { articles } from "@/lib/data/articles";
import { signals } from "@/lib/data/signals";
import { fundingRounds } from "@/lib/data/funding-rounds";
import { formatCurrency, formatDate } from "@/lib/utils";
import { STAGE_LABELS } from "@/lib/constants";
import { StageTag as StageTagType } from "@/lib/types";

export default function HomePage() {
  const publishedArticles = articles
    .filter((a) => a.status === "published")
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  const latestSignals = signals
    .sort((a, b) => new Date(b.signal_date).getTime() - new Date(a.signal_date).getTime())
    .slice(0, 5);

  const recentFunding = fundingRounds
    .sort((a, b) => new Date(b.date_announced).getTime() - new Date(a.date_announced).getTime())
    .slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-nucleus-border">
        <div className="absolute inset-0 bg-gradient-to-b from-nucleus-accent/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-20 lg:px-6 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl tracking-tight text-nucleus-text-primary md:text-5xl lg:text-6xl">
              The intelligence core of{" "}
              <span className="text-nucleus-accent">European venture capital.</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-nucleus-text-secondary md:text-xl">
              Startup analysis. Signal tracking. VC landscape intelligence.
              <br className="hidden md:block" />
              Built for investors and founders operating in Europe.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signals"
                className="inline-flex items-center gap-2 rounded-button bg-nucleus-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-nucleus-accent-hover"
              >
                Explore Signals <Zap className="h-4 w-4" />
              </Link>
              <Link
                href="/analysis"
                className="inline-flex items-center gap-2 rounded-button border border-nucleus-border bg-nucleus-surface px-6 py-3 text-sm font-semibold text-nucleus-text-primary transition-colors hover:bg-nucleus-surface-hover"
              >
                Read Analysis <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-16 flex max-w-2xl items-center justify-center gap-8 rounded-card border border-nucleus-border bg-nucleus-surface/50 px-8 py-5 backdrop-blur-sm md:gap-12">
            <MetricCard value="100+" label="Startups Tracked" />
            <div className="h-8 w-px bg-nucleus-border" />
            <MetricCard value="30+" label="Countries" />
            <div className="h-8 w-px bg-nucleus-border" />
            <MetricCard value="Weekly" label="Signal Reports" />
          </div>
        </div>
      </section>

      {/* Latest Analysis */}
      <section className="border-b border-nucleus-border py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl tracking-tight text-nucleus-text-primary">
                Latest Analysis
              </h2>
              <p className="mt-1 text-sm text-nucleus-text-secondary">
                Investment-grade startup analysis from the European ecosystem
              </p>
            </div>
            <Link
              href="/analysis"
              className="hidden items-center gap-1 text-sm font-medium text-nucleus-accent transition-colors hover:text-nucleus-accent-hover md:flex"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {publishedArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <Link
            href="/analysis"
            className="mt-6 flex items-center justify-center gap-1 text-sm font-medium text-nucleus-accent transition-colors hover:text-nucleus-accent-hover md:hidden"
          >
            View all analysis <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Signal Tracker Preview */}
      <section className="border-b border-nucleus-border py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-nucleus-signal" />
                <span className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-signal">
                  Signal Tracker
                </span>
              </div>
              <h2 className="font-display text-3xl tracking-tight text-nucleus-text-primary">
                This Week&apos;s Signals
              </h2>
              <p className="mt-1 text-sm text-nucleus-text-secondary">
                Pre-funding intelligence from across the European startup ecosystem
              </p>
            </div>
            <Link
              href="/signals"
              className="hidden items-center gap-1 text-sm font-medium text-nucleus-accent transition-colors hover:text-nucleus-accent-hover md:flex"
            >
              View all signals <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {latestSignals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
          <Link
            href="/signals"
            className="mt-6 flex items-center justify-center gap-1 text-sm font-medium text-nucleus-accent transition-colors hover:text-nucleus-accent-hover md:hidden"
          >
            View all signals <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Recent Funding Rounds */}
      <section className="border-b border-nucleus-border py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-nucleus-accent" />
                <span className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-accent">
                  Funding Tracker
                </span>
              </div>
              <h2 className="font-display text-3xl tracking-tight text-nucleus-text-primary">
                Recent Funding Rounds
              </h2>
              <p className="mt-1 text-sm text-nucleus-text-secondary">
                Latest European startup funding activity
              </p>
            </div>
            <Link
              href="/funding"
              className="hidden items-center gap-1 text-sm font-medium text-nucleus-accent transition-colors hover:text-nucleus-accent-hover md:flex"
            >
              View all rounds <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Funding table */}
          <div className="overflow-x-auto rounded-card border border-nucleus-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-nucleus-border bg-nucleus-surface">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
                    Startup
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
                    Amount
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted md:table-cell">
                    Stage
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted lg:table-cell">
                    Lead Investors
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted md:table-cell">
                    Country
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-nucleus-border">
                {recentFunding.map((round) => (
                  <tr
                    key={round.id}
                    className="transition-colors hover:bg-nucleus-surface-hover"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <span className="font-medium text-nucleus-text-primary">
                          {round.startup_name}
                        </span>
                        <div className="mt-0.5 flex gap-1">
                          {round.sector_tags.slice(0, 1).map((tag) => (
                            <SectorTag key={tag} sector={tag} className="text-[10px]" />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-mono text-sm font-medium text-nucleus-text-primary">
                        {formatCurrency(round.amount, round.currency)}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      {round.stage !== "undisclosed" && (
                        <StageTag stage={round.stage as StageTagType} />
                      )}
                    </td>
                    <td className="hidden px-4 py-3 lg:table-cell">
                      <span className="text-nucleus-text-secondary">
                        {round.lead_investors.join(", ")}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-nucleus-text-secondary md:table-cell">
                      {round.country}
                    </td>
                    <td className="px-4 py-3 text-right text-nucleus-text-muted">
                      {formatDate(round.date_announced)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            href="/funding"
            className="mt-6 flex items-center justify-center gap-1 text-sm font-medium text-nucleus-accent transition-colors hover:text-nucleus-accent-hover"
          >
            View all funding rounds <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-b border-nucleus-border py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
          <NewsletterCTA />
        </div>
      </section>

      {/* About / Credibility Bar */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
          <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-8 text-center lg:p-12">
            <Globe className="mx-auto mb-4 h-8 w-8 text-nucleus-accent" />
            <h2 className="font-display text-2xl tracking-tight text-nucleus-text-primary md:text-3xl">
              Built by an Operator, for the Ecosystem
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-nucleus-text-secondary">
              Nucleus is built by Asit Anurag — IIT Kanpur engineer, RSM Erasmus MBA,
              with 100+ deep-tech deals screened, $20M+ Series A experience, and 6+ years
              as a startup operator across India, the US, and Europe.
            </p>
            <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-6 md:grid-cols-4">
              <MetricCard value="100+" label="Deals Screened" />
              <MetricCard value="$20M+" label="Series A Led" />
              <MetricCard value="6+" label="Years Operating" />
              <MetricCard value="730" label="GMAT Score" />
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-button border border-nucleus-border bg-nucleus-surface-hover px-5 py-2.5 text-sm font-semibold text-nucleus-text-primary transition-colors hover:bg-nucleus-border"
            >
              Learn more about Nucleus <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
