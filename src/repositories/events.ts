import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

export type Event = {
  slug: string;
  title: string;
  startYear: number | null;
  endYear: number | null;
  summary: string | null;
  content: string | null;
};

type SeedEvent = Event;

async function seedEvents(): Promise<Event[]> {
  const file = path.join(process.cwd(), "data", "seed", "events.json");
  const raw = JSON.parse(await readFile(file, "utf8")) as SeedEvent[];
  return raw.map((e) => ({
    slug: e.slug,
    title: e.title,
    startYear: e.startYear ?? null,
    endYear: e.endYear ?? null,
    summary: e.summary ?? null,
    content: e.content ?? null,
  }));
}

function sortEvents(events: Event[]): Event[] {
  return events.sort((a, b) =>
    (a.startYear ?? Number.POSITIVE_INFINITY) - (b.startYear ?? Number.POSITIVE_INFINITY) ||
    a.title.localeCompare(b.title)
  );
}

const eventSelect = {
  slug: true,
  title: true,
  startYear: true,
  endYear: true,
  summary: true,
  content: true,
} as const;

export async function listEvents(): Promise<Event[]> {
  if (process.env.DATABASE_URL) {
    try {
      return sortEvents(await prisma.event.findMany({ select: eventSelect }));
    } catch (error) {
      console.warn("Events query failed; using seed data.", error);
    }
  }
  return sortEvents(await seedEvents());
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (process.env.DATABASE_URL) {
    try {
      return await prisma.event.findUnique({ where: { slug }, select: eventSelect });
    } catch (error) {
      console.warn("Event query failed; using seed data.", error);
    }
  }
  return (await seedEvents()).find((e) => e.slug === slug) ?? null;
}

export async function listEventSlugs(): Promise<string[]> {
  if (process.env.DATABASE_URL) {
    try {
      const rows = await prisma.event.findMany({ select: { slug: true }, orderBy: { slug: "asc" } });
      return rows.map(({ slug }) => slug);
    } catch (error) {
      console.warn("Event slugs query failed; using seed data.", error);
    }
  }
  return (await seedEvents()).map(({ slug }) => slug).sort();
}
