import { getIdeaBySlug, listIdeas, type Idea } from "@/repositories/ideas";
import { listRelationsFor } from "@/repositories/relationships";
import { groupRelations } from "@/services/relations";
import type { RelationGroup } from "@/types/relationships";

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

  const relations = groupRelations(await listRelationsFor("IDEA", slug));

  return { ...idea, relations };
}
