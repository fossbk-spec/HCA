import { getBookBySlug, listBooks, type Book } from "@/repositories/books";
import { listRelationsFor, relationLabel, type Relation } from "@/repositories/relationships";
import type { RelationGroup } from "@/services/people";

export async function listAllBooks(): Promise<Book[]> {
  return listBooks();
}

export async function getBook(slug: string): Promise<(Book & { relations: RelationGroup[] }) | null> {
  const book = await getBookBySlug(slug);
  if (!book) return null;

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

  return { ...book, relations };
}
