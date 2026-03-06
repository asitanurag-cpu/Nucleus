import Link from "next/link";
import { cn } from "@/lib/utils";
import { Signal } from "@/lib/types";
import { SIGNAL_TYPE_CONFIG } from "@/lib/constants";
import { SectorTag } from "@/components/shared/SectorTag";
import { getScoreColor, getScoreBg } from "@/lib/signal-score";

export function SignalCard({
  signal,
  compact = false,
  className,
}: {
  signal: Signal;
  compact?: boolean;
  className?: string;
}) {
  const config = SIGNAL_TYPE_CONFIG[signal.signal_type];

  return (
    <Link
      href={`/signals/${signal.startup_slug}`}
      className={cn(
        "group block rounded-card border border-nucleus-border bg-nucleus-surface p-4 transition-all hover:border-nucleus-accent/30 hover:shadow-glow",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Signal type badge */}
          <div className="mb-2 flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-tag px-2 py-0.5 text-xs font-semibold",
                config.color
              )}
            >
              <span>{config.emoji}</span>
              {config.label}
            </span>
            <span className="text-xs text-nucleus-text-muted">
              {signal.country}
            </span>
          </div>

          {/* Startup name */}
          <h4 className="font-body text-sm font-semibold text-nucleus-text-primary group-hover:text-nucleus-accent transition-colors">
            {signal.startup_name}
          </h4>

          {/* Signal detail */}
          <p className="mt-1 text-xs leading-relaxed text-nucleus-text-secondary line-clamp-2">
            {signal.signal_detail}
          </p>

          {/* Tags & country */}
          {!compact && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {signal.sector_tags.slice(0, 2).map((tag) => (
                <SectorTag key={tag} sector={tag} className="text-[10px]" />
              ))}
            </div>
          )}
        </div>

        {/* Signal score */}
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-card",
            getScoreBg(signal.signal_score)
          )}
        >
          <span
            className={cn(
              "font-mono text-sm font-semibold",
              getScoreColor(signal.signal_score)
            )}
          >
            {signal.signal_score}
          </span>
        </div>
      </div>
    </Link>
  );
}
