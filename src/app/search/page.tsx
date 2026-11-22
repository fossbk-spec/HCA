import type { Metadata } from "next";
import Link from "next/link";
import { SearchBox } from "@/components/search/SearchBox";
import { entityHref } from "@/repositories/relationships";
import { searchTypes, type SearchType } from "@/repositories/search";
import { search, searchLabels } from "@/services/search";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; type?: string }> }) {
  const { q = "", type } = await searchParams;
  const activeType = searchTypes.includes(type as SearchType) ? type as SearchType : undefined;
  const { query, message, total, groups } = await search({ q, types: activeType ? [activeType] : undefined });
  const filterHref = (selected?: SearchType) => `/search?q=${encodeURIComponent(query)}${selected ? `&type=${selected}` : ""}`;
  return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <header className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">Explore history</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Search</h1>
      <p className="mt-4 text-lg text-slate-600">Find civilizations, people, events, ideas, and books.</p>
    </header>
    <div className="mt-8 max-w-3xl"><SearchBox id="page-search" defaultValue={q} /></div>
    <nav aria-label="Filter results by type" className="mt-8 flex flex-wrap gap-2">
      <Link href={filterHref()} aria-current={!activeType ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-medium ${!activeType ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>All</Link>
      {searchTypes.map((item) => <Link key={item} href={filterHref(item)} aria-current={activeType === item ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-medium ${activeType === item ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{searchLabels[item]}</Link>)}
    </nav>
    {message ? <p className="mt-10 text-slate-600">{message === "QUERY_TOO_SHORT" ? "Enter at least 2 characters to search." : "Use a query of 100 characters or fewer."}</p>
      : total === 0 ? <div className="mt-10 text-slate-600"><p>No results for “{query}”.</p><p className="mt-2">Try a shorter name, another spelling, or a different type.</p></div>
      : <div className="mt-10 space-y-12"><p className="text-slate-600">{total} {total === 1 ? "result" : "results"} for “{query}”</p>
        {groups.filter((group) => group.count > 0).map((group) => <section key={group.type} aria-labelledby={`results-${group.type}`}>
          <h2 id={`results-${group.type}`} className="mb-5 text-2xl font-bold text-slate-900">{group.label} ({group.count})</h2>
          <ul className="grid gap-4 sm:grid-cols-2">{group.results.map((result) => <li key={`${result.type}-${result.slug}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">{searchLabels[result.type]}</span>
            <h3 className="mt-2 text-lg font-semibold text-slate-900"><Link href={entityHref(result.type, result.slug)} className="hover:underline focus-visible:underline">{result.title}</Link></h3>
            {result.subtitle && <p className="mt-1 text-sm text-slate-500">{result.subtitle}</p>}
            {result.snippet && <p className="mt-3 text-sm leading-6 text-slate-600">{result.snippet}</p>}
          </li>)}</ul>
        </section>)}
      </div>}
  </div>;
}
