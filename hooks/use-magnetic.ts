"use client";

import { useEffect, useRef } from "react";
import { useGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Attach to a button/link ref to make it "magnetically" pull toward the
 * cursor within `strength` px, and spring back on pointer leave.
 */
export function useMagnetic<T extends HTMLElement>(strength = 16) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!el || !isFinePointer || prefersReducedMotion()) return;

    const { gsap } = useGsap();
    const moveX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      moveX((relX / rect.width) * strength);
      moveY((relY / rect.height) * strength);
    }

    function onLeave() {
      moveX(0);
      moveY(0);
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return ref;
}
