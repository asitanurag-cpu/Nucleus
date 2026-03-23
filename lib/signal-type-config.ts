// ============================================================
// Signal type display config for Intel signals
// Maps signal_type to human label and chip styling
// ============================================================

export const INTEL_SIGNAL_TYPE_CONFIG: Record<
  string,
  { label: string; chipClass: string }
> = {
  // AgriFood types
  grant_award: {
    label: "Grant Award",
    chipClass: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  },
  novel_food_regulatory: {
    label: "Novel Food",
    chipClass: "bg-purple-500/15 text-purple-400 border border-purple-500/20",
  },
  executive_hire: {
    label: "Executive Hire",
    chipClass: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20",
  },
  pilot_expansion: {
    label: "Pilot Expansion",
    chipClass: "bg-teal-500/15 text-teal-400 border border-teal-500/20",
  },
  corporate_partnership: {
    label: "Partnership",
    chipClass: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20",
  },
  accelerator_graduation: {
    label: "Accelerator Grad",
    chipClass: "bg-pink-500/15 text-pink-400 border border-pink-500/20",
  },
  patent_filing: {
    label: "Patent Filing",
    chipClass: "bg-orange-500/15 text-orange-400 border border-orange-500/20",
  },
  // Energy types
  ipcei_milestone: {
    label: "IPCEI Milestone",
    chipClass: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  },
  grid_tender: {
    label: "Grid Tender",
    chipClass: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
  },
  ppa_signing: {
    label: "PPA Signed",
    chipClass: "bg-lime-500/15 text-lime-400 border border-lime-500/20",
  },
  innovation_fund_award: {
    label: "Innovation Fund",
    chipClass: "bg-violet-500/15 text-violet-400 border border-violet-500/20",
  },
};

// Score colour mapping: grey < 40, amber 40-69, green >= 70
export function getIntelScoreStyle(score: number) {
  if (score >= 70)
    return {
      bg: "bg-emerald-500/20",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      label: "High",
    };
  if (score >= 40)
    return {
      bg: "bg-amber-500/20",
      text: "text-amber-400",
      border: "border-amber-500/30",
      label: "Medium",
    };
  return {
    bg: "bg-zinc-500/20",
    text: "text-zinc-400",
    border: "border-zinc-500/30",
    label: "Low",
  };
}
