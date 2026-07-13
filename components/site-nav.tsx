"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ThemeToggle } from "./theme-toggle";
import { MagneticLink } from "./magnetic-link";
import { useGsap, prefersReducedMotion } from "@/lib/gsap";

const NAV_LINKS = [
  { href: "/posts", label: "posts" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const activeHref =
    NAV_LINKS.find(
      (l) => pathname === l.href || pathname.startsWith(`${l.href}/`),
    )?.href ?? null;

  // Slide the pill indicator behind a link's position within the nav row.
  function moveIndicatorTo(href: string | null, animate = true) {
    const container = linksRef.current;
    const indicator = indicatorRef.current;
    const target = href ? linkRefs.current[href] : null;
    if (!container || !indicator) return;

    if (!target) {
      indicator.style.opacity = "0";
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const x = targetRect.left - containerRect.left;
    const { gsap } = useGsap();

    if (animate && !prefersReducedMotion()) {
      gsap.to(indicator, {
        x,
        width: targetRect.width,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      });
    } else {
      indicator.style.transform = `translateX(${x}px)`;
      indicator.style.width = `${targetRect.width}px`;
      indicator.style.opacity = "1";
    }
  }

  useEffect(() => {
    moveIndicatorTo(activeHref, false);
    // Re-sync on resize since link widths/positions can shift.
    const onResize = () => moveIndicatorTo(activeHref, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHref]);

  // Hide the floating nav on scroll-down, reveal it on scroll-up.
  useEffect(() => {
    const header = headerRef.current;
    if (!header || prefersReducedMotion()) return;

    const { gsap } = useGsap();
    const moveY = gsap.quickTo(header, "y", { duration: 0.35, ease: "power3" });
    let lastY = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const goingDown = y > lastY;
      if (y > 120 && goingDown) {
        moveY(-96);
      } else {
        moveY(0);
      }
      lastY = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      {/* Floating glass pill — translucent fill + backdrop blur distorts
          the checkerboard pattern scrolling beneath it. */}
      <nav className="flex items-center gap-1 rounded-full border border-border/70 bg-background/55 py-1.5 pl-4 pr-1.5 shadow-lg shadow-black/5 backdrop-blur-md backdrop-saturate-150 dark:shadow-black/40">
        {/* Brand — terminal-style prompt */}
        <MagneticLink
          href="/"
          strength={10}
          className="mr-2 font-mono text-sm font-medium tracking-tight text-foreground"
        >
          <span className="text-accent">~/</span>swarolio
        </MagneticLink>

        <div
          ref={linksRef}
          onMouseLeave={() => moveIndicatorTo(activeHref)}
          className="relative flex items-center gap-1"
        >
          <div
            ref={indicatorRef}
            aria-hidden="true"
            className="absolute inset-y-0 left-0 -z-10 rounded-full bg-accent/10 opacity-0"
          />
          {NAV_LINKS.map((link) => {
            const active = link.href === activeHref;
            return (
              <Link
                key={link.href}
                href={link.href}
                ref={(node) => {
                  linkRefs.current[link.href] = node;
                }}
                onMouseEnter={() => moveIndicatorTo(link.href)}
                data-cursor="link"
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 font-mono text-sm transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <span className="mx-1.5 h-5 w-px bg-border" aria-hidden="true" />
        <ThemeToggle />
      </nav>
    </header>
  );
}
