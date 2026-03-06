import { cn } from "@/lib/utils";
import { SectorTag as SectorTagType } from "@/lib/types";
import { SECTOR_LABELS } from "@/lib/constants";

export function SectorTag({
  sector,
  className,
}: {
  sector: SectorTagType;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-tag px-2 py-0.5 text-xs font-semibold tracking-[0.05em] bg-nucleus-accent/10 text-nucleus-accent",
        className
      )}
    >
      {SECTOR_LABELS[sector] || sector}
    </span>
  );
}
