"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/signals", label: "Overview" },
  { href: "/signals/agrifood", label: "AgriFood Signals" },
  { href: "/signals/energy", label: "Energy Signals" },
  { href: "/signals/agrifood-traction", label: "AgriFood Traction" },
] as const;

export function SignalsSubNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-nucleus-border bg-nucleus-dark/60 backdrop-blur-sm">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
        <div className="flex gap-x-1 overflow-x-auto scrollbar-none">
          {TABS.map((tab) => {
            // Exact match for /signals; for sub-routes, match the full
            // segment to prevent /signals/agrifood matching /signals/agrifood-traction
            const isActive =
              tab.href === "/signals"
                ? pathname === "/signals"
                : pathname === tab.href || pathname.startsWith(tab.href + "/");

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "relative flex items-center gap-x-2 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "border-nucleus-signal text-nucleus-signal"
                    : "border-transparent text-nucleus-text-muted hover:border-nucleus-border hover:text-nucleus-text-secondary"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
