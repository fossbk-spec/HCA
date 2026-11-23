import { readFile } from "node:fs/promises";
import path from "node:path";
import type { EntityType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { withDatabase } from "@/lib/seed-fallback";

export const searchTypes = ["CIVILIZATION", "PERSON", "EVENT", "IDEA", "BOOK"] as const satisfies readonly EntityType[];
export type SearchType = (typeof searchTypes)[number];
export type SearchResult = {
  type: SearchType;
  slug: string;
  title: string;
  titleVi: string | null;
  subtitle: string;
  subtitleVi: string | null;
  snippet: string;
  snippetVi: string | null;
  score: number;
};
export type SearchRow = {
  slug: string;
  name?: string;
  nameVi?: string | null;
  title?: string;
  titleVi?: string | null;
  summary?: string | null;
  summaryVi?: string | null;
  region?: string | null;
  regionVi?: string | null;
  occupations?: string | null;
  occupationsVi?: string | null;
  category?: string | null;
  categoryVi?: string | null;
  author?: string | null;
  authorVi?: string | null;
  birthYear?: number | null;
  deathYear?: number | null;
  startYear?: number | null;
  endYear?: number | null;
  publicationYear?: number | null;
};
type Row = SearchRow;
type SearchOptions = { q: string; types?: readonly SearchType[]; limit?: number };

const files: Record<SearchType, string> = { CIVILIZATION: "civilizations", PERSON: "people", EVENT: "events", IDEA: "ideas", BOOK: "books" };
export const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLocaleLowerCase();
const snippet = (value: string | null | undefined) => value ? `${value.slice(0, 160).trimEnd()}${value.length > 160 ? "…" : ""}` : "";
const year = (value: number | null | undefined) => value == null ? "" : `${Math.abs(value)} ${value < 0 ? "BCE" : "CE"}`;
const yearVi = (value: number | null | undefined) => value == null ? "" : `${Math.abs(value)} ${value < 0 ? "TCN" : "SCN"}`;

function subtitle(type: SearchType, row: Row): string {
  switch (type) {
    case "CIVILIZATION": return row.region ?? "";
    case "PERSON": return [row.occupations, [year(row.birthYear), year(row.deathYear)].filter(Boolean).join("–")].filter(Boolean).join(" · ");
    case "EVENT": return [year(row.startYear), row.endYear !== row.startYear ? year(row.endYear) : ""].filter(Boolean).join("–");
    case "IDEA": return row.category ?? "";
    case "BOOK": return [row.author, year(row.publicationYear)].filter(Boolean).join(" · ");
  }
}

function subtitleVi(type: SearchType, row: Row): string {
  switch (type) {
    case "CIVILIZATION": return row.regionVi ?? row.region ?? "";
    case "PERSON": return [row.occupationsVi ?? row.occupations, [yearVi(row.birthYear), yearVi(row.deathYear)].filter(Boolean).join("–")].filter(Boolean).join(" · ");
    case "EVENT": return [yearVi(row.startYear), row.endYear !== row.startYear ? yearVi(row.endYear) : ""].filter(Boolean).join("–");
    case "IDEA": return row.categoryVi ?? row.category ?? "";
    case "BOOK": return [row.authorVi ?? row.author, yearVi(row.publicationYear)].filter(Boolean).join(" · ");
  }
}

export function score(row: Row, q: string, words: string[]): number {
  const title = normalize(row.name ?? row.title ?? "");
  const titleVi = normalize(row.nameVi ?? row.titleVi ?? "");
  const fields = [
    title,
    titleVi,
    row.summary,
    row.summaryVi,
    row.region,
    row.regionVi,
    row.occupations,
    row.occupationsVi,
    row.category,
    row.categoryVi,
    row.author,
    row.authorVi,
  ].map((value) => normalize(value ?? ""));

  if (!words.every((word) => fields.some((field) => field.includes(word)))) return 0;
  if (title === q || titleVi === q) return 100;
  if (title.startsWith(q) || titleVi.startsWith(q)) return 80;
  if (title.includes(q) || titleVi.includes(q)) return 60;
  return 20;
}

async function seedRows(type: SearchType): Promise<Row[]> {
  return JSON.parse(await readFile(path.join(process.cwd(), "data", "seed", `${files[type]}.json`), "utf8")) as Row[];
}

async function databaseRows(type: SearchType): Promise<Row[]> {
  switch (type) {
    case "CIVILIZATION":
      return prisma.civilization.findMany({
        select: { slug: true, name: true, nameVi: true, summary: true, summaryVi: true, region: true, regionVi: true },
      });
    case "PERSON":
      return prisma.person.findMany({
        select: {
          slug: true,
          name: true,
          nameVi: true,
          summary: true,
          summaryVi: true,
          occupations: true,
          occupationsVi: true,
          birthYear: true,
          deathYear: true,
        },
      });
    case "EVENT":
      return prisma.event.findMany({
        select: {
          slug: true,
          title: true,
          titleVi: true,
          summary: true,
          summaryVi: true,
          startYear: true,
          endYear: true,
        },
      });
    case "IDEA":
      return prisma.idea.findMany({
        select: {
          slug: true,
          title: true,
          titleVi: true,
          summary: true,
          summaryVi: true,
          category: true,
          categoryVi: true,
        },
      });
    case "BOOK":
      return prisma.book.findMany({
        select: {
          slug: true,
          title: true,
          titleVi: true,
          summary: true,
          summaryVi: true,
          author: true,
          authorVi: true,
          publicationYear: true,
        },
      });
  }
}

export function searchRows(type: SearchType, rows: Row[], q: string, limit = 50): SearchResult[] {
  const query = normalize(q.trim().replace(/\s+/g, " "));
  if (!query) return [];
  const words = query.split(" ");
  return rows.map((row) => ({ row, score: score(row, query, words) }))
    .filter(({ score }) => score > 0)
    .map(({ row, score }) => ({
      type,
      slug: row.slug,
      title: row.name ?? row.title ?? "",
      titleVi: row.nameVi ?? row.titleVi ?? null,
      subtitle: subtitle(type, row),
      subtitleVi: subtitleVi(type, row),
      snippet: snippet(row.summary),
      snippetVi: snippet(row.summaryVi),
      score,
    }))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title) || a.slug.localeCompare(b.slug))
    .slice(0, limit);
}

export async function searchEntities({ q, types = searchTypes, limit = 50 }: SearchOptions): Promise<SearchResult[]> {
  const max = Number.isFinite(limit) ? Math.min(100, Math.max(1, Math.trunc(limit))) : 50;
  const groups = await Promise.all(
    types.map(async (type) => {
      const rows = await withDatabase(`search.${type}`, () => databaseRows(type), () => seedRows(type));
      return searchRows(type, rows, q, max);
    }),
  );
  return groups.flat().sort((a, b) => b.score - a.score || a.title.localeCompare(b.title) || a.slug.localeCompare(b.slug)).slice(0, max);
}
