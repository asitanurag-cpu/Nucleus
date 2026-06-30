import { getFundingRounds } from "@/lib/supabase/queries";
import FundingClient from "./FundingClient";

export default async function FundingPage() {
  const fundingRounds = await getFundingRounds();
  return <FundingClient fundingRounds={fundingRounds} />;
}
