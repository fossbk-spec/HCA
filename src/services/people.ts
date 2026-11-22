import { getPersonBySlug, listPeople, type Person } from "@/repositories/people";
import { listRelationsFor, relationLabel, type Relation } from "@/repositories/relationships";

export type PersonGroup = { civilization: string; people: Person[] };
export type RelationGroup = { label: string; relations: Relation[] };

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
  const groups = new Map<string, Relation[]>();
  for (const relation of await listRelationsFor(slug)) {
    const label = relationLabel(relation.relationshipType, relation.direction);
    const group = groups.get(label) ?? [];
    group.push(relation);
    groups.set(label, group);
  }
  const relations = [...groups].map(([label, items]) => ({ label, relations: items.sort((a, b) => a.other.title.localeCompare(b.other.title)) }));
  return { ...person, relations };
}
