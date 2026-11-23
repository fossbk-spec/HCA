import { getBookBySlug, listBooks, type Book } from "@/repositories/books";
import { listRelationsFor } from "@/repositories/relationships";
import { groupRelations } from "@/services/relations";
import type { RelationGroup } from "@/types/relationships";

export async function listAllBooks(): Promise<Book[]> {
  return listBooks();
}

export async function getBook(slug: string): Promise<(Book & { relations: RelationGroup[] }) | null> {
  const book = await getBookBySlug(slug);
  if (!book) return null;

  const relations = groupRelations(await listRelationsFor("BOOK", slug));

  return { ...book, relations };
}
