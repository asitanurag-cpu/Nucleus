import { NextRequest, NextResponse } from "next/server";
import { vcFirms } from "@/lib/data/vc-firms";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const stage = searchParams.get("stage");
  const sector = searchParams.get("sector");
  const country = searchParams.get("country");
  const search = searchParams.get("q");

  let filtered = [...vcFirms];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
    );
  }
  if (stage) {
    const stages = stage.split(",");
    filtered = filtered.filter((f) =>
      f.stage_focus.some((s) => stages.includes(s))
    );
  }
  if (sector) {
    const sectors = sector.split(",");
    filtered = filtered.filter((f) =>
      f.sector_thesis.some((s) => sectors.includes(s))
    );
  }
  if (country) {
    filtered = filtered.filter((f) => f.hq_country === country);
  }

  filtered.sort((a, b) => b.activity_score - a.activity_score);

  return NextResponse.json({ data: filtered, total: filtered.length });
}
