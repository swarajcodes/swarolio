import { getEntries, getSlugs } from "./content";
import type { ContentEntry } from "./types";

export function getPostSlugs(): string[] {
  return getSlugs("posts");
}

export async function getPosts(limit?: number): Promise<ContentEntry[]> {
  return getEntries("posts", limit);
}
