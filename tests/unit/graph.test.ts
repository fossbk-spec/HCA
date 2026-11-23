import assert from "node:assert/strict";
import test from "node:test";
import { buildEgoGraph } from "../../src/services/graph";
import type { Relation } from "../../src/types/relationships";

const center = { id: "PERSON:center", type: "PERSON" as const, slug: "center", title: "Center" };
const relation = (direction: Relation["direction"], type: Relation["other"]["type"], slug: string, relationshipType = "INFLUENCED"): Relation => ({
  direction, relationshipType, other: { type, slug, title: `${type} ${slug}` },
});

test("places centre at origin and neighbours on distinct circle positions", () => {
  const graph = buildEgoGraph(center, [relation("out", "PERSON", "one"), relation("in", "IDEA", "two"), relation("out", "BOOK", "three")]);
  assert.deepEqual(graph.nodes[0].position, { x: 0, y: 0 });
  const positions = graph.nodes.slice(1).map((node) => `${node.position.x},${node.position.y}`);
  assert.equal(new Set(positions).size, 3);
});

test("deduplicates neighbour nodes but keeps one edge per relation", () => {
  const graph = buildEgoGraph(center, [relation("out", "PERSON", "one", "TAUGHT"), relation("out", "PERSON", "one", "INFLUENCED")]);
  assert.equal(graph.nodes.length, 2);
  assert.equal(graph.edges.length, 2);
});

test("maps outgoing and incoming relation directions to edge endpoints", () => {
  const graph = buildEgoGraph(center, [relation("out", "PERSON", "outgoing"), relation("in", "PERSON", "incoming")]);
  const centerId = "PERSON:center";
  assert.deepEqual(graph.edges.map(({ source, target }) => [source, target]), [
    [centerId, "PERSON:outgoing"], ["PERSON:incoming", centerId],
  ]);
});

test("caps neighbours at forty and reports truncation", () => {
  const relations = Array.from({ length: 41 }, (_, index) => relation("out", "PERSON", `person-${index}`));
  const graph = buildEgoGraph(center, relations);
  assert.equal(graph.nodes.length, 41);
  assert.equal(graph.truncated, true);
});

test("uses typed node ids for identical slugs across entity types", () => {
  const graph = buildEgoGraph(center, [relation("out", "PERSON", "shared"), relation("out", "BOOK", "shared")]);
  assert.ok(graph.nodes.some((node) => node.id === "PERSON:shared"));
  assert.ok(graph.nodes.some((node) => node.id === "BOOK:shared"));
});

test("layout and truncation do not depend on input order", () => {
  const relations = Array.from({ length: 45 }, (_, index) => relation(index % 2 ? "in" : "out", "PERSON", `person-${String(index).padStart(2, "0")}`));
  const forward = buildEgoGraph(center, relations);
  const reversed = buildEgoGraph(center, [...relations].reverse());
  assert.deepEqual(forward.nodes.map(({ id, position }) => [id, position]), reversed.nodes.map(({ id, position }) => [id, position]));
  assert.deepEqual(forward.edges.map(({ source, target, label }) => [source, target, label]), reversed.edges.map(({ source, target, label }) => [source, target, label]));
  assert.equal(forward.truncated, true);
});
