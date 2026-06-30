import { getBenchmarks, getOemData } from "@/lib/supabase/queries";
import AgriTractionClient from "./AgriTractionClient";

export default async function AgriTractionPage() {
  const [benchmarks, oemData] = await Promise.all([
    getBenchmarks(),
    getOemData(),
  ]);

  return <AgriTractionClient benchmarks={benchmarks} oemData={oemData} />;
}
