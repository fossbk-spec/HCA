import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PrismaClient, type EntityType } from "@prisma/client";
import { DatabaseUnavailableError } from "../src/lib/seed-fallback";
import { getPersonBySlug } from "../src/repositories/people";
import { listRelationsFor } from "../src/repositories/relationships";

type SeedRow = { slug: string; civilizationSlug?: string | null };
type SeedRelation = { sourceSlug: string; targetSlug: string };

async function seed<T>(name: string): Promise<T[]> {
  return JSON.parse(await readFile(path.join(process.cwd(), "data", "seed", `${name}.json`), "utf8")) as T[];
}

async function main(): Promise<void> {
  if (process.argv.includes("--check-outage")) {
    try {
      await getPersonBySlug("mesopotamia");
      throw new Error("Outage check unexpectedly succeeded");
    } catch (error) {
      assert.ok(error instanceof DatabaseUnavailableError, "outage must throw DatabaseUnavailableError");
      console.log("Outage behavior: passed");
    }
    return;
  }
  assert.ok(process.env.DATABASE_URL, "DATABASE_URL is required for db:smoke");
  const prisma = new PrismaClient();
  try {
    const names = ["civilizations", "people", "events", "ideas", "books"] as const;
    const rows = await Promise.all(names.map((name) => seed<SeedRow>(name)));
    const counts = await Promise.all([
      prisma.civilization.count(), prisma.person.count(), prisma.event.count(), prisma.idea.count(), prisma.book.count(),
    ]);
    names.forEach((name, index) => assert.equal(counts[index], rows[index].length, `${name} count`));
    const relations = await seed<SeedRelation>("relationships");
    assert.equal(await prisma.relationship.count(), relations.length, "relationship count");
    assert.equal(await prisma.person.count({ where: { civilizationId: { not: null } } }),
      rows[1].filter((person) => person.civilizationSlug != null).length, "person civilization links");
    const first = relations[0];
    assert.ok(first, "at least one seed relationship required");
    const typeNames: EntityType[] = ["CIVILIZATION", "PERSON", "EVENT", "IDEA", "BOOK"];
    const sourceType = typeNames.find((_, index) => rows[index].some((row) => row.slug === first.sourceSlug));
    assert.ok(sourceType, "source entity type must resolve");
    const linked = await listRelationsFor(sourceType, first.sourceSlug);
    assert.ok(linked.some((relation) => relation.direction === "out" && relation.other.slug === first.targetSlug),
      "first seed relationship must resolve through repository");
    const childEnv = { ...process.env, DATABASE_URL: "postgresql://hca:hca@127.0.0.1:1/hca", NODE_ENV: "production" };
    delete childEnv.ALLOW_SEED_FALLBACK;
    const child = spawnSync(process.execPath, ["--import", "tsx", path.join(process.cwd(), "scripts", "db-smoke.ts"), "--check-outage"], {
      encoding: "utf8",
      env: childEnv,
    });
    assert.equal(child.status, 0, `outage check failed: ${child.stderr || child.stdout}`);
    console.log(`DB smoke passed: ${counts.join("/")} entities, ${relations.length} relationships, outage behavior`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
