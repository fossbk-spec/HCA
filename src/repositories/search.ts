import { readFile } from "node:fs/promises";
import path from "node:path";
import type { EntityType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { withDatabase } from "@/lib/seed-fallback";

export const searchTypes = ["CIVILIZATION", "PERSON", "EVENT", "IDEA", "BOOK"] as const satisfies readonly EntityType[];
export type SearchType = (typeof searchTypes)[number];
export type SearchResult = { type: SearchType; slug: string; title: string; subtitle: string; snippet: string; score: number };
export type SearchRow = { slug: string; name?: string; title?: string; summary?: string | null; region?: string | null; occupations?: string | null; category?: string | null; author?: string | null; birthYear?: number | null; deathYear?: number | null; startYear?: number | null; endYear?: number | null; publicationYear?: number | null };
type Row = SearchRow;
type SearchOptions = { q: string; types?: readonly SearchType[]; limit?: number };

const files: Record<SearchType, string> = { CIVILIZATION: "civilizations", PERSON: "people", EVENT: "events", IDEA: "ideas", BOOK: "books" };
export const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLocaleLowerCase();
const snippet = (value: string | null | undefined) => value ? `${value.slice(0, 160).trimEnd()}${value.length > 160 ? "…" : ""}` : "";
const year = (value: number | null | undefined) => value == null ? "" : `${Math.abs(value)} ${value < 0 ? "BCE" : "CE"}`;

function subtitle(type: SearchType, row: Row): string {
  switch (type) {
    case "CIVILIZATION": return row.region ?? "";
    case "PERSON": return [row.occupations, [year(row.birthYear), year(row.deathYear)].filter(Boolean).join("–")].filter(Boolean).join(" · ");
    case "EVENT": return [year(row.startYear), row.endYear !== row.startYear ? year(row.endYear) : ""].filter(Boolean).join("–");
    case "IDEA": return row.category ?? "";
    case "BOOK": return [row.author, year(row.publicationYear)].filter(Boolean).join(" · ");
  }
}

export function score(row: Row, q: string, words: string[]): number {
  const title = normalize(row.name ?? row.title ?? "");
  const fields = [title, row.summary, row.region, row.occupations, row.category, row.author].map((value) => normalize(value ?? ""));
  if (!words.every((word) => fields.some((field) => field.includes(word)))) return 0;
  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  return 20;
}

async function seedRows(type: SearchType): Promise<Row[]> {
  return JSON.parse(await readFile(path.join(process.cwd(), "data", "seed", `${files[type]}.json`), "utf8")) as Row[];
}

async function databaseRows(type: SearchType): Promise<Row[]> {
  switch (type) {
    case "CIVILIZATION": return prisma.civilization.findMany({ select: { slug: true, name: true, summary: true, region: true } });
    case "PERSON": return prisma.person.findMany({ select: { slug: true, name: true, summary: true, occupations: true, birthYear: true, deathYear: true } });
    case "EVENT": return prisma.event.findMany({ select: { slug: true, title: true, summary: true, startYear: true, endYear: true } });
    case "IDEA": return prisma.idea.findMany({ select: { slug: true, title: true, summary: true, category: true } });
    case "BOOK": return prisma.book.findMany({ select: { slug: true, title: true, summary: true, author: true, publicationYear: true } });
  }
}

export function searchRows(type: SearchType, rows: Row[], q: string, limit = 50): SearchResult[] {
  const query = normalize(q.trim().replace(/\s+/g, " "));
  if (!query) return [];
  const words = query.split(" ");
  return rows.map((row) => ({ row, score: score(row, query, words) }))
    .filter(({ score }) => score > 0)
    .map(({ row, score }) => ({ type, slug: row.slug, title: row.name ?? row.title ?? "", subtitle: subtitle(type, row), snippet: snippet(row.summary), score }))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title) || a.slug.localeCompare(b.slug))
    .slice(0, limit);
}

export async function searchEntities({ q, types = searchTypes, limit = 50 }: SearchOptions): Promise<SearchResult[]> {
  const max = Number.isFinite(limit) ? Math.min(100, Math.max(1, Math.trunc(limit))) : 50;
  const groups = await Promise.all(types.map(async (type) => {
    const rows = await withDatabase(`search.${type}`, () => databaseRows(type), () => seedRows(type));
    return searchRows(type, rows, q, max);
  }));
  return groups.flat().sort((a, b) => b.score - a.score || a.title.localeCompare(b.title) || a.slug.localeCompare(b.slug)).slice(0, max);
}
