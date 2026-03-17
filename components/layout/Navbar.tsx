"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/shared/SearchBar";

const navLinks = [
  { href: "/analysis", label: "Analysis" },
  { href: "/funding", label: "Funding" },
  { href: "/signals", label: "Signals" },
  { href: "/landscape", label: "Landscape" },
  { href: "/library", label: "Library" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-nucleus-border bg-nucleus-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-nucleus-accent">
            <span className="font-mono text-sm font-bold text-white">N</span>
          </div>
          <span className="font-display text-xl tracking-tight text-nucleus-text-primary">
            Nucleus
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-button px-3 py-2 text-sm font-medium text-nucleus-text-secondary transition-colors hover:bg-nucleus-surface hover:text-nucleus-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <SearchBar />
          <Link
            href="/about"
            className="hidden rounded-button bg-nucleus-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-nucleus-accent-hover md:inline-flex"
          >
            About
          </Link>

          {/* Mobile menu button */}
          <button
            className="rounded-button p-2 text-nucleus-text-muted md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-nucleus-border bg-nucleus-dark md:hidden">
          <div className="flex flex-col p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-button px-3 py-3 text-sm font-medium text-nucleus-text-secondary transition-colors hover:bg-nucleus-surface hover:text-nucleus-text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/about"
              className="mt-2 rounded-button bg-nucleus-accent px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-nucleus-accent-hover"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
