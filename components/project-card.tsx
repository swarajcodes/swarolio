"use client";

import Link from "next/link";
import type { ContentEntry } from "@/lib/types";
import { useTilt } from "@/hooks/use-tilt";

export function ProjectCard({ project }: { project: ContentEntry }) {
  const ref = useTilt<HTMLAnchorElement>();

  return (
    <div className="[perspective:800px]">
      <Link
        ref={ref}
        href={`/projects/${project.slug}`}
        data-cursor="link"
        className="group flex h-full flex-col rounded-lg border border-border bg-card/60 p-5 transition-colors [transform-style:preserve-3d] hover:border-accent"
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
    </div>
  );
}
