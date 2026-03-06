import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your filters or search terms.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      <Inbox className="mb-4 h-12 w-12 text-nucleus-text-muted" />
      <h3 className="text-lg font-semibold text-nucleus-text-primary">{title}</h3>
      <p className="mt-1 text-sm text-nucleus-text-secondary">{description}</p>
    </div>
  );
}
