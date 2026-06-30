import { createClient } from "@supabase/supabase-js";
import { intelSignals } from "../lib/data/intel-signals";
import { agrifoodWatchlist, energyWatchlist } from "../lib/data/watchlist-data";
import { benchmarks, oemData } from "../lib/data/traction-data";
import { fundingRounds } from "../lib/data/funding-rounds";
import { vcFirms } from "../lib/data/vc-firms";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function seed() {
  console.log("Seeding Supabase...\n");

  // 1. Signals (intel signals → signals table)
  const signalRows = intelSignals.map((s) => ({
    vertical: s.vertical,
    signal_type: s.signal_type,
    company_name: s.company_name,
    headline: s.headline,
    body: s.body || null,
    source_name: s.source_name,
    source_url: s.source_url,
    source_published_at: s.source_published_at || null,
    fundraise_probability_score: s.fundraise_probability_score,
    is_published: s.is_published,
    created_at: s.created_at,
    updated_at: s.updated_at,
  }));

  const { error: sigErr, count: sigCount } = await supabase
    .from("signals")
    .insert(signalRows, { count: "exact" });
  console.log(`signals: ${sigErr ? "ERROR " + sigErr.message : sigCount + " rows inserted"}`);

  // 2. Weekly watchlists
  const watchlistRows = [...agrifoodWatchlist, ...energyWatchlist].map((w) => ({
    vertical: w.vertical,
    company_name: w.company_name,
    score: w.score,
    signal_count_7d: w.signal_count_7d,
    top_signal_type: w.top_signal_type || null,
    top_signal_headline: w.top_signal_headline || null,
    generated_at: w.generated_at,
    week_start: w.week_start,
  }));

  const { error: wlErr, count: wlCount } = await supabase
    .from("weekly_watchlists")
    .insert(watchlistRows, { count: "exact" });
  console.log(`weekly_watchlists: ${wlErr ? "ERROR " + wlErr.message : wlCount + " rows inserted"}`);

  // 3. Agrifood traction benchmarks
  const benchmarkRows = benchmarks.map((b) => ({
    benchmark_type: b.benchmark_type,
    sub_sector: b.sub_sector,
    metric_name: b.metric_name,
    metric_value: b.metric_value,
    metric_unit: b.metric_unit,
    geography: b.geography || null,
    crop_type: b.crop_type || null,
    source_name: b.source_name,
    source_url: (b as any).source_url || null,
    source_year: b.source_year,
    methodology_note: b.methodology_note || null,
    is_published: b.is_published,
    created_at: b.created_at,
    updated_at: b.updated_at,
  }));

  const { error: bmErr, count: bmCount } = await supabase
    .from("agrifood_traction_benchmarks")
    .insert(benchmarkRows, { count: "exact" });
  console.log(`agrifood_traction_benchmarks: ${bmErr ? "ERROR " + bmErr.message : bmCount + " rows inserted"}`);

  // 4. OEM interoperability
  const oemRows = oemData.map((o) => ({
    startup_name: o.startup_name,
    startup_url: o.startup_url || null,
    oem_name: o.oem_name,
    oem_platform: o.oem_platform,
    integration_type: o.integration_type,
    integration_status: o.integration_status,
    verified_at: o.verified_at || null,
    source_url: o.source_url || null,
    notes: o.notes || null,
    is_published: o.is_published,
    created_at: o.created_at,
    updated_at: o.updated_at,
  }));

  const { error: oemErr, count: oemCount } = await supabase
    .from("oem_interoperability")
    .insert(oemRows, { count: "exact" });
  console.log(`oem_interoperability: ${oemErr ? "ERROR " + oemErr.message : oemCount + " rows inserted"}`);

  // 5. Funding rounds
  const fundingRows = fundingRounds.map((f) => ({
    startup_name: f.startup_name,
    startup_url: f.startup_url || null,
    startup_description: f.startup_description || null,
    amount: f.amount,
    currency: f.currency,
    amount_usd: f.amount_usd || null,
    stage: f.stage,
    lead_investors: f.lead_investors,
    other_investors: f.other_investors,
    sector_tags: f.sector_tags,
    country: f.country,
    city: f.city || null,
    date_announced: f.date_announced,
    source_url: f.source_url || null,
    description: (f as any).description || null,
  }));

  const { error: frErr, count: frCount } = await supabase
    .from("funding_rounds")
    .insert(fundingRows, { count: "exact" });
  console.log(`funding_rounds: ${frErr ? "ERROR " + frErr.message : frCount + " rows inserted"}`);

  // 6. VC firms
  const vcRows = vcFirms.map((v) => ({
    slug: v.slug,
    name: v.name,
    logo_url: v.logo_url || null,
    website_url: v.website_url || null,
    description: v.description,
    hq_city: v.hq_city,
    hq_country: v.hq_country,
    year_founded: v.year_founded || null,
    aum: v.aum || null,
    stage_focus: v.stage_focus,
    sector_thesis: v.sector_thesis,
    geographic_coverage: v.geographic_coverage,
    cheque_size_min: v.cheque_size_min || null,
    cheque_size_max: v.cheque_size_max || null,
    fund_status: v.fund_status || "actively_deploying",
    key_partners: v.key_partners,
    recent_investments: v.recent_investments,
    activity_score: v.activity_score,
    is_claimed: v.is_claimed,
    reviews: v.reviews,
  }));

  const { error: vcErr, count: vcCount } = await supabase
    .from("vc_firms")
    .insert(vcRows, { count: "exact" });
  console.log(`vc_firms: ${vcErr ? "ERROR " + vcErr.message : vcCount + " rows inserted"}`);

  console.log("\nDone!");
}

seed().catch(console.error);
