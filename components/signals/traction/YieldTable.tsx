"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import type { TractionBenchmark } from "@/lib/types/signals";

type SortKey = "sub_sector" | "crop_type" | "metric_value" | "geography" | "source_name";
type SortDir = "asc" | "desc";

export function YieldTable({ data }: { data: TractionBenchmark[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("metric_value");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filterSector, setFilterSector] = useState("");
  const [filterCrop, setFilterCrop] = useState("");
  const [filterGeo, setFilterGeo] = useState("");

  const sectors = useMemo(
    () => Array.from(new Set(data.map((d) => d.sub_sector))).sort(),
    [data]
  );
  const crops = useMemo(
    () =>
      Array.from(new Set(data.map((d) => d.crop_type).filter(Boolean) as string[])).sort(),
    [data]
  );
  const geos = useMemo(
    () =>
      Array.from(new Set(data.map((d) => d.geography).filter(Boolean) as string[])).sort(),
    [data]
  );

  const filtered = useMemo(() => {
    return data
      .filter((d) => (!filterSector || d.sub_sector === filterSector))
      .filter((d) => (!filterCrop || d.crop_type === filterCrop))
      .filter((d) => (!filterGeo || d.geography === filterGeo))
      .sort((a, b) => {
        const valA = a[sortKey] ?? "";
        const valB = b[sortKey] ?? "";
        const cmp =
          typeof valA === "number" && typeof valB === "number"
            ? valA - valB
            : String(valA).localeCompare(String(valB));
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [data, filterSector, filterCrop, filterGeo, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const headerClass =
    "cursor-pointer select-none px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted hover:text-nucleus-text-primary transition-colors";

  return (
    <div>
      {/* Filters */}
      <div className="mb-3 flex flex-wrap gap-2">
        <select
          value={filterSector}
          onChange={(e) => setFilterSector(e.target.value)}
          className="rounded-button border border-nucleus-border bg-nucleus-dark px-2 py-1 text-[11px] text-nucleus-text-primary"
        >
          <option value="">All Sub-Sectors</option>
          {sectors.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={filterCrop}
          onChange={(e) => setFilterCrop(e.target.value)}
          className="rounded-button border border-nucleus-border bg-nucleus-dark px-2 py-1 text-[11px] text-nucleus-text-primary"
        >
          <option value="">All Crops</option>
          {crops.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={filterGeo}
          onChange={(e) => setFilterGeo(e.target.value)}
          className="rounded-button border border-nucleus-border bg-nucleus-dark px-2 py-1 text-[11px] text-nucleus-text-primary"
        >
          <option value="">All Geographies</option>
          {geos.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-card border border-nucleus-border">
        <table className="w-full text-xs">
          <thead className="border-b border-nucleus-border bg-nucleus-surface">
            <tr>
              {([
                ["sub_sector", "Sub-Sector"],
                ["crop_type", "Crop"],
                ["metric_value", "Improvement"],
                ["geography", "Geography"],
                ["source_name", "Source"],
              ] as [SortKey, string][]).map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => toggleSort(key)}
                  className={headerClass}
                >
                  <span className="inline-flex items-center gap-1">
                    {label}
                    <ArrowUpDown
                      className={cn(
                        "h-3 w-3",
                        sortKey === key
                          ? "text-nucleus-accent"
                          : "text-nucleus-text-muted/40"
                      )}
                    />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-nucleus-border/50">
            {filtered.map((row) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-nucleus-surface-hover"
              >
                <td className="px-3 py-2 font-medium text-nucleus-text-primary">
                  {row.sub_sector}
                </td>
                <td className="px-3 py-2 text-nucleus-text-secondary">
                  {row.crop_type ?? "-"}
                </td>
                <td className="px-3 py-2">
                  <span className="font-mono font-semibold text-nucleus-signal">
                    +{row.metric_value}{row.metric_unit}
                  </span>
                </td>
                <td className="px-3 py-2 text-nucleus-text-secondary">
                  {row.geography ?? "-"}
                </td>
                <td className="px-3 py-2 text-nucleus-text-muted">
                  {row.source_url ? (
                    <a
                      href={row.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-nucleus-accent hover:underline"
                    >
                      {row.source_name}
                    </a>
                  ) : (
                    row.source_name
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-6 text-center text-nucleus-text-muted"
                >
                  No yield data matches the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[10px] text-nucleus-text-muted">
        {filtered.length} record{filtered.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
