import { getIntelSignals } from "@/lib/supabase/queries";
import { ttoInstitutions } from "@/lib/data/tto-institutions";
import TTOClient from "./TTOClient";

export default async function TTOTrackerPage() {
  const intelSignals = await getIntelSignals();
  return <TTOClient ttoInstitutions={ttoInstitutions} intelSignals={intelSignals} />;
}
