import { getIntelSignals, getWatchlist } from "@/lib/supabase/queries";
import AgriSignalsClient from "./AgriSignalsClient";

export default async function AgriSignalsPage() {
  const [signals, watchlist] = await Promise.all([
    getIntelSignals("agrifood"),
    getWatchlist("agrifood"),
  ]);

  return <AgriSignalsClient signals={signals} watchlist={watchlist} />;
}
