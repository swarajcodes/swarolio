import fs from "fs";
import path from "path";
import type { ContentEntry, ContentMetadata } from "./types";

// Shared reader for MDX content collections (content/posts, content/projects).
// Each .mdx file must have an `export const metadata = {...}` block.

export function getSlugs(dir: "posts" | "projects"): string[] {
  const root = path.join(process.cwd(), "content", dir);
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getEntries(
  dir: "posts" | "projects",
  limit?: number,
): Promise<ContentEntry[]> {
  const slugs = getSlugs(dir);

  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = (await import(
        `@/content/${dir}/${slug}.mdx`
      )) as { metadata: ContentMetadata };
      return { slug, ...metadata };
    }),
  );

  entries.sort((a, b) => (a.date < b.date ? 1 : -1));
  return limit ? entries.slice(0, limit) : entries;
}
