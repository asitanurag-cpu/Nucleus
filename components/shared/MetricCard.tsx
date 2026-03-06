import { cn } from "@/lib/utils";

export function MetricCard({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <div className="font-display text-3xl tracking-tight text-nucleus-text-primary">
        {value}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-[0.05em] text-nucleus-text-muted">
        {label}
      </div>
    </div>
  );
}
