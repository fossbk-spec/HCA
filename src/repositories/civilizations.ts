import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { withDatabase } from "@/lib/seed-fallback";
import { featuredCivilizationSlugs, pickBySlugs } from "@/lib/featured";

export type CivilizationSummary = {
  slug: string;
  name: string;
  nameVi?: string | null;
  region: string | null;
  regionVi?: string | null;
  periodStart: number | null;
  periodEnd: number | null;
  summary: string | null;
  summaryVi?: string | null;
};

export type CivilizationPerson = {
  name: string;
  nameVi?: string | null;
  slug: string;
  birthYear: number | null;
  deathYear: number | null;
};

export type CivilizationDetail = CivilizationSummary & {
  content: string | null;
  contentVi?: string | null;
  people: CivilizationPerson[];
};

type SeedCivilization = CivilizationSummary & { content?: string | null; contentVi?: string | null };
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
    nameVi: row.nameVi ?? null,
    region: row.region ?? null,
    regionVi: row.regionVi ?? null,
    periodStart: row.periodStart ?? null,
    periodEnd: row.periodEnd ?? null,
    summary: row.summary ?? null,
    summaryVi: row.summaryVi ?? null,
  }));
}

export async function listFeaturedCivilizations(): Promise<CivilizationSummary[]> {
  return withDatabase("civilizations.featured", async () => {
      const rows = await prisma.civilization.findMany({
        where: { slug: { in: [...featuredCivilizationSlugs] } },
        select: {
          slug: true,
          name: true,
          nameVi: true,
          region: true,
          regionVi: true,
          periodStart: true,
          periodEnd: true,
          summary: true,
          summaryVi: true,
        },
      });
      return pickBySlugs(rows, featuredCivilizationSlugs);
  }, async () => pickBySlugs(await seedCivilizations(), featuredCivilizationSlugs));
}

export async function listAllCivilizations(): Promise<CivilizationSummary[]> {
  return withDatabase("civilizations.list", () => prisma.civilization.findMany({
        orderBy: { periodStart: "asc" },
        select: {
          slug: true,
          name: true,
          nameVi: true,
          region: true,
          regionVi: true,
          periodStart: true,
          periodEnd: true,
          summary: true,
          summaryVi: true,
        },
      }), seedCivilizations);
}

export async function listCivilizationSlugs(): Promise<string[]> {
  return withDatabase("civilizations.slugs", async () => {
      const rows = await prisma.civilization.findMany({ select: { slug: true }, orderBy: { slug: "asc" } });
      return rows.map((row) => row.slug);
  }, async () => (await seedCivilizationRows()).map((row) => row.slug));
}

export async function getCivilizationBySlug(slug: string): Promise<CivilizationDetail | null> {
  return withDatabase("civilizations.detail", () => prisma.civilization.findUnique({
        where: { slug },
        select: {
          slug: true,
          name: true,
          nameVi: true,
          region: true,
          regionVi: true,
          periodStart: true,
          periodEnd: true,
          summary: true,
          summaryVi: true,
          content: true,
          contentVi: true,
          people: {
            select: { name: true, nameVi: true, slug: true, birthYear: true, deathYear: true },
            orderBy: { name: "asc" },
          },
        },
      }), async () => {
  const civilization = (await seedCivilizationRows()).find((row) => row.slug === slug);
  if (!civilization) return null;

  const file = path.join(process.cwd(), "data", "seed", "people.json");
  const people = JSON.parse(await readFile(file, "utf8")) as SeedPerson[];
  return {
    slug: civilization.slug,
    name: civilization.name,
    nameVi: civilization.nameVi ?? null,
    region: civilization.region ?? null,
    regionVi: civilization.regionVi ?? null,
    periodStart: civilization.periodStart ?? null,
    periodEnd: civilization.periodEnd ?? null,
    summary: civilization.summary ?? null,
    summaryVi: civilization.summaryVi ?? null,
    content: civilization.content ?? null,
    contentVi: civilization.contentVi ?? null,
    people: people.filter((person) => person.civilizationSlug === slug)
      .map(({ name, nameVi, slug: personSlug, birthYear, deathYear }) => ({
        name,
        nameVi: nameVi ?? null,
        slug: personSlug,
        birthYear: birthYear ?? null,
        deathYear: deathYear ?? null,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
  });
}
