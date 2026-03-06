import { NextRequest, NextResponse } from "next/server";
import { fundingRounds } from "@/lib/data/funding-rounds";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sector = searchParams.get("sector");
  const stage = searchParams.get("stage");
  const country = searchParams.get("country");

  let filtered = [...fundingRounds];

  if (sector) {
    const sectors = sector.split(",");
    filtered = filtered.filter((r) =>
      r.sector_tags.some((t) => sectors.includes(t))
    );
  }
  if (stage) {
    const stages = stage.split(",");
    filtered = filtered.filter((r) => stages.includes(r.stage));
  }
  if (country) {
    filtered = filtered.filter((r) => r.country === country);
  }

  filtered.sort(
    (a, b) =>
      new Date(b.date_announced).getTime() - new Date(a.date_announced).getTime()
  );

  return NextResponse.json({ data: filtered, total: filtered.length });
}
