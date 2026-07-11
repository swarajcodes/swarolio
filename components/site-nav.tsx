"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const NAV_LINKS = [
  { href: "/posts", label: "posts" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      {/* Floating glass pill — translucent fill + backdrop blur distorts
          the checkerboard pattern scrolling beneath it. */}
      <nav className="flex items-center gap-1 rounded-full border border-border/70 bg-background/55 py-1.5 pl-4 pr-1.5 shadow-lg shadow-black/5 backdrop-blur-md backdrop-saturate-150 dark:shadow-black/40">
        {/* Brand — terminal-style prompt */}
        <Link
          href="/"
          className="mr-2 font-mono text-sm font-medium tracking-tight text-foreground"
        >
          <span className="text-accent">~/</span>swarolio
        </Link>

        {NAV_LINKS.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 font-mono text-sm transition-colors ${
                active
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <span className="mx-1.5 h-5 w-px bg-border" aria-hidden="true" />
        <ThemeToggle />
      </nav>
    </header>
  );
}
