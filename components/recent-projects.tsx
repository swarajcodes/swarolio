import Link from "next/link";
import { Projects } from "./projects";
import { Reveal } from "./reveal";
import { getProjects } from "@/lib/projects";

export async function RecentProjects() {
  const projects = await getProjects(2);

  return (
    <section className="py-12">
      <div className="container">
        <Reveal>
          <h2 className="mb-4 font-mono text-sm text-accent">
            {"// recent projects"}
          </h2>
        </Reveal>
        <Projects projects={projects} />
        <Link
          href="/projects"
          data-cursor="link"
          className="mt-6 inline-block font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          all projects →
        </Link>
      </div>
    </section>
  );
}
