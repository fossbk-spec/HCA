import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { execSync } from "node:child_process";

test("VHA to HCA knowledge federation bridge works seamlessly", () => {
  const root = path.resolve(__dirname, "../..");
  execSync("npx tsx scripts/sync_from_vha.ts", { cwd: root, stdio: "pipe" });

  const fedDir = path.join(root, "data", "federated", "vha");
  assert.ok(fs.existsSync(fedDir), "data/federated/vha directory should exist");

  const civFile = path.join(fedDir, "civilizations.json");
  assert.ok(fs.existsSync(civFile), "federated civilizations.json should exist");
  const civs = JSON.parse(fs.readFileSync(civFile, "utf-8"));
  assert.equal(civs.length, 16);

  const peopleFile = path.join(fedDir, "people.json");
  const people = JSON.parse(fs.readFileSync(peopleFile, "utf-8"));
  assert.equal(people.length, 30);

  const eventsFile = path.join(fedDir, "events.json");
  const events = JSON.parse(fs.readFileSync(eventsFile, "utf-8"));
  assert.equal(events.length, 18);

  const ideasFile = path.join(fedDir, "ideas.json");
  const ideas = JSON.parse(fs.readFileSync(ideasFile, "utf-8"));
  assert.equal(ideas.length, 3);

  const booksFile = path.join(fedDir, "books.json");
  const books = JSON.parse(fs.readFileSync(booksFile, "utf-8"));
  assert.equal(books.length, 11);

  const relsFile = path.join(fedDir, "relationships.json");
  const rels = JSON.parse(fs.readFileSync(relsFile, "utf-8"));
  assert.equal(rels.length, 94);

  const reportFile = path.join(root, "reports", "vha-hca-bridge-report.json");
  assert.ok(fs.existsSync(reportFile), "vha-hca-bridge-report.json should exist");
  const report = JSON.parse(fs.readFileSync(reportFile, "utf-8"));
  assert.equal(report.summary.totalFederatedEntities, 78);
  assert.equal(report.summary.crossEntityMatches, 27);

  // Check Truyen Kieu in HCA seed
  const hcaBooks = JSON.parse(fs.readFileSync(path.join(root, "data", "seed", "books.json"), "utf-8"));
  const kieu = hcaBooks.find((b: any) => b.slug === "truyen-kieu");
  assert.ok(kieu);
  assert.equal(kieu.civilizationSlug, "vietnam");
});
