import { SectorTag, StageTag, SignalType } from "./types";

export const EUROPEAN_COUNTRIES = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Czech Republic", "Denmark",
  "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland",
  "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Netherlands",
  "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia",
  "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom",
] as const;

export const SECTOR_LABELS: Record<SectorTag, string> = {
  ai_infra: "AI Infra",
  devtools: "DevTools",
  software_infra: "Software Infra",
  b2b_saas: "B2B SaaS",
  novel_compute: "Novel Compute",
  climate_tech: "Climate Tech",
  industrial_tech: "Industrial Tech",
  medtech: "MedTech",
  healthtech: "HealthTech",
  fintech: "FinTech",
  deeptech: "DeepTech",
  defence_tech: "Defence Tech",
  edtech: "EdTech",
  marketplace: "Marketplace",
  consumer: "Consumer",
  biotech: "BioTech",
  quantum: "Quantum",
  robotics: "Robotics",
  cybersecurity: "Cybersecurity",
  proptech: "PropTech",
  mobility: "Mobility",
  energy: "Energy",
  agritech: "AgriTech",
  spacetech: "SpaceTech",
  semiconductor: "Semiconductor",
};

export const STAGE_LABELS: Record<StageTag, string> = {
  pre_seed: "Pre-Seed",
  seed: "Seed",
  series_a: "Series A",
  series_b: "Series B",
  series_c: "Series C",
  growth: "Growth",
};

export const STAGE_COLORS: Record<StageTag, string> = {
  pre_seed: "bg-gray-500/20 text-gray-300",
  seed: "bg-emerald-500/20 text-emerald-400",
  series_a: "bg-blue-500/20 text-blue-400",
  series_b: "bg-purple-500/20 text-purple-400",
  series_c: "bg-amber-500/20 text-amber-400",
  growth: "bg-red-500/20 text-red-400",
};

export const SIGNAL_TYPE_CONFIG: Record<SignalType, { label: string; color: string; emoji: string }> = {
  GRANT_AWARDED: { label: "Grant Awarded", color: "bg-emerald-500/20 text-emerald-400", emoji: "🟢" },
  ACCELERATOR: { label: "Accelerator", color: "bg-blue-500/20 text-blue-400", emoji: "🔵" },
  PRODUCT_LAUNCH: { label: "Product Launch", color: "bg-purple-500/20 text-purple-400", emoji: "🟣" },
  HIRING: { label: "Key Hiring", color: "bg-amber-500/20 text-amber-400", emoji: "🟡" },
  SPINOUT: { label: "Spinout", color: "bg-red-500/20 text-red-400", emoji: "🔴" },
  PATENT: { label: "Patent Filed", color: "bg-gray-500/20 text-gray-300", emoji: "⚪" },
};

export const SIGNAL_TYPE_WEIGHTS: Record<SignalType, number> = {
  GRANT_AWARDED: 20,
  ACCELERATOR: 25,
  PRODUCT_LAUNCH: 15,
  HIRING: 15,
  SPINOUT: 20,
  PATENT: 10,
};
