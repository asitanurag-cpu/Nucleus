import { cn } from "@/lib/utils";
import { StageTag as StageTagType } from "@/lib/types";
import { STAGE_LABELS, STAGE_COLORS } from "@/lib/constants";

export function StageTag({
  stage,
  className,
}: {
  stage: StageTagType;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-tag px-2 py-0.5 text-xs font-semibold tracking-[0.05em]",
        STAGE_COLORS[stage] || "bg-gray-500/20 text-gray-300",
        className
      )}
    >
      {STAGE_LABELS[stage] || stage}
    </span>
  );
}
