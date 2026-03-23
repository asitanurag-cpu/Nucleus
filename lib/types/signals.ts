// ============================================================
// Types for the Signals Intel subsystem
// AgriFood Signals, Energy Signals, AgriFood Traction
// ============================================================

export type SignalVertical = "agrifood" | "energy";

export type AgriSignalType =
  | "grant_award"
  | "novel_food_regulatory"
  | "executive_hire"
  | "pilot_expansion"
  | "corporate_partnership"
  | "accelerator_graduation"
  | "patent_filing";

export type EnergySignalType =
  | "ipcei_milestone"
  | "grid_tender"
  | "ppa_signing"
  | "innovation_fund_award"
  | "executive_hire"
  | "patent_filing";

export type IntelSignalType = AgriSignalType | EnergySignalType;

export interface IntelSignal {
  id: string;
  vertical: SignalVertical;
  signal_type: IntelSignalType;
  company_name: string;
  company_id?: string;
  headline: string;
  body?: string;
  source_name: string;
  source_url: string;
  source_published_at?: string;
  fundraise_probability_score: number;
  score_last_updated_at?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface WatchlistEntry {
  id: string;
  vertical: SignalVertical;
  company_name: string;
  score: number;
  signal_count_7d: number;
  top_signal_type?: IntelSignalType;
  top_signal_headline?: string;
  generated_at: string;
  week_start: string;
}

export type BenchmarkType = "farmer_adoption" | "yield_improvement" | "cost_efficiency";

export interface TractionBenchmark {
  id: string;
  benchmark_type: BenchmarkType;
  sub_sector: string;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  geography?: string;
  crop_type?: string;
  source_name: string;
  source_url?: string;
  source_year: number;
  methodology_note?: string;
  previous_value?: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type IntegrationType =
  | "certified_partner"
  | "api_integration"
  | "data_exchange"
  | "hardware_compatible";

export type IntegrationStatus = "active" | "beta" | "deprecated" | "unverified";

export interface OEMInterop {
  id: string;
  startup_name: string;
  startup_url?: string;
  oem_name: string;
  oem_platform: string;
  integration_type: IntegrationType;
  integration_status: IntegrationStatus;
  verified_at?: string;
  source_url?: string;
  notes?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PipelineRun {
  id: string;
  subsection: string;
  source_id: string;
  source_name: string;
  status: "success" | "failed" | "retrying" | "skipped";
  records_fetched: number;
  records_inserted: number;
  records_deduplicated: number;
  error_message?: string;
  retry_count: number;
  duration_ms?: number;
  started_at: string;
  completed_at?: string;
}
