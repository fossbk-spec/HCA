import { readFile } from "node:fs/promises";
import path from "node:path";
import type { EntityType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { matchSeedRelations, type SeedRelationship } from "@/repositories/relationship-matching";
import type { Relation } from "@/types/relationships";

export type { Relation } from "@/types/relationships";

const entityTypes = ["CIVILIZATION", "PERSON", "EVENT", "IDEA", "BOOK"] as const;
const routes: Record<EntityType, string> = {
  CIVILIZATION: "civilizations", PERSON: "people", EVENT: "events", IDEA: "ideas", BOOK: "books",
};

export function entityHref(type: EntityType, slug: string): string {
  return `/${routes[type]}/${slug}`;
}

const labels: Record<string, [string, string]> = {
  WROTE: ["wrote", "written by"],
  TAUGHT: ["taught", "taught by"],
  INFLUENCED: ["influenced", "influenced by"],
  FOUNDED: ["founded", "founded by"],
  RULED: ["ruled", "ruled by"],
  CREATED: ["created", "created by"],
  DEVELOPED: ["developed", "developed by"],
  ADOPTED: ["adopted", "adopted by"],
  PARTICIPATED_IN: ["participated in", "included"],
  BELONGS_TO: ["belongs to", "includes"],
  ORIGINATED: ["originated", "originated by"],
  ORIGINATED_IN: ["originated in", "origin of"],
  COMMANDED: ["commanded", "commanded by"],
  PRACTICED: ["practiced", "practiced by"],
  ENACTED: ["enacted", "enacted by"],
  PIONEERED: ["pioneered", "pioneered by"],
  HOSTED: ["hosted", "hosted by"],
  LED: ["led", "led by"],
  EXPERIENCED: ["experienced", "experienced by"],
  INITIATED: ["initiated", "initiated by"],
  CHAMPIONED: ["championed", "championed by"],
  ISSUED: ["issued", "issued by"],
  CODIFIED: ["codified", "codified by"],
  DEFENDED: ["defended", "defended by"],
  INSPIRED: ["inspired", "inspired by"],
  INVENTED: ["invented", "invented by"],
};

export function relationLabel(relationshipType: string, direction: Relation["direction"]): string {
  const known = labels[relationshipType.toUpperCase()];
  if (known) return known[direction === "out" ? 0 : 1];
  const phrase = relationshipType.toLowerCase().replaceAll("_", " ");
  return direction === "out" ? phrase : `is target of ${phrase}`;
}

type SeedEntity = { slug: string; name?: string; title?: string };

async function seedRelationsFor(entityType: EntityType, slug: string): Promise<Relation[]> {
  const files: Record<EntityType, string> = {
    CIVILIZATION: "civilizations", PERSON: "people", EVENT: "events", IDEA: "ideas", BOOK: "books",
  };
  const [relationshipText, ...entityTexts] = await Promise.all([
    readFile(path.join(process.cwd(), "data", "seed", "relationships.json"), "utf8"),
    ...entityTypes.map((type) => readFile(path.join(process.cwd(), "data", "seed", `${files[type]}.json`), "utf8")),
  ]);
  const titles = new Map<string, string>();
  entityTypes.forEach((type, index) => {
    for (const entity of JSON.parse(entityTexts[index]) as SeedEntity[]) {
      titles.set(`${type}:${entity.slug}`, entity.name ?? entity.title ?? entity.slug);
    }
  });
  return matchSeedRelations(entityType, slug, JSON.parse(relationshipText) as SeedRelationship[], titles);
}

async function dbRelationsFor(entityType: EntityType, slug: string): Promise<Relation[]> {
  let entity: { id: string } | null;
  switch (entityType) {
    case "CIVILIZATION": entity = await prisma.civilization.findUnique({ where: { slug }, select: { id: true } }); break;
    case "PERSON": entity = await prisma.person.findUnique({ where: { slug }, select: { id: true } }); break;
    case "EVENT": entity = await prisma.event.findUnique({ where: { slug }, select: { id: true } }); break;
    case "IDEA": entity = await prisma.idea.findUnique({ where: { slug }, select: { id: true } }); break;
    case "BOOK": entity = await prisma.book.findUnique({ where: { slug }, select: { id: true } }); break;
  }
  if (!entity) return [];
  const entityId = entity.id;
  const rows = await prisma.relationship.findMany({
    where: { OR: [{ sourceId: entityId, sourceType: entityType }, { targetId: entityId, targetType: entityType }] },
    select: { sourceId: true, sourceType: true, targetId: true, targetType: true, relationshipType: true },
  });
  const others = new Map<EntityType, Set<string>>(entityTypes.map((type) => [type, new Set<string>()]));
  const directed = rows.map((row) => {
    const direction: Relation["direction"] = row.sourceId === entityId && row.sourceType === entityType ? "out" : "in";
    const type = direction === "out" ? row.targetType : row.sourceType;
    const id = direction === "out" ? row.targetId : row.sourceId;
    others.get(type)!.add(id);
    return { direction, relationshipType: row.relationshipType, type, id };
  });
  const [civilizations, people, events, ideas, books] = await Promise.all([
    prisma.civilization.findMany({ where: { id: { in: [...others.get("CIVILIZATION")!] } }, select: { id: true, slug: true, name: true } }),
    prisma.person.findMany({ where: { id: { in: [...others.get("PERSON")!] } }, select: { id: true, slug: true, name: true } }),
    prisma.event.findMany({ where: { id: { in: [...others.get("EVENT")!] } }, select: { id: true, slug: true, title: true } }),
    prisma.idea.findMany({ where: { id: { in: [...others.get("IDEA")!] } }, select: { id: true, slug: true, title: true } }),
    prisma.book.findMany({ where: { id: { in: [...others.get("BOOK")!] } }, select: { id: true, slug: true, title: true } }),
  ]);
  const byId = new Map<string, { slug: string; title: string }>();
  for (const entity of civilizations) byId.set(`CIVILIZATION:${entity.id}`, { slug: entity.slug, title: entity.name });
  for (const entity of people) byId.set(`PERSON:${entity.id}`, { slug: entity.slug, title: entity.name });
  for (const entity of events) byId.set(`EVENT:${entity.id}`, { slug: entity.slug, title: entity.title });
  for (const entity of ideas) byId.set(`IDEA:${entity.id}`, { slug: entity.slug, title: entity.title });
  for (const entity of books) byId.set(`BOOK:${entity.id}`, { slug: entity.slug, title: entity.title });
  return directed.flatMap(({ direction, relationshipType, type, id }) => {
    const other = byId.get(`${type}:${id}`);
    return other ? [{ direction, relationshipType, other: { ...other, type } }] : [];
  });
}

export async function listRelationsFor(entityType: EntityType, slug: string): Promise<Relation[]> {
  if (process.env.DATABASE_URL) {
    try {
      return await dbRelationsFor(entityType, slug);
    } catch (error) {
      console.warn("Relationship query failed; using seed data.", error);
    }
  }
  return seedRelationsFor(entityType, slug);
}
