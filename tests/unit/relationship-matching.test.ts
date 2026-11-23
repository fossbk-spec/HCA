import assert from "node:assert/strict";
import test from "node:test";
import { matchSeedRelations, type SeedRelationship } from "../../src/repositories/relationship-matching";
import { groupRelations } from "../../src/services/relations";

const relationships: SeedRelationship[] = [
  { sourceType: "PERSON", sourceSlug: "shared", targetType: "BOOK", targetSlug: "book-b", relationshipType: "WROTE" },
  { sourceType: "EVENT", sourceSlug: "shared", targetType: "CIVILIZATION", targetSlug: "rome", relationshipType: "HOSTED" },
  { sourceType: "BOOK", sourceSlug: "book-a", targetType: "PERSON", targetSlug: "shared", relationshipType: "INFLUENCED" },
  { sourceType: "EVENT", sourceSlug: "founding", targetType: "IDEA", targetSlug: "shared", relationshipType: "INSPIRED" },
  { sourceType: "PERSON", sourceSlug: "shared", targetType: "BOOK", targetSlug: "book-a", relationshipType: "WROTE" },
];

const titles = new Map([
  ["PERSON:shared", "Shared Person"],
  ["EVENT:shared", "Shared Event"],
  ["BOOK:book-a", "Alpha Book"],
  ["BOOK:book-b", "Beta Book"],
  ["CIVILIZATION:rome", "Rome"],
  ["EVENT:founding", "Founding"],
  ["IDEA:shared", "Shared Idea"],
]);

test("same slug in Person and Event yields distinct relations with correct direction", () => {
  const person = matchSeedRelations("PERSON", "shared", relationships, titles);
  const event = matchSeedRelations("EVENT", "shared", relationships, titles);

  assert.deepEqual(person.map(({ direction, other }) => [direction, other.type, other.slug]), [
    ["out", "BOOK", "book-b"],
    ["in", "BOOK", "book-a"],
    ["out", "BOOK", "book-a"],
  ]);
  assert.deepEqual(event.map(({ direction, other }) => [direction, other.type, other.slug]), [
    ["out", "CIVILIZATION", "rome"],
  ]);
  assert.equal(person[0].other.title, "Beta Book");
});

test("Person slug does not match Idea slug in target position", () => {
  assert.equal(matchSeedRelations("PERSON", "shared", relationships, titles).some(
    ({ other }) => other.slug === "founding",
  ), false);
  assert.deepEqual(matchSeedRelations("IDEA", "shared", relationships, titles).map(({ direction, other }) => [direction, other.slug]), [
    ["in", "founding"],
  ]);
});

test("unknown slug has no relations", () => {
  assert.deepEqual(matchSeedRelations("PERSON", "unknown", relationships, titles), []);
});

test("groupRelations groups labels and sorts each group by title", () => {
  const grouped = groupRelations(matchSeedRelations("PERSON", "shared", relationships, titles));
  assert.deepEqual(grouped.map(({ label, relations }) => [label, relations.map(({ other }) => other.title)]), [
    ["wrote", ["Alpha Book", "Beta Book"]],
    ["influenced by", ["Alpha Book"]],
  ]);
});
