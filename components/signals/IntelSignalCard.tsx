"use client";

import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { INTEL_SIGNAL_TYPE_CONFIG, getIntelScoreStyle } from "@/lib/signal-type-config";
import type { IntelSignal } from "@/lib/types/signals";
import { ExternalLink } from "lucide-react";

export function IntelSignalCard({ signal }: { signal: IntelSignal }) {
  const typeConfig = INTEL_SIGNAL_TYPE_CONFIG[signal.signal_type] ?? {
    label: signal.signal_type,
    chipClass: "bg-zinc-500/15 text-zinc-400 border border-zinc-500/20",
  };
  const scoreStyle = getIntelScoreStyle(signal.fundraise_probability_score);

  return (
    <article className="group rounded-card border border-nucleus-border bg-nucleus-surface p-4 transition-all hover:border-nucleus-accent/30 hover:shadow-glow">
      {/* Top row: company + type chip + score */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-nucleus-text-primary">
              {signal.company_name}
            </h3>
            <span
              className={cn(
                "inline-flex items-center rounded-tag px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                typeConfig.chipClass
              )}
            >
              {typeConfig.label}
            </span>
          </div>

          {/* Headline */}
          <p className="text-xs leading-relaxed text-nucleus-text-secondary line-clamp-2">
            {signal.headline}
          </p>

          {/* Footer: source + timestamp + link */}
          <div className="mt-3 flex items-center gap-2 text-[11px] text-nucleus-text-muted">
            <span>{signal.source_name}</span>
            <span className="text-nucleus-border">·</span>
            <time dateTime={signal.source_published_at ?? signal.created_at}>
              {formatDistanceToNow(
                new Date(signal.source_published_at ?? signal.created_at),
                { addSuffix: true }
              )}
            </time>
            <span className="text-nucleus-border">·</span>
            <a
              href={signal.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-nucleus-accent hover:underline"
            >
              Source <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Score badge */}
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-card border",
            scoreStyle.bg,
            scoreStyle.border
          )}
          title={`Fundraise Probability: ${signal.fundraise_probability_score}/100`}
        >
          <span className={cn("font-mono text-sm font-bold", scoreStyle.text)}>
            {signal.fundraise_probability_score}
          </span>
        </div>
      </div>
    </article>
  );
}
