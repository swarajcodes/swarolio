"use client";

import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";

// A next/link wrapped with the magnetic-pull hook and marked for the
// custom cursor's "hover" ring-scale state.
export function MagneticLink({
  className,
  children,
  strength,
  ...props
}: LinkProps & { className?: string; children: ReactNode; strength?: number }) {
  const ref = useMagnetic<HTMLAnchorElement>(strength);

  return (
    <Link ref={ref} data-cursor="link" className={className} {...props}>
      {children}
    </Link>
  );
}
