import { getVcFirms } from "@/lib/supabase/queries";
import LandscapeClient from "./LandscapeClient";

export default async function LandscapePage() {
  const vcFirms = await getVcFirms();
  return <LandscapeClient vcFirms={vcFirms} />;
}
