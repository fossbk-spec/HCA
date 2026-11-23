import type { Metadata } from "next";
import Link from "next/link";
import { GraphView } from "@/components/graph/GraphView";
import { RelationList } from "@/components/entity/RelationList";
import { entityHref } from "@/repositories/relationships";
import { searchTypes, type SearchType } from "@/repositories/search";
import { getEgoGraph } from "@/services/graph";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Knowledge Graph" };

const examples = [
  ["PERSON", "plato"], ["PERSON", "aristotle"], ["PERSON", "socrates"],
  ["CIVILIZATION", "ancient-greece"], ["IDEA", "democracy"], ["BOOK", "the-republic"],
  ["EVENT", "founding-of-platos-academy"], ["PERSON", "hammurabi"],
] as const;

export default async function GraphPage({ searchParams }: { searchParams: Promise<{ type?: string; slug?: string }> }) {
  const { type, slug } = await searchParams;
  const validType = searchTypes.includes(type as SearchType) ? type as SearchType : null;
  const graph = validType && slug ? await getEgoGraph(validType, slug) : null;

  if (validType && slug && !graph) {
    return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">Knowledge Graph</h1>
      <p className="mt-5 max-w-xl text-lg text-slate-600">We couldn’t find that knowledge object. Check the type and slug, then try again.</p>
      <Link href="/graph" className="mt-6 inline-block font-semibold text-amber-800 hover:underline">Browse graph examples →</Link>
    </div>;
  }

  if (graph) {
    return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">One-hop neighbourhood</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{graph.center.title}</h1>
        <p className="mt-4 text-lg text-slate-600">Explore the people, events, ideas, books, and civilizations directly connected to this object.</p>
      </header>
      <div className="mt-8"><GraphView nodes={graph.nodes} edges={graph.edges} /></div>
      {graph.truncated && <p className="mt-5 text-sm font-medium text-slate-600">Showing first 40 of {graph.totalNeighbours} connections.</p>}
      <div className="mt-8 rounded-xl border border-stone-200 bg-white p-5">
        <p className="text-sm text-slate-600">Text alternative for <Link href={entityHref(graph.center.type, graph.center.slug)} className="font-semibold text-amber-800 hover:underline">{graph.center.title}</Link></p>
        <RelationList relations={graph.relations} />
      </div>
    </div>;
  }

  const starters = (await Promise.all(examples.map(async ([exampleType, exampleSlug]) => {
    const example = await getEgoGraph(exampleType, exampleSlug);
    return example ? { ...example.center, type: exampleType, slug: exampleSlug } : null;
  }))).filter((example): example is NonNullable<typeof example> => example !== null);

  return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <header className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">Explore connections</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Knowledge Graph</h1>
      <p className="mt-4 text-lg text-slate-600">Choose a well-connected starting point to explore its one-hop neighbourhood.</p>
    </header>
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {starters.map((example) => <li key={`${example.type}:${example.slug}`} className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">{example.type.toLowerCase()}</p>
        <Link href={`/graph?type=${example.type}&slug=${example.slug}`} className="mt-2 block text-lg font-semibold text-slate-900 hover:text-amber-800 hover:underline">{example.title}</Link>
      </li>)}
    </ul>
  </div>;
}
