import type { ContentEntry } from "@/lib/types";
import { Reveal } from "./reveal";
import { ProjectCard } from "./project-card";

export function Projects({ projects }: { projects: ContentEntry[] }) {
  return (
    <Reveal stagger>
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug} data-reveal-item>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
