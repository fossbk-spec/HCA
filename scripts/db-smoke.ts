import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PrismaClient, type EntityType } from "@prisma/client";
import { DatabaseUnavailableError } from "../src/lib/seed-fallback";
import { getPersonBySlug } from "../src/repositories/people";
import { listRelationsFor } from "../src/repositories/relationships";

type SeedRow = { slug: string; civilizationSlug?: string | null };
type SeedRelation = { sourceSlug: string; sourceType: EntityType; targetSlug: string; targetType: EntityType; relationshipType: string };

async function seed<T>(name: string): Promise<T[]> {
  return JSON.parse(await readFile(path.join(process.cwd(), "data", "seed", `${name}.json`), "utf8")) as T[];
}

const sameSet = (actual: string[], expected: string[], label: string) => {
  assert.deepEqual([...actual].sort(), [...expected].sort(), `${label}: slugs in the database must equal the seed slugs`);
};

async function checkOutage(): Promise<void> {
  // Runs in a child process with an unreachable database, NODE_ENV=production and no fallback flag.
  let thrown: unknown = null;
  try {
    await getPersonBySlug("aristotle");
  } catch (error) {
    thrown = error;
  }
  assert.ok(thrown, "outage check: the repository must throw, not return seed data");
  assert.ok(thrown instanceof DatabaseUnavailableError, "outage check: error must be DatabaseUnavailableError");
  assert.equal((thrown as Error).message, "Database unavailable");
  console.log("Outage behavior: passed");
}

async function main(): Promise<void> {
  if (process.argv.includes("--check-outage")) return checkOutage();
  assert.ok(process.env.DATABASE_URL, "DATABASE_URL is required for db:smoke");
  const prisma = new PrismaClient();
  try {
    const names = ["civilizations", "people", "events", "ideas", "books"] as const;
    const types: EntityType[] = ["CIVILIZATION", "PERSON", "EVENT", "IDEA", "BOOK"];
    const rows = await Promise.all(names.map((name) => seed<SeedRow>(name)));
    const dbSlugs = await Promise.all([
      prisma.civilization.findMany({ select: { slug: true } }),
      prisma.person.findMany({ select: { slug: true } }),
      prisma.event.findMany({ select: { slug: true } }),
      prisma.idea.findMany({ select: { slug: true } }),
      prisma.book.findMany({ select: { slug: true } }),
    ]);
    names.forEach((name, index) => sameSet(dbSlugs[index].map(({ slug }) => slug), rows[index].map(({ slug }) => slug), name));

    // Every person's civilization link must point to the civilization named in the seed.
    const people = await prisma.person.findMany({ select: { slug: true, civilization: { select: { slug: true } } } });
    const expectedCivilization = new Map(rows[1].map((person) => [person.slug, person.civilizationSlug ?? null]));
    for (const person of people) {
      assert.equal(person.civilization?.slug ?? null, expectedCivilization.get(person.slug), `civilization link of ${person.slug}`);
    }

    // Every seed relationship exists in the database and resolves through the typed repository, in both directions.
    const relations = await seed<SeedRelation>("relationships");
    assert.equal(await prisma.relationship.count(), relations.length, "relationship count");
    for (const relation of relations) {
      assert.ok(types.includes(relation.sourceType) && types.includes(relation.targetType), "seed relationship types must be valid");
      const outgoing = await listRelationsFor(relation.sourceType, relation.sourceSlug);
      assert.ok(
        outgoing.some((item) => item.direction === "out" && item.relationshipType === relation.relationshipType
          && item.other.type === relation.targetType && item.other.slug === relation.targetSlug),
        `${relation.sourceType}:${relation.sourceSlug} -[${relation.relationshipType}]-> ${relation.targetType}:${relation.targetSlug} (outgoing)`,
      );
      const incoming = await listRelationsFor(relation.targetType, relation.targetSlug);
      assert.ok(
        incoming.some((item) => item.direction === "in" && item.relationshipType === relation.relationshipType
          && item.other.type === relation.sourceType && item.other.slug === relation.sourceSlug),
        `${relation.targetType}:${relation.targetSlug} <-[${relation.relationshipType}]- ${relation.sourceType}:${relation.sourceSlug} (incoming)`,
      );
    }

    const childEnv = { ...process.env, DATABASE_URL: "postgresql://hca:hca@127.0.0.1:1/hca", NODE_ENV: "production" };
    delete childEnv.ALLOW_SEED_FALLBACK;
    const child = spawnSync(process.execPath, ["--import", "tsx", path.join(process.cwd(), "scripts", "db-smoke.ts"), "--check-outage"], {
      encoding: "utf8",
      env: childEnv,
    });
    assert.equal(child.status, 0, `outage check failed: ${child.stderr || child.stdout}`);
    console.log(`DB smoke passed: ${dbSlugs.map((list) => list.length).join("/")} entities (slug sets match), ${relations.length} relationships verified in both directions, civilization links, outage behavior`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
