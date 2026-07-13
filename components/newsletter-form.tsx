"use client";

import { useState, type FormEvent } from "react";

// No backend wired up yet — this just acknowledges the submission locally.
// Swap the onSubmit body for a real subscribe call (Resend, ConvertKit, etc.)
// when one exists.
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="font-mono text-xs text-accent">
        thanks — you&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xs gap-2 sm:w-auto">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="w-full min-w-0 rounded-md border border-border bg-transparent px-3 py-1.5 font-mono text-xs text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        data-cursor="link"
        className="shrink-0 rounded-md bg-accent px-3 py-1.5 font-mono text-xs font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        subscribe
      </button>
    </form>
  );
}
