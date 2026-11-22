import { getEventBySlug, listEvents, type Event } from "@/repositories/events";
import { listRelationsFor } from "@/repositories/relationships";
import { groupRelations } from "@/services/relations";
import type { RelationGroup } from "@/types/relationships";

export async function listAllEvents(): Promise<Event[]> {
  return listEvents();
}

export async function getEvent(slug: string): Promise<(Event & { relations: RelationGroup[] }) | null> {
  const event = await getEventBySlug(slug);
  if (!event) return null;

  const relations = groupRelations(await listRelationsFor("EVENT", slug));

  return { ...event, relations };
}
