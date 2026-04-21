"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Zap, Filter, Building2 } from "lucide-react";
import { intelSignals } from "@/lib/data/intel-signals";
import { energyWatchlist } from "@/lib/data/watchlist-data";
import { IntelSignalCard } from "@/components/signals/IntelSignalCard";
import { WeeklyWatchlistPanel } from "@/components/signals/WeeklyWatchlistPanel";
import { INTEL_SIGNAL_TYPE_CONFIG } from "@/lib/signal-type-config";
import { EmptyState } from "@/components/shared/EmptyState";
import type { EnergySignalType } from "@/lib/types/signals";
import { ttoInstitutions } from "@/lib/data/tto-institutions";

const ENERGY_TYPES: EnergySignalType[] = [
  "ipcei_milestone",
  "grid_tender",
  "ppa_signing",
  "innovation_fund_award",
  "executive_hire",
  "patent_filing",
  "rvo_grant_award",
  "nwo_research_award",
  "kvk_spinoff",
];

export default function EnergySignalsPage() {
  const searchParams = useSearchParams();
  const [selectedTypes, setSelectedTypes] = useState<EnergySignalType[]>([]);
  const [minScore, setMinScore] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [preCompanyOnly, setPreCompanyOnly] = useState(false);
  const [institutionFilter, setInstitutionFilter] = useState<string | null>(null);

  // Honour `?institution=<slug>` from the TTO tracker deep links; when set,
  // we automatically switch to the pre-company view.
  useEffect(() => {
    const inst = searchParams.get("institution");
    if (inst) {
      setInstitutionFilter(inst);
      setPreCompanyOnly(true);
    }
  }, [searchParams]);

  const energySignals = useMemo(
    () =>
      intelSignals
        .filter((s) => s.vertical === "energy" && s.is_published)
        .filter((s) => (preCompanyOnly ? s.pre_company === true : true))
        .filter((s) =>
          institutionFilter ? s.institution_slug === institutionFilter : true
        )
        .filter((s) =>
          selectedTypes.length > 0
            ? selectedTypes.includes(s.signal_type as EnergySignalType)
            : true
        )
        .filter((s) => s.fundraise_probability_score >= minScore)
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
    [selectedTypes, minScore, preCompanyOnly, institutionFilter]
  );

  const toggleType = (t: EnergySignalType) =>
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const activeInstitution = institutionFilter
    ? ttoInstitutions.find((i) => i.slug === institutionFilter)
    : undefined;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-6">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <Zap className="h-5 w-5 text-nucleus-alert" />
          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-alert">
            Energy Intel
          </span>
        </div>
        <h1 className="font-display text-3xl tracking-tight text-nucleus-text-primary md:text-4xl">
          Energy Pre-Funding Signals
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-nucleus-text-secondary">
          Track IPCEI milestones, grid tenders, PPA signings, innovation fund
          awards, RVO grants, NWO research awards, KVK spin-offs, executive
          hires, and patents across European clean energy startups.
        </p>
      </div>

      {/* Watchlist */}
      <WeeklyWatchlistPanel vertical="energy" entries={energyWatchlist} />

      {/* Filter toggle + pre-company switch */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 rounded-button border border-nucleus-border bg-nucleus-surface px-3 py-1.5 text-xs font-medium text-nucleus-text-secondary transition-colors hover:bg-nucleus-surface-hover"
        >
          <Filter className="h-3.5 w-3.5" />
          Filters
          {selectedTypes.length + (minScore > 0 ? 1 : 0) > 0 && (
            <span className="rounded-full bg-nucleus-accent px-1.5 py-0.5 text-[10px] text-white">
              {selectedTypes.length + (minScore > 0 ? 1 : 0)}
            </span>
          )}
        </button>
        <button
          onClick={() => {
            setPreCompanyOnly((v) => !v);
            if (preCompanyOnly) setInstitutionFilter(null);
          }}
          className={`inline-flex items-center gap-2 rounded-button border px-3 py-1.5 text-xs font-medium transition-colors ${
            preCompanyOnly
              ? "border-sky-400/60 bg-sky-500/15 text-sky-300"
              : "border-nucleus-border bg-nucleus-surface text-nucleus-text-secondary hover:bg-nucleus-surface-hover"
          }`}
          aria-pressed={preCompanyOnly}
        >
          <Building2 className="h-3.5 w-3.5" />
          Pre-company signals
        </button>
        {activeInstitution && (
          <span className="inline-flex items-center gap-2 rounded-button border border-sky-400/30 bg-sky-500/10 px-3 py-1.5 text-xs text-sky-300">
            Institution: {activeInstitution.name}
            <button
              onClick={() => setInstitutionFilter(null)}
              className="text-sky-300/70 hover:text-sky-300"
              aria-label="Clear institution filter"
            >
              ×
            </button>
          </span>
        )}
        <span className="text-xs text-nucleus-text-muted">
          {energySignals.length} signal{energySignals.length !== 1 ? "s" : ""}
        </span>
      </div>

      {showFilters && (
        <div className="mb-6 rounded-card border border-nucleus-border bg-nucleus-surface p-4 space-y-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
              Signal Type
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ENERGY_TYPES.map((type) => {
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
              setPreCompanyOnly(false);
              setInstitutionFilter(null);
            }}
            className="text-[11px] text-nucleus-text-muted hover:text-nucleus-accent transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Signal feed */}
      {energySignals.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {energySignals.map((signal) => (
            <IntelSignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Energy signals found"
          description="Try adjusting your filters or check back later."
        />
      )}
    </div>
  );
}
