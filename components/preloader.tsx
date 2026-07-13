"use client";

import { useEffect, useRef, useState } from "react";
import { useGsap, prefersReducedMotion } from "@/lib/gsap";

const SESSION_KEY = "swarolio-intro-played";

// A one-time-per-session percentage counter over the first paint.
// Purely ceremonial — not tied to real asset loading.
export function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let alreadyPlayed = true;
    try {
      alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage unavailable (e.g. privacy mode) — just skip the intro.
    }

    if (alreadyPlayed || prefersReducedMotion()) {
      setHidden(true);
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }

    const { gsap } = useGsap();
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.inOut",
          onComplete: () => setHidden(true),
        });
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 1.3,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(
            Math.round(counter.value),
          ).padStart(3, "0");
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[200] flex items-end justify-between bg-background px-6 py-6 sm:px-10 sm:py-8 md:items-center"
    >
      <span className="font-mono text-sm text-muted">
        <span className="text-accent">~/</span>swarolio
      </span>
      <span className="font-mono text-sm tabular-nums text-muted">
        <span ref={counterRef}>000</span>
        <span className="opacity-40">/100</span>
      </span>
    </div>
  );
}
