import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "projects — swarolio",
};

export default function ProjectsPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <PageHeader
          title="projects"
          subtitle="Things I've built and shipped."
        />
        <p className="text-muted">Content coming soon.</p>
      </div>
    </section>
  );
}
