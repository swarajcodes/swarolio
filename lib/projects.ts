import { getEntries, getSlugs } from "./content";
import type { ContentEntry } from "./types";

export function getProjectSlugs(): string[] {
  return getSlugs("projects");
}

export async function getProjects(limit?: number): Promise<ContentEntry[]> {
  return getEntries("projects", limit);
}
