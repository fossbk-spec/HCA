import assert from "node:assert/strict";
import test from "node:test";
import { featuredCivilizationSlugs, featuredIdeaSlugs, pickBySlugs } from "../../src/lib/featured";

test("pickBySlugs keeps requested order, skips missing, and ignores extras", () => {
  const rows = [{ slug: "third" }, { slug: "first" }, { slug: "extra" }];
  assert.deepEqual(pickBySlugs(rows, ["first", "missing", "third"]), [{ slug: "first" }, { slug: "third" }]);
});

test("featured slugs are lower-kebab-case", () => {
  for (const slug of [...featuredCivilizationSlugs, ...featuredIdeaSlugs]) assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
});
