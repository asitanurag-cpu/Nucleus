"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Zap, Filter } from "lucide-react";
import { signals } from "@/lib/data/signals";
import { SignalCard } from "@/components/signals/SignalCard";
import { SIGNAL_TYPE_CONFIG, SECTOR_LABELS } from "@/lib/constants";
import { SignalType, SectorTag as SectorTagType } from "@/lib/types";
import { EmptyState } from "@/components/shared/EmptyState";
import { Suspense } from "react";

function SignalsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL params
  const [selectedTypes, setSelectedTypes] = useState<SignalType[]>(() => {
    const t = searchParams.get("type");
    return t ? (t.split(",") as SignalType[]) : [];
  });
  const [selectedSectors, setSelectedSectors] = useState<SectorTagType[]>(() => {
    const s = searchParams.get("sector");
    return s ? (s.split(",") as SectorTagType[]) : [];
  });
  const [selectedCountry, setSelectedCountry] = useState<string>(
    searchParams.get("country") || ""
  );
  const [showFilters, setShowFilters] = useState(
    () => !!(searchParams.get("type") || searchParams.get("sector") || searchParams.get("country"))
  );

  // Sync filters to URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedTypes.length > 0) params.set("type", selectedTypes.join(","));
    if (selectedSectors.length > 0) params.set("sector", selectedSectors.join(","));
    if (selectedCountry) params.set("country", selectedCountry);
    const qs = params.toString();
    router.replace(`/signals${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [selectedTypes, selectedSectors, selectedCountry, router]);

  const allCountries = useMemo(() => {
    const set = new Set<string>();
    signals.forEach((s) => set.add(s.country));
    return Array.from(set).sort();
  }, []);

  const allSectors = useMemo(() => {
    const set = new Set<SectorTagType>();
    signals.forEach((s) => s.sector_tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return signals
      .filter((s) => {
        if (selectedTypes.length > 0 && !selectedTypes.includes(s.signal_type)) return false;
        if (selectedSectors.length > 0 && !s.sector_tags.some((t) => selectedSectors.includes(t))) return false;
        if (selectedCountry && s.country !== selectedCountry) return false;
        return true;
      })
      .sort((a, b) => new Date(b.signal_date).getTime() - new Date(a.signal_date).getTime());
  }, [selectedTypes, selectedSectors, selectedCountry]);

  const toggleType = (t: SignalType) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const toggleSector = (s: SectorTagType) => {
    setSelectedSectors((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const clearAll = () => {
    setSelectedTypes([]);
    setSelectedSectors([]);
    setSelectedCountry("");
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <Zap className="h-5 w-5 text-nucleus-signal" />
          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-signal">
            Signal Tracker
          </span>
        </div>
        <h1 className="font-display text-4xl tracking-tight text-nucleus-text-primary md:text-5xl">
          European Startup Signal Tracker
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-nucleus-text-secondary">
          Pre-funding intelligence feed. Track grants, accelerator acceptances, product
          launches, key hires, spinouts, and patent filings across Europe.
        </p>
      </div>

      {/* Signal type legend */}
      <div className="mb-6 flex flex-wrap gap-3">
        {(Object.entries(SIGNAL_TYPE_CONFIG) as [SignalType, typeof SIGNAL_TYPE_CONFIG[SignalType]][]).map(
          ([type, config]) => (
            <span key={type} className="inline-flex items-center gap-1 text-xs text-nucleus-text-muted">
              <span>{config.emoji}</span> {config.label}
            </span>
          )
        )}
      </div>

      {/* Filter toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="mb-4 inline-flex items-center gap-2 rounded-button border border-nucleus-border bg-nucleus-surface px-4 py-2 text-sm font-medium text-nucleus-text-secondary transition-colors hover:bg-nucleus-surface-hover"
      >
        <Filter className="h-4 w-4" />
        Filters {(selectedTypes.length + selectedSectors.length + (selectedCountry ? 1 : 0)) > 0 && (
          <span className="rounded-full bg-nucleus-accent px-1.5 py-0.5 text-xs text-white">
            {selectedTypes.length + selectedSectors.length + (selectedCountry ? 1 : 0)}
          </span>
        )}
      </button>

      {showFilters && (
        <div className="mb-6 rounded-card border border-nucleus-border bg-nucleus-surface p-5 space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">Signal Type</label>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(SIGNAL_TYPE_CONFIG) as [SignalType, typeof SIGNAL_TYPE_CONFIG[SignalType]][]).map(
                ([type, config]) => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`rounded-tag px-3 py-1 text-xs font-semibold transition-colors ${
                      selectedTypes.includes(type)
                        ? "bg-nucleus-accent text-white"
                        : "bg-nucleus-surface-hover text-nucleus-text-secondary hover:text-nucleus-text-primary"
                    }`}
                  >
                    {config.emoji} {config.label}
                  </button>
                )
              )}
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
              className="rounded-button border border-nucleus-border bg-nucleus-dark px-3 py-2 text-sm text-nucleus-text-primary"
            >
              <option value="">All Countries</option>
              {allCountries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <button
            onClick={clearAll}
            className="text-xs text-nucleus-text-muted hover:text-nucleus-accent transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Counter */}
      <p className="mb-4 text-sm text-nucleus-text-secondary">
        Showing <span className="font-semibold text-nucleus-text-primary">{filtered.length}</span> of{" "}
        <span className="font-semibold text-nucleus-text-primary">{signals.length}</span> signals
      </p>

      {/* Signal grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      ) : (
        <EmptyState title="No signals found" description="Try adjusting your filters." />
      )}
    </div>
  );
}

export default function SignalsPage() {
  return (
    <Suspense>
      <SignalsContent />
    </Suspense>
  );
}
