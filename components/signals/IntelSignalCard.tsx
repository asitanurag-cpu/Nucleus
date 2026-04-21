"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { INTEL_SIGNAL_TYPE_CONFIG, getIntelScoreStyle } from "@/lib/signal-type-config";
import type { IntelSignal } from "@/lib/types/signals";
import { ExternalLink, ChevronDown, ChevronUp, HelpCircle, Building2 } from "lucide-react";

export function IntelSignalCard({ signal }: { signal: IntelSignal }) {
  const [expanded, setExpanded] = useState(false);
  const typeConfig = INTEL_SIGNAL_TYPE_CONFIG[signal.signal_type] ?? {
    label: signal.signal_type,
    chipClass: "bg-zinc-500/15 text-zinc-400 border border-zinc-500/20",
  };
  const scoreStyle = getIntelScoreStyle(signal.fundraise_probability_score);

  return (
    <article
      onClick={() => setExpanded(!expanded)}
      className={cn(
        "group cursor-pointer rounded-card border border-nucleus-border bg-nucleus-surface p-4 transition-all hover:border-nucleus-accent/30 hover:shadow-glow",
        expanded && "border-nucleus-accent/40 shadow-glow",
        // Visual accent for pre-company signals; blue-left marker keeps the
        // distinction subtle while making the research-stage origin obvious.
        signal.pre_company && "border-l-[3px] border-l-sky-400/70"
      )}
    >
      {/* Top row: company + type chip + score */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex items-center gap-2 flex-wrap">
            {signal.pre_company && (
              <Building2 className="h-4 w-4 shrink-0 text-sky-400" aria-label="Pre-company signal" />
            )}
            <h3 className="text-sm font-semibold text-nucleus-text-primary group-hover:text-nucleus-accent transition-colors">
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
          <p className={cn(
            "text-xs leading-relaxed text-nucleus-text-secondary",
            !expanded && "line-clamp-2"
          )}>
            {signal.headline}
          </p>

          {/* Expanded body */}
          {expanded && signal.body && (
            <div className="mt-3 rounded-lg border border-nucleus-border/50 bg-nucleus-dark/50 p-3">
              <p className="text-xs leading-relaxed text-nucleus-text-secondary">
                {signal.body}
              </p>
            </div>
          )}

          {/* Footer: source + timestamp + link + expand hint */}
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
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-nucleus-accent hover:underline"
            >
              Source <ExternalLink className="h-3 w-3" />
            </a>
            {signal.body && (
              <span className="ml-auto inline-flex items-center gap-0.5 text-nucleus-text-muted">
                {expanded ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </span>
            )}
          </div>
        </div>

        {/* Score badge with methodology link */}
        <div className="flex shrink-0 flex-col items-end gap-1">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-card border",
              scoreStyle.bg,
              scoreStyle.border
            )}
            title={`Nucleus Score: ${signal.fundraise_probability_score}/100`}
          >
            <span className={cn("font-mono text-sm font-bold", scoreStyle.text)}>
              {signal.fundraise_probability_score}
            </span>
          </div>
          <Link
            href="/methodology"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-0.5 text-[9px] font-semibold uppercase tracking-wider text-nucleus-text-muted hover:text-nucleus-accent"
            title="How the Nucleus Score is calculated"
          >
            <HelpCircle className="h-2.5 w-2.5" /> Score
          </Link>
        </div>
      </div>
    </article>
  );
}
