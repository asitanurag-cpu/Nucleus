import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { playbooks } from "@/lib/data/playbooks";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const playbook = playbooks.find((p) => p.slug === slug);
  if (!playbook) return { title: "Not Found | Nucleus" };
  return {
    title: `${playbook.title} | Nucleus`,
    description: playbook.description,
  };
}

export async function generateStaticParams() {
  return playbooks.map((p) => ({ slug: p.slug }));
}

function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("## ")) return <h2 key={i}>{trimmed.slice(3)}</h2>;
    if (trimmed.startsWith("### ")) return <h3 key={i}>{trimmed.slice(4)}</h3>;
    if (trimmed.startsWith("- **")) {
      const match = trimmed.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/);
      if (match) return <li key={i}><strong>{match[1]}</strong>{match[2] ? `: ${match[2]}` : ""}</li>;
    }
    if (trimmed.startsWith("- ")) return <li key={i}>{trimmed.slice(2)}</li>;
    if (/^\d+\.\s\*\*/.test(trimmed)) {
      const match = trimmed.match(/^\d+\.\s\*\*(.+?)\*\*:?\s*(.*)$/);
      if (match) return <li key={i}><strong>{match[1]}</strong>{match[2] ? `: ${match[2]}` : ""}</li>;
    }

    const parts = trimmed.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={i}>
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) return <strong key={j}>{part.slice(2, -2)}</strong>;
          return part;
        })}
      </p>
    );
  });
}

export default async function PlaybookPage({ params }: { params: Params }) {
  const { slug } = await params;
  const playbook = playbooks.find((p) => p.slug === slug);
  if (!playbook) notFound();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6 lg:py-12">
      <Link href="/library" className="mb-8 inline-flex items-center gap-1.5 text-sm text-nucleus-text-muted transition-colors hover:text-nucleus-text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Library
      </Link>

      <article className="mx-auto max-w-reading">
        <header className="mb-8">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {playbook.topic_tags.map((tag) => (
              <span key={tag} className="rounded-tag bg-nucleus-accent/10 px-2 py-0.5 text-xs font-semibold text-nucleus-accent">{tag}</span>
            ))}
          </div>
          <h1 className="font-display text-3xl tracking-tight text-nucleus-text-primary md:text-4xl">
            {playbook.title}
          </h1>
          <p className="mt-3 text-lg text-nucleus-text-secondary">{playbook.description}</p>
          <div className="mt-4 flex items-center gap-3 border-b border-nucleus-border pb-6 text-sm text-nucleus-text-muted">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {playbook.reading_time_minutes} min read</span>
            <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> Playbook</span>
          </div>
        </header>

        <div className="prose-nucleus">
          {renderContent(playbook.content)}
        </div>

        <div className="mt-12">
          <NewsletterCTA />
        </div>
      </article>
    </div>
  );
}
