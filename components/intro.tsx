import { HeroOrb } from "@/components/scene/hero-orb";
import { SplitHeading } from "@/components/split-heading";
import { MagneticLink } from "@/components/magnetic-link";
import { Reveal } from "@/components/reveal";

export function Intro() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <HeroOrb />
      <div className="container">
        <p className="mb-4 font-mono text-sm text-accent">$ whoami</p>
        <SplitHeading
          text="Swaraj Mohapatra"
          className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl"
        />
        <Reveal delay={0.5}>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Developer building things for the web. This is my corner of the
            internet — projects, posts, and the occasional rabbit hole.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticLink
              href="/projects"
              className="rounded-md bg-accent px-4 py-2 font-mono text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              view projects
            </MagneticLink>
            <MagneticLink
              href="/contact"
              className="rounded-md border border-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent"
            >
              get in touch
            </MagneticLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
