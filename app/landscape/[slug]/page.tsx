import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Linkedin, Star, Building2 } from "lucide-react";
import { vcFirms } from "@/lib/data/vc-firms";
import { SectorTag } from "@/components/shared/SectorTag";
import { StageTag } from "@/components/shared/StageTag";
import { STAGE_LABELS } from "@/lib/constants";
import { formatDate, formatCurrency, cn } from "@/lib/utils";
import { getScoreColor, getScoreBg } from "@/lib/signal-score";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const firm = vcFirms.find((f) => f.slug === slug);
  if (!firm) return { title: "VC Firm Not Found | Nucleus" };
  return {
    title: `${firm.name} — VC Profile | Nucleus`,
    description: firm.description,
  };
}

export async function generateStaticParams() {
  return vcFirms.map((f) => ({ slug: f.slug }));
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn("h-3.5 w-3.5", i <= rating ? "text-nucleus-alert" : "text-nucleus-border")}
          fill={i <= rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export default async function VCProfilePage({ params }: { params: Params }) {
  const { slug } = await params;
  const firm = vcFirms.find((f) => f.slug === slug);
  if (!firm) notFound();

  const approvedReviews = firm.reviews.filter((r) => r.is_approved);
  const avgRatings = approvedReviews.length > 0 ? {
    responsiveness: approvedReviews.reduce((s, r) => s + r.rating_responsiveness, 0) / approvedReviews.length,
    diligence: approvedReviews.reduce((s, r) => s + r.rating_diligence_speed, 0) / approvedReviews.length,
    fairness: approvedReviews.reduce((s, r) => s + r.rating_term_fairness, 0) / approvedReviews.length,
    valueAdd: approvedReviews.reduce((s, r) => s + r.rating_value_add, 0) / approvedReviews.length,
  } : null;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6 lg:py-12">
      <Link href="/landscape" className="mb-8 inline-flex items-center gap-1.5 text-sm text-nucleus-text-muted transition-colors hover:text-nucleus-text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Landscape
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-card bg-nucleus-surface border border-nucleus-border">
                <Building2 className="h-6 w-6 text-nucleus-accent" />
              </div>
              <div>
                <h1 className="font-display text-3xl tracking-tight text-nucleus-text-primary">{firm.name}</h1>
                <p className="text-sm text-nucleus-text-muted">{firm.hq_city}, {firm.hq_country} · Founded {firm.year_founded}</p>
              </div>
            </div>
            <p className="text-nucleus-text-secondary leading-relaxed">{firm.description}</p>
            {firm.website_url && (
              <a href={firm.website_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm text-nucleus-accent hover:text-nucleus-accent-hover transition-colors">
                {firm.website_url.replace("https://", "")} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          {/* Investment Thesis */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Investment Thesis</h2>
            <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-5 space-y-3">
              <div>
                <p className="text-xs text-nucleus-text-muted mb-1.5">Stage Focus</p>
                <div className="flex flex-wrap gap-1.5">{firm.stage_focus.map((s) => <StageTag key={s} stage={s} />)}</div>
              </div>
              <div>
                <p className="text-xs text-nucleus-text-muted mb-1.5">Sector Thesis</p>
                <div className="flex flex-wrap gap-1.5">{firm.sector_thesis.map((s) => <SectorTag key={s} sector={s} />)}</div>
              </div>
              <div>
                <p className="text-xs text-nucleus-text-muted mb-1.5">Geographic Coverage</p>
                <p className="text-sm text-nucleus-text-primary">{firm.geographic_coverage.join(", ")}</p>
              </div>
              <div>
                <p className="text-xs text-nucleus-text-muted mb-1.5">Cheque Size</p>
                <p className="font-mono text-sm text-nucleus-text-primary">
                  {formatCurrency(firm.cheque_size_min)} – {formatCurrency(firm.cheque_size_max)}
                </p>
              </div>
            </div>
          </div>

          {/* Key Partners */}
          {firm.key_partners.length > 0 && (
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Key Partners</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {firm.key_partners.map((partner) => (
                  <div key={partner.name} className="rounded-card border border-nucleus-border bg-nucleus-surface p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-nucleus-text-primary">{partner.name}</p>
                        <p className="text-xs text-nucleus-accent">{partner.role}</p>
                      </div>
                      <a href={partner.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-nucleus-text-muted hover:text-nucleus-accent transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {partner.focus_areas.map((f) => (
                        <span key={f} className="rounded-tag bg-nucleus-surface-hover px-2 py-0.5 text-[10px] text-nucleus-text-secondary">{f}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Investments */}
          {firm.recent_investments.length > 0 && (
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Recent Investments</h2>
              <div className="overflow-x-auto rounded-card border border-nucleus-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-nucleus-border bg-nucleus-surface">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Startup</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Amount</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Stage</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-nucleus-border">
                    {firm.recent_investments.map((inv, i) => (
                      <tr key={i} className="transition-colors hover:bg-nucleus-surface-hover">
                        <td className="px-4 py-2.5 font-medium text-nucleus-text-primary">{inv.startup_name}</td>
                        <td className="px-4 py-2.5 text-right font-mono text-nucleus-text-primary">{inv.amount}</td>
                        <td className="px-4 py-2.5 text-nucleus-text-secondary">{inv.stage}</td>
                        <td className="px-4 py-2.5 text-right text-nucleus-text-muted">{formatDate(inv.date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reviews */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
              Founder Reviews ({approvedReviews.length})
            </h2>
            {avgRatings && (
              <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-3 text-center">
                  <StarRating rating={Math.round(avgRatings.responsiveness)} />
                  <p className="mt-1 text-xs text-nucleus-text-muted">Responsiveness</p>
                </div>
                <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-3 text-center">
                  <StarRating rating={Math.round(avgRatings.diligence)} />
                  <p className="mt-1 text-xs text-nucleus-text-muted">Diligence Speed</p>
                </div>
                <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-3 text-center">
                  <StarRating rating={Math.round(avgRatings.fairness)} />
                  <p className="mt-1 text-xs text-nucleus-text-muted">Term Fairness</p>
                </div>
                <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-3 text-center">
                  <StarRating rating={Math.round(avgRatings.valueAdd)} />
                  <p className="mt-1 text-xs text-nucleus-text-muted">Value-Add</p>
                </div>
              </div>
            )}
            {approvedReviews.length > 0 ? (
              <div className="space-y-3">
                {approvedReviews.map((review) => (
                  <div key={review.id} className="rounded-card border border-nucleus-border bg-nucleus-surface p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn("rounded-tag px-2 py-0.5 text-xs font-semibold",
                        review.received_funding ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-500/20 text-gray-300"
                      )}>
                        {review.received_funding ? "Funded" : "Not Funded"}
                      </span>
                      <span className="text-xs text-nucleus-text-muted capitalize">{review.interaction_stage.replace("_", " ")}</span>
                      <span className="text-xs text-nucleus-text-muted">· {formatDate(review.submitted_at)}</span>
                    </div>
                    <p className="text-sm text-nucleus-text-secondary leading-relaxed">{review.review_text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-nucleus-text-muted">No reviews yet. Register as a founder to submit a review.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Activity Score */}
          <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Activity Score</p>
            <div className={cn("mt-2 mx-auto flex h-20 w-20 items-center justify-center rounded-full", getScoreBg(firm.activity_score))}>
              <span className={cn("font-mono text-2xl font-bold", getScoreColor(firm.activity_score))}>{firm.activity_score}</span>
            </div>
          </div>

          {/* Quick Facts */}
          <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-5 space-y-3">
            <div>
              <p className="text-xs text-nucleus-text-muted">AUM</p>
              <p className="font-mono text-sm text-nucleus-text-primary">{firm.aum}</p>
            </div>
            <div>
              <p className="text-xs text-nucleus-text-muted">Fund Status</p>
              <span className={cn("rounded-tag px-2 py-0.5 text-xs font-semibold capitalize",
                firm.fund_status === "actively_deploying" ? "bg-emerald-500/20 text-emerald-400" :
                firm.fund_status === "fundraising" ? "bg-amber-500/20 text-amber-400" :
                "bg-gray-500/20 text-gray-300"
              )}>
                {firm.fund_status.replace("_", " ")}
              </span>
            </div>
            <div>
              <p className="text-xs text-nucleus-text-muted">Founded</p>
              <p className="text-sm text-nucleus-text-primary">{firm.year_founded}</p>
            </div>
            <div>
              <p className="text-xs text-nucleus-text-muted">Location</p>
              <p className="text-sm text-nucleus-text-primary">{firm.hq_city}, {firm.hq_country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
