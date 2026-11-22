import { getPersonBySlug, listPeople, type Person } from "@/repositories/people";
import { listRelationsFor } from "@/repositories/relationships";
import { groupRelations } from "@/services/relations";
import type { RelationGroup } from "@/types/relationships";

export type PersonGroup = { civilization: string; people: Person[] };

export async function listPeopleGroups(): Promise<PersonGroup[]> {
  const groups = new Map<string, Person[]>();
  for (const person of await listPeople()) {
    const name = person.civilization?.name ?? "Other";
    const group = groups.get(name) ?? [];
    group.push(person);
    groups.set(name, group);
  }
  return [...groups].sort(([a], [b]) => a === "Other" ? 1 : b === "Other" ? -1 : a.localeCompare(b))
    .map(([civilization, people]) => ({ civilization, people }));
}

export async function getPerson(slug: string): Promise<(Person & { relations: RelationGroup[] }) | null> {
  const person = await getPersonBySlug(slug);
  if (!person) return null;
  const relations = groupRelations(await listRelationsFor("PERSON", slug));
  return { ...person, relations };
}
