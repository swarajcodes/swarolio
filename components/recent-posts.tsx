import Link from "next/link";
import { Posts } from "./posts";
import { getPosts } from "@/lib/posts";

export async function RecentPosts() {
  const posts = await getPosts(3);

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="mb-4 font-mono text-sm text-accent">{"// recent posts"}</h2>
        <Posts posts={posts} />
        <Link
          href="/posts"
          className="mt-6 inline-block font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          all posts →
        </Link>
      </div>
    </section>
  );
}
