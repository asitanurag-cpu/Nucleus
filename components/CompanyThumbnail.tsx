import { cn } from "@/lib/utils";

// Deterministic palette of Tailwind background classes; chosen from the nucleus
// palette so thumbnails blend with the brand. Paired text always stays white.
const THUMBNAIL_PALETTE = [
  "bg-nucleus-accent",
  "bg-blue-600",
  "bg-indigo-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-purple-600",
  "bg-teal-600",
  "bg-cyan-700",
  "bg-slate-700",
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function initialsFor(name: string): string {
  const parts = name
    .replace(/[()[\]{}]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) {
    const first = parts[0];
    return (first[0] + (first[1] ?? "")).toUpperCase();
  }
  // Two or three word names; take first initial of first two meaningful words.
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function CompanyThumbnail({
  name,
  size = 40,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const colour = THUMBNAIL_PALETTE[hashString(name) % THUMBNAIL_PALETTE.length];
  const initials = initialsFor(name);
  // Font size follows the requested 24px brief when size >= 48; scale down for
  // smaller thumbnails so initials remain centred and legible.
  const fontSize = Math.max(10, Math.round(size * 0.42));

  return (
    <span
      aria-label={name}
      role="img"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-tag font-semibold text-white",
        colour,
        className
      )}
      style={{ width: size, height: size, fontSize }}
    >
      {initials}
    </span>
  );
}
