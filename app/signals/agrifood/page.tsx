"use client";

import { useState, useMemo } from "react";
import { Sprout, Filter } from "lucide-react";
import { intelSignals } from "@/lib/data/intel-signals";
import { agrifoodWatchlist } from "@/lib/data/watchlist-data";
import { IntelSignalCard } from "@/components/signals/IntelSignalCard";
import { WeeklyWatchlistPanel } from "@/components/signals/WeeklyWatchlistPanel";
import { INTEL_SIGNAL_TYPE_CONFIG } from "@/lib/signal-type-config";
import { EmptyState } from "@/components/shared/EmptyState";
import type { AgriSignalType } from "@/lib/types/signals";

const AGRI_TYPES: AgriSignalType[] = [
  "grant_award",
  "novel_food_regulatory",
  "executive_hire",
  "pilot_expansion",
  "corporate_partnership",
  "accelerator_graduation",
  "patent_filing",
];

export default function AgriSignalsPage() {
  const [selectedTypes, setSelectedTypes] = useState<AgriSignalType[]>([]);
  const [minScore, setMinScore] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const agriSignals = useMemo(
    () =>
      intelSignals
        .filter((s) => s.vertical === "agrifood" && s.is_published)
        .filter((s) =>
          selectedTypes.length > 0
            ? selectedTypes.includes(s.signal_type as AgriSignalType)
            : true
        )
        .filter((s) => s.fundraise_probability_score >= minScore)
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
    [selectedTypes, minScore]
  );

  const toggleType = (t: AgriSignalType) =>
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-6">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <Sprout className="h-5 w-5 text-nucleus-signal" />
          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-signal">
            AgriFood Intel
          </span>
        </div>
        <h1 className="font-display text-3xl tracking-tight text-nucleus-text-primary md:text-4xl">
          AgriFood Pre-Funding Signals
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-nucleus-text-secondary">
          Real-time intelligence feed tracking grants, regulatory milestones,
          executive hires, pilots, partnerships, and patents across European
          AgriFood startups.
        </p>
      </div>

      {/* Watchlist */}
      <WeeklyWatchlistPanel vertical="agrifood" entries={agrifoodWatchlist} />

      {/* Filter toggle */}
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 rounded-button border border-nucleus-border bg-nucleus-surface px-3 py-1.5 text-xs font-medium text-nucleus-text-secondary transition-colors hover:bg-nucleus-surface-hover"
        >
          <Filter className="h-3.5 w-3.5" />
          Filters
          {(selectedTypes.length + (minScore > 0 ? 1 : 0)) > 0 && (
            <span className="rounded-full bg-nucleus-accent px-1.5 py-0.5 text-[10px] text-white">
              {selectedTypes.length + (minScore > 0 ? 1 : 0)}
            </span>
          )}
        </button>
        <span className="text-xs text-nucleus-text-muted">
          {agriSignals.length} signal{agriSignals.length !== 1 ? "s" : ""}
        </span>
      </div>

      {showFilters && (
        <div className="mb-6 rounded-card border border-nucleus-border bg-nucleus-surface p-4 space-y-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
              Signal Type
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AGRI_TYPES.map((type) => {
                const config = INTEL_SIGNAL_TYPE_CONFIG[type];
                return (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`rounded-tag px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      selectedTypes.includes(type)
                        ? "bg-nucleus-accent text-white"
                        : "bg-nucleus-surface-hover text-nucleus-text-secondary hover:text-nucleus-text-primary"
                    }`}
                  >
                    {config?.label ?? type}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
              Minimum Score
            </label>
            <select
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="rounded-button border border-nucleus-border bg-nucleus-dark px-3 py-1.5 text-xs text-nucleus-text-primary"
            >
              <option value={0}>All scores</option>
              <option value={40}>40+ (Medium+)</option>
              <option value={70}>70+ (High only)</option>
            </select>
          </div>
          <button
            onClick={() => {
              setSelectedTypes([]);
              setMinScore(0);
            }}
            className="text-[11px] text-nucleus-text-muted hover:text-nucleus-accent transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Signal feed */}
      {agriSignals.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {agriSignals.map((signal) => (
            <IntelSignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No AgriFood signals found"
          description="Try adjusting your filters or check back later."
        />
      )}
    </div>
  );
}
