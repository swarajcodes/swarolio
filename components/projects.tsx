import Link from "next/link";
import type { ContentEntry } from "@/lib/types";

export function Projects({ projects }: { projects: ContentEntry[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link
            href={`/projects/${project.slug}`}
            className="group flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 transition-colors hover:border-accent"
          >
            <h3 className="font-mono text-sm font-medium text-foreground transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-muted">{project.summary}</p>
            {project.tags && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2 py-0.5 font-mono text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
