"use client";

import { useEffect, useRef } from "react";
import { useGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Pointer-driven 3D tilt: the element leans away from the cursor and lifts
 * slightly, springing back to flat on pointer leave. Pair the returned ref's
 * element with a `perspective-[800px]` wrapper for the 3D effect to read.
 */
export function useTilt<T extends HTMLElement>(maxTilt = 8) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!el || !isFinePointer || prefersReducedMotion()) return;

    const { gsap } = useGsap();
    const rotateX = gsap.quickTo(el, "rotateX", { duration: 0.4, ease: "power3" });
    const rotateY = gsap.quickTo(el, "rotateY", { duration: 0.4, ease: "power3" });
    const lift = gsap.quickTo(el, "z", { duration: 0.4, ease: "power3" });

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX(-py * maxTilt);
      rotateY(px * maxTilt);
    }

    function onEnter() {
      lift(20);
    }

    function onLeave() {
      rotateX(0);
      rotateY(0);
      lift(0);
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [maxTilt]);

  return ref;
}
