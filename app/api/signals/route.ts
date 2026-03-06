import { NextRequest, NextResponse } from "next/server";
import { signals } from "@/lib/data/signals";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const sector = searchParams.get("sector");
  const country = searchParams.get("country");

  let filtered = [...signals];

  if (type) {
    const types = type.split(",");
    filtered = filtered.filter((s) => types.includes(s.signal_type));
  }
  if (sector) {
    const sectors = sector.split(",");
    filtered = filtered.filter((s) =>
      s.sector_tags.some((t) => sectors.includes(t))
    );
  }
  if (country) {
    filtered = filtered.filter((s) => s.country === country);
  }

  filtered.sort(
    (a, b) =>
      new Date(b.signal_date).getTime() - new Date(a.signal_date).getTime()
  );

  return NextResponse.json({ data: filtered, total: filtered.length });
}
