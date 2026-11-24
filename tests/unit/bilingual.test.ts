import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { epochs } from "../../src/lib/epochs";
import { formatLifespanBilingual, formatYearVi } from "../../src/lib/utils";
import { score, normalize } from "../../src/repositories/search";

test("bilingual dataset coverage across all 5 seed files", () => {
  const seedDir = path.resolve(__dirname, "../../data/seed");

  // 1. Civilizations
  const civs = JSON.parse(fs.readFileSync(path.join(seedDir, "civilizations.json"), "utf-8"));
  assert.equal(civs.length, 10);
  for (const c of civs) {
    assert.ok(c.nameVi && c.nameVi.trim().length > 0, `Civilization ${c.slug} missing nameVi`);
    assert.ok(c.regionVi && c.regionVi.trim().length > 0, `Civilization ${c.slug} missing regionVi`);
    assert.ok(c.summaryVi && c.summaryVi.trim().length > 0, `Civilization ${c.slug} missing summaryVi`);
    assert.ok(c.contentVi && c.contentVi.trim().length > 0, `Civilization ${c.slug} missing contentVi`);
  }

  // 2. People
  const people = JSON.parse(fs.readFileSync(path.join(seedDir, "people.json"), "utf-8"));
  assert.equal(people.length, 100);
  for (const p of people) {
    assert.ok(p.nameVi && p.nameVi.trim().length > 0, `Person ${p.slug} missing nameVi`);
    assert.ok(p.occupationsVi && p.occupationsVi.trim().length > 0, `Person ${p.slug} missing occupationsVi`);
    assert.ok(p.summaryVi && p.summaryVi.trim().length > 0, `Person ${p.slug} missing summaryVi`);
    assert.ok(p.contentVi && p.contentVi.trim().length > 0, `Person ${p.slug} missing contentVi`);
  }

  // 3. Events
  const events = JSON.parse(fs.readFileSync(path.join(seedDir, "events.json"), "utf-8"));
  assert.equal(events.length, 66);
  for (const e of events) {
    assert.ok(e.titleVi && e.titleVi.trim().length > 0, `Event ${e.slug} missing titleVi`);
    assert.ok(e.summaryVi && e.summaryVi.trim().length > 0, `Event ${e.slug} missing summaryVi`);
    if (e.contentVi) {
      assert.ok(e.contentVi.trim().length > 0);
    }
  }

  // 4. Ideas
  const ideas = JSON.parse(fs.readFileSync(path.join(seedDir, "ideas.json"), "utf-8"));
  assert.equal(ideas.length, 52);
  for (const i of ideas) {
    assert.ok(i.titleVi && i.titleVi.trim().length > 0, `Idea ${i.slug} missing titleVi`);
    assert.ok(i.categoryVi && i.categoryVi.trim().length > 0, `Idea ${i.slug} missing categoryVi`);
    assert.ok(i.summaryVi && i.summaryVi.trim().length > 0, `Idea ${i.slug} missing summaryVi`);
    assert.ok(i.contentVi && i.contentVi.trim().length > 0, `Idea ${i.slug} missing contentVi`);
  }

  // 5. Books
  const books = JSON.parse(fs.readFileSync(path.join(seedDir, "books.json"), "utf-8"));
  assert.equal(books.length, 58);
  for (const b of books) {
    assert.ok(b.titleVi && b.titleVi.trim().length > 0, `Book ${b.slug} missing titleVi`);
    assert.ok(b.authorVi && b.authorVi.trim().length > 0, `Book ${b.slug} missing authorVi`);
    assert.ok(b.summaryVi && b.summaryVi.trim().length > 0, `Book ${b.slug} missing summaryVi`);
    assert.ok(b.contentVi && b.contentVi.trim().length > 0, `Book ${b.slug} missing contentVi`);
  }
});

test("all epochs have complete Vietnamese bilingual labels and descriptions", () => {
  assert.equal(epochs.length, 9);
  for (const epoch of epochs) {
    assert.ok(epoch.labelVi && epoch.labelVi.length > 0, `Epoch ${epoch.id} missing labelVi`);
    assert.ok(epoch.rangeLabelVi && epoch.rangeLabelVi.length > 0, `Epoch ${epoch.id} missing rangeLabelVi`);
    assert.ok(epoch.descriptionVi && epoch.descriptionVi.length > 0, `Epoch ${epoch.id} missing descriptionVi`);
  }
});

test("bilingual search scoring works for Vietnamese names, accents, and unaccented terms", () => {
  const row = {
    slug: "tran-hung-dao",
    name: "Tran Hung Dao",
    nameVi: "Trần Hưng Đạo",
    occupations: "Supreme Commander, Military Strategist",
    occupationsVi: "Quốc công Tiết chế, Nhà quân sự kiệt xuất",
    summaryVi: "Danh tướng Đại Việt ba lần đánh bại quân Nguyên Mông",
  };

  // Exact Vietnamese title match
  assert.equal(score(row, normalize("Trần Hưng Đạo"), ["tran", "hung", "dao"]), 100);

  // Exact English title match
  assert.equal(score(row, normalize("Tran Hung Dao"), ["tran", "hung", "dao"]), 100);

  // Partial match in Vietnamese summary
  assert.ok(score(row, normalize("Nguyên Mông"), ["nguyen", "mong"]) > 0);

  // Partial match in Vietnamese occupation
  assert.ok(score(row, normalize("Tiết chế"), ["tiet", "che"]) > 0);
});

test("bilingual year and lifespan formatting", () => {
  assert.equal(formatYearVi(-1000), "1.000 TCN");
  assert.equal(formatYearVi(1010), "1.010 SCN");

  assert.equal(formatLifespanBilingual(1228, 1300, true), "1228 – 1300");
  assert.equal(formatLifespanBilingual(-350, null, true), "Sinh năm 350 TCN");
  assert.equal(formatLifespanBilingual(null, 1028, true), "Mất năm 1028");
  assert.equal(formatLifespanBilingual(null, null, true), null);
});
