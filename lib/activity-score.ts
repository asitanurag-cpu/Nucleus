import { VCFirm } from "./types";

export function computeActivityScore(firm: Pick<VCFirm, "recent_investments" | "sector_thesis">): number {
  const dealsLast12 = firm.recent_investments.length;
  const sectorsEntered = new Set(firm.sector_thesis).size;
  const profileBonus = 10;

  const raw = dealsLast12 * 10 + sectorsEntered * 5 + profileBonus;
  return Math.min(100, Math.round(raw));
}
