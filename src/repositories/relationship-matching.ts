import type { EntityType } from "@prisma/client";
import type { Relation } from "@/types/relationships";

export type SeedRelationship = {
  sourceSlug: string;
  sourceType: EntityType;
  targetSlug: string;
  targetType: EntityType;
  relationshipType: string;
};

export function matchSeedRelations(
  entityType: EntityType,
  slug: string,
  relationships: readonly SeedRelationship[],
  titlesByKey: ReadonlyMap<string, string>,
): Relation[] {
  const relations: Relation[] = [];
  for (const row of relationships) {
    const isSource = row.sourceType === entityType && row.sourceSlug === slug;
    const isTarget = row.targetType === entityType && row.targetSlug === slug;
    if (!isSource && !isTarget) continue;

    const direction = isSource ? "out" : "in";
    const type = isSource ? row.targetType : row.sourceType;
    const otherSlug = isSource ? row.targetSlug : row.sourceSlug;
    const title = titlesByKey.get(`${type}:${otherSlug}`);
    if (title) relations.push({ direction, relationshipType: row.relationshipType, other: { slug: otherSlug, type, title } });
  }
  return relations;
}
