import Link from "next/link";
import { getPostSlugs } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import type { ContentMetadata } from "@/lib/types";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// Only slugs from generateStaticParams exist; anything else 404s.
export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/posts/[slug]">) {
  const { slug } = await props.params;
  const { metadata } = (await import(`@/content/posts/${slug}.mdx`)) as {
    metadata: ContentMetadata;
  };
  return {
    title: `${metadata.title} — swarolio`,
    description: metadata.summary,
  };
}

export default async function PostPage(props: PageProps<"/posts/[slug]">) {
  const { slug } = await props.params;
  const { default: Post, metadata } = (await import(
    `@/content/posts/${slug}.mdx`
  )) as { default: React.ComponentType; metadata: ContentMetadata };

  return (
    <article className="py-16 sm:py-24">
      <div className="container max-w-3xl">
        <Link
          href="/posts"
          className="font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          cd ../posts
        </Link>

        <header className="mb-10 mt-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {metadata.title}
          </h1>
          <time
            dateTime={metadata.date}
            className="mt-3 block font-mono text-sm text-muted"
          >
            {formatDate(metadata.date)}
          </time>
        </header>

        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-accent prose-code:font-mono">
          <Post />
        </div>
      </div>
    </article>
  );
}
