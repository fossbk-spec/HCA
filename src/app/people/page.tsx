import type { Metadata } from "next";
import { PersonCard } from "@/components/people/PersonCard";
import { listPeopleGroups } from "@/services/people";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "People",
  description: "Explore the people who shaped human civilizations, ideas, and books.",
};

export default async function PeoplePage() {
  const groups = await listPeopleGroups();
  return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <header className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">Explore history</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">People</h1>
      <p className="mt-4 text-lg text-slate-600">Meet the thinkers, leaders, and creators who shaped our world.</p>
    </header>
    <div className="mt-12 space-y-14">
      {groups.map(({ civilization, people }, index) => <section key={civilization} aria-labelledby={`people-group-${index}`}>
        <h2 id={`people-group-${index}`} className="mb-6 text-2xl font-bold text-slate-900">{civilization}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => <PersonCard key={person.slug} person={person} />)}
        </div>
      </section>)}
    </div>
  </main>;
}
