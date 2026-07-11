export type ContentMetadata = {
  title: string;
  summary: string;
  date: string; // ISO date, e.g. "2026-07-12"
  tags?: string[];
};

export type ContentEntry = ContentMetadata & {
  slug: string;
};
