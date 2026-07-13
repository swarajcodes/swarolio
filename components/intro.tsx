import { HeroOrb } from "@/components/scene/hero-orb";
import { SplitHeading } from "@/components/split-heading";
import { MagneticLink } from "@/components/magnetic-link";
import { IconCta } from "@/components/icon-cta";
import { Reveal } from "@/components/reveal";

export function Intro() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <HeroOrb />
      <div className="container">
        <p className="mb-4 font-mono text-sm text-accent">$ whoami</p>
        <SplitHeading
          text="Hey, I'm Swaraj"
          className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl"
        />
        <Reveal delay={0.5}>
          <p className="mt-2 font-mono text-sm text-muted">/swə.raːj/</p>
          <p className="mt-6 max-w-xl text-lg text-muted">
            I build things for the web and write about what I learn along
            the way. Grab a coffee — this is projects, posts, and the
            occasional rabbit hole.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticLink
              href="/projects"
              className="group flex items-center gap-2 rounded-full bg-accent py-2 pl-4 pr-2 font-mono text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              view projects
              <IconCta />
            </MagneticLink>
            <MagneticLink
              href="/contact"
              className="group flex items-center gap-2 rounded-full border border-border py-2 pl-4 pr-2 font-mono text-sm text-foreground transition-colors hover:border-accent"
            >
              get in touch
              <IconCta />
            </MagneticLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
