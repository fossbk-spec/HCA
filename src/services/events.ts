import { getEventBySlug, listEvents, type Event } from "@/repositories/events";
import { listRelationsFor, relationLabel, type Relation } from "@/repositories/relationships";
import type { RelationGroup } from "@/services/people";

export async function listAllEvents(): Promise<Event[]> {
  return listEvents();
}

export async function getEvent(slug: string): Promise<(Event & { relations: RelationGroup[] }) | null> {
  const event = await getEventBySlug(slug);
  if (!event) return null;

  const groups = new Map<string, Relation[]>();
  for (const relation of await listRelationsFor(slug)) {
    const label = relationLabel(relation.relationshipType, relation.direction);
    const group = groups.get(label) ?? [];
    group.push(relation);
    groups.set(label, group);
  }

  const relations = [...groups].map(([label, items]) => ({
    label,
    relations: items.sort((a, b) => a.other.title.localeCompare(b.other.title)),
  }));

  return { ...event, relations };
}
