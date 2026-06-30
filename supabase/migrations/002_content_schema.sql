-- ============================================================
-- Nucleus Content Tables — Funding Rounds & VC Firms
-- Run after 001_signals_schema.sql
-- ============================================================

-- ============================================================
-- TABLE: funding_rounds
-- ============================================================
CREATE TABLE public.funding_rounds (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_name    TEXT NOT NULL,
  startup_url     TEXT,
  startup_description TEXT,
  amount          NUMERIC NOT NULL,
  currency        TEXT NOT NULL DEFAULT 'EUR' CHECK (currency IN ('EUR', 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK')),
  amount_usd      NUMERIC,
  stage           TEXT NOT NULL,
  lead_investors  JSONB NOT NULL DEFAULT '[]'::JSONB,
  other_investors JSONB NOT NULL DEFAULT '[]'::JSONB,
  sector_tags     JSONB NOT NULL DEFAULT '[]'::JSONB,
  country         TEXT NOT NULL,
  city            TEXT,
  date_announced  DATE NOT NULL,
  source_url      TEXT,
  description     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_funding_date ON public.funding_rounds (date_announced DESC);
CREATE INDEX idx_funding_country ON public.funding_rounds (country);
CREATE INDEX idx_funding_stage ON public.funding_rounds (stage);

ALTER TABLE public.funding_rounds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read funding rounds"
  ON public.funding_rounds FOR SELECT USING (TRUE);

CREATE POLICY "Service role full access on funding"
  ON public.funding_rounds FOR ALL
  USING (auth.role() = 'service_role');

CREATE TRIGGER funding_rounds_updated_at
  BEFORE UPDATE ON public.funding_rounds
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- TABLE: vc_firms
-- ============================================================
CREATE TABLE public.vc_firms (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  name            TEXT NOT NULL,
  logo_url        TEXT,
  website_url     TEXT,
  description     TEXT NOT NULL,
  hq_city         TEXT NOT NULL,
  hq_country      TEXT NOT NULL,
  year_founded    INTEGER,
  aum             TEXT,
  stage_focus     JSONB NOT NULL DEFAULT '[]'::JSONB,
  sector_thesis   JSONB NOT NULL DEFAULT '[]'::JSONB,
  geographic_coverage JSONB NOT NULL DEFAULT '[]'::JSONB,
  cheque_size_min NUMERIC,
  cheque_size_max NUMERIC,
  fund_status     TEXT DEFAULT 'actively_deploying' CHECK (
    fund_status IN ('actively_deploying', 'fundraising', 'fully_deployed')
  ),
  key_partners    JSONB NOT NULL DEFAULT '[]'::JSONB,
  recent_investments JSONB NOT NULL DEFAULT '[]'::JSONB,
  activity_score  INTEGER NOT NULL DEFAULT 0,
  is_claimed      BOOLEAN NOT NULL DEFAULT FALSE,
  reviews         JSONB NOT NULL DEFAULT '[]'::JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vc_slug ON public.vc_firms (slug);
CREATE INDEX idx_vc_country ON public.vc_firms (hq_country);
CREATE INDEX idx_vc_activity ON public.vc_firms (activity_score DESC);

ALTER TABLE public.vc_firms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read vc firms"
  ON public.vc_firms FOR SELECT USING (TRUE);

CREATE POLICY "Service role full access on vc firms"
  ON public.vc_firms FOR ALL
  USING (auth.role() = 'service_role');

CREATE TRIGGER vc_firms_updated_at
  BEFORE UPDATE ON public.vc_firms
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
