import type { EntityType } from "@prisma/client";

export type Relation = {
  direction: "out" | "in";
  relationshipType: string;
  other: { slug: string; type: EntityType; title: string };
};

export type RelationGroup = { label: string; relations: Relation[] };
