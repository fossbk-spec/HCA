import type { EntityType } from "@prisma/client";

export const routes: Record<EntityType, string> = {
  CIVILIZATION: "civilizations",
  PERSON: "people",
  EVENT: "events",
  IDEA: "ideas",
  BOOK: "books",
};

export function entityHref(type: EntityType, slug: string): string {
  return `/${routes[type]}/${slug}`;
}
