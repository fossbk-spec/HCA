import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { withDatabase } from "@/lib/seed-fallback";

export type Person = {
  slug: string;
  name: string;
  nameVi: string | null;
  birthYear: number | null;
  deathYear: number | null;
  occupations: string | null;
  occupationsVi: string | null;
  summary: string | null;
  summaryVi: string | null;
  content: string | null;
  contentVi: string | null;
  civilization: { slug: string; name: string; nameVi: string | null } | null;
};

type SeedPerson = Omit<Person, "civilization"> & {
  civilizationSlug?: string | null;
  nameVi?: string | null;
  occupationsVi?: string | null;
  summaryVi?: string | null;
  contentVi?: string | null;
};
type SeedCivilization = { slug: string; name: string; nameVi?: string | null };

async function seedPeople(): Promise<Person[]> {
  const [people, civilizations] = await Promise.all([
    readFile(path.join(process.cwd(), "data", "seed", "people.json"), "utf8"),
    readFile(path.join(process.cwd(), "data", "seed", "civilizations.json"), "utf8"),
  ]);
  const civilizationBySlug = new Map((JSON.parse(civilizations) as SeedCivilization[]).map(({ slug, name, nameVi }) => [slug, { slug, name, nameVi: nameVi ?? null }]));
  return (JSON.parse(people) as SeedPerson[]).map((row) => ({
    slug: row.slug,
    name: row.name,
    nameVi: row.nameVi ?? null,
    birthYear: row.birthYear ?? null,
    deathYear: row.deathYear ?? null,
    occupations: row.occupations ?? null,
    occupationsVi: row.occupationsVi ?? null,
    summary: row.summary ?? null,
    summaryVi: row.summaryVi ?? null,
    content: row.content ?? null,
    contentVi: row.contentVi ?? null,
    civilization: row.civilizationSlug ? civilizationBySlug.get(row.civilizationSlug) ?? null : null,
  }));
}

function sortPeople(people: Person[]): Person[] {
  return people.sort((a, b) =>
    (a.birthYear ?? Number.POSITIVE_INFINITY) - (b.birthYear ?? Number.POSITIVE_INFINITY) || a.name.localeCompare(b.name),
  );
}

const personSelect = {
  slug: true,
  name: true,
  nameVi: true,
  birthYear: true,
  deathYear: true,
  occupations: true,
  occupationsVi: true,
  summary: true,
  summaryVi: true,
  content: true,
  contentVi: true,
  civilization: { select: { slug: true, name: true, nameVi: true } },
} as const;

export async function listPeople(): Promise<Person[]> {
  return withDatabase("people.list", async () => sortPeople(await prisma.person.findMany({ select: personSelect })),
    async () => sortPeople(await seedPeople()));
}

export async function getPersonBySlug(slug: string): Promise<Person | null> {
  return withDatabase("people.detail", () => prisma.person.findUnique({ where: { slug }, select: personSelect }),
    async () => (await seedPeople()).find((person) => person.slug === slug) ?? null);
}

export async function listPersonSlugs(): Promise<string[]> {
  return withDatabase("people.slugs", async () => {
      const rows = await prisma.person.findMany({ select: { slug: true }, orderBy: { slug: "asc" } });
      return rows.map(({ slug }) => slug);
  }, async () => (await seedPeople()).map(({ slug }) => slug).sort());
}
