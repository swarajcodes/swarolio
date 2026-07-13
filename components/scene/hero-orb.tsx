"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroOrbScene = dynamic(() => import("./hero-orb-scene"), {
  ssr: false,
});

// Skips the WebGL scene entirely for reduced-motion users — it's decorative,
// not load-bearing, so bailing out is the correct default.
export function HeroOrb() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-70 mix-blend-multiply dark:opacity-90 dark:mix-blend-screen"
    >
      <HeroOrbScene />
    </div>
  );
}
