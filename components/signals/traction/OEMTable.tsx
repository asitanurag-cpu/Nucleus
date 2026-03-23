"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { OEMInterop, IntegrationType, IntegrationStatus } from "@/lib/types/signals";

const TYPE_LABELS: Record<IntegrationType, string> = {
  certified_partner: "Certified Partner",
  api_integration: "API Integration",
  data_exchange: "Data Exchange",
  hardware_compatible: "Hardware Compatible",
};

const STATUS_STYLES: Record<IntegrationStatus, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  beta: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  deprecated: "bg-red-500/15 text-red-400 border-red-500/20",
  unverified: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
};

const STATUS_LABELS: Record<IntegrationStatus, string> = {
  active: "Active",
  beta: "Beta",
  deprecated: "Deprecated",
  unverified: "Unverified",
};

export function OEMTable({ data }: { data: OEMInterop[] }) {
  const [search, setSearch] = useState("");
  const [filterOEM, setFilterOEM] = useState("");
  const [filterType, setFilterType] = useState<IntegrationType | "">("");
  const [filterStatus, setFilterStatus] = useState<IntegrationStatus | "">("");

  const oems = useMemo(
    () => Array.from(new Set(data.map((d) => d.oem_platform))).sort(),
    [data]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data
      .filter(
        (d) =>
          !q ||
          d.startup_name.toLowerCase().includes(q) ||
          d.oem_name.toLowerCase().includes(q) ||
          d.oem_platform.toLowerCase().includes(q)
      )
      .filter((d) => (!filterOEM || d.oem_platform === filterOEM))
      .filter((d) => (!filterType || d.integration_type === filterType))
      .filter((d) => (!filterStatus || d.integration_status === filterStatus))
      .sort((a, b) => a.startup_name.localeCompare(b.startup_name));
  }, [data, search, filterOEM, filterType, filterStatus]);

  return (
    <div>
      {/* Search + filters */}
      <div className="mb-3 flex flex-wrap gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-nucleus-text-muted" />
          <input
            type="text"
            placeholder="Search startups or OEMs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-button border border-nucleus-border bg-nucleus-dark pl-7 pr-3 py-1.5 text-[11px] text-nucleus-text-primary placeholder:text-nucleus-text-muted/50 w-52"
          />
        </div>
        <select
          value={filterOEM}
          onChange={(e) => setFilterOEM(e.target.value)}
          className="rounded-button border border-nucleus-border bg-nucleus-dark px-2 py-1 text-[11px] text-nucleus-text-primary"
        >
          <option value="">All Platforms</option>
          {oems.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as IntegrationType | "")}
          className="rounded-button border border-nucleus-border bg-nucleus-dark px-2 py-1 text-[11px] text-nucleus-text-primary"
        >
          <option value="">All Types</option>
          {(Object.entries(TYPE_LABELS) as [IntegrationType, string][]).map(
            ([k, v]) => (
              <option key={k} value={k}>{v}</option>
            )
          )}
        </select>
        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as IntegrationStatus | "")
          }
          className="rounded-button border border-nucleus-border bg-nucleus-dark px-2 py-1 text-[11px] text-nucleus-text-primary"
        >
          <option value="">All Statuses</option>
          {(Object.entries(STATUS_LABELS) as [IntegrationStatus, string][]).map(
            ([k, v]) => (
              <option key={k} value={k}>{v}</option>
            )
          )}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-card border border-nucleus-border">
        <table className="w-full text-xs">
          <thead className="border-b border-nucleus-border bg-nucleus-surface">
            <tr>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
                Startup
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
                OEM Platform
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
                Type
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
                Status
              </th>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
                Verified
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-nucleus-border/50">
            {filtered.map((row) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-nucleus-surface-hover"
              >
                <td className="px-3 py-2 font-medium text-nucleus-text-primary">
                  {row.startup_url ? (
                    <a
                      href={row.startup_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-nucleus-accent transition-colors"
                    >
                      {row.startup_name}
                    </a>
                  ) : (
                    row.startup_name
                  )}
                </td>
                <td className="px-3 py-2 text-nucleus-text-secondary">
                  {row.oem_platform}
                </td>
                <td className="px-3 py-2">
                  <span className="rounded-tag bg-nucleus-surface-hover px-2 py-0.5 text-[10px] font-medium text-nucleus-text-secondary">
                    {TYPE_LABELS[row.integration_type]}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span
                    className={cn(
                      "rounded-tag border px-2 py-0.5 text-[10px] font-semibold",
                      STATUS_STYLES[row.integration_status]
                    )}
                  >
                    {STATUS_LABELS[row.integration_status]}
                  </span>
                </td>
                <td className="px-3 py-2 text-nucleus-text-muted">
                  {row.verified_at ? formatDate(row.verified_at) : "-"}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-6 text-center text-nucleus-text-muted"
                >
                  No OEM integrations match the current filters.
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
