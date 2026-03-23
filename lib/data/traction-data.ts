import type { TractionBenchmark, OEMInterop } from "@/lib/types/signals";

// ============================================================
// Mock AgriFood Traction benchmark + OEM interoperability data
// ============================================================

export const benchmarks: TractionBenchmark[] = [
  // ── Farmer Adoption ───────────────────────────────────────
  {
    id: "b-001", benchmark_type: "farmer_adoption", sub_sector: "Precision Agriculture",
    metric_name: "Adoption rate (% of addressable farms)", metric_value: 12.3, metric_unit: "%",
    geography: "Western Europe", source_name: "CORDIS SMART-AGRI", source_year: 2025,
    previous_value: 9.1, is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-002", benchmark_type: "farmer_adoption", sub_sector: "Alternative Protein",
    metric_name: "Retail availability (% of EU supermarkets stocking)", metric_value: 8.7, metric_unit: "%",
    geography: "EU-27", source_name: "EIT Food Consumer Report", source_year: 2025,
    previous_value: 5.2, is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-003", benchmark_type: "farmer_adoption", sub_sector: "Vertical Farming",
    metric_name: "Commercial facilities operating", metric_value: 47, metric_unit: "facilities",
    geography: "EU-27", source_name: "CORDIS VertiFarm Report", source_year: 2025,
    previous_value: 32, is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-004", benchmark_type: "farmer_adoption", sub_sector: "Food Waste Reduction",
    metric_name: "Farm-level waste reduction adoption", metric_value: 15.8, metric_unit: "%",
    geography: "Western Europe", source_name: "EIT Food Waste Report", source_year: 2025,
    previous_value: 11.2, is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-005", benchmark_type: "farmer_adoption", sub_sector: "Agri Biotech",
    metric_name: "Biocontrol product adoption rate", metric_value: 22.1, metric_unit: "%",
    geography: "France", source_name: "ARVALIS 2025 Report", source_year: 2025,
    previous_value: 18.5, is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-006", benchmark_type: "farmer_adoption", sub_sector: "Supply Chain Traceability",
    metric_name: "Blockchain traceability adoption", metric_value: 4.2, metric_unit: "%",
    geography: "EU-27", source_name: "EIT Food Digital Report", source_year: 2025,
    previous_value: 2.1, is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },

  // ── Yield Improvement ─────────────────────────────────────
  {
    id: "b-010", benchmark_type: "yield_improvement", sub_sector: "Precision Agriculture",
    metric_name: "Yield improvement", metric_value: 18, metric_unit: "%",
    geography: "France", crop_type: "Wheat",
    source_name: "ARVALIS 2025 Trial", source_year: 2025, methodology_note: "5-year multi-site randomised trial, 12 farms",
    is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-011", benchmark_type: "yield_improvement", sub_sector: "Agri Biotech",
    metric_name: "Yield improvement", metric_value: 23, metric_unit: "%",
    geography: "Germany", crop_type: "Maize",
    source_name: "DLG Field Trial 2025", source_year: 2025, methodology_note: "3-year controlled trial with biocontrol agents",
    is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-012", benchmark_type: "yield_improvement", sub_sector: "Precision Agriculture",
    metric_name: "Yield improvement", metric_value: 14, metric_unit: "%",
    geography: "Spain", crop_type: "Barley",
    source_name: "CORDIS AgriSmart", source_year: 2025, methodology_note: "Variable-rate application study, 8 farms",
    is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-013", benchmark_type: "yield_improvement", sub_sector: "Vertical Farming",
    metric_name: "Yield improvement", metric_value: 340, metric_unit: "%",
    geography: "Netherlands", crop_type: "Lettuce",
    source_name: "WUR Indoor Ag Study", source_year: 2025, methodology_note: "vs. open-field baseline, per sqm",
    is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-014", benchmark_type: "yield_improvement", sub_sector: "Agri Biotech",
    metric_name: "Yield improvement", metric_value: 16, metric_unit: "%",
    geography: "UK", crop_type: "Wheat",
    source_name: "ADAS Trial Report", source_year: 2025, methodology_note: "Biostimulant application, 6 sites",
    is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-015", benchmark_type: "yield_improvement", sub_sector: "Precision Agriculture",
    metric_name: "Yield improvement", metric_value: 21, metric_unit: "%",
    geography: "Italy", crop_type: "Tomato",
    source_name: "CORDIS SmartIrri", source_year: 2025, methodology_note: "AI-driven irrigation scheduling, 4 farms",
    is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-016", benchmark_type: "yield_improvement", sub_sector: "Precision Agriculture",
    metric_name: "Yield improvement", metric_value: 12, metric_unit: "%",
    geography: "Germany", crop_type: "Sugar Beet",
    source_name: "DLG Precision Report", source_year: 2025, methodology_note: "Drone + satellite NDVI, 10 farms",
    is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-017", benchmark_type: "yield_improvement", sub_sector: "Agri Biotech",
    metric_name: "Yield improvement", metric_value: 19, metric_unit: "%",
    geography: "France", crop_type: "Rapeseed",
    source_name: "ARVALIS Biocontrol", source_year: 2025, methodology_note: "Microbial seed treatment trial",
    is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },

  // ── Cost Efficiency ───────────────────────────────────────
  {
    id: "b-020", benchmark_type: "cost_efficiency", sub_sector: "Precision Agriculture",
    metric_name: "Cost reduction", metric_value: 45, metric_unit: "EUR/ha",
    geography: "Western Europe", source_name: "CORDIS CostEff Study", source_year: 2025,
    is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-021", benchmark_type: "cost_efficiency", sub_sector: "Food Waste Reduction",
    metric_name: "Post-harvest loss reduction value", metric_value: 120, metric_unit: "EUR/tonne",
    geography: "EU-27", source_name: "EIT Food Waste Economics", source_year: 2025,
    is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-022", benchmark_type: "cost_efficiency", sub_sector: "Vertical Farming",
    metric_name: "Operating cost per kg", metric_value: 3.2, metric_unit: "EUR/kg",
    geography: "Netherlands", source_name: "WUR Cost Analysis", source_year: 2025,
    previous_value: 4.8, is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "b-023", benchmark_type: "cost_efficiency", sub_sector: "Agri Biotech",
    metric_name: "Input cost savings", metric_value: 32, metric_unit: "EUR/ha",
    geography: "France", source_name: "ARVALIS Economics", source_year: 2025,
    is_published: true, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
];

export const oemData: OEMInterop[] = [
  {
    id: "oem-001", startup_name: "Ecorobotix", startup_url: "https://ecorobotix.com",
    oem_name: "John Deere", oem_platform: "John Deere Operations Center",
    integration_type: "certified_partner", integration_status: "active",
    verified_at: "2026-02-15T00:00:00Z", source_url: "https://developer.deere.com",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-02-15T00:00:00Z",
  },
  {
    id: "oem-002", startup_name: "Augmenta", startup_url: "https://augmenta.ag",
    oem_name: "Trimble", oem_platform: "Trimble Ag Software",
    integration_type: "api_integration", integration_status: "active",
    verified_at: "2026-01-20T00:00:00Z",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-20T00:00:00Z",
  },
  {
    id: "oem-003", startup_name: "CropX", startup_url: "https://cropx.com",
    oem_name: "John Deere", oem_platform: "John Deere Operations Center",
    integration_type: "api_integration", integration_status: "active",
    verified_at: "2026-02-10T00:00:00Z",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-02-10T00:00:00Z",
  },
  {
    id: "oem-004", startup_name: "Solynta", startup_url: "https://solynta.com",
    oem_name: "AGCO", oem_platform: "AGCO Fuse",
    integration_type: "data_exchange", integration_status: "beta",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "oem-005", startup_name: "Agrimetrics", startup_url: "https://agrimetrics.co.uk",
    oem_name: "John Deere", oem_platform: "John Deere Operations Center",
    integration_type: "api_integration", integration_status: "active",
    verified_at: "2026-03-01T00:00:00Z",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-03-01T00:00:00Z",
  },
  {
    id: "oem-006", startup_name: "Ecorobotix", startup_url: "https://ecorobotix.com",
    oem_name: "AGCO", oem_platform: "AGCO Fuse",
    integration_type: "hardware_compatible", integration_status: "active",
    verified_at: "2026-01-15T00:00:00Z",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "oem-007", startup_name: "Traces AI",
    oem_name: "Trimble", oem_platform: "Trimble Ag Software",
    integration_type: "api_integration", integration_status: "active",
    verified_at: "2026-02-01T00:00:00Z",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-02-01T00:00:00Z",
  },
  {
    id: "oem-008", startup_name: "CropX", startup_url: "https://cropx.com",
    oem_name: "CNH Industrial", oem_platform: "CNH Industrial PLM Connect",
    integration_type: "data_exchange", integration_status: "active",
    verified_at: "2026-01-25T00:00:00Z",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-25T00:00:00Z",
  },
  {
    id: "oem-009", startup_name: "Augmenta", startup_url: "https://augmenta.ag",
    oem_name: "CLAAS", oem_platform: "CLAAS EASY",
    integration_type: "hardware_compatible", integration_status: "active",
    verified_at: "2026-02-20T00:00:00Z",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-02-20T00:00:00Z",
  },
  {
    id: "oem-010", startup_name: "Infarm",
    oem_name: "John Deere", oem_platform: "John Deere Operations Center",
    integration_type: "data_exchange", integration_status: "unverified",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "oem-011", startup_name: "Planet Farms",
    oem_name: "Trimble", oem_platform: "Trimble Ag Software",
    integration_type: "api_integration", integration_status: "beta",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "oem-012", startup_name: "Ecorobotix", startup_url: "https://ecorobotix.com",
    oem_name: "CNH Industrial", oem_platform: "CNH Industrial PLM Connect",
    integration_type: "certified_partner", integration_status: "active",
    verified_at: "2026-03-05T00:00:00Z", source_url: "https://cnhindustrial.com/partners",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-03-05T00:00:00Z",
  },
  {
    id: "oem-013", startup_name: "CropX", startup_url: "https://cropx.com",
    oem_name: "AGCO", oem_platform: "AGCO Fuse",
    integration_type: "api_integration", integration_status: "active",
    verified_at: "2026-02-28T00:00:00Z",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-02-28T00:00:00Z",
  },
  {
    id: "oem-014", startup_name: "Augmenta", startup_url: "https://augmenta.ag",
    oem_name: "John Deere", oem_platform: "John Deere Operations Center",
    integration_type: "certified_partner", integration_status: "active",
    verified_at: "2026-03-10T00:00:00Z", source_url: "https://developer.deere.com",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-03-10T00:00:00Z",
  },
  {
    id: "oem-015", startup_name: "Solynta", startup_url: "https://solynta.com",
    oem_name: "Trimble", oem_platform: "Trimble Ag Software",
    integration_type: "data_exchange", integration_status: "active",
    verified_at: "2026-01-30T00:00:00Z",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-30T00:00:00Z",
  },
  {
    id: "oem-016", startup_name: "Agrimetrics", startup_url: "https://agrimetrics.co.uk",
    oem_name: "AGCO", oem_platform: "AGCO Fuse",
    integration_type: "api_integration", integration_status: "active",
    verified_at: "2026-02-12T00:00:00Z",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-02-12T00:00:00Z",
  },
  {
    id: "oem-017", startup_name: "Traces AI",
    oem_name: "CLAAS", oem_platform: "CLAAS EASY",
    integration_type: "data_exchange", integration_status: "beta",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "oem-018", startup_name: "Planet Farms",
    oem_name: "John Deere", oem_platform: "John Deere Operations Center",
    integration_type: "data_exchange", integration_status: "unverified",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "oem-019", startup_name: "Infarm",
    oem_name: "AGCO", oem_platform: "AGCO Fuse",
    integration_type: "api_integration", integration_status: "deprecated",
    notes: "Integration deprecated after Infarm restructuring in 2025",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "oem-020", startup_name: "CropX", startup_url: "https://cropx.com",
    oem_name: "CLAAS", oem_platform: "CLAAS EASY",
    integration_type: "hardware_compatible", integration_status: "active",
    verified_at: "2026-03-08T00:00:00Z",
    is_published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-03-08T00:00:00Z",
  },
];
