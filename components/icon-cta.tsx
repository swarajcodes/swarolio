function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 11L11 3M11 3H4.5M11 3V9.5" />
    </svg>
  );
}

/**
 * A circular icon badge for CTAs: on hover the arrow flies out to the
 * top-right while an identical duplicate flies in from the bottom-left,
 * landing exactly where the first one started. Pair inside a link/button.
 */
export function IconCta({ className }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-current/30 ${className ?? ""}`}
    >
      <ArrowIcon className="absolute transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:-translate-y-4" />
      <ArrowIcon className="absolute -translate-x-4 translate-y-4 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
    </span>
  );
}
