import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, Feather, ArrowRight } from "lucide-react";
import { playbooks } from "@/lib/data/playbooks";
import { thesisArticles } from "@/lib/data/thesis-articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library | Nucleus",
  description:
    "Premium resources for European startup founders and investors. Long-form editorial, fundraising playbooks, and VC frameworks.",
};

export default function LibraryPage() {
  const publishedTheses = thesisArticles.filter((t) => t.status === "published");

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
      {/* Page header */}
      <div className="mb-14">
        <div className="mb-2 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-nucleus-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-accent">
            Library
          </span>
        </div>
        <h1 className="font-display text-4xl tracking-tight text-nucleus-text-primary md:text-5xl">
          Library
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-nucleus-text-secondary">
          Long-form editorial, fundraising playbooks, and VC frameworks — built
          from direct experience screening 100+ deals across European tech.
        </p>
      </div>

      {/* ─── The Thesis Section ─── */}
      <section className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <Feather className="h-5 w-5 text-amber-400" />
          <h2 className="font-display text-2xl tracking-tight text-nucleus-text-primary">
            The Thesis
          </h2>
        </div>
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-nucleus-text-secondary">
          Opinion-driven, long-form analysis structured around a single question
          about a company, market, or trend. Each piece takes a position and
          defends it.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publishedTheses.map((thesis) => (
            <Link
              key={thesis.id}
              href={`/library/thesis/${thesis.slug}`}
              className="group flex flex-col overflow-hidden rounded-card border border-nucleus-border bg-nucleus-surface transition-all hover:border-nucleus-accent/30 hover:shadow-glow"
            >
              {/* Cover image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-nucleus-accent-muted to-nucleus-surface">
                {thesis.cover_image ? (
                  <Image
                    src={thesis.cover_image}
                    alt={thesis.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Feather className="h-10 w-10 text-nucleus-accent/20" />
                  </div>
                )}
                {/* Category badge */}
                <div className="absolute left-3 top-3">
                  <span className="rounded-full bg-amber-400/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-nucleus-black">
                    {thesis.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                {/* Topic tags */}
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {thesis.topic_tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-tag bg-nucleus-accent/10 px-2 py-0.5 text-xs font-semibold text-nucleus-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Question-style title */}
                <h3 className="font-display text-lg leading-snug tracking-tight text-nucleus-text-primary transition-colors group-hover:text-nucleus-accent">
                  {thesis.central_question}
                </h3>

                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-nucleus-text-secondary">
                  {thesis.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-nucleus-text-muted">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {thesis.reading_time_minutes} min read
                    </span>
                    <span>{thesis.author}</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Playbooks Section ─── */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-nucleus-accent" />
          <h2 className="font-display text-2xl tracking-tight text-nucleus-text-primary">
            Founder Playbooks
          </h2>
        </div>
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-nucleus-text-secondary">
          In-depth guides for navigating European fundraising, built from direct
          experience screening 100+ deals and running a $20M+ Series A.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {playbooks.map((playbook) => (
            <Link
              key={playbook.id}
              href={`/library/${playbook.slug}`}
              className="group block rounded-card border border-nucleus-border bg-nucleus-surface p-6 transition-all hover:border-nucleus-accent/30 hover:shadow-glow"
            >
              <div className="mb-3 flex flex-wrap gap-1.5">
                {playbook.topic_tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-tag bg-nucleus-accent/10 px-2 py-0.5 text-xs font-semibold text-nucleus-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-display text-xl tracking-tight text-nucleus-text-primary transition-colors group-hover:text-nucleus-accent">
                {playbook.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-nucleus-text-secondary">
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
      </section>
    </div>
  );
}
