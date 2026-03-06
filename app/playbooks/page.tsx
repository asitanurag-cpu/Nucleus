import Link from "next/link";
import { BookOpen, Clock, Lock } from "lucide-react";
import { playbooks } from "@/lib/data/playbooks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playbooks | Nucleus",
  description: "Premium educational resources for European startup founders. Fundraising guides, VC evaluation frameworks, and cross-border strategies.",
};

export default function PlaybooksPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
      <div className="mb-10">
        <div className="mb-2 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-nucleus-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-accent">Playbooks</span>
        </div>
        <h1 className="font-display text-4xl tracking-tight text-nucleus-text-primary md:text-5xl">
          Founder Playbooks
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-nucleus-text-secondary">
          In-depth guides for navigating European fundraising, built from direct experience
          screening 100+ deals and running a $20M+ Series A.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {playbooks.map((playbook) => (
          <Link
            key={playbook.id}
            href={`/playbooks/${playbook.slug}`}
            className="group block rounded-card border border-nucleus-border bg-nucleus-surface p-6 transition-all hover:border-nucleus-accent/30 hover:shadow-glow"
          >
            <div className="mb-3 flex flex-wrap gap-1.5">
              {playbook.topic_tags.map((tag) => (
                <span key={tag} className="rounded-tag bg-nucleus-accent/10 px-2 py-0.5 text-xs font-semibold text-nucleus-accent">
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="font-display text-xl tracking-tight text-nucleus-text-primary group-hover:text-nucleus-accent transition-colors">
              {playbook.title}
            </h3>

            <p className="mt-2 text-sm text-nucleus-text-secondary leading-relaxed">
              {playbook.description}
            </p>

            <div className="mt-4 flex items-center gap-3 text-xs text-nucleus-text-muted">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {playbook.reading_time_minutes} min read
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
