import assert from "node:assert/strict";
import test from "node:test";
import { normalize, searchRows, type SearchRow } from "../../src/repositories/search";

const row = (slug: string, title: string, summary = ""): SearchRow => ({ slug, title, summary });

test("finds accented names with unaccented queries", () => {
  const results = searchRows("CIVILIZATION", [row("cordoba", "Córdoba")], "cordoba");
  assert.equal(results[0]?.title, "Córdoba");
});

test("normalizes đ and Đ as d", () => {
  assert.equal(normalize("Đặng đỗ"), "dang do");
  const results = searchRows("PERSON", [row("tran-hung-dao", "Trần Hưng Đạo")], "tran hung dao");
  assert.equal(results[0]?.title, "Trần Hưng Đạo");
});

test("ranks exact matches above prefixes and substrings", () => {
  const results = searchRows("IDEA", [
    row("substring", "The Alpha Idea"),
    row("prefix", "Alpha Expanded"),
    row("exact", "Alpha"),
  ], "alpha");
  assert.deepEqual(results.map(({ slug, score }) => [slug, score]), [
    ["exact", 100],
    ["prefix", 80],
    ["substring", 60],
  ]);
});

test("applies the limit after ranking", () => {
  const results = searchRows("BOOK", [
    row("prefix-first", "Beta Handbook"),
    row("exact-later", "Beta"),
  ], "beta", 1);
  assert.deepEqual(results.map(({ slug }) => slug), ["exact-later"]);
});

test("requires every query word across searchable fields", () => {
  const results = searchRows("PERSON", [
    row("match", "Tran Hung Dao", "Vietnamese general"),
    row("missing-summary-word", "Tran Hung Dao", "General"),
    row("missing-title-word", "Tran Dao", "Vietnamese officer"),
  ], "vietnam general");
  assert.deepEqual(results.map(({ slug }) => slug), ["match"]);
});
