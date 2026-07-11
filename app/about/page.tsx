import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "about — swarolio",
};

export default function AboutPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <PageHeader
          title="about"
          subtitle="A bit about who I am and what I work on."
        />
        <p className="text-muted">Content coming soon.</p>
      </div>
    </section>
  );
}
