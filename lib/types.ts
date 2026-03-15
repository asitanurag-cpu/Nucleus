export type SectorTag =
  | "ai_infra" | "devtools" | "software_infra" | "b2b_saas" | "novel_compute"
  | "climate_tech" | "industrial_tech" | "medtech" | "healthtech"
  | "fintech" | "deeptech" | "defence_tech" | "edtech"
  | "marketplace" | "consumer" | "biotech" | "quantum"
  | "robotics" | "cybersecurity" | "proptech" | "mobility"
  | "energy" | "agritech" | "spacetech" | "semiconductor";

export type StageTag = "pre_seed" | "seed" | "series_a" | "series_b" | "series_c" | "growth";

export type SignalType = "GRANT_AWARDED" | "ACCELERATOR" | "PRODUCT_LAUNCH" | "HIRING" | "SPINOUT" | "PATENT";

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  body: string;
  cover_image: string;
  author: string;
  sector_tags: SectorTag[];
  stage_tags: StageTag[];
  country_tags: string[];
  reading_time_minutes: number;
  published_at: string;
  updated_at: string;
  is_featured: boolean;
  status: "draft" | "published";
  seo_title: string;
  seo_description: string;
}

export interface FounderBrief {
  name: string;
  role: string;
  linkedin_url: string;
  background: string;
}

export interface Signal {
  id: string;
  startup_slug: string;
  startup_name: string;
  startup_description: string;
  signal_type: SignalType;
  signal_detail: string;
  analyst_note: string;
  sector_tags: SectorTag[];
  country: string;
  city: string;
  signal_date: string;
  signal_score: number;
  founding_team: FounderBrief[];
  product_url: string;
  estimated_stage: "pre_seed" | "seed" | "series_a";
  cover_image_url?: string;
  added_at: string;
  source_url: string;
  description?: string;
}

export interface FundingRound {
  id: string;
  startup_name: string;
  startup_url: string;
  startup_description: string;
  amount: number;
  currency: "EUR" | "USD" | "GBP" | "CHF" | "SEK" | "NOK" | "DKK";
  amount_usd: number;
  stage: StageTag | "undisclosed";
  lead_investors: string[];
  other_investors: string[];
  sector_tags: SectorTag[];
  country: string;
  city: string;
  date_announced: string;
  source_url: string;
  added_at: string;
  description?: string;
}

export interface Partner {
  name: string;
  role: string;
  linkedin_url: string;
  focus_areas: string[];
}

export interface RecentInvestment {
  startup_name: string;
  amount: string;
  stage: string;
  date: string;
  source_url: string;
}

export interface VCReview {
  id: string;
  reviewer_id: string;
  received_funding: boolean;
  interaction_stage: "intro_call" | "full_diligence" | "term_sheet" | "funded";
  rating_responsiveness: number;
  rating_diligence_speed: number;
  rating_term_fairness: number;
  rating_value_add: number;
  review_text: string;
  submitted_at: string;
  is_approved: boolean;
}

export interface VCFirm {
  id: string;
  slug: string;
  name: string;
  logo_url: string;
  website_url: string;
  description: string;
  hq_city: string;
  hq_country: string;
  year_founded: number;
  aum: string;
  stage_focus: StageTag[];
  sector_thesis: SectorTag[];
  geographic_coverage: string[];
  cheque_size_min: number;
  cheque_size_max: number;
  fund_status: "actively_deploying" | "fundraising" | "fully_deployed";
  key_partners: Partner[];
  recent_investments: RecentInvestment[];
  activity_score: number;
  is_claimed: boolean;
  reviews: VCReview[];
  added_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  job_title: string;
  company_name: string;
  user_type: "founder" | "investor" | "researcher" | "other";
  created_at: string;
  last_login: string;
  newsletter_subscribed: boolean;
  bookmarked_signals: string[];
  bookmarked_vcs: string[];
}

export interface Playbook {
  id: string;
  slug: string;
  title: string;
  description: string;
  topic_tags: string[];
  reading_time_minutes: number;
  content: string;
}
