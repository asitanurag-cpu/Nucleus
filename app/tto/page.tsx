"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Building2, ExternalLink, GraduationCap } from "lucide-react";
import { ttoInstitutions } from "@/lib/data/tto-institutions";
import { intelSignals } from "@/lib/data/intel-signals";
import type { TTOInstitution } from "@/lib/types/signals";

type CountryFilter = "ALL" | TTOInstitution["country"];

const COUNTRY_LABELS: Record<TTOInstitution["country"], string> = {
  NL: "Netherlands",
  DE: "Germany",
  CH: "Switzerland",
  SE: "Sweden",
  UK: "United Kingdom",
  FR: "France",
  BE: "Belgium",
  AT: "Austria",
  DK: "Denmark",
};

export default function TTOTrackerPage() {
  const [country, setCountry] = useState<CountryFilter>("ALL");

  const institutions = useMemo(
    () =>
      country === "ALL"
        ? ttoInstitutions
        : ttoInstitutions.filter((i) => i.country === country),
    [country]
  );

  // Count pre-company signals for each institution so the card surfaces the
  // live evidence base rather than just static metadata.
  const preCompanyCounts = useMemo(() => {
    const map = new Map<string, number>();
    intelSignals
      .filter((s) => s.is_published && s.pre_company && s.institution_slug)
      .forEach((s) =>
        map.set(s.institution_slug!, (map.get(s.institution_slug!) ?? 0) + 1)
      );
    return map;
  }, []);

  const availableCountries = Array.from(
    new Set(ttoInstitutions.map((i) => i.country))
  );

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-sky-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-sky-400">
            TTO Tracker
          </span>
        </div>
        <h1 className="font-display text-3xl tracking-tight text-nucleus-text-primary md:text-4xl">
          European energy-tech technology transfer offices
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-nucleus-text-secondary">
          The layer beneath funded startups. Eight European universities and
          research institutes with a track record of energy-tech spin-outs,
          mapped to their public programmes and the pre-company signals we are
          tracking right now.
        </p>
      </div>

      {/* Country filter */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setCountry("ALL")}
          className={`rounded-tag px-3 py-1 text-xs font-semibold transition-colors ${
            country === "ALL"
              ? "bg-nucleus-accent text-white"
              : "bg-nucleus-surface text-nucleus-text-secondary hover:text-nucleus-text-primary"
          }`}
        >
          All countries
        </button>
        {availableCountries.map((c) => (
          <button
            key={c}
            onClick={() => setCountry(c)}
            className={`rounded-tag px-3 py-1 text-xs font-semibold transition-colors ${
              country === c
                ? "bg-nucleus-accent text-white"
                : "bg-nucleus-surface text-nucleus-text-secondary hover:text-nucleus-text-primary"
            }`}
          >
            {COUNTRY_LABELS[c]}
          </button>
        ))}
      </div>

      {/* Institution grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {institutions.map((inst) => {
          const count = preCompanyCounts.get(inst.slug) ?? 0;
          return (
            <article
              key={inst.slug}
              className="flex flex-col rounded-card border border-nucleus-border bg-nucleus-surface p-5 transition-all hover:border-sky-400/40"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg tracking-tight text-nucleus-text-primary">
                    {inst.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-nucleus-text-muted">
                    {inst.city} · {COUNTRY_LABELS[inst.country]}
                  </p>
                </div>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-card bg-sky-500/10 text-sky-400">
                  <Building2 className="h-4 w-4" />
                </span>
              </div>

              {inst.spinout_programme_name && inst.programme_url && (
                <a
                  href={inst.programme_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-3 inline-flex w-fit items-center gap-1 rounded-tag border border-sky-400/30 bg-sky-500/10 px-2 py-0.5 text-[11px] font-semibold text-sky-300 hover:bg-sky-500/20"
                >
                  {inst.spinout_programme_name}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}

              <p className="mb-4 flex-1 text-sm leading-relaxed text-nucleus-text-secondary">
                {inst.energy_focus_description}
              </p>

              {inst.recent_spinouts.length > 0 && (
                <div className="mb-4">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
                    Recent spin-outs
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {inst.recent_spinouts.map((s) => (
                      <span
                        key={s}
                        className="rounded-tag bg-nucleus-dark/50 px-2 py-0.5 text-[11px] text-nucleus-text-secondary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto flex items-center justify-between border-t border-nucleus-border pt-3">
                <span className="text-[11px] text-nucleus-text-muted">
                  {count} pre-company signal{count !== 1 ? "s" : ""}
                </span>
                <Link
                  href={`/signals/energy?institution=${inst.slug}`}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-nucleus-accent hover:underline"
                >
                  View signals <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-xs text-nucleus-text-muted">
        Every institution has been verified against its public programme page.
        Contact names are left blank where they are not publicly disclosed.
      </p>
    </div>
  );
}
