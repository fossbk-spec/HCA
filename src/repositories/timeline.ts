import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { withDatabase } from "@/lib/seed-fallback";
import { listAllCivilizations, type CivilizationSummary } from "@/repositories/civilizations";

export type TimelineItem = {
  slug: string;
  title: string;
  titleVi: string | null;
  year: number;
  endYear: number | null;
  href: string;
  kind: "event" | "civilization";
};

export type TimelineDetailItem = TimelineItem & {
  summary: string | null;
  summaryVi: string | null;
};

type SeedEvent = {
  slug: string;
  title: string;
  titleVi?: string | null;
  startYear: number | null;
  endYear?: number | null;
  summary?: string | null;
  summaryVi?: string | null;
};

async function seedEvents(): Promise<SeedEvent[]> {
  const file = path.join(process.cwd(), "data", "seed", "events.json");
  return JSON.parse(await readFile(file, "utf8")) as SeedEvent[];
}

export async function listTimeline(): Promise<TimelineDetailItem[]> {
  const civilizations = await listAllCivilizations();
  const periods: TimelineDetailItem[] = civilizations
    .filter((item) => item.periodStart !== null)
    .map((item) => ({
      slug: item.slug,
      title: item.name,
      titleVi: item.nameVi ?? null,
      year: item.periodStart!,
      endYear: item.periodEnd,
      summary: item.summary,
      summaryVi: item.summaryVi ?? null,
      href: `/civilizations/${item.slug}`,
      kind: "civilization",
    }));

  const eventRows: SeedEvent[] = await withDatabase("timeline.list", () => prisma.event.findMany({
        where: { startYear: { not: null } },
        orderBy: { startYear: "asc" },
        select: {
          slug: true,
          title: true,
          titleVi: true,
          startYear: true,
          endYear: true,
          summary: true,
          summaryVi: true,
        },
      }), seedEvents);

  const events: TimelineDetailItem[] = eventRows
    .filter((row) => row.startYear !== null)
    .map((row) => ({
      slug: row.slug,
      title: row.title,
      titleVi: row.titleVi ?? null,
      year: row.startYear!,
      endYear: row.endYear ?? null,
      summary: row.summary ?? null,
      summaryVi: row.summaryVi ?? null,
      href: `/events/${row.slug}`,
      kind: "event",
    }));

  return [...periods, ...events].sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
}

export async function listTimelinePreview(civilizations: CivilizationSummary[]): Promise<TimelineItem[]> {
  const periods: TimelineItem[] = civilizations
    .filter((item) => item.periodStart !== null)
    .map((item) => ({
      slug: item.slug,
      title: item.name,
      titleVi: item.nameVi ?? null,
      year: item.periodStart!,
      endYear: item.periodEnd,
      href: `/civilizations/${item.slug}`,
      kind: "civilization",
    }));

  const events: TimelineItem[] = await withDatabase("timeline.preview", async () => {
      const rows = await prisma.event.findMany({
        where: { startYear: { not: null } },
        orderBy: { startYear: "asc" },
        take: 8,
        select: { slug: true, title: true, titleVi: true, startYear: true, endYear: true },
      });
      return rows.filter((row) => row.startYear !== null).map((row) => ({
        slug: row.slug,
        title: row.title,
        titleVi: row.titleVi ?? null,
        year: row.startYear!,
        endYear: row.endYear,
        href: `/events/${row.slug}`,
        kind: "event",
      }));
  }, async () => []);
  return [...periods, ...events].sort((a, b) => a.year - b.year).slice(0, 10);
}
