"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  className?: string;
};

// Masked two-line hover: the visible line slides up and out while an
// accent-colored duplicate slides up into its place. Same trick as the
// text-swap links on sharebien.com's footer, adapted with a color shift.
function RollContent({ children }: { children: ReactNode }) {
  return (
    <span className="group relative inline-block h-[1.1em] overflow-hidden align-bottom leading-[1.1]">
      <span className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
        <span>{children}</span>
        <span className="text-accent">{children}</span>
      </span>
    </span>
  );
}

export function TextRollLink({
  href,
  external,
  children,
  className,
  ...rest
}: CommonProps & {
  href: string;
  external?: boolean;
} & React.ComponentPropsWithoutRef<"a">) {
  const content = <RollContent>{children}</RollContent>;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="link"
        className={className}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} data-cursor="link" className={className}>
      {content}
    </Link>
  );
}
