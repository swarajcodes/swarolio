import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Projects } from "@/components/projects";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "projects — swarolio",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <PageHeader title="projects" subtitle="Things I've built and shipped." />
        <Projects projects={projects} />
      </div>
    </section>
  );
}
