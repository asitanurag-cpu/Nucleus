"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterCTA({
  variant = "default",
  className,
}: {
  variant?: "default" | "compact" | "inline";
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setEmail("");
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 rounded-input border border-nucleus-border bg-nucleus-surface px-3 py-2 text-sm text-nucleus-text-primary placeholder:text-nucleus-text-muted focus:border-nucleus-accent focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-button bg-nucleus-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-nucleus-accent-hover disabled:opacity-50"
        >
          {status === "success" ? <Check className="h-4 w-4" /> : "Subscribe"}
        </button>
      </form>
    );
  }

  return (
    <div
      className={cn(
        "rounded-card border border-nucleus-border bg-nucleus-dark p-8 text-center",
        className
      )}
    >
      <h3 className="font-display text-2xl tracking-tight text-nucleus-text-primary">
        European VC intelligence, weekly.
      </h3>
      <p className="mt-2 text-sm text-nucleus-text-secondary">
        Curated startup signals, funding round summaries, and original analysis —
        delivered every Tuesday.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-6 flex max-w-md gap-2"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 rounded-input border border-nucleus-border bg-nucleus-surface px-4 py-2.5 text-sm text-nucleus-text-primary placeholder:text-nucleus-text-muted focus:border-nucleus-accent focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-button bg-nucleus-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-nucleus-accent-hover disabled:opacity-50"
        >
          {status === "success" ? (
            <>
              <Check className="h-4 w-4" /> Subscribed
            </>
          ) : (
            <>
              Subscribe <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
      {status === "success" && (
        <p className="mt-3 text-sm text-nucleus-signal">
          Welcome aboard. Check your inbox for confirmation.
        </p>
      )}
    </div>
  );
}
