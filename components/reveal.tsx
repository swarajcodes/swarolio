"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Fades + slides its children up as they enter the viewport.
 * Pass `stagger` to animate items individually instead of the wrapper as one
 * block — mark each item with `data-reveal-item` (works at any nesting depth,
 * e.g. <li> inside a <ul>). Falls back to direct children if none are marked.
 */
export function Reveal({
  children,
  className,
  stagger,
  y = 28,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = useGsap();
    const marked = el.querySelectorAll("[data-reveal-item]");
    const targets = stagger
      ? marked.length
        ? Array.from(marked)
        : Array.from(el.children)
      : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
