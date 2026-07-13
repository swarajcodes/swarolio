import { Reveal } from "./reveal";
import { NewsletterForm } from "./newsletter-form";
import { TextRollLink } from "./text-roll-link";
import { MagneticLink } from "./magnetic-link";
import { IconCta } from "./icon-cta";

const SOCIALS = [
  { href: "https://github.com/swarajcodes", label: "github", external: true },
  {
    href: "https://linkedin.com/in/swarajcodes",
    label: "linkedin",
    external: true,
  },
  { href: "https://twitter.com/swarajcodes", label: "x", external: true },
];

export function Footer() {
  return (
    <footer className="flex min-h-dvh flex-col justify-between overflow-hidden border-t border-border bg-background p-6 sm:p-10">
      {/* Top row: brand + social text-roll links */}
      <Reveal
        y={12}
        className="flex items-start justify-between font-mono text-sm uppercase"
      >
        <span className="text-muted">
          <span className="text-accent">~/</span>swarolio
        </span>
        <div className="flex gap-6">
          {SOCIALS.map((social) => (
            <TextRollLink
              key={social.label}
              href={social.href}
              external={social.external}
              className="text-muted"
            >
              {social.label}
            </TextRollLink>
          ))}
        </div>
      </Reveal>

      {/* Center stage: the big ask */}
      <Reveal className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {"// say hello"}
        </p>
        <MagneticLink
          href="mailto:swaraj081@gmail.com"
          strength={20}
          className="group flex items-center gap-3 text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-accent sm:text-4xl md:text-5xl"
        >
          swaraj081@gmail.com
          <IconCta className="size-9 sm:size-11" />
        </MagneticLink>
      </Reveal>

      {/* Bottom row: newsletter + copyright */}
      <Reveal
        y={12}
        className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-muted sm:flex-row sm:items-center"
      >
        <p>© {new Date().getFullYear()} Swaraj Mohapatra</p>
        <NewsletterForm />
      </Reveal>
    </footer>
  );
}
