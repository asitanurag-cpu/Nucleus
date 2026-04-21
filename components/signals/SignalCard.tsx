"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Signal } from "@/lib/types";
import { SIGNAL_TYPE_CONFIG } from "@/lib/constants";
import { SectorTag } from "@/components/shared/SectorTag";
import { getScoreColor, getScoreBg } from "@/lib/signal-score";

export function SignalCard({
  signal,
  compact = false,
  className,
}: {
  signal: Signal;
  compact?: boolean;
  className?: string;
}) {
  const config = SIGNAL_TYPE_CONFIG[signal.signal_type];

  return (
    <Link
      href={`/signals/${signal.startup_slug}`}
      className={cn(
        "group block rounded-card border border-nucleus-border bg-nucleus-surface p-4 transition-all hover:border-nucleus-accent/30 hover:shadow-glow",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Signal type badge */}
          <div className="mb-2 flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-tag px-2 py-0.5 text-xs font-semibold",
                config.color
              )}
            >
              <span>{config.emoji}</span>
              {config.label}
            </span>
            <span className="text-xs text-nucleus-text-muted">
              {signal.country}
            </span>
          </div>

          {/* Startup name */}
          <h4 className="font-body text-sm font-semibold text-nucleus-text-primary group-hover:text-nucleus-accent transition-colors">
            {signal.startup_name}
          </h4>

          {/* Signal detail */}
          <p className="mt-1 text-xs leading-relaxed text-nucleus-text-secondary line-clamp-2">
            {signal.signal_detail}
          </p>

          {/* Tags & country */}
          {!compact && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {signal.sector_tags.slice(0, 2).map((tag) => (
                <SectorTag key={tag} sector={tag} className="text-[10px]" />
              ))}
            </div>
          )}

          {/* Source link + date; every signal is independently verifiable */}
          <div className="mt-2 flex items-center gap-2 text-[11px] text-nucleus-text-muted">
            <time dateTime={signal.signal_date}>{formatDate(signal.signal_date)}</time>
            {signal.source_url && (
              <>
                <span className="text-nucleus-border">·</span>
                <a
                  href={signal.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-nucleus-accent hover:underline"
                >
                  Source <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </>
            )}
          </div>
        </div>

        {/* Signal score with tooltip linking to methodology */}
        <div className="group/score relative shrink-0">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-card",
              getScoreBg(signal.signal_score)
            )}
          >
            <span
              className={cn(
                "font-mono text-sm font-semibold",
                getScoreColor(signal.signal_score)
              )}
            >
              {signal.signal_score}
            </span>
          </div>
          <div className="absolute bottom-full right-0 z-50 mb-2 w-60 rounded-lg border border-nucleus-border bg-nucleus-dark p-2.5 text-left opacity-0 shadow-lg transition-opacity group-hover/score:opacity-100 pointer-events-none group-hover/score:pointer-events-auto">
            <p className="mb-1 text-[10px] font-semibold text-nucleus-text-primary">Nucleus Signal Score</p>
            <p className="text-[10px] leading-relaxed text-nucleus-text-secondary">
              Composite 0–100 across Team Strength (25), Market Timing (25), Deal Velocity (25), Signal Quality (25). 75+ = High Conviction.
            </p>
            <Link
              href="/methodology"
              onClick={(e) => e.stopPropagation()}
              className="mt-1.5 inline-block text-[10px] font-semibold text-nucleus-accent hover:underline"
            >
              Read full methodology →
            </Link>
            <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 border-b border-r border-nucleus-border bg-nucleus-dark" />
          </div>
        </div>
      </div>
    </Link>
  );
}
