"use client";

import { useState, useMemo } from "react";
import { TrendingUp, Filter } from "lucide-react";
import { fundingRounds } from "@/lib/data/funding-rounds";
import { SectorTag } from "@/components/shared/SectorTag";
import { StageTag } from "@/components/shared/StageTag";
import { formatCurrency, formatDate } from "@/lib/utils";
import { SECTOR_LABELS, STAGE_LABELS, EUROPEAN_COUNTRIES } from "@/lib/constants";
import { SectorTag as SectorTagType, StageTag as StageTagType } from "@/lib/types";
import { EmptyState } from "@/components/shared/EmptyState";

export default function FundingPage() {
  const [selectedSectors, setSelectedSectors] = useState<SectorTagType[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const allSectors = useMemo(() => {
    const set = new Set<SectorTagType>();
    fundingRounds.forEach((r) => r.sector_tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const allCountries = useMemo(() => {
    const set = new Set<string>();
    fundingRounds.forEach((r) => set.add(r.country));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return fundingRounds
      .filter((r) => {
        if (selectedSectors.length > 0 && !r.sector_tags.some((t) => selectedSectors.includes(t))) return false;
        if (selectedStages.length > 0 && !selectedStages.includes(r.stage)) return false;
        if (selectedCountry && r.country !== selectedCountry) return false;
        return true;
      })
      .sort((a, b) => new Date(b.date_announced).getTime() - new Date(a.date_announced).getTime());
  }, [selectedSectors, selectedStages, selectedCountry]);

  const toggleSector = (s: SectorTagType) => {
    setSelectedSectors((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const toggleStage = (s: string) => {
    setSelectedStages((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-nucleus-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-accent">
            Funding Tracker
          </span>
        </div>
        <h1 className="font-display text-4xl tracking-tight text-nucleus-text-primary md:text-5xl">
          European Startup Funding Rounds
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-nucleus-text-secondary">
          Track the latest funding activity across the European startup ecosystem.
          Filter by sector, stage, and country.
        </p>
      </div>

      {/* Filter toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="mb-4 inline-flex items-center gap-2 rounded-button border border-nucleus-border bg-nucleus-surface px-4 py-2 text-sm font-medium text-nucleus-text-secondary transition-colors hover:bg-nucleus-surface-hover"
      >
        <Filter className="h-4 w-4" />
        Filters {(selectedSectors.length + selectedStages.length + (selectedCountry ? 1 : 0)) > 0 && (
          <span className="rounded-full bg-nucleus-accent px-1.5 py-0.5 text-xs text-white">
            {selectedSectors.length + selectedStages.length + (selectedCountry ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 rounded-card border border-nucleus-border bg-nucleus-surface p-5 space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Stage</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(STAGE_LABELS) as StageTagType[]).map((stage) => (
                <button
                  key={stage}
                  onClick={() => toggleStage(stage)}
                  className={`rounded-tag px-3 py-1 text-xs font-semibold transition-colors ${
                    selectedStages.includes(stage)
                      ? "bg-nucleus-accent text-white"
                      : "bg-nucleus-surface-hover text-nucleus-text-secondary hover:text-nucleus-text-primary"
                  }`}
                >
                  {STAGE_LABELS[stage]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Sector</label>
            <div className="flex flex-wrap gap-2">
              {allSectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => toggleSector(sector)}
                  className={`rounded-tag px-3 py-1 text-xs font-semibold transition-colors ${
                    selectedSectors.includes(sector)
                      ? "bg-nucleus-accent text-white"
                      : "bg-nucleus-surface-hover text-nucleus-text-secondary hover:text-nucleus-text-primary"
                  }`}
                >
                  {SECTOR_LABELS[sector]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="rounded-input border border-nucleus-border bg-nucleus-dark px-3 py-2 text-sm text-nucleus-text-primary"
            >
              <option value="">All Countries</option>
              {allCountries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => { setSelectedSectors([]); setSelectedStages([]); setSelectedCountry(""); }}
            className="text-xs text-nucleus-text-muted hover:text-nucleus-accent transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Table */}
      {filtered.length > 0 ? (
        <div className="overflow-x-auto rounded-card border border-nucleus-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-nucleus-border bg-nucleus-surface">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Startup</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Amount</th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted md:table-cell">Stage</th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted lg:table-cell">Lead Investors</th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted md:table-cell">Country</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nucleus-border">
              {filtered.map((round) => (
                <tr key={round.id} className="transition-colors hover:bg-nucleus-surface-hover">
                  <td className="px-4 py-3">
                    <div>
                      <span className="font-medium text-nucleus-text-primary">{round.startup_name}</span>
                      <p className="mt-0.5 text-xs text-nucleus-text-muted line-clamp-1">{round.startup_description}</p>
                      <div className="mt-1 flex gap-1">
                        {round.sector_tags.slice(0, 2).map((tag) => (
                          <SectorTag key={tag} sector={tag} className="text-[10px]" />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-mono text-sm font-medium text-nucleus-text-primary">
                      {formatCurrency(round.amount, round.currency)}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    {round.stage !== "undisclosed" && <StageTag stage={round.stage as StageTagType} />}
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <span className="text-nucleus-text-secondary">{round.lead_investors.join(", ")}</span>
                  </td>
                  <td className="hidden px-4 py-3 text-nucleus-text-secondary md:table-cell">
                    {round.country}
                  </td>
                  <td className="px-4 py-3 text-right text-nucleus-text-muted">
                    {formatDate(round.date_announced)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState title="No funding rounds found" description="Try adjusting your filters." />
      )}

      <p className="mt-4 text-center text-xs text-nucleus-text-muted">
        Showing {filtered.length} of {fundingRounds.length} funding rounds
      </p>
    </div>
  );
}
