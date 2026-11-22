import { searchEntities, searchTypes, type SearchResult, type SearchType } from "@/repositories/search";

export const searchLabels: Record<SearchType, string> = { CIVILIZATION: "Civilizations", PERSON: "People", EVENT: "Events", IDEA: "Ideas", BOOK: "Books" };
export type SearchMessage = "QUERY_TOO_SHORT" | "QUERY_TOO_LONG";

export async function search({ q, types, limit }: { q: string; types?: readonly SearchType[]; limit?: number }) {
  const query = q.trim().replace(/\s+/g, " ");
  const message: SearchMessage | null = query.length < 2 ? "QUERY_TOO_SHORT" : query.length > 100 ? "QUERY_TOO_LONG" : null;
  const results = message ? [] : await searchEntities({ q: query, types, limit });
  const counts = Object.fromEntries(searchTypes.map((type) => [type, results.filter((result) => result.type === type).length])) as Record<SearchType, number>;
  const groups: { type: SearchType; label: string; count: number; results: SearchResult[] }[] = searchTypes.map((type) => ({ type, label: searchLabels[type], count: counts[type], results: results.filter((result) => result.type === type) }));
  return { query, message, total: results.length, counts, groups, results };
}
