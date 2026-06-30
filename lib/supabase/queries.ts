import { getSupabaseClient } from "./server";
import { signals as staticSignals } from "@/lib/data/signals";
import { intelSignals as staticIntelSignals } from "@/lib/data/intel-signals";
import { agrifoodWatchlist, energyWatchlist } from "@/lib/data/watchlist-data";
import { benchmarks as staticBenchmarks, oemData as staticOemData } from "@/lib/data/traction-data";
import { fundingRounds as staticFundingRounds } from "@/lib/data/funding-rounds";
import { vcFirms as staticVcFirms } from "@/lib/data/vc-firms";
import type { Signal, FundingRound, VCFirm } from "@/lib/types";
import type {
  IntelSignal,
  WatchlistEntry,
  TractionBenchmark,
  OEMInterop,
  SignalVertical,
} from "@/lib/types/signals";

// ------------------------------------------------------------------
// Intel Signals (agrifood / energy subsystem)
// ------------------------------------------------------------------

export async function getIntelSignals(
  vertical?: SignalVertical
): Promise<IntelSignal[]> {
  const sb = getSupabaseClient();
  if (sb) {
    let query = sb
      .from("signals")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });
    if (vertical) {
      query = query.eq("vertical", vertical);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) return data as IntelSignal[];
  }
  let result = [...staticIntelSignals];
  if (vertical) {
    result = result.filter((s) => s.vertical === vertical);
  }
  return result;
}

// ------------------------------------------------------------------
// Weekly Watchlists
// ------------------------------------------------------------------

export async function getWatchlist(
  vertical: SignalVertical
): Promise<WatchlistEntry[]> {
  const sb = getSupabaseClient();
  if (sb) {
    const { data, error } = await sb
      .from("weekly_watchlists")
      .select("*")
      .eq("vertical", vertical)
      .order("score", { ascending: false })
      .limit(10);
    if (!error && data && data.length > 0) return data as WatchlistEntry[];
  }
  return vertical === "agrifood" ? agrifoodWatchlist : energyWatchlist;
}

// ------------------------------------------------------------------
// Traction Benchmarks
// ------------------------------------------------------------------

export async function getBenchmarks(): Promise<TractionBenchmark[]> {
  const sb = getSupabaseClient();
  if (sb) {
    const { data, error } = await sb
      .from("agrifood_traction_benchmarks")
      .select("*")
      .eq("is_published", true)
      .order("benchmark_type");
    if (!error && data && data.length > 0) return data as TractionBenchmark[];
  }
  return staticBenchmarks;
}

// ------------------------------------------------------------------
// OEM Interoperability
// ------------------------------------------------------------------

export async function getOemData(): Promise<OEMInterop[]> {
  const sb = getSupabaseClient();
  if (sb) {
    const { data, error } = await sb
      .from("oem_interoperability")
      .select("*")
      .eq("is_published", true)
      .order("startup_name");
    if (!error && data && data.length > 0) return data as OEMInterop[];
  }
  return staticOemData;
}

// ------------------------------------------------------------------
// Legacy Signals (the original signal type used on /signals)
// ------------------------------------------------------------------

export async function getSignals(): Promise<Signal[]> {
  // No Supabase table for legacy signals yet — return static data
  return [...staticSignals];
}

// ------------------------------------------------------------------
// Funding Rounds
// ------------------------------------------------------------------

export async function getFundingRounds(): Promise<FundingRound[]> {
  const sb = getSupabaseClient();
  if (sb) {
    const { data, error } = await sb
      .from("funding_rounds")
      .select("*")
      .order("date_announced", { ascending: false });
    if (!error && data && data.length > 0) return data as FundingRound[];
  }
  return [...staticFundingRounds];
}

// ------------------------------------------------------------------
// VC Firms
// ------------------------------------------------------------------

export async function getVcFirms(): Promise<VCFirm[]> {
  const sb = getSupabaseClient();
  if (sb) {
    const { data, error } = await sb
      .from("vc_firms")
      .select("*")
      .order("activity_score", { ascending: false });
    if (!error && data && data.length > 0) return data as VCFirm[];
  }
  return [...staticVcFirms];
}
