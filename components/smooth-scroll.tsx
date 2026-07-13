"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useGsap, prefersReducedMotion } from "@/lib/gsap";

// Drives inertia-based smooth scrolling and keeps GSAP's ScrollTrigger
// in sync with Lenis's virtual scroll position. Renders nothing.
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = useGsap();

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return null;
}
