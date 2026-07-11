import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "contact — swarolio",
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <PageHeader
          title="contact"
          subtitle="Ways to reach me."
        />
        <p className="text-muted">Content coming soon.</p>
      </div>
    </section>
  );
}
