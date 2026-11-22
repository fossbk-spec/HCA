import { NextRequest, NextResponse } from "next/server";
import { search } from "@/services/search";
import { searchTypes, type SearchType } from "@/repositories/search";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const rawType = params.get("type");
  const types = rawType ? rawType.split(",") : undefined;
  if (types?.some((type) => !searchTypes.includes(type as SearchType))) {
    return NextResponse.json({ error: "Unknown search type." }, { status: 400 });
  }
  const rawLimit = params.get("limit");
  if (rawLimit !== null && (!/^\d+$/.test(rawLimit) || Number(rawLimit) < 1)) {
    return NextResponse.json({ error: "Limit must be a positive integer." }, { status: 400 });
  }
  const result = await search({ q: params.get("q") ?? "", types: types as SearchType[] | undefined, limit: rawLimit === null ? undefined : Number(rawLimit) });
  if (result.message) return NextResponse.json({ error: result.message === "QUERY_TOO_SHORT" ? "Query must be at least 2 characters." : "Query must be at most 100 characters." }, { status: 400 });
  const { query, total, counts, results } = result;
  return NextResponse.json({ query, total, counts, results });
}
