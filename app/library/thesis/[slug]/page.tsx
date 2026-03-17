import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Feather } from "lucide-react";
import { thesisArticles } from "@/lib/data/thesis-articles";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const thesis = thesisArticles.find((t) => t.slug === slug);
  if (!thesis) return { title: "Not Found | Nucleus" };
  return {
    title: `${thesis.title} | The Thesis | Nucleus`,
    description: thesis.excerpt,
    openGraph: {
      title: thesis.title,
      description: thesis.excerpt,
      type: "article",
      ...(thesis.cover_image
        ? { images: [{ url: thesis.cover_image, width: 1200, height: 630 }] }
        : {}),
    },
  };
}

export async function generateStaticParams() {
  return thesisArticles.map((t) => ({ slug: t.slug }));
}

function renderBody(body: string) {
  return body.split("\n\n").map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mb-4 mt-10 font-display text-2xl tracking-tight text-nucleus-text-primary md:text-3xl"
        >
          {trimmed.slice(3)}
        </h2>
      );
    }

    return (
      <p
        key={i}
        className="mb-5 text-base leading-[1.8] text-nucleus-text-secondary"
      >
        {trimmed}
      </p>
    );
  });
}

export default async function ThesisArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const thesis = thesisArticles.find((t) => t.slug === slug);
  if (!thesis) notFound();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6 lg:py-12">
      <Link
        href="/library"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-nucleus-text-muted transition-colors hover:text-nucleus-text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Library
      </Link>

      <article className="mx-auto max-w-reading">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-amber-400/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-nucleus-black">
              {thesis.category}
            </span>
            <div className="flex gap-1.5">
              {thesis.topic_tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-tag bg-nucleus-accent/10 px-2 py-0.5 text-xs font-semibold text-nucleus-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-3 flex items-center gap-2 text-xs text-amber-400/80">
            <Feather className="h-3.5 w-3.5" />
            <span className="font-semibold uppercase tracking-[0.05em]">
              The Thesis
            </span>
          </div>

          <h1 className="font-display text-3xl leading-tight tracking-tight text-nucleus-text-primary md:text-[2.5rem]">
            {thesis.central_question}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-nucleus-text-secondary">
            {thesis.subtitle}
          </p>

          <div className="mt-5 flex items-center gap-4 border-b border-nucleus-border pb-6 text-sm text-nucleus-text-muted">
            <span>{thesis.author}</span>
            <span className="h-1 w-1 rounded-full bg-nucleus-text-muted" />
            <span>{formatDate(thesis.published_at)}</span>
            <span className="h-1 w-1 rounded-full bg-nucleus-text-muted" />
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {thesis.reading_time_minutes} min read
            </span>
          </div>
        </header>

        {/* Hero image */}
        {thesis.cover_image && (
          <div className="mb-10 overflow-hidden rounded-card">
            <div className="relative aspect-[16/7]">
              <Image
                src={thesis.cover_image}
                alt={thesis.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="prose-nucleus">{renderBody(thesis.body)}</div>

        {/* CTA */}
        <div className="mt-14">
          <NewsletterCTA />
        </div>
      </article>
    </div>
  );
}
