import type { Metadata } from "next";
import { CivilizationCard } from "@/components/civilization/CivilizationCard";
import { listCivilizations } from "@/services/civilizations";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Civilization Atlas",
  description: "Explore civilizations across regions and eras of human history.",
};

export default async function CivilizationsPage() {
  const groups = await listCivilizations();
  let index = 0;

  return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <header className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">Explore history</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Civilization Atlas</h1>
      <p className="mt-4 text-lg text-slate-600">Discover the societies, people, and ideas that shaped our world.</p>
    </header>
    <div className="mt-12 space-y-14">
      {groups.map(({ region, civilizations }, groupIndex) => <section key={region} aria-labelledby={`region-${groupIndex}`}>
        <h2 id={`region-${groupIndex}`} className="mb-6 text-2xl font-bold text-slate-900">{region}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {civilizations.map((civilization) => <CivilizationCard key={civilization.slug} civilization={civilization} index={index++} />)}
        </div>
      </section>)}
    </div>
  </main>;
}
