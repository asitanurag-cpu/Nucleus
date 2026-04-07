"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
  getIntelScoreStyle,
  INTEL_SIGNAL_TYPE_CONFIG,
} from "@/lib/signal-type-config";
import { intelSignals } from "@/lib/data/intel-signals";
import type { WatchlistEntry } from "@/lib/types/signals";
import { Eye, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const PANEL_CONFIG: Record<string, { title: string; description: string }> = {
  agrifood: {
    title: "Weekly Pre-Funding Watchlist",
    description:
      "Top AgriFood companies most likely to raise within 90 days. Auto-generated every Monday.",
  },
  energy: {
    title: "European Energy Pre-Funding Radar",
    description:
      "Top Energy companies most likely to raise within 90 days. Auto-generated every Monday.",
  },
};

function WatchlistCard({
  entry,
  index,
  vertical,
}: {
  entry: WatchlistEntry;
  index: number;
  vertical: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const scoreStyle = getIntelScoreStyle(entry.score);

  const companySignals = expanded
    ? intelSignals
        .filter(
          (s) =>
            s.vertical === vertical &&
            s.company_name === entry.company_name &&
            s.is_published
        )
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
    : [];

  return (
    <div>
      <div
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-button border border-nucleus-border bg-nucleus-surface px-3 py-2 transition-all hover:border-nucleus-accent/30",
          expanded && "border-nucleus-accent/40"
        )}
      >
        <span className="font-mono text-[10px] font-bold text-nucleus-text-muted">
          {index + 1}.
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-nucleus-text-primary">
            {entry.company_name}
          </p>
          <p className="text-[10px] text-nucleus-text-muted">
            {entry.signal_count_7d} signal
            {entry.signal_count_7d !== 1 ? "s" : ""} this week
          </p>
        </div>
        <span
          className={cn(
            "rounded-tag px-1.5 py-0.5 font-mono text-[10px] font-bold border",
            scoreStyle.bg,
            scoreStyle.text,
            scoreStyle.border
          )}
        >
          {entry.score}
        </span>
        {expanded ? (
          <ChevronUp className="h-3 w-3 shrink-0 text-nucleus-text-muted" />
        ) : (
          <ChevronDown className="h-3 w-3 shrink-0 text-nucleus-text-muted" />
        )}
      </div>

      {expanded && (
        <div className="mt-1 space-y-1 pl-6">
          {companySignals.length > 0 ? (
            companySignals.map((signal) => {
              const typeConfig = INTEL_SIGNAL_TYPE_CONFIG[signal.signal_type] ?? {
                label: signal.signal_type,
                chipClass:
                  "bg-zinc-500/15 text-zinc-400 border border-zinc-500/20",
              };
              return (
                <div
                  key={signal.id}
                  className="rounded-button border border-nucleus-border/50 bg-nucleus-dark/50 px-3 py-2"
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={cn(
                        "mt-0.5 inline-flex shrink-0 items-center rounded-tag px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
                        typeConfig.chipClass
                      )}
                    >
                      {typeConfig.label}
                    </span>
                    <p className="text-[11px] leading-relaxed text-nucleus-text-secondary line-clamp-2">
                      {signal.headline}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-nucleus-text-muted">
                    <span>{signal.source_name}</span>
                    <span className="text-nucleus-border">·</span>
                    <time
                      dateTime={
                        signal.source_published_at ?? signal.created_at
                      }
                    >
                      {formatDistanceToNow(
                        new Date(
                          signal.source_published_at ?? signal.created_at
                        ),
                        { addSuffix: true }
                      )}
                    </time>
                    <a
                      href={signal.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="ml-auto inline-flex items-center gap-0.5 text-nucleus-accent hover:underline"
                    >
                      Source <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="px-3 py-2 text-[10px] text-nucleus-text-muted">
              No published signals this week.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function WeeklyWatchlistPanel({
  vertical,
  entries,
}: {
  vertical: "agrifood" | "energy";
  entries: WatchlistEntry[];
}) {
  const config = PANEL_CONFIG[vertical];

  return (
    <section className="mb-6 rounded-card border border-nucleus-signal/20 bg-nucleus-signal/5 p-4">
      <div className="mb-4 flex items-center gap-2">
        <Eye className="h-4 w-4 text-nucleus-signal" />
        <div>
          <h2 className="text-sm font-semibold text-nucleus-signal">
            {config.title}
          </h2>
          <p className="text-[11px] text-nucleus-text-muted">
            {config.description}
          </p>
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="text-xs text-nucleus-text-muted">
          No companies currently meet the threshold (score &ge; 70).
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {entries.map((entry, index) => (
            <WatchlistCard
              key={entry.id}
              entry={entry}
              index={index}
              vertical={vertical}
            />
          ))}
        </div>
      )}
    </section>
  );
}
