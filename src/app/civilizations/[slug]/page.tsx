import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatYear } from "@/lib/utils";
import { listCivilizationSlugs } from "@/repositories/civilizations";
import { getCivilization } from "@/services/civilizations";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listCivilizationSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const civilization = await getCivilization((await params).slug);
  if (!civilization) return { title: "Civilization not found" };
  return {
    title: civilization.name,
    description: civilization.summary ?? `Explore the history of ${civilization.name}.`,
  };
}

function period(start: number | null, end: number | null) {
  if (start === null && end === null) return "Period unknown";
  if (start === null) return `Until ${formatYear(end!)}`;
  if (end === null) return `From ${formatYear(start)}`;
  return `${formatYear(start)} to ${formatYear(end)}`;
}

export default async function CivilizationPage({ params }: Props) {
  const civilization = await getCivilization((await params).slug);
  if (!civilization) notFound();

  const paragraphs = civilization.content?.split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean) ?? [];

  return <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
    <Link href="/civilizations" className="text-sm font-semibold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600">← Civilization Atlas</Link>
    <header className="mt-8 border-b border-stone-200 pb-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">{civilization.region ?? "World history"}</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{civilization.name}</h1>
      <p className="mt-4 text-slate-600">{period(civilization.periodStart, civilization.periodEnd)}</p>
    </header>
    {civilization.summary && <section aria-labelledby="summary-heading" className="mt-10">
      <h2 id="summary-heading" className="text-2xl font-bold text-slate-900">Overview</h2>
      <p className="mt-4 text-lg leading-8 text-slate-700">{civilization.summary}</p>
    </section>}
    {paragraphs.length > 0 && <section aria-labelledby="history-heading" className="mt-10">
      <h2 id="history-heading" className="text-2xl font-bold text-slate-900">History</h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
        {paragraphs.map((text, index) => <p key={index}>{text}</p>)}
      </div>
    </section>}
    {civilization.people.length > 0 && <section aria-labelledby="people-heading" className="mt-10">
      <h2 id="people-heading" className="text-2xl font-bold text-slate-900">Historical figures</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {civilization.people.map((person) => <li key={person.slug} className="rounded-xl border border-stone-200 p-4">
          <Link href={`/people/${person.slug}`} className="font-semibold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600">{person.name}</Link>
          {(person.birthYear !== null || person.deathYear !== null) && <p className="mt-1 text-sm text-slate-600">{period(person.birthYear, person.deathYear)}</p>}
        </li>)}
      </ul>
    </section>}
    <p className="mt-12 border-t border-stone-200 pt-6"><Link href="/timeline" className="font-semibold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600">Explore the Timeline →</Link></p>
  </div>;
}
