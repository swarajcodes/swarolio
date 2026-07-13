"use client";

import { useEffect, useRef } from "react";
import { useGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Splits `text` into words, each masked by an overflow-hidden span, and
 * animates them up into view on mount — a classic Awwwards-style entrance.
 * Renders as a heading-agnostic wrapper; pass the tag via `as`.
 */
export function SplitHeading({
  text,
  as: Tag = "h1",
  className,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");

    if (prefersReducedMotion()) {
      words.forEach((w) => (w.style.transform = "translateY(0)"));
      return;
    }

    const { gsap } = useGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          delay,
          ease: "power4.out",
          stagger: 0.07,
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pb-1">
          <span data-word className="inline-block will-change-transform">
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
