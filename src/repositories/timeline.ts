import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { listAllCivilizations, type CivilizationSummary } from "@/repositories/civilizations";

export type TimelineItem = {
  slug: string;
  title: string;
  year: number;
  endYear: number | null;
  href: string;
  kind: "event" | "civilization";
};

export type TimelineDetailItem = TimelineItem & { summary: string | null };

type SeedEvent = {
  slug: string;
  title: string;
  startYear: number | null;
  endYear?: number | null;
  summary?: string | null;
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
      year: item.periodStart!,
      endYear: item.periodEnd,
      summary: item.summary,
      href: `/civilizations/${item.slug}`,
      kind: "civilization",
    }));

  let eventRows: SeedEvent[];
  if (process.env.DATABASE_URL) {
    try {
      eventRows = await prisma.event.findMany({
        where: { startYear: { not: null } },
        orderBy: { startYear: "asc" },
        select: { slug: true, title: true, startYear: true, endYear: true, summary: true },
      });
    } catch (error) {
      console.warn("Timeline query failed; using seed data.", error);
      eventRows = await seedEvents();
    }
  } else {
    eventRows = await seedEvents();
  }

  const events: TimelineDetailItem[] = eventRows
    .filter((row) => row.startYear !== null)
    .map((row) => ({
      slug: row.slug,
      title: row.title,
      year: row.startYear!,
      endYear: row.endYear ?? null,
      summary: row.summary ?? null,
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
