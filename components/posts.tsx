import Link from "next/link";
import type { ContentEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function Posts({ posts }: { posts: ContentEntry[] }) {
  return (
    <ul className="divide-y divide-border">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/posts/${post.slug}`}
            className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <div>
              <h3 className="font-medium text-foreground transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted">
                {post.summary}
              </p>
            </div>
            <time
              dateTime={post.date}
              className="shrink-0 font-mono text-xs text-muted"
            >
              {formatDate(post.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
