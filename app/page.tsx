import Link from "next/link";

export default function Home() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <p className="mb-4 font-mono text-sm text-accent">
          $ whoami
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Swaraj Mohapatra
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Developer building things for the web. This is my corner of the
          internet — a minimal, geeky devfolio.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-md bg-accent px-4 py-2 font-mono text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            view projects
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent"
          >
            get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
