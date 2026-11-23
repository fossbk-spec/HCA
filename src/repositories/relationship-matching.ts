import type { EntityType } from "@prisma/client";
import type { Relation } from "@/types/relationships";

export type SeedRelationship = {
  sourceSlug: string;
  sourceType: EntityType;
  targetSlug: string;
  targetType: EntityType;
  relationshipType: string;
};

export type TitleInfo = string | { title: string; titleVi?: string | null };

export function matchSeedRelations(
  entityType: EntityType,
  slug: string,
  relationships: readonly SeedRelationship[],
  titlesByKey: ReadonlyMap<string, TitleInfo>,
): Relation[] {
  const relations: Relation[] = [];
  for (const row of relationships) {
    const isSource = row.sourceType === entityType && row.sourceSlug === slug;
    const isTarget = row.targetType === entityType && row.targetSlug === slug;
    if (!isSource && !isTarget) continue;

    const direction = isSource ? "out" : "in";
    const type = isSource ? row.targetType : row.sourceType;
    const otherSlug = isSource ? row.targetSlug : row.sourceSlug;
    const val = titlesByKey.get(`${type}:${otherSlug}`);
    if (val) {
      const title = typeof val === "string" ? val : val.title;
      const titleVi = typeof val === "string" ? null : (val.titleVi ?? null);
      relations.push({
        direction,
        relationshipType: row.relationshipType,
        other: { slug: otherSlug, type, title, titleVi },
      });
    }
  }
  return relations;
}
