"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { TractionBenchmark } from "@/lib/types/signals";

export function BenchmarkCard({ benchmark }: { benchmark: TractionBenchmark }) {
  const hasTrend =
    benchmark.previous_value !== undefined && benchmark.previous_value !== null;
  const trendUp = hasTrend ? benchmark.metric_value > benchmark.previous_value! : false;
  const trendDiff = hasTrend
    ? Math.abs(benchmark.metric_value - benchmark.previous_value!)
    : 0;

  return (
    <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-4 transition-all hover:border-nucleus-accent/20">
      {/* Sub-sector label */}
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
        {benchmark.sub_sector}
      </p>

      {/* Metric value */}
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-2xl font-bold text-nucleus-text-primary">
          {benchmark.metric_value}
          <span className="text-sm text-nucleus-text-muted">
            {benchmark.metric_unit}
          </span>
        </span>

        {/* Trend arrow */}
        {hasTrend && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold",
              trendUp ? "text-emerald-400" : "text-red-400"
            )}
          >
            {trendUp ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {trendDiff.toFixed(1)}
            {benchmark.metric_unit === "%" ? "pp" : ` ${benchmark.metric_unit}`}
          </span>
        )}
      </div>

      {/* Metric name */}
      <p className="mt-1 text-xs text-nucleus-text-secondary">
        {benchmark.metric_name}
      </p>

      {/* Geography badge */}
      {benchmark.geography && (
        <span className="mt-2 inline-block rounded-tag bg-nucleus-surface-hover px-2 py-0.5 text-[10px] font-medium text-nucleus-text-muted">
          {benchmark.geography}
        </span>
      )}

      {/* Source */}
      <p className="mt-2 text-[10px] text-nucleus-text-muted">
        {benchmark.source_name} · {benchmark.source_year}
      </p>
    </div>
  );
}
