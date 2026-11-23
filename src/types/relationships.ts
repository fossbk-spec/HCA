import type { EntityType } from "@prisma/client";

export type Relation = {
  direction: "out" | "in";
  relationshipType: string;
  other: { slug: string; type: EntityType; title: string; titleVi?: string | null };
};

export type RelationGroup = {
  label: string;
  labelVi?: string;
  relations: Relation[];
};
