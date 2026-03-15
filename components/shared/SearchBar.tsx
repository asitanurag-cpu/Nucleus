"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText, Zap, TrendingUp, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { articles } from "@/lib/data/articles";
import { signals } from "@/lib/data/signals";
import { fundingRounds } from "@/lib/data/funding-rounds";
import { vcFirms } from "@/lib/data/vc-firms";
import Fuse from "fuse.js";

type SearchResult = {
  type: "analysis" | "signal" | "funding" | "vc";
  title: string;
  slug: string;
  excerpt: string;
};

const typeConfig = {
  analysis: { label: "Analysis", icon: FileText, color: "text-nucleus-accent" },
  signal: { label: "Signal", icon: Zap, color: "text-nucleus-signal" },
  funding: { label: "Funding", icon: TrendingUp, color: "text-amber-400" },
  vc: { label: "VC Firm", icon: Building2, color: "text-purple-400" },
};

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Build search index
  const allItems = useMemo<SearchResult[]>(() => {
    const items: SearchResult[] = [];
    articles
      .filter((a) => a.status === "published")
      .forEach((a) => {
        items.push({
          type: "analysis",
          title: a.title,
          slug: `/analysis/${a.slug}`,
          excerpt: a.subtitle || a.seo_description,
        });
      });
    signals.forEach((s) => {
      items.push({
        type: "signal",
        title: s.startup_name,
        slug: `/signals/${s.startup_slug}`,
        excerpt: s.signal_detail,
      });
    });
    fundingRounds.forEach((f) => {
      items.push({
        type: "funding",
        title: `${f.startup_name} — ${f.stage}`,
        slug: "/funding",
        excerpt: f.description || f.startup_description,
      });
    });
    vcFirms.forEach((v) => {
      items.push({
        type: "vc",
        title: v.name,
        slug: `/landscape/${v.slug}`,
        excerpt: v.description,
      });
    });
    return items;
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(allItems, {
        keys: ["title", "excerpt"],
        threshold: 0.35,
        includeScore: true,
      }),
    [allItems]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse
      .search(query)
      .slice(0, 10)
      .map((r) => r.item);
  }, [query, fuse]);

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    results.forEach((r) => {
      if (!groups[r.type]) groups[r.type] = [];
      groups[r.type].push(r);
    });
    return groups;
  }, [results]);

  const flatResults = results;

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setActiveIndex(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  // Cmd+K keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) close();
        else open();
      }
      if (e.key === "Escape" && isOpen) {
        close();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, open, close]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, close]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flatResults[activeIndex]) {
      close();
      router.push(flatResults[activeIndex].slug);
    }
  };

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={open}
        className="rounded-button p-2 text-nucleus-text-muted transition-colors hover:bg-nucleus-surface hover:text-nucleus-text-primary"
        aria-label="Search (Cmd+K)"
      >
        <Search className="h-4 w-4" />
      </button>

      {/* Search modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-[15vh]">
          <div
            ref={containerRef}
            className="w-full max-w-xl mx-4 rounded-card border border-nucleus-border bg-nucleus-dark shadow-lg overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-nucleus-border px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-nucleus-text-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search articles, signals, funding, VCs..."
                className="flex-1 bg-transparent text-sm text-nucleus-text-primary placeholder:text-nucleus-text-muted outline-none"
              />
              <kbd className="hidden rounded border border-nucleus-border bg-nucleus-surface px-1.5 py-0.5 text-[10px] font-mono text-nucleus-text-muted sm:inline-block">
                ESC
              </kbd>
              <button onClick={close} className="text-nucleus-text-muted hover:text-nucleus-text-primary">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto">
              {query.trim() && flatResults.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-nucleus-text-muted">
                  No results for &ldquo;{query}&rdquo;
                </div>
              )}

              {Object.entries(groupedResults).map(([type, items]) => {
                const config = typeConfig[type as keyof typeof typeConfig];
                const Icon = config.icon;
                return (
                  <div key={type}>
                    <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-nucleus-text-muted">
                      <Icon className={cn("h-3.5 w-3.5", config.color)} />
                      {config.label}
                    </div>
                    {items.map((item) => {
                      const globalIndex = flatResults.indexOf(item);
                      return (
                        <button
                          key={`${item.type}-${item.slug}`}
                          className={cn(
                            "w-full px-4 py-2.5 text-left transition-colors",
                            globalIndex === activeIndex
                              ? "bg-nucleus-accent/10"
                              : "hover:bg-nucleus-surface"
                          )}
                          onClick={() => {
                            close();
                            router.push(item.slug);
                          }}
                          onMouseEnter={() => setActiveIndex(globalIndex)}
                        >
                          <p className="text-sm font-medium text-nucleus-text-primary truncate">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs text-nucleus-text-muted truncate">
                            {item.excerpt}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                );
              })}

              {!query.trim() && (
                <div className="px-4 py-6 text-center text-sm text-nucleus-text-muted">
                  <p>Type to search across all content</p>
                  <p className="mt-1 text-xs">
                    <kbd className="rounded border border-nucleus-border bg-nucleus-surface px-1.5 py-0.5 text-[10px] font-mono">
                      Cmd+K
                    </kbd>{" "}
                    to open anytime
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {flatResults.length > 0 && (
              <div className="border-t border-nucleus-border px-4 py-2 text-xs text-nucleus-text-muted">
                <span className="flex items-center gap-2">
                  <kbd className="rounded border border-nucleus-border bg-nucleus-surface px-1 py-0.5 text-[10px] font-mono">
                    ↑↓
                  </kbd>{" "}
                  Navigate{" "}
                  <kbd className="rounded border border-nucleus-border bg-nucleus-surface px-1 py-0.5 text-[10px] font-mono">
                    ↵
                  </kbd>{" "}
                  Open
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
