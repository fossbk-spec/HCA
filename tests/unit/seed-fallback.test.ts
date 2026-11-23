import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { DatabaseUnavailableError, seedFallbackAllowed, withDatabase } from "../../src/lib/seed-fallback";

const originalEnv = { ...process.env };
const originalWarn = console.warn;
const originalError = console.error;

afterEach(() => {
  process.env = { ...originalEnv };
  console.warn = originalWarn;
  console.error = originalError;
});

for (const mode of ["production", "development"] as const) {
  for (const fallback of [undefined, "true", "false"] as const) {
    for (const url of [undefined, "postgresql://secret@localhost/db"] as const) {
      test(`policy mode=${mode} fallback=${fallback} url=${Boolean(url)}`, async () => {
        process.env.NODE_ENV = mode;
        if (fallback === undefined) delete process.env.ALLOW_SEED_FALLBACK;
        else process.env.ALLOW_SEED_FALLBACK = fallback;
        if (url === undefined) delete process.env.DATABASE_URL;
        else process.env.DATABASE_URL = url;
        const allowed = fallback === "true" || (fallback === undefined && mode !== "production");
        assert.equal(seedFallbackAllowed(), allowed);
        const logs: string[] = [];
        console.warn = (line: string) => { logs.push(line); };
        console.error = (line: string) => { logs.push(line); };
        let dbCalls = 0;
        const run = () => withDatabase("test.scope", async () => { dbCalls++; return "db"; }, async () => "seed");
        if (!url && !allowed) await assert.rejects(run, DatabaseUnavailableError);
        else assert.equal(await run(), url ? "db" : "seed");
        assert.equal(dbCalls, url ? 1 : 0);
        assert.equal(logs.length, !url && !allowed ? 1 : 0);
        if (logs.length) assert.deepEqual(JSON.parse(logs[0]), { event: "db_not_configured", scope: "test.scope" });
      });
    }
  }
}

test("database failure falls back with one safe warning", async () => {
  process.env.DATABASE_URL = "postgresql://secret@localhost/db";
  process.env.ALLOW_SEED_FALLBACK = "true";
  const logs: string[] = [];
  console.warn = (line: string) => { logs.push(line); };
  assert.equal(await withDatabase("people.detail", async () => { throw new Error("private driver details"); }, async () => "seed"), "seed");
  assert.deepEqual(logs.map((line) => JSON.parse(line)), [
    { event: "db_fallback_to_seed", scope: "people.detail", errorName: "Error" },
  ]);
});

test("database failure is sanitized when fallback is disabled", async () => {
  process.env.DATABASE_URL = "postgresql://secret@localhost/db";
  process.env.ALLOW_SEED_FALLBACK = "false";
  const logs: string[] = [];
  console.error = (line: string) => { logs.push(line); };
  await assert.rejects(
    withDatabase("people.detail", async () => { throw new Error("private driver details"); }, async () => "seed"),
    (error: unknown) => error instanceof DatabaseUnavailableError &&
      !error.message.includes("secret") && !error.message.includes("private driver details"),
  );
  assert.deepEqual(logs.map((line) => JSON.parse(line)), [
    { event: "db_query_failed", scope: "people.detail", errorName: "Error" },
  ]);
});
