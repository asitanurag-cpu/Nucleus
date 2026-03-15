import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Linkedin, Info } from "lucide-react";
import { signals } from "@/lib/data/signals";
import { SectorTag } from "@/components/shared/SectorTag";
import { SIGNAL_TYPE_CONFIG, STAGE_LABELS } from "@/lib/constants";
import { getScoreColor, getScoreBg } from "@/lib/signal-score";
import { formatDate, cn } from "@/lib/utils";
import { StageTag as StageTagType } from "@/lib/types";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const signal = signals.find((s) => s.startup_slug === slug);
  if (!signal) return { title: "Signal Not Found | Nucleus" };
  return {
    title: `${signal.startup_name} — Signal Profile | Nucleus`,
    description: signal.startup_description,
    openGraph: {
      title: `${signal.startup_name} — Signal Profile | Nucleus`,
      description: signal.startup_description,
      ...(signal.cover_image_url
        ? { images: [{ url: signal.cover_image_url, width: 1200, height: 630 }] }
        : {}),
    },
  };
}

export async function generateStaticParams() {
  return signals.map((s) => ({ slug: s.startup_slug }));
}

export default async function SignalProfilePage({ params }: { params: Params }) {
  const { slug } = await params;
  // Aggregate all signals for this startup
  const startupSignals = signals.filter((s) => s.startup_slug === slug);
  if (startupSignals.length === 0) notFound();

  const primary = startupSignals[0];
  const config = SIGNAL_TYPE_CONFIG[primary.signal_type];

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6 lg:py-12">
      <Link
        href="/signals"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-nucleus-text-muted transition-colors hover:text-nucleus-text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Signals
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <span className={cn("rounded-tag px-2 py-0.5 text-xs font-semibold", config.color)}>
                {config.emoji} {config.label}
              </span>
              <span className="text-xs text-nucleus-text-muted">
                {primary.city}, {primary.country}
              </span>
            </div>
            <h1 className="font-display text-3xl tracking-tight text-nucleus-text-primary md:text-4xl">
              {primary.startup_name}
            </h1>
            <p className="mt-2 text-lg text-nucleus-text-secondary">
              {primary.startup_description}
            </p>
          </div>

          {/* Hero image */}
          <div className="mb-8 overflow-hidden rounded-card">
            {primary.cover_image_url ? (
              <div className="relative aspect-[16/7]">
                <Image
                  src={primary.cover_image_url}
                  alt={`${primary.startup_name} — Nucleus Signal`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            ) : (
              <div className="aspect-[16/7] bg-gradient-to-br from-[#1A3A6B] to-[#2E5FAC]" />
            )}
          </div>

          {/* Signal timeline */}
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
              Signal Timeline
            </h2>
            <div className="space-y-3">
              {startupSignals.map((signal) => {
                const sc = SIGNAL_TYPE_CONFIG[signal.signal_type];
                return (
                  <div
                    key={signal.id}
                    className="rounded-card border border-nucleus-border bg-nucleus-surface p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={cn("rounded-tag px-2 py-0.5 text-xs font-semibold", sc.color)}>
                          {sc.emoji} {sc.label}
                        </span>
                        <p className="mt-2 text-sm font-medium text-nucleus-text-primary">
                          {signal.signal_detail}
                        </p>
                      </div>
                      <span className="text-xs text-nucleus-text-muted whitespace-nowrap ml-4">
                        {formatDate(signal.signal_date)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-nucleus-text-secondary leading-relaxed">
                      {signal.analyst_note}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Founding Team */}
          {primary.founding_team.length > 0 && (
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
                Founding Team
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {primary.founding_team.map((founder) => (
                  <div
                    key={founder.name}
                    className="rounded-card border border-nucleus-border bg-nucleus-surface p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-nucleus-text-primary">{founder.name}</p>
                        <p className="text-xs text-nucleus-accent">{founder.role}</p>
                      </div>
                      <a
                        href={founder.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-nucleus-text-muted hover:text-nucleus-accent transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="mt-2 text-xs text-nucleus-text-secondary">{founder.background}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Signal Score */}
          <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-5 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <p className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Signal Score</p>
              <div className="group relative">
                <Info className="h-3.5 w-3.5 text-nucleus-text-muted cursor-help" />
                <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg border border-nucleus-border bg-nucleus-dark p-3 text-left opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <p className="mb-1.5 text-xs font-semibold text-nucleus-text-primary">Nucleus Signal Score</p>
                  <p className="text-[11px] leading-relaxed text-nucleus-text-secondary">
                    Composite score (0–100) across four equal dimensions: Team Strength (25pts), Market Timing (25pts), Deal Velocity (25pts), Signal Quality (25pts). Scores 75+ are tracked as High Conviction.
                  </p>
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-nucleus-border bg-nucleus-dark" />
                </div>
              </div>
            </div>
            <div className={cn("mt-2 mx-auto flex h-20 w-20 items-center justify-center rounded-full", getScoreBg(primary.signal_score))}>
              <span className={cn("font-mono text-2xl font-bold", getScoreColor(primary.signal_score))}>
                {primary.signal_score}
              </span>
            </div>
            {primary.signal_score >= 75 && (
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                High Conviction
              </p>
            )}
          </div>

          {/* Details */}
          <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-5 space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Estimated Stage</p>
              <p className="mt-1 text-sm text-nucleus-text-primary">
                {STAGE_LABELS[primary.estimated_stage as StageTagType] || primary.estimated_stage}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Location</p>
              <p className="mt-1 text-sm text-nucleus-text-primary">{primary.city}, {primary.country}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Sectors</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {primary.sector_tags.map((tag) => (
                  <SectorTag key={tag} sector={tag} />
                ))}
              </div>
            </div>
            {primary.product_url && (
              <div>
                <a
                  href={primary.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-nucleus-accent hover:text-nucleus-accent-hover transition-colors"
                >
                  Visit Website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
