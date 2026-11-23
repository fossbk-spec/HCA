import assert from "node:assert/strict";
import test from "node:test";
import { epochOf, epochs, isStaticEpoch } from "../../src/lib/epochs";

test("defines the nine timeline phases in order", () => {
  assert.deepEqual(epochs.map((epoch) => epoch.id), ["big-bang", "origin-of-life", "human-evolution", "agriculture", "ancient-civilizations", "classical-era", "industrial-revolution", "information-age", "ai-age"]);
});

test("numeric phases are contiguous and non-overlapping", () => {
  const numeric = epochs.filter((epoch) => !isStaticEpoch(epoch));
  for (let index = 1; index < numeric.length; index += 1) assert.equal(numeric[index - 1].endYear, numeric[index].startYear);
});

test("maps years to the correct numeric phase at boundaries", () => {
  assert.deepEqual([-10000, -3500, -500, 1760, 1970, 2010].map((year) => epochOf(year).id), ["agriculture", "ancient-civilizations", "classical-era", "industrial-revolution", "information-age", "ai-age"]);
  assert.equal(epochOf(-300000).id, "human-evolution");
  assert.equal(epochOf(2030).id, "ai-age");
});

test("static phases have null ranges and are never returned by epochOf", () => {
  assert.deepEqual(epochs.filter(isStaticEpoch).map((epoch) => [epoch.startYear, epoch.endYear]), [[null, null], [null, null]]);
  for (const year of [-300000, -10000, 0, 2030]) assert.equal(isStaticEpoch(epochOf(year)), false);
});
