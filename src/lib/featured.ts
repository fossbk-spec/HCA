export const featuredCivilizationSlugs = ["ancient-egypt", "ancient-greece", "roman-empire", "ancient-india", "ancient-china"] as const;
export const featuredIdeaSlugs = ["democracy", "scientific-method", "rule-of-law", "money", "printing-press"] as const;

export function pickBySlugs<T extends { slug: string }>(rows: T[], slugs: readonly string[]): T[] {
  const rowsBySlug = new Map(rows.map((row) => [row.slug, row]));
  return slugs.flatMap((slug) => {
    const row = rowsBySlug.get(slug);
    return row ? [row] : [];
  });
}
