import type { EntityType } from "@prisma/client";
import type { Edge, Node, Position } from "@xyflow/react";
import { getBookBySlug } from "@/repositories/books";
import { getCivilizationBySlug } from "@/repositories/civilizations";
import { getEventBySlug } from "@/repositories/events";
import { getIdeaBySlug } from "@/repositories/ideas";
import { getPersonBySlug } from "@/repositories/people";
import { listRelationsFor, relationLabel } from "@/repositories/relationships";
import type { Relation, RelationGroup } from "@/types/relationships";
import { groupRelations } from "@/services/relations";

export type GraphNodeData = {
  label: string;
  type: EntityType;
  slug: string;
};

export type EgoGraph = {
  center: { id: string; type: EntityType; slug: string; title: string };
  nodes: Node<GraphNodeData>[];
  edges: Edge[];
  relations: RelationGroup[];
  truncated: boolean;
  totalNeighbours: number;
};

type GraphCenter = { id: string; type: EntityType; slug: string; title: string };

const MAX_NEIGHBOURS = 40;
const entityTypes: readonly EntityType[] = ["CIVILIZATION", "PERSON", "EVENT", "IDEA", "BOOK"];

function nodeId(type: EntityType, slug: string): string {
  return `${type}:${slug}`;
}

const compareText = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

// Repositories return rows in no guaranteed order; sort so layout and truncation are deterministic.
function sortRelations(relations: Relation[]): Relation[] {
  return [...relations].sort((a, b) =>
    compareText(a.other.type, b.other.type)
    || compareText(a.other.slug, b.other.slug)
    || compareText(a.relationshipType, b.relationshipType)
    || compareText(a.direction, b.direction));
}

function interleaveRelations(relations: Relation[]): Relation[] {
  const sorted = sortRelations(relations);
  const outgoing = sorted.filter((relation) => relation.direction === "out");
  const incoming = sorted.filter((relation) => relation.direction === "in");
  const result: Relation[] = [];
  const length = Math.max(outgoing.length, incoming.length);
  for (let index = 0; index < length; index += 1) {
    if (outgoing[index]) result.push(outgoing[index]);
    if (incoming[index]) result.push(incoming[index]);
  }
  return result;
}

export function buildEgoGraph(center: GraphCenter, relations: Relation[], maxNeighbours = MAX_NEIGHBOURS): Pick<EgoGraph, "nodes" | "edges" | "relations" | "truncated" | "totalNeighbours"> {
  const orderedRelations = interleaveRelations(relations);
  const neighbours: string[] = [];
  const neighbourById = new Map<string, Relation["other"]>();
  for (const relation of orderedRelations) {
    const id = nodeId(relation.other.type, relation.other.slug);
    if (!neighbourById.has(id)) {
      neighbourById.set(id, relation.other);
      neighbours.push(id);
    }
  }

  const visibleNeighbourIds = new Set(neighbours.slice(0, maxNeighbours));
  const visibleRelations = orderedRelations.filter((relation) => visibleNeighbourIds.has(nodeId(relation.other.type, relation.other.slug)));
  const radius = Math.max(180, 110 + visibleNeighbourIds.size * 8);
  const nodes: Node<GraphNodeData>[] = [{
    id: nodeId(center.type, center.slug),
    position: { x: 0, y: 0 },
    data: { label: center.title, type: center.type, slug: center.slug },
    sourcePosition: "right" as Position,
    targetPosition: "left" as Position,
  }];

  [...visibleNeighbourIds].forEach((id, index) => {
    const other = neighbourById.get(id)!;
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / visibleNeighbourIds.size;
    nodes.push({
      id,
      position: { x: Math.round(Math.cos(angle) * radius), y: Math.round(Math.sin(angle) * radius) },
      data: { label: other.title, type: other.type, slug: other.slug },
      sourcePosition: "left" as Position,
      targetPosition: "right" as Position,
    });
  });

  const centerId = nodeId(center.type, center.slug);
  const edges = visibleRelations.map((relation, index) => {
    const otherId = nodeId(relation.other.type, relation.other.slug);
    return {
      id: `${centerId}-${relation.direction}-${otherId}-${index}`,
      source: relation.direction === "out" ? centerId : otherId,
      target: relation.direction === "out" ? otherId : centerId,
      label: relationLabel(relation.relationshipType, relation.direction),
      animated: false,
    };
  });

  return {
    nodes,
    edges,
    relations: groupRelations(visibleRelations),
    truncated: neighbours.length > maxNeighbours,
    totalNeighbours: neighbours.length,
  };
}

async function getEntityTitle(type: EntityType, slug: string): Promise<string | null> {
  switch (type) {
    case "CIVILIZATION": return (await getCivilizationBySlug(slug))?.name ?? null;
    case "PERSON": return (await getPersonBySlug(slug))?.name ?? null;
    case "EVENT": return (await getEventBySlug(slug))?.title ?? null;
    case "IDEA": return (await getIdeaBySlug(slug))?.title ?? null;
    case "BOOK": return (await getBookBySlug(slug))?.title ?? null;
  }
}

export async function getEgoGraph(type: EntityType, slug: string): Promise<EgoGraph | null> {
  if (!entityTypes.includes(type)) return null;
  const title = await getEntityTitle(type, slug);
  if (!title) return null;

  const center = { id: nodeId(type, slug), type, slug, title };
  const graph = buildEgoGraph(center, await listRelationsFor(type, slug));
  return { center, ...graph };
}
