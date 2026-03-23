-- ============================================================
-- Nucleus Signals Tab — Full Schema Migration
-- Run against Supabase SQL Editor or via supabase db push
-- ============================================================

-- Required extension for deduplication similarity matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ============================================================
-- TABLE: signals
-- ============================================================
CREATE TABLE public.signals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical        TEXT NOT NULL CHECK (vertical IN ('agrifood', 'energy')),
  signal_type     TEXT NOT NULL,
  company_name    TEXT NOT NULL,
  company_id      UUID,
  headline        TEXT NOT NULL,
  body            TEXT,
  source_name     TEXT NOT NULL,
  source_url      TEXT NOT NULL,
  source_published_at TIMESTAMPTZ,
  fundraise_probability_score INTEGER NOT NULL DEFAULT 0
    CHECK (fundraise_probability_score >= 0 AND fundraise_probability_score <= 100),
  score_last_updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_published    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_signals_vertical ON public.signals (vertical);
CREATE INDEX idx_signals_vertical_type ON public.signals (vertical, signal_type);
CREATE INDEX idx_signals_company ON public.signals (company_name);
CREATE INDEX idx_signals_score ON public.signals (fundraise_probability_score DESC);
CREATE INDEX idx_signals_published_at ON public.signals (source_published_at DESC);
CREATE INDEX idx_signals_created_at ON public.signals (created_at DESC);

ALTER TABLE public.signals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published signals"
  ON public.signals FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Service role full access"
  ON public.signals FOR ALL
  USING (auth.role() = 'service_role');

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER signals_updated_at
  BEFORE UPDATE ON public.signals
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- TABLE: signals_config
-- ============================================================
CREATE TABLE public.signals_config (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical        TEXT NOT NULL UNIQUE CHECK (vertical IN ('agrifood', 'energy')),
  scoring_weights JSONB NOT NULL,
  score_decay_points  INTEGER NOT NULL DEFAULT 5,
  decay_interval_days INTEGER NOT NULL DEFAULT 7,
  score_floor         INTEGER NOT NULL DEFAULT 0,
  watchlist_threshold INTEGER NOT NULL DEFAULT 70,
  watchlist_size      INTEGER NOT NULL DEFAULT 10,
  sources JSONB NOT NULL DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.signals_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read config"
  ON public.signals_config FOR SELECT USING (TRUE);

CREATE POLICY "Service role full access on config"
  ON public.signals_config FOR ALL
  USING (auth.role() = 'service_role');

CREATE TRIGGER signals_config_updated_at
  BEFORE UPDATE ON public.signals_config
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- TABLE: agrifood_traction_benchmarks
-- ============================================================
CREATE TABLE public.agrifood_traction_benchmarks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  benchmark_type  TEXT NOT NULL CHECK (benchmark_type IN (
    'farmer_adoption', 'yield_improvement', 'cost_efficiency'
  )),
  sub_sector      TEXT NOT NULL,
  metric_name     TEXT NOT NULL,
  metric_value    NUMERIC NOT NULL,
  metric_unit     TEXT NOT NULL,
  geography       TEXT,
  crop_type       TEXT,
  source_name     TEXT NOT NULL,
  source_url      TEXT,
  source_year     INTEGER NOT NULL,
  methodology_note TEXT,
  is_published    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_benchmarks_type ON public.agrifood_traction_benchmarks (benchmark_type);
CREATE INDEX idx_benchmarks_sector ON public.agrifood_traction_benchmarks (sub_sector);

ALTER TABLE public.agrifood_traction_benchmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published benchmarks"
  ON public.agrifood_traction_benchmarks FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Service role full access on benchmarks"
  ON public.agrifood_traction_benchmarks FOR ALL
  USING (auth.role() = 'service_role');

CREATE TRIGGER benchmarks_updated_at
  BEFORE UPDATE ON public.agrifood_traction_benchmarks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- TABLE: oem_interoperability
-- ============================================================
CREATE TABLE public.oem_interoperability (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_name    TEXT NOT NULL,
  startup_url     TEXT,
  oem_name        TEXT NOT NULL,
  oem_platform    TEXT NOT NULL,
  integration_type TEXT NOT NULL CHECK (integration_type IN (
    'certified_partner', 'api_integration', 'data_exchange', 'hardware_compatible'
  )),
  integration_status TEXT NOT NULL DEFAULT 'active' CHECK (
    integration_status IN ('active', 'beta', 'deprecated', 'unverified')
  ),
  verified_at     TIMESTAMPTZ,
  source_url      TEXT,
  notes           TEXT,
  is_published    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_oem_startup ON public.oem_interoperability (startup_name);
CREATE INDEX idx_oem_name ON public.oem_interoperability (oem_name);
CREATE INDEX idx_oem_platform ON public.oem_interoperability (oem_platform);

ALTER TABLE public.oem_interoperability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published OEM records"
  ON public.oem_interoperability FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Service role full access on OEM"
  ON public.oem_interoperability FOR ALL
  USING (auth.role() = 'service_role');

CREATE TRIGGER oem_updated_at
  BEFORE UPDATE ON public.oem_interoperability
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- TABLE: pipeline_runs
-- ============================================================
CREATE TABLE public.pipeline_runs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subsection      TEXT NOT NULL CHECK (subsection IN (
    'agrifood', 'energy', 'agrifood-traction', 'overview'
  )),
  source_id       TEXT NOT NULL,
  source_name     TEXT NOT NULL,
  status          TEXT NOT NULL CHECK (status IN (
    'success', 'failed', 'retrying', 'skipped'
  )),
  records_fetched INTEGER DEFAULT 0,
  records_inserted INTEGER DEFAULT 0,
  records_deduplicated INTEGER DEFAULT 0,
  error_message   TEXT,
  retry_count     INTEGER NOT NULL DEFAULT 0,
  duration_ms     INTEGER,
  started_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at    TIMESTAMPTZ
);

CREATE INDEX idx_pipeline_subsection ON public.pipeline_runs (subsection, started_at DESC);
CREATE INDEX idx_pipeline_status ON public.pipeline_runs (status);
CREATE INDEX idx_pipeline_source ON public.pipeline_runs (source_id, started_at DESC);

ALTER TABLE public.pipeline_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read pipeline runs"
  ON public.pipeline_runs FOR SELECT
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Service role insert pipeline runs"
  ON public.pipeline_runs FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- ============================================================
-- TABLE: weekly_watchlists
-- ============================================================
CREATE TABLE public.weekly_watchlists (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical        TEXT NOT NULL CHECK (vertical IN ('agrifood', 'energy')),
  company_name    TEXT NOT NULL,
  score           INTEGER NOT NULL,
  signal_count_7d INTEGER NOT NULL DEFAULT 0,
  top_signal_type TEXT,
  top_signal_headline TEXT,
  generated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  week_start      DATE NOT NULL
);

CREATE INDEX idx_watchlist_vertical_week ON public.weekly_watchlists (vertical, week_start DESC);

ALTER TABLE public.weekly_watchlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read watchlists"
  ON public.weekly_watchlists FOR SELECT USING (TRUE);

CREATE POLICY "Service role full access on watchlists"
  ON public.weekly_watchlists FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- SEED: signals_config
-- ============================================================
INSERT INTO public.signals_config (vertical, scoring_weights, sources)
VALUES (
  'agrifood',
  '{
    "grant_award": 25,
    "novel_food_regulatory": 15,
    "executive_hire": 20,
    "pilot_expansion": 15,
    "corporate_partnership": 10,
    "accelerator_graduation": 5,
    "patent_filing": 10
  }'::JSONB,
  '[]'::JSONB
);

