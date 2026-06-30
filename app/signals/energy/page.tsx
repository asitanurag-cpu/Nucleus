import { getIntelSignals, getWatchlist } from "@/lib/supabase/queries";
import { ttoInstitutions } from "@/lib/data/tto-institutions";
import EnergySignalsClient from "./EnergySignalsClient";

export default async function EnergySignalsPage() {
  const [signals, watchlist] = await Promise.all([
    getIntelSignals("energy"),
    getWatchlist("energy"),
  ]);

  return (
    <EnergySignalsClient
      signals={signals}
      watchlist={watchlist}
      ttoInstitutions={ttoInstitutions}
    />
  );
}
