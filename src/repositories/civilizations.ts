import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

export type CivilizationSummary = {
  slug: string;
  name: string;
  region: string | null;
  periodStart: number | null;
  periodEnd: number | null;
  summary: string | null;
};

export type CivilizationPerson = {
  name: string;
  slug: string;
  birthYear: number | null;
  deathYear: number | null;
};

export type CivilizationDetail = CivilizationSummary & {
  content: string | null;
  people: CivilizationPerson[];
};

type SeedCivilization = CivilizationSummary & { content?: string | null };
type SeedPerson = CivilizationPerson & { civilizationSlug?: string | null };

async function seedCivilizationRows(): Promise<SeedCivilization[]> {
  const file = path.join(process.cwd(), "data", "seed", "civilizations.json");
  return JSON.parse(await readFile(file, "utf8")) as SeedCivilization[];
}

async function seedCivilizations(): Promise<CivilizationSummary[]> {
  const rows = await seedCivilizationRows();
  return rows.map((row) => ({
    slug: row.slug,
    name: row.name,
    region: row.region ?? null,
    periodStart: row.periodStart ?? null,
    periodEnd: row.periodEnd ?? null,
    summary: row.summary ?? null,
  }));
}

export async function listFeaturedCivilizations(limit = 10): Promise<CivilizationSummary[]> {
  if (process.env.DATABASE_URL) {
    try {
      const rows = await prisma.civilization.findMany({
        take: limit,
        orderBy: { createdAt: "asc" },
        select: { slug: true, name: true, region: true, periodStart: true, periodEnd: true, summary: true },
      });
      return rows;
    } catch (error) {
      console.warn("Civilization query failed; using seed data.", error);
    }
  }
  return (await seedCivilizations()).slice(0, limit);
}

export async function listAllCivilizations(): Promise<CivilizationSummary[]> {
  if (process.env.DATABASE_URL) {
    try {
      return await prisma.civilization.findMany({
        orderBy: { periodStart: "asc" },
        select: { slug: true, name: true, region: true, periodStart: true, periodEnd: true, summary: true },
      });
    } catch (error) {
      console.warn("Civilization query failed; using seed data.", error);
    }
  }
  return seedCivilizations();
}

export async function listCivilizationSlugs(): Promise<string[]> {
  if (process.env.DATABASE_URL) {
    try {
      const rows = await prisma.civilization.findMany({ select: { slug: true }, orderBy: { slug: "asc" } });
      return rows.map((row) => row.slug);
    } catch (error) {
      console.warn("Civilization query failed; using seed data.", error);
    }
  }
  return (await seedCivilizationRows()).map((row) => row.slug);
}

export async function getCivilizationBySlug(slug: string): Promise<CivilizationDetail | null> {
  if (process.env.DATABASE_URL) {
    try {
      return await prisma.civilization.findUnique({
        where: { slug },
        select: {
          slug: true, name: true, region: true, periodStart: true, periodEnd: true,
          summary: true, content: true,
          people: { select: { name: true, slug: true, birthYear: true, deathYear: true }, orderBy: { name: "asc" } },
        },
      });
    } catch (error) {
      console.warn("Civilization query failed; using seed data.", error);
    }
  }

  const civilization = (await seedCivilizationRows()).find((row) => row.slug === slug);
  if (!civilization) return null;

  const file = path.join(process.cwd(), "data", "seed", "people.json");
  const people = JSON.parse(await readFile(file, "utf8")) as SeedPerson[];
  return {
    slug: civilization.slug,
    name: civilization.name,
    region: civilization.region ?? null,
    periodStart: civilization.periodStart ?? null,
    periodEnd: civilization.periodEnd ?? null,
    summary: civilization.summary ?? null,
    content: civilization.content ?? null,
    people: people.filter((person) => person.civilizationSlug === slug)
      .map(({ name, slug: personSlug, birthYear, deathYear }) => ({
        name, slug: personSlug, birthYear: birthYear ?? null, deathYear: deathYear ?? null,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}
