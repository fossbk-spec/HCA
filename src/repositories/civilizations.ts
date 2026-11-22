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

async function seedCivilizations(): Promise<CivilizationSummary[]> {
  const file = path.join(process.cwd(), "data", "seed", "civilizations.json");
  const rows = JSON.parse(await readFile(file, "utf8")) as Array<Partial<CivilizationSummary> & Pick<CivilizationSummary, "slug" | "name">>;
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
