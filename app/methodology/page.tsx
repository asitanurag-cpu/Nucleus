import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nucleus Score Methodology | Nucleus",
  description:
    "How the Nucleus Score is calculated. Four equally weighted dimensions: Team Strength, Market Timing, Deal Velocity, and Signal Quality. Published so every score can be independently assessed.",
};

type Dimension = {
  name: string;
  points: string;
  summary: string;
  guidance: string[];
};

const DIMENSIONS: Dimension[] = [
  {
    name: "Team Strength",
    points: "0–25",
    summary:
      "Founder credibility, operating history, and ability to attract and retain senior talent.",
    guidance: [
      "Repeat founder or senior operator from a credible analogue (+8 to +12).",
      "Strong technical co-founder with domain PhD or equivalent industry record (+5 to +8).",
      "Recent senior hire from a larger industrial or software operator (+3 to +5).",
      "EIC or competitive grant exception; any signal carrying an EIC Accelerator or equivalent competitive award sets Team Strength to at least 14.",
    ],
  },
  {
    name: "Market Timing",
    points: "0–25",
    summary:
      "Regulatory, capital and demand tailwinds that make the next 24 months materially better than the last 24 months.",
    guidance: [
      "Binding regulatory trigger within 24 months (+8 to +12).",
      "Price or subsidy shift already visible in procurement behaviour (+5 to +8).",
      "Named corporate buyer signalling budget intent (+3 to +5).",
    ],
  },
  {
    name: "Deal Velocity",
    points: "0–25",
    summary:
      "How fast the company is compounding real-world evidence; pilots signed, grants awarded, hires closed, production shipped.",
    guidance: [
      "Two or more verifiable milestone events in the past 90 days (+10 to +15).",
      "One verifiable milestone event in the past 90 days (+5 to +10).",
      "Public roadmap with dated commitments and no visible slippage (+3 to +5).",
    ],
  },
  {
    name: "Signal Quality",
    points: "0–25",
    summary:
      "How defensible the underlying source is. Regulator databases and patent registers outrank press releases and blog posts.",
    guidance: [
      "Regulator database, EPO register or CORDIS entry (+18 to +22 floor).",
      "Institutional grant award (RVO, EIC, NWO, Innovate UK) (+15 to +20 floor).",
      "Direct company disclosure with named source (+10 to +14 floor).",
      "Press article or third-party summary only (+5 to +9 ceiling).",
    ],
  },
];

const SIGNAL_FLOORS: { type: string; floor: string }[] = [
  { type: "Grant award (RVO, EIC, NWO)", floor: "Signal Quality ≥ 18" },
  { type: "CORDIS project completion", floor: "Signal Quality ≥ 16" },
  { type: "Patent granted (EPO)", floor: "Signal Quality ≥ 16" },
  { type: "Patent filed", floor: "Signal Quality ≥ 12" },
  { type: "Spinout programme acceptance", floor: "Signal Quality ≥ 14" },
  { type: "Executive hire (verified)", floor: "Signal Quality ≥ 12" },
  { type: "Pilot signed with named buyer", floor: "Signal Quality ≥ 14" },
  { type: "Press release or news article", floor: "Signal Quality ≥ 8" },
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 lg:px-6 lg:py-16">
      <Link
        href="/signals"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-nucleus-text-muted transition-colors hover:text-nucleus-text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Signals
      </Link>

      <div className="mb-10">
        <div className="mb-2 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-nucleus-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-accent">
            Methodology
          </span>
        </div>
        <h1 className="font-display text-4xl tracking-tight text-nucleus-text-primary md:text-5xl">
          How the Nucleus Score is calculated
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-nucleus-text-secondary">
          Every signal on Nucleus carries a Nucleus Score between 0 and 100. The
          score is a composite of four equally weighted dimensions. Publishing
          the rubric is part of the product: if you disagree with a score, you
          can see which inputs to push back on.
        </p>
      </div>

      <section className="mb-12 rounded-card border border-nucleus-border bg-nucleus-surface p-6">
        <h2 className="font-display text-2xl tracking-tight text-nucleus-text-primary">
          The four dimensions
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-nucleus-text-secondary">
          Each dimension contributes up to 25 points. The score is the sum of
          the four, capped at 100. Scores at or above 75 are tracked as High
          Conviction; scores of 70 to 74 are the pre-funding watchlist band.
        </p>
        <div className="mt-6 space-y-5">
          {DIMENSIONS.map((d) => (
            <div
              key={d.name}
              className="rounded-card border border-nucleus-border bg-nucleus-dark/40 p-5"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg text-nucleus-text-primary">
                  {d.name}
                </h3>
                <span className="font-mono text-xs text-nucleus-accent">
                  {d.points} points
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-nucleus-text-secondary">
                {d.summary}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-nucleus-text-secondary">
                {d.guidance.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 rounded-card border border-nucleus-border bg-nucleus-surface p-6">
        <h2 className="font-display text-2xl tracking-tight text-nucleus-text-primary">
          Signal Quality floors by source type
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-nucleus-text-secondary">
          Each signal type carries a Signal Quality floor. Floors exist so that
          a verified regulator or grant award cannot be undercut by weaker
          supporting evidence elsewhere in the rubric.
        </p>
        <div className="mt-6 overflow-hidden rounded-card border border-nucleus-border">
          <table className="w-full text-sm">
            <thead className="bg-nucleus-dark/40">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
                  Signal type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
                  Signal Quality floor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nucleus-border">
              {SIGNAL_FLOORS.map((s) => (
                <tr key={s.type} className="bg-nucleus-surface">
                  <td className="px-4 py-3 text-nucleus-text-primary">{s.type}</td>
                  <td className="px-4 py-3 font-mono text-nucleus-text-secondary">
                    {s.floor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12 rounded-card border border-nucleus-border bg-nucleus-surface p-6">
        <h2 className="font-display text-2xl tracking-tight text-nucleus-text-primary">
          The EIC and competitive-grant exception
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-nucleus-text-secondary">
          A competitive grant award from the EIC Accelerator, the Dutch DEI+ or
          MOOI programmes, NWO, or an equivalent peer-reviewed European
          programme, triggers an automatic floor on Team Strength of at least
          14. These programmes apply independent technical diligence and their
          award is, by itself, a meaningful signal about team quality; the
          rubric reflects that.
        </p>
      </section>

      <section className="mb-12 rounded-card border border-nucleus-border bg-nucleus-surface p-6">
        <h2 className="font-display text-2xl tracking-tight text-nucleus-text-primary">
          Bands and what they mean
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-nucleus-text-secondary">
          <li>
            <span className="font-semibold text-emerald-400">75–100 High Conviction.</span>{" "}
            Strong on at least three dimensions, typically with a regulator or
            grant-grade source.
          </li>
          <li>
            <span className="font-semibold text-nucleus-accent">70–74 Watchlist.</span>{" "}
            Pre-funding band; companies compounding evidence that a round is
            within 90 days.
          </li>
          <li>
            <span className="font-semibold text-amber-400">50–69 Monitor.</span>{" "}
            Early but credible; worth an analyst note in the weekly review.
          </li>
          <li>
            <span className="font-semibold text-nucleus-text-muted">Below 50 Noise.</span>{" "}
            Recorded for completeness; not surfaced in primary feeds.
          </li>
        </ul>
      </section>

      <p className="text-xs text-nucleus-text-muted">
        Methodology last updated April 2026. If a score looks wrong, email
        feedback with the signal ID and we will review.
      </p>
    </div>
  );
}
