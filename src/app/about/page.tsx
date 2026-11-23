import type { Metadata } from "next";
import Link from "next/link";
import { listAllCivilizations } from "@/repositories/civilizations";
import { listPeople } from "@/repositories/people";
import { listEvents } from "@/repositories/events";
import { listIdeas } from "@/repositories/ideas";
import { listBooks } from "@/repositories/books";

export const revalidate = 3600;

export const metadata: Metadata = { title: "About" };

const explorationLinks = [
  ["Timeline", "/timeline"],
  ["Civilizations", "/civilizations"],
  ["People", "/people"],
  ["Events", "/events"],
  ["Ideas", "/ideas"],
  ["Books", "/books"],
  ["Search", "/search"],
] as const;

export default async function AboutPage() {
  const [civilizations, people, events, ideas, books] = await Promise.all([
    listAllCivilizations(),
    listPeople(),
    listEvents(),
    listIdeas(),
    listBooks(),
  ]);

  const counts = [
    ["Civilizations", civilizations.length],
    ["People", people.length],
    ["Events", events.length],
    ["Ideas", ideas.length],
    ["Books", books.length],
  ] as const;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-b border-stone-200 pb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">About HCA</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Human Civilization Atlas</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          An open knowledge platform for exploring the history of humanity.
        </p>
      </header>

      <div className="space-y-12 py-10">
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Mission</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Human Civilization Atlas is an open knowledge platform helping learners understand human history through
            civilizations, people, events, ideas, and books.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">What you can explore</h2>
          <nav aria-label="Explore the atlas" className="mt-4 flex flex-wrap gap-3">
            {explorationLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-amber-700 hover:text-amber-800 focus-visible:outline-2 focus-visible:outline-amber-600"
              >
                {label}
              </Link>
            ))}
          </nav>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">The dataset</h2>
          <p className="mt-4 leading-7 text-slate-600">
            The atlas currently includes the following entries:
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-5">
            {counts.map(([label, count]) => (
              <div key={label} className="rounded-xl border border-stone-200 bg-white p-4">
                <dt className="text-sm text-slate-600">{label}</dt>
                <dd className="mt-1 text-3xl font-bold text-slate-900">{count}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">How to read this content</h2>
          <p className="mt-4 leading-7 text-slate-600">
            These entries are an early seed dataset, and the summaries are condensed introductions rather than
            complete accounts. Historical accuracy has not yet been verified by subject-matter experts. If you find an
            error, please report it so it can be reviewed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Roadmap</h2>
          <p className="mt-4 leading-7 text-slate-600">
            The atlas will grow with more entities, maps, a knowledge graph, and semantic search.
          </p>
        </section>
      </div>
    </div>
  );
}
