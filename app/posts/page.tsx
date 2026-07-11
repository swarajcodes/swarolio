import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Posts } from "@/components/posts";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "posts — swarolio",
};

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <PageHeader
          title="posts"
          subtitle="Notes on things I'm building and learning."
        />
        <Posts posts={posts} />
      </div>
    </section>
  );
}
