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
  | "patent_filing"
  | "rvo_grant_award"
  | "nwo_research_award"
  | "kvk_spinoff"
  // Pre-company signal types; describe events before a company exists.
  | "patent_granted"
  | "cordis_completion"
  | "spinout_programme_acceptance";

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
  // Pre-company signal fields (see PRD P1-09). When pre_company is true, the
  // company_name field may hold a research group or PI label and the signal
  // is grouped against an institution rather than a company.
  pre_company?: boolean;
  institution_slug?: string;
}

export interface TTOInstitution {
  slug: string;
  name: string;
  city: string;
  country: "NL" | "DE" | "CH" | "SE" | "UK" | "FR" | "BE" | "AT" | "DK";
  spinout_programme_name?: string;
  programme_url?: string;
  tto_contact_name?: string;
  tto_contact_email?: string;
  energy_focus_description: string;
  recent_spinouts: string[];
  active_opportunities?: number;
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
