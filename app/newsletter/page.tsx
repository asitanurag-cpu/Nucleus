import { NewsletterCTA } from "@/components/shared/NewsletterCTA";
import { Mail, TrendingUp, Zap, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | Nucleus",
  description: "European VC intelligence, delivered weekly. Curated startup signals, funding round summaries, and original analysis.",
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <Mail className="mx-auto mb-4 h-10 w-10 text-nucleus-accent" />
        <h1 className="font-display text-4xl tracking-tight text-nucleus-text-primary md:text-5xl">
          European VC intelligence, delivered weekly.
        </h1>
        <p className="mt-4 text-lg text-nucleus-text-secondary">
          Join investors and founders who stay ahead with curated intelligence
          from the European startup ecosystem.
        </p>

        {/* What you get */}
        <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
          <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-5">
            <Zap className="mb-3 h-5 w-5 text-nucleus-signal" />
            <h3 className="text-sm font-semibold text-nucleus-text-primary">
              Startup Signals
            </h3>
            <p className="mt-1 text-xs text-nucleus-text-secondary">
              Curated pre-funding signals and funding round summaries from across Europe.
            </p>
          </div>
          <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-5">
            <FileText className="mb-3 h-5 w-5 text-nucleus-accent" />
            <h3 className="text-sm font-semibold text-nucleus-text-primary">
              Original Analysis
            </h3>
            <p className="mt-1 text-xs text-nucleus-text-secondary">
              Investment-grade analysis of European startups and market trends.
            </p>
          </div>
          <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-5">
            <TrendingUp className="mb-3 h-5 w-5 text-nucleus-alert" />
            <h3 className="text-sm font-semibold text-nucleus-text-primary">
              Ecosystem Updates
            </h3>
            <p className="mt-1 text-xs text-nucleus-text-secondary">
              VC landscape updates, new fund launches, and ecosystem research.
            </p>
          </div>
        </div>

        {/* Signup */}
        <div className="mt-10">
          <NewsletterCTA />
        </div>
      </div>
    </div>
  );
}
