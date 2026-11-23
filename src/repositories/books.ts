import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { withDatabase } from "@/lib/seed-fallback";

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
  return withDatabase("books.list", async () => sortBooks(await prisma.book.findMany({ select: bookSelect })),
    async () => sortBooks(await seedBooks()));
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  return withDatabase("books.detail", () => prisma.book.findUnique({ where: { slug }, select: bookSelect }),
    async () => (await seedBooks()).find((b) => b.slug === slug) ?? null);
}

export async function listBookSlugs(): Promise<string[]> {
  return withDatabase("books.slugs", async () => {
      const rows = await prisma.book.findMany({ select: { slug: true }, orderBy: { slug: "asc" } });
      return rows.map(({ slug }) => slug);
  }, async () => (await seedBooks()).map(({ slug }) => slug).sort());
}