INSERT INTO public.signals_config (vertical, scoring_weights, sources)
VALUES (
  'energy',
  '{
    "ipcei_milestone": 25,
    "grid_tender": 20,
    "ppa_signing": 20,
    "innovation_fund_award": 15,
    "executive_hire": 10,
    "patent_filing": 10
  }'::JSONB,
  '[]'::JSONB
);

-- ============================================================
-- pg_cron JOBS (run in Supabase SQL Editor after schema creation)
-- ============================================================

-- 1. Daily score decay at 01:00 UTC
-- SELECT cron.schedule('daily-score-decay', '0 1 * * *', $$
--   WITH stale_companies AS (
--     SELECT DISTINCT s.company_name, s.vertical
--     FROM public.signals s
--     WHERE s.fundraise_probability_score > 0
--     GROUP BY s.company_name, s.vertical
--     HAVING MAX(s.created_at) < NOW() - INTERVAL '7 days'
--   )
--   UPDATE public.signals
--   SET
--     fundraise_probability_score = GREATEST(
--       fundraise_probability_score - (
--         SELECT score_decay_points FROM public.signals_config
--         WHERE signals_config.vertical = signals.vertical
--       ),
--       (SELECT score_floor FROM public.signals_config
--        WHERE signals_config.vertical = signals.vertical)
--     ),
--     score_last_updated_at = NOW()
--   FROM stale_companies sc
--   WHERE signals.company_name = sc.company_name
--     AND signals.vertical = sc.vertical;
-- $$);

-- 2. Monthly pipeline log cleanup
-- SELECT cron.schedule('monthly-pipeline-log-cleanup', '0 4 1 * *', $$
--   DELETE FROM public.pipeline_runs WHERE started_at < NOW() - INTERVAL '90 days';
-- $$);
