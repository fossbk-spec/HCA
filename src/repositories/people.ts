import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

export type Person = {
  slug: string;
  name: string;
  birthYear: number | null;
  deathYear: number | null;
  occupations: string | null;
  summary: string | null;
  content: string | null;
  civilization: { slug: string; name: string } | null;
};

type SeedPerson = Omit<Person, "civilization"> & { civilizationSlug?: string | null };
type SeedCivilization = { slug: string; name: string };

async function seedPeople(): Promise<Person[]> {
  const [people, civilizations] = await Promise.all([
    readFile(path.join(process.cwd(), "data", "seed", "people.json"), "utf8"),
    readFile(path.join(process.cwd(), "data", "seed", "civilizations.json"), "utf8"),
  ]);
  const civilizationBySlug = new Map((JSON.parse(civilizations) as SeedCivilization[]).map(({ slug, name }) => [slug, { slug, name }]));
  return (JSON.parse(people) as SeedPerson[]).map((row) => ({
    slug: row.slug,
    name: row.name,
    birthYear: row.birthYear ?? null,
    deathYear: row.deathYear ?? null,
    occupations: row.occupations ?? null,
    summary: row.summary ?? null,
    content: row.content ?? null,
    civilization: row.civilizationSlug ? civilizationBySlug.get(row.civilizationSlug) ?? null : null,
  }));
}

function sortPeople(people: Person[]): Person[] {
  return people.sort((a, b) =>
    (a.birthYear ?? Number.POSITIVE_INFINITY) - (b.birthYear ?? Number.POSITIVE_INFINITY) || a.name.localeCompare(b.name),
  );
}

const personSelect = {
  slug: true, name: true, birthYear: true, deathYear: true, occupations: true,
  summary: true, content: true, civilization: { select: { slug: true, name: true } },
} as const;

export async function listPeople(): Promise<Person[]> {
  if (process.env.DATABASE_URL) {
    try {
      return sortPeople(await prisma.person.findMany({ select: personSelect }));
    } catch (error) {
      console.warn("People query failed; using seed data.", error);
    }
  }
  return sortPeople(await seedPeople());
}

export async function getPersonBySlug(slug: string): Promise<Person | null> {
  if (process.env.DATABASE_URL) {
    try {
      return await prisma.person.findUnique({ where: { slug }, select: personSelect });
    } catch (error) {
      console.warn("Person query failed; using seed data.", error);
    }
  }
  return (await seedPeople()).find((person) => person.slug === slug) ?? null;
}

export async function listPersonSlugs(): Promise<string[]> {
  if (process.env.DATABASE_URL) {
    try {
      const rows = await prisma.person.findMany({ select: { slug: true }, orderBy: { slug: "asc" } });
      return rows.map(({ slug }) => slug);
    } catch (error) {
      console.warn("Person slugs query failed; using seed data.", error);
    }
  }
  return (await seedPeople()).map(({ slug }) => slug).sort();
}
