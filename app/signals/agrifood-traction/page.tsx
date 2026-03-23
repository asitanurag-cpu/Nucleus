"use client";

import { useMemo } from "react";
import { BarChart3 } from "lucide-react";
import { benchmarks, oemData } from "@/lib/data/traction-data";
import { BenchmarkCard } from "@/components/signals/traction/BenchmarkCard";
import { YieldTable } from "@/components/signals/traction/YieldTable";
import { OEMTable } from "@/components/signals/traction/OEMTable";

export default function AgriTractionPage() {
  const adoptionBenchmarks = useMemo(
    () => benchmarks.filter((b) => b.benchmark_type === "farmer_adoption" && b.is_published),
    []
  );
  const yieldBenchmarks = useMemo(
    () => benchmarks.filter((b) => b.benchmark_type === "yield_improvement" && b.is_published),
    []
  );
  const costBenchmarks = useMemo(
    () => benchmarks.filter((b) => b.benchmark_type === "cost_efficiency" && b.is_published),
    []
  );
  const publishedOEM = useMemo(
    () => oemData.filter((o) => o.is_published),
    []
  );

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-nucleus-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-accent">
            Traction Intelligence
          </span>
        </div>
        <h1 className="font-display text-3xl tracking-tight text-nucleus-text-primary md:text-4xl">
          AgriFood Traction Benchmarks
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-nucleus-text-secondary">
          Structured benchmark data from CORDIS, EIT Food, and national
          extension services. Farmer adoption curves, yield trial results, cost
          efficiency metrics, and OEM interoperability intelligence.
        </p>
      </div>

      {/* (a) Farmer Adoption Benchmark Cards */}
      <section className="mb-10">
        <h2 className="mb-1 font-display text-xl text-nucleus-text-primary">
          Farmer Adoption Benchmarks
        </h2>
        <p className="mb-4 text-xs text-nucleus-text-muted">
          Adoption curves by sub-sector, sourced from CORDIS and EIT Food
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {adoptionBenchmarks.map((b) => (
            <BenchmarkCard key={b.id} benchmark={b} />
          ))}
        </div>
      </section>

      {/* Cost Efficiency Cards */}
      <section className="mb-10">
        <h2 className="mb-1 font-display text-xl text-nucleus-text-primary">
          Cost Efficiency Metrics
        </h2>
        <p className="mb-4 text-xs text-nucleus-text-muted">
          Cost reduction and ROI benchmarks across AgriFood sub-sectors
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {costBenchmarks.map((b) => (
            <BenchmarkCard key={b.id} benchmark={b} />
          ))}
        </div>
      </section>

      {/* (b) Yield Improvement Table */}
      <section className="mb-10">
        <h2 className="mb-1 font-display text-xl text-nucleus-text-primary">
          Yield Improvement Data
        </h2>
        <p className="mb-4 text-xs text-nucleus-text-muted">
          Independent yield trial results from ARVALIS, DLG, ADAS, and CORDIS projects
        </p>
        <YieldTable data={yieldBenchmarks} />
      </section>

      {/* (c) OEM Interoperability Database */}
      <section>
        <h2 className="mb-1 font-display text-xl text-nucleus-text-primary">
          OEM Interoperability Database
        </h2>
        <p className="mb-4 text-xs text-nucleus-text-muted">
          Which AgriFood startups integrate with which farm machinery OEM platforms
        </p>
        <OEMTable data={publishedOEM} />
      </section>
    </div>
  );
}
