import { prisma } from "@/lib/prisma";
import type { CivilizationSummary } from "@/repositories/civilizations";

export type TimelineItem = {
  slug: string;
  title: string;
  year: number;
  endYear: number | null;
  href: string;
  kind: "event" | "civilization";
};

export async function listTimelinePreview(civilizations: CivilizationSummary[]): Promise<TimelineItem[]> {
  const periods: TimelineItem[] = civilizations
    .filter((item) => item.periodStart !== null)
    .map((item) => ({
      slug: item.slug,
      title: item.name,
      year: item.periodStart!,
      endYear: item.periodEnd,
      href: `/civilizations/${item.slug}`,
      kind: "civilization",
    }));

  let events: TimelineItem[] = [];
  if (process.env.DATABASE_URL) {
    try {
      const rows = await prisma.event.findMany({
        where: { startYear: { not: null } },
        orderBy: { startYear: "asc" },
        take: 8,
        select: { slug: true, title: true, startYear: true, endYear: true },
      });
      events = rows.filter((row) => row.startYear !== null).map((row) => ({
        slug: row.slug,
        title: row.title,
        year: row.startYear!,
        endYear: row.endYear,
        href: `/events/${row.slug}`,
        kind: "event",
      }));
    } catch (error) {
      console.warn("Timeline query failed; using civilization periods.", error);
    }
  }
  return [...periods, ...events].sort((a, b) => a.year - b.year).slice(0, 10);
}
