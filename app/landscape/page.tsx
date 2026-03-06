"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Building2, Filter, Search, Star } from "lucide-react";
import { vcFirms } from "@/lib/data/vc-firms";
import { SectorTag } from "@/components/shared/SectorTag";
import { StageTag } from "@/components/shared/StageTag";
import { SECTOR_LABELS, STAGE_LABELS } from "@/lib/constants";
import { SectorTag as SectorTagType, StageTag as StageTagType } from "@/lib/types";
import { formatCurrency, cn } from "@/lib/utils";
import { getScoreColor, getScoreBg } from "@/lib/signal-score";
import { EmptyState } from "@/components/shared/EmptyState";

export default function LandscapePage() {
  const [search, setSearch] = useState("");
  const [selectedStages, setSelectedStages] = useState<StageTagType[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<SectorTagType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const allCountries = useMemo(() => {
    const set = new Set<string>();
    vcFirms.forEach((f) => set.add(f.hq_country));
    return Array.from(set).sort();
  }, []);

  const allSectors = useMemo(() => {
    const set = new Set<SectorTagType>();
    vcFirms.forEach((f) => f.sector_thesis.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return vcFirms
      .filter((f) => {
        if (search) {
          const q = search.toLowerCase();
          if (!f.name.toLowerCase().includes(q) && !f.description.toLowerCase().includes(q)) return false;
        }
        if (selectedStages.length > 0 && !f.stage_focus.some((s) => selectedStages.includes(s))) return false;
        if (selectedSectors.length > 0 && !f.sector_thesis.some((s) => selectedSectors.includes(s))) return false;
        if (selectedCountry && f.hq_country !== selectedCountry) return false;
        return true;
      })
      .sort((a, b) => b.activity_score - a.activity_score);
  }, [search, selectedStages, selectedSectors, selectedCountry]);

  const toggleStage = (s: StageTagType) => {
    setSelectedStages((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const toggleSector = (s: SectorTagType) => {
    setSelectedSectors((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-nucleus-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-accent">VC Landscape</span>
        </div>
        <h1 className="font-display text-4xl tracking-tight text-nucleus-text-primary md:text-5xl">
          European VC Landscape Map
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-nucleus-text-secondary">
          Interactive directory of European VC firms with fund details, investment thesis, and founder-sourced reviews.
        </p>
      </div>

      {/* Search */}
      <div className="mb-4 flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nucleus-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by fund name..."
            className="w-full rounded-input border border-nucleus-border bg-nucleus-surface pl-10 pr-4 py-2.5 text-sm text-nucleus-text-primary placeholder:text-nucleus-text-muted focus:border-nucleus-accent focus:outline-none"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 rounded-button border border-nucleus-border bg-nucleus-surface px-4 py-2 text-sm font-medium text-nucleus-text-secondary transition-colors hover:bg-nucleus-surface-hover"
        >
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      {showFilters && (
        <div className="mb-6 rounded-card border border-nucleus-border bg-nucleus-surface p-5 space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Stage Focus</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(STAGE_LABELS) as StageTagType[]).map((stage) => (
                <button key={stage} onClick={() => toggleStage(stage)}
                  className={`rounded-tag px-3 py-1 text-xs font-semibold transition-colors ${selectedStages.includes(stage) ? "bg-nucleus-accent text-white" : "bg-nucleus-surface-hover text-nucleus-text-secondary hover:text-nucleus-text-primary"}`}>
                  {STAGE_LABELS[stage]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Sector Thesis</label>
            <div className="flex flex-wrap gap-2">
              {allSectors.map((sector) => (
                <button key={sector} onClick={() => toggleSector(sector)}
                  className={`rounded-tag px-3 py-1 text-xs font-semibold transition-colors ${selectedSectors.includes(sector) ? "bg-nucleus-accent text-white" : "bg-nucleus-surface-hover text-nucleus-text-secondary hover:text-nucleus-text-primary"}`}>
                  {SECTOR_LABELS[sector]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Country</label>
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}
              className="rounded-input border border-nucleus-border bg-nucleus-dark px-3 py-2 text-sm text-nucleus-text-primary">
              <option value="">All Countries</option>
              {allCountries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={() => { setSelectedStages([]); setSelectedSectors([]); setSelectedCountry(""); setSearch(""); }}
            className="text-xs text-nucleus-text-muted hover:text-nucleus-accent transition-colors">
            Clear all filters
          </button>
        </div>
      )}

      {/* VC Cards */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((firm) => (
            <Link
              key={firm.id}
              href={`/landscape/${firm.slug}`}
              className="group block rounded-card border border-nucleus-border bg-nucleus-surface p-5 transition-all hover:border-nucleus-accent/30 hover:shadow-glow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-body text-base font-semibold text-nucleus-text-primary group-hover:text-nucleus-accent transition-colors">
                    {firm.name}
                  </h3>
                  <p className="text-xs text-nucleus-text-muted">
                    {firm.hq_city}, {firm.hq_country}
                  </p>
                </div>
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-card", getScoreBg(firm.activity_score))}>
                  <span className={cn("font-mono text-xs font-semibold", getScoreColor(firm.activity_score))}>
                    {firm.activity_score}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-xs text-nucleus-text-secondary line-clamp-2 leading-relaxed">
                {firm.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {firm.stage_focus.slice(0, 3).map((stage) => (
                  <StageTag key={stage} stage={stage} className="text-[10px]" />
                ))}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {firm.sector_thesis.slice(0, 3).map((sector) => (
                  <SectorTag key={sector} sector={sector} className="text-[10px]" />
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-nucleus-text-muted">
                <span>{firm.aum} AUM</span>
                {firm.reviews.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-nucleus-alert" fill="currentColor" />
                    {firm.reviews.length} review{firm.reviews.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState title="No VC firms found" description="Try adjusting your filters or search." />
      )}

      <p className="mt-4 text-center text-xs text-nucleus-text-muted">
        Showing {filtered.length} of {vcFirms.length} VC firms
      </p>
    </div>
  );
}
