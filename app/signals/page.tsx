import { getSignals } from "@/lib/supabase/queries";
import SignalsClient from "./SignalsClient";

export default async function SignalsPage() {
  const signals = await getSignals();
  return <SignalsClient signals={signals} />;
}
