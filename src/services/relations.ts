import { relationLabel, relationLabelVi } from "@/repositories/relationships";
import type { Relation, RelationGroup } from "@/types/relationships";

export function groupRelations(relations: Relation[]): RelationGroup[] {
  const groups = new Map<string, { relations: Relation[]; labelVi: string }>();
  for (const relation of relations) {
    const label = relationLabel(relation.relationshipType, relation.direction);
    const labelVi = relationLabelVi(relation.relationshipType, relation.direction);
    const group = groups.get(label) ?? { relations: [], labelVi };
    group.relations.push(relation);
    groups.set(label, group);
  }
  return [...groups].map(([label, { relations: items, labelVi }]) => ({
    label,
    labelVi,
    relations: items.sort((a, b) => a.other.title.localeCompare(b.other.title)),
  }));
}
