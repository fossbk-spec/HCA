import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";

const EntityType = {
  CIVILIZATION: "CIVILIZATION",
  PERSON: "PERSON",
  EVENT: "EVENT",
  IDEA: "IDEA",
  BOOK: "BOOK",
} as const;
type EntityType = (typeof EntityType)[keyof typeof EntityType];

type BaseSeed = { slug: string; summary?: string | null; content?: string | null };
type CivilizationSeed = BaseSeed & {
  name: string;
  region?: string | null;
  periodStart?: number | null;
  periodEnd?: number | null;
};
type PersonSeed = BaseSeed & {
  name: string;
  civilizationSlug?: string | null;
  birthYear?: number | null;
  deathYear?: number | null;
  occupations?: string | null;
};
type EventSeed = BaseSeed & { title: string; startYear?: number | null; endYear?: number | null };
type IdeaSeed = BaseSeed & { title: string; category?: string | null };
type BookSeed = BaseSeed & {
  title: string;
  author?: string | null;
  publicationYear?: number | null;
};
type RelationshipSeed = {
  sourceSlug: string; sourceType?: EntityType;
  targetSlug: string; targetType?: EntityType;
  relationshipType: string;
};
type Entity = { id: string; type: EntityType };

const prisma = new PrismaClient();
// Entities are keyed by `${type}:${slug}`: slugs are unique per table, not across tables.
const entities = new Map<string, Entity>();

async function readSeed<T>(filename: string): Promise<T[]> {
  const content = await readFile(join(process.cwd(), "data", "seed", filename), "utf8");
  return JSON.parse(content) as T[];
}

function addEntity(slug: string, entity: Entity): void {
  entities.set(`${entity.type}:${slug}`, entity);
}

function resolveEntity(type: EntityType | undefined, slug: string): Entity | undefined {
  if (type) return entities.get(`${type}:${slug}`);
  // Legacy rows without a type resolve only when the slug is unique across all tables.
  const matches = [...entities].filter(([key]) => key.endsWith(`:${slug}`));
  return matches.length === 1 ? matches[0][1] : undefined;
}

async function main(): Promise<void> {
  const civilizations = await readSeed<CivilizationSeed>("civilizations.json");
  const civilizationIds = new Map<string, string>();
  for (const row of civilizations) {
    const data = {
      name: row.name,
      region: row.region ?? null,
      periodStart: row.periodStart ?? null,
      periodEnd: row.periodEnd ?? null,
      summary: row.summary ?? null,
      content: row.content ?? null,
    };
    const entity = await prisma.civilization.upsert({
      where: { slug: row.slug },
      update: data,
      create: { slug: row.slug, ...data },
    });
    addEntity(row.slug, { id: entity.id, type: EntityType.CIVILIZATION });
    civilizationIds.set(row.slug, entity.id);
  }
  console.log(`Civilization: ${civilizations.length}`);

  const people = await readSeed<PersonSeed>("people.json");
  for (const row of people) {
    const civilizationId = row.civilizationSlug
      ? civilizationIds.get(row.civilizationSlug) ?? null
      : null;
    if (!row.civilizationSlug) {
      console.warn(`Missing civilizationSlug for person "${row.slug}"; setting civilizationId to null.`);
    } else if (!civilizationId) {
      console.warn(`Unknown civilizationSlug "${row.civilizationSlug}" for person "${row.slug}"; setting civilizationId to null.`);
    }
    const data = {
      name: row.name,
      civilizationId,
      birthYear: row.birthYear ?? null,
      deathYear: row.deathYear ?? null,
      occupations: row.occupations ?? null,
      summary: row.summary ?? null,
      content: row.content ?? null,
    };
    const entity = await prisma.person.upsert({
      where: { slug: row.slug },
      update: data,
      create: { slug: row.slug, ...data },
    });
    addEntity(row.slug, { id: entity.id, type: EntityType.PERSON });
  }
  console.log(`Person: ${people.length}`);

  const events = await readSeed<EventSeed>("events.json");
  for (const row of events) {
    const data = {
      title: row.title,
      startYear: row.startYear ?? null,
      endYear: row.endYear ?? null,
      summary: row.summary ?? null,
      content: row.content ?? null,
    };
    const entity = await prisma.event.upsert({
      where: { slug: row.slug },
      update: data,
      create: { slug: row.slug, ...data },
    });
    addEntity(row.slug, { id: entity.id, type: EntityType.EVENT });
  }
  console.log(`Event: ${events.length}`);

  const ideas = await readSeed<IdeaSeed>("ideas.json");
  for (const row of ideas) {
    const data = {
      title: row.title,
      category: row.category ?? null,
      summary: row.summary ?? null,
      content: row.content ?? null,
    };
    const entity = await prisma.idea.upsert({
      where: { slug: row.slug },
      update: data,
      create: { slug: row.slug, ...data },
    });
    addEntity(row.slug, { id: entity.id, type: EntityType.IDEA });
  }
  console.log(`Idea: ${ideas.length}`);

  const books = await readSeed<BookSeed>("books.json");
  for (const row of books) {
    const data = {
      title: row.title,
      author: row.author ?? null,
      publicationYear: row.publicationYear ?? null,
      summary: row.summary ?? null,
      content: row.content ?? null,
    };
    const entity = await prisma.book.upsert({
      where: { slug: row.slug },
      update: data,
      create: { slug: row.slug, ...data },
    });
    addEntity(row.slug, { id: entity.id, type: EntityType.BOOK });
  }
  console.log(`Book: ${books.length}`);

  const relationships = await readSeed<RelationshipSeed>("relationships.json");
  let relationshipCount = 0;
  for (const row of relationships) {
    const source = resolveEntity(row.sourceType, row.sourceSlug);
    const target = resolveEntity(row.targetType, row.targetSlug);
    if (!source || !target) {
      console.warn(`Skipping unresolved relationship: ${row.sourceType ?? "?"}:${row.sourceSlug} -> ${row.targetType ?? "?"}:${row.targetSlug}`);
      continue;
    }
    await prisma.relationship.upsert({
      where: {
        sourceId_targetId_relationshipType: {
          sourceId: source.id,
          targetId: target.id,
          relationshipType: row.relationshipType,
        },
      },
      update: { sourceType: source.type, targetType: target.type },
      create: {
        sourceId: source.id,
        sourceType: source.type,
        targetId: target.id,
        targetType: target.type,
        relationshipType: row.relationshipType,
      },
    });
    relationshipCount++;
  }
  console.log(`Relationship: ${relationshipCount}`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
