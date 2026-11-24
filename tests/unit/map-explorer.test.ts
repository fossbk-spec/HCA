import assert from "node:assert/strict";
import test from "node:test";
import {
  CIVILIZATION_MAP_DATA,
  GREAT_BOOKS_MAP_DATA,
  HISTORY_ERAS,
  type HistoryEra,
} from "../../src/lib/map-data";

test("map data contains 10 civilizations with valid coordinates and eras", () => {
  assert.equal(CIVILIZATION_MAP_DATA.length, 10);
  for (const civ of CIVILIZATION_MAP_DATA) {
    assert.ok(civ.slug && civ.slug.length > 0);
    assert.ok(civ.name && civ.name.length > 0);
    assert.ok(civ.nameVi && civ.nameVi.length > 0);
    assert.ok(civ.coord.lat >= -90 && civ.coord.lat <= 90);
    assert.ok(civ.coord.lng >= -180 && civ.coord.lng <= 180);
    assert.ok(civ.coord.xPercent >= 0 && civ.coord.xPercent <= 100);
    assert.ok(civ.coord.yPercent >= 0 && civ.coord.yPercent <= 100);
    assert.ok(Array.isArray(civ.eras) && civ.eras.length > 0);
  }
});

test("map data contains 14 great books with valid coordinates and parent civilization", () => {
  assert.equal(GREAT_BOOKS_MAP_DATA.length, 14);
  const civSlugs = new Set(CIVILIZATION_MAP_DATA.map((c) => c.slug));

  for (const book of GREAT_BOOKS_MAP_DATA) {
    assert.ok(book.slug && book.slug.length > 0);
    assert.ok(book.bookSlug && book.bookSlug.length > 0);
    assert.ok(book.title && book.title.length > 0);
    assert.ok(book.titleVi && book.titleVi.length > 0);
    assert.ok(book.coord.xPercent >= 0 && book.coord.xPercent <= 100);
    assert.ok(book.coord.yPercent >= 0 && book.coord.yPercent <= 100);
    assert.ok(civSlugs.has(book.civilizationSlug), `Book ${book.slug} has unknown parent civilization ${book.civilizationSlug}`);
    assert.ok(["ANCIENT", "CLASSICAL", "MEDIEVAL", "MODERN"].includes(book.era));
  }
});

test("history eras define 5 epochs covering human civilizational history", () => {
  assert.equal(HISTORY_ERAS.length, 5);
  const eraIds = HISTORY_ERAS.map((e) => e.id);
  assert.deepEqual(eraIds, ["ALL", "ANCIENT", "CLASSICAL", "MEDIEVAL", "MODERN"]);

  for (const era of HISTORY_ERAS) {
    assert.ok(era.labelEn && era.labelEn.length > 0);
    assert.ok(era.labelVi && era.labelVi.length > 0);
    assert.ok(era.timeRangeEn && era.timeRangeEn.length > 0);
    assert.ok(era.timeRangeVi && era.timeRangeVi.length > 0);
    assert.ok(era.descriptionVi && era.descriptionVi.length > 0);
  }
});

test("era filtering returns non-empty collections for all historical periods", () => {
  const epochs: HistoryEra[] = ["ANCIENT", "CLASSICAL", "MEDIEVAL", "MODERN"];

  for (const epoch of epochs) {
    const matchingCivs = CIVILIZATION_MAP_DATA.filter((c) => c.eras.includes(epoch));
    const matchingBooks = GREAT_BOOKS_MAP_DATA.filter((b) => b.era === epoch);

    assert.ok(matchingCivs.length > 0, `Epoch ${epoch} should have matching civilizations`);
    assert.ok(matchingBooks.length > 0, `Epoch ${epoch} should have matching books`);
  }
});
