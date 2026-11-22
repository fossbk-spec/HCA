import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

export type Book = {
  slug: string;
  title: string;
  author: string | null;
  publicationYear: number | null;
  summary: string | null;
  content: string | null;
};

type SeedBook = Book;

async function seedBooks(): Promise<Book[]> {
  const file = path.join(process.cwd(), "data", "seed", "books.json");
  const raw = JSON.parse(await readFile(file, "utf8")) as SeedBook[];
  return raw.map((b) => ({
    slug: b.slug,
    title: b.title,
    author: b.author ?? null,
    publicationYear: b.publicationYear ?? null,
    summary: b.summary ?? null,
    content: b.content ?? null,
  }));
}

function sortBooks(books: Book[]): Book[] {
  return books.sort((a, b) =>
    (a.publicationYear ?? Number.POSITIVE_INFINITY) - (b.publicationYear ?? Number.POSITIVE_INFINITY) ||
    a.title.localeCompare(b.title)
  );
}

const bookSelect = {
  slug: true,
  title: true,
  author: true,
  publicationYear: true,
  summary: true,
  content: true,
} as const;

export async function listBooks(): Promise<Book[]> {
  if (process.env.DATABASE_URL) {
    try {
      return sortBooks(await prisma.book.findMany({ select: bookSelect }));
    } catch (error) {
      console.warn("Books query failed; using seed data.", error);
    }
  }
  return sortBooks(await seedBooks());
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  if (process.env.DATABASE_URL) {
    try {
      return await prisma.book.findUnique({ where: { slug }, select: bookSelect });
    } catch (error) {
      console.warn("Book query failed; using seed data.", error);
    }
  }
  return (await seedBooks()).find((b) => b.slug === slug) ?? null;
}

export async function listBookSlugs(): Promise<string[]> {
  if (process.env.DATABASE_URL) {
    try {
      const rows = await prisma.book.findMany({ select: { slug: true }, orderBy: { slug: "asc" } });
      return rows.map(({ slug }) => slug);
    } catch (error) {
      console.warn("Book slugs query failed; using seed data.", error);
    }
  }
  return (await seedBooks()).map(({ slug }) => slug).sort();
}
