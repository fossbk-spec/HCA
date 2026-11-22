import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { withDatabase } from "@/lib/seed-fallback";

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
  return withDatabase("events.list", async () => sortEvents(await prisma.event.findMany({ select: eventSelect })),
    async () => sortEvents(await seedEvents()));
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return withDatabase("events.detail", () => prisma.event.findUnique({ where: { slug }, select: eventSelect }),
    async () => (await seedEvents()).find((e) => e.slug === slug) ?? null);
}

export async function listEventSlugs(): Promise<string[]> {
  return withDatabase("events.slugs", async () => {
      const rows = await prisma.event.findMany({ select: { slug: true }, orderBy: { slug: "asc" } });
      return rows.map(({ slug }) => slug);
  }, async () => (await seedEvents()).map(({ slug }) => slug).sort());
}
