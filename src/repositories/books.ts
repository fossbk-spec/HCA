import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { withDatabase } from "@/lib/seed-fallback";

export type Book = {
  slug: string;
  title: string;
  titleVi?: string | null;
  author: string | null;
  authorVi?: string | null;
  publicationYear: number | null;
  summary: string | null;
  summaryVi?: string | null;
  content: string | null;
  contentVi?: string | null;
};

type SeedBook = Book;

async function seedBooks(): Promise<Book[]> {
  const file = path.join(process.cwd(), "data", "seed", "books.json");
  const raw = JSON.parse(await readFile(file, "utf8")) as SeedBook[];
  return raw.map((b) => ({
    slug: b.slug,
    title: b.title,
    titleVi: b.titleVi ?? null,
    author: b.author ?? null,
    authorVi: b.authorVi ?? null,
    publicationYear: b.publicationYear ?? null,
    summary: b.summary ?? null,
    summaryVi: b.summaryVi ?? null,
    content: b.content ?? null,
    contentVi: b.contentVi ?? null,
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
  titleVi: true,
  author: true,
  authorVi: true,
  publicationYear: true,
  summary: true,
  summaryVi: true,
  content: true,
  contentVi: true,
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
    return rows.map((r) => r.slug);
  }, async () => (await seedBooks()).map((r) => r.slug));
}
