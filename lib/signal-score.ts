import { Signal } from "./types";
import { SIGNAL_TYPE_WEIGHTS } from "./constants";

export function computeSignalScore(signals: Pick<Signal, "signal_type" | "signal_date">[]): number {
  const now = Date.now();
  let score = 0;

  for (const signal of signals) {
    const daysSince = (now - new Date(signal.signal_date).getTime()) / (1000 * 60 * 60 * 24);
    const recencyDecay = Math.max(0, 1 - daysSince / 180);
    const weight = SIGNAL_TYPE_WEIGHTS[signal.signal_type] || 10;
    score += weight * recencyDecay;
  }

  return Math.min(100, Math.round(score));
}

export function getScoreColor(score: number): string {
  if (score >= 70) return "text-emerald-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}

export function getScoreBg(score: number): string {
  if (score >= 70) return "bg-emerald-500/20";
  if (score >= 40) return "bg-amber-500/20";
  return "bg-red-500/20";
}
