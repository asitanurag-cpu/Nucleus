"use client";

import { cn } from "@/lib/utils";
import { getIntelScoreStyle } from "@/lib/signal-type-config";
import type { WatchlistEntry } from "@/lib/types/signals";
import { Eye } from "lucide-react";

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
          {entries.map((entry, index) => {
            const scoreStyle = getIntelScoreStyle(entry.score);
            return (
              <div
                key={entry.id}
                className="flex items-center gap-2 rounded-button border border-nucleus-border bg-nucleus-surface px-3 py-2"
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
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
