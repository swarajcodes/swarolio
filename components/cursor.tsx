"use client";

import { useEffect, useRef } from "react";
import { useGsap, prefersReducedMotion } from "@/lib/gsap";

// Custom ring cursor: a small dot that leads, a lagging ring that trails,
// both growing over interactive elements marked with data-cursor="link".
// Desktop (fine pointer) only — falls back to the native cursor otherwise.
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || prefersReducedMotion()) return;

    const { gsap } = useGsap();
    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const moveDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "none" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.05, ease: "none" });
    const moveRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

    function onMove(e: PointerEvent) {
      moveDot(e.clientX);
      moveDotY(e.clientY);
      moveRing(e.clientX);
      moveRingY(e.clientY);
    }

    function onOver(e: PointerEvent) {
      const target = (e.target as HTMLElement)?.closest('[data-cursor="link"]');
      gsap.to(ring, {
        scale: target ? 2.2 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, {
        opacity: target ? 0 : 1,
        duration: 0.2,
      });
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent opacity-0 [.has-custom-cursor_&]:opacity-60"
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 [.has-custom-cursor_&]:opacity-100"
      />
    </div>
  );
}
