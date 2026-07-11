import Link from "next/link";
import { Projects } from "./projects";
import { getProjects } from "@/lib/projects";

export async function RecentProjects() {
  const projects = await getProjects(2);

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="mb-4 font-mono text-sm text-accent">
          {"// recent projects"}
        </h2>
        <Projects projects={projects} />
        <Link
          href="/projects"
          className="mt-6 inline-block font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          all projects →
        </Link>
      </div>
    </section>
  );
}
