import { MetricCard } from "@/components/shared/MetricCard";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";
import { Mail, Linkedin, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Nucleus",
  description: "About Nucleus — the intelligence core of European venture capital. Built by Asit Anurag.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
      {/* About Nucleus */}
      <section className="mb-16">
        <h1 className="font-display text-4xl tracking-tight text-nucleus-text-primary md:text-5xl">
          About Nucleus
        </h1>
        <div className="mt-6 max-w-reading space-y-4 text-nucleus-text-secondary leading-relaxed">
          <p>
            Nucleus is an editorially-driven intelligence hub focused exclusively on
            the European venture capital and startup ecosystem. It operates at the
            intersection of long-form startup analysis, founder education, and
            VC-grade research.
          </p>
          <p>
            Unlike data platforms or news outlets, Nucleus combines narrative
            intelligence, pre-funding signal tracking, and community-driven VC
            transparency into a single platform.
          </p>
          <p>
            The platform exists to bridge the narrative intelligence gap between
            European and US venture markets — providing the analytical depth that
            European VCs, founders, and ecosystem researchers need to make better
            decisions.
          </p>
        </div>
      </section>

      {/* About the Founder */}
      <section className="mb-16">
        <h2 className="font-display text-3xl tracking-tight text-nucleus-text-primary">
          About the Founder
        </h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          {/* Bio */}
          <div className="lg:col-span-2 space-y-4 text-nucleus-text-secondary leading-relaxed">
            <p className="text-lg text-nucleus-text-primary font-medium">Asit Anurag</p>
            <p>
              IIT Kanpur engineer (top 0.2% nationally, 99.8th percentile JEE among
              1.5M applicants) and RSM Erasmus University MBA candidate. Has built
              software products from scratch, run a $20M+ Series A end-to-end, and
              evaluated 100+ deep-tech opportunities with an operator&apos;s eye for
              which architectures actually scale.
            </p>
            <p>
              Brings first-principles engineering judgment, institutional diligence
              rigour, and a genuine obsession with the European software
              infrastructure ecosystem.
            </p>

            <div className="pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted mb-3">
                Experience
              </h3>
              <div className="space-y-4">
                <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-nucleus-text-primary">Strategic Innovation Consultant</p>
                      <p className="text-sm text-nucleus-accent">NLMTD — Corporate VC / Deep-Tech</p>
                    </div>
                    <span className="text-xs text-nucleus-text-muted">2025–Present</span>
                  </div>
                  <p className="mt-2 text-sm text-nucleus-text-secondary">
                    Screens 100+ deep-tech and digital infrastructure opportunities. Leads thesis construction across AI infra, industrial automation, and data infrastructure verticals.
                  </p>
                </div>
                <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-nucleus-text-primary">Strategy & Operations Manager</p>
                      <p className="text-sm text-nucleus-accent">Goldcast — B2B SaaS Scale-up</p>
                    </div>
                    <span className="text-xs text-nucleus-text-muted">2023–2024</span>
                  </div>
                  <p className="mt-2 text-sm text-nucleus-text-secondary">
                    Built centralised data infrastructure across 200+ enterprise partners. Owned GTM analytics.
                  </p>
                </div>
                <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-nucleus-text-primary">Chief of Staff</p>
                      <p className="text-sm text-nucleus-accent">NOCCARC — MedTech + Hardware + Software</p>
                    </div>
                    <span className="text-xs text-nucleus-text-muted">2021–2023</span>
                  </div>
                  <p className="mt-2 text-sm text-nucleus-text-secondary">
                    Architected and owned the full $20M+ Series A fundraise. Managed 60+ Tier-1 VC relationships. Orchestrated a 10x production scale-up in 30 days during COVID-19.
                  </p>
                </div>
                <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-nucleus-text-primary">Co-Founder & Head of Growth</p>
                      <p className="text-sm text-nucleus-accent">Solve It All — EdTech Platform</p>
                    </div>
                    <span className="text-xs text-nucleus-text-muted">2017–2020</span>
                  </div>
                  <p className="mt-2 text-sm text-nucleus-text-secondary">
                    Built a digital learning platform from zero to 25,000 users and €150k ARR without external capital.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metric cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-4 text-center">
                <div className="font-display text-2xl text-nucleus-text-primary">100+</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.05em] text-nucleus-text-muted">Deals Screened</div>
              </div>
              <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-4 text-center">
                <div className="font-display text-2xl text-nucleus-text-primary">$20M+</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.05em] text-nucleus-text-muted">Series A Led</div>
              </div>
              <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-4 text-center">
                <div className="font-display text-2xl text-nucleus-text-primary">6+</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.05em] text-nucleus-text-muted">Years Operating</div>
              </div>
              <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-4 text-center">
                <div className="font-display text-2xl text-nucleus-text-primary">730</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.05em] text-nucleus-text-muted">GMAT Score</div>
              </div>
            </div>

            {/* Education */}
            <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted mb-3">Education</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-nucleus-text-primary">MBA (Finance)</p>
                  <p className="text-xs text-nucleus-text-secondary">RSM Erasmus University, Rotterdam</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-nucleus-text-primary">B.Tech (Materials Science)</p>
                  <p className="text-xs text-nucleus-text-secondary">IIT Kanpur</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted mb-3">Connect</h4>
              <div className="space-y-2">
                <a
                  href="mailto:asit.anurag@gmail.com"
                  className="flex items-center gap-2 text-sm text-nucleus-text-secondary hover:text-nucleus-accent transition-colors"
                >
                  <Mail className="h-4 w-4" /> asit.anurag@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/asit-anurag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-nucleus-text-secondary hover:text-nucleus-accent transition-colors"
                >
                  <Linkedin className="h-4 w-4" /> linkedin.com/in/asit-anurag
                </a>
                <div className="flex items-center gap-2 text-sm text-nucleus-text-secondary">
                  <MapPin className="h-4 w-4" /> Netherlands
                </div>
              </div>
            </div>

            {/* Investment thesis */}
            <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted mb-3">Thesis Focus</h4>
              <div className="flex flex-wrap gap-1.5">
                {["AI Infra", "DevTools", "Software Infra", "B2B SaaS", "Novel Compute", "Industrial Tech", "Climate-Tech"].map((tag) => (
                  <span key={tag} className="rounded-tag bg-nucleus-accent/10 px-2 py-0.5 text-xs font-semibold text-nucleus-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="mb-16">
        <h2 className="font-display text-3xl tracking-tight text-nucleus-text-primary">
          Our Approach
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-6">
            <h3 className="font-body text-base font-semibold text-nucleus-text-primary">
              First-Principles Analysis
            </h3>
            <p className="mt-2 text-sm text-nucleus-text-secondary leading-relaxed">
              We dissect business models, unit economics, and competitive dynamics
              rather than reporting surface-level news. Every analysis is built from
              fundamentals.
            </p>
          </div>
          <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-6">
            <h3 className="font-body text-base font-semibold text-nucleus-text-primary">
              European-Native Perspective
            </h3>
            <p className="mt-2 text-sm text-nucleus-text-secondary leading-relaxed">
              We understand cross-border dynamics, regulatory nuance, and the specific
              challenges of building in fragmented markets. No US lens applied to
              European problems.
            </p>
          </div>
          <div className="rounded-card border border-nucleus-border bg-nucleus-surface p-6">
            <h3 className="font-body text-base font-semibold text-nucleus-text-primary">
              Opinionated with Evidence
            </h3>
            <p className="mt-2 text-sm text-nucleus-text-secondary leading-relaxed">
              We take positions backed by data and analysis. No generic &quot;on one hand,
              on the other hand&quot; equivocation. Clear investment theses with supporting
              evidence.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterCTA />
    </div>
  );
}
