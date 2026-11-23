import { relationLabel } from "@/repositories/relationships";
import type { Relation, RelationGroup } from "@/types/relationships";

export function groupRelations(relations: Relation[]): RelationGroup[] {
  const groups = new Map<string, Relation[]>();
  for (const relation of relations) {
    const label = relationLabel(relation.relationshipType, relation.direction);
    const group = groups.get(label) ?? [];
    group.push(relation);
    groups.set(label, group);
  }
  return [...groups].map(([label, items]) => ({
    label,
    relations: items.sort((a, b) => a.other.title.localeCompare(b.other.title)),
  }));
}
