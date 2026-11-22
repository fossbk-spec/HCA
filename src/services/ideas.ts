import { getIdeaBySlug, listIdeas, type Idea } from "@/repositories/ideas";
import { listRelationsFor, relationLabel, type Relation } from "@/repositories/relationships";
import type { RelationGroup } from "@/services/people";

export type IdeaCategoryGroup = { category: string; ideas: Idea[] };

export async function listIdeasByCategory(): Promise<IdeaCategoryGroup[]> {
  const ideas = await listIdeas();
  const groups = new Map<string, Idea[]>();

  for (const idea of ideas) {
    const cat = idea.category ?? "General Concepts";
    const group = groups.get(cat) ?? [];
    group.push(idea);
    groups.set(cat, group);
  }

  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, items]) => ({
      category,
      ideas: items.sort((a, b) => a.title.localeCompare(b.title)),
    }));
}

export async function getIdea(slug: string): Promise<(Idea & { relations: RelationGroup[] }) | null> {
  const idea = await getIdeaBySlug(slug);
  if (!idea) return null;

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

  return { ...idea, relations };
}
