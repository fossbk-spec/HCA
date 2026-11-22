import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RelationList } from "@/components/entity/RelationList";
import { formatLifespan } from "@/components/people/PersonCard";
import { listPersonSlugs } from "@/repositories/people";
import { getPerson } from "@/services/people";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listPersonSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const person = await getPerson((await params).slug);
  if (!person) return { title: "Person not found" };
  return { title: person.name, description: person.summary ?? `Explore the life of ${person.name}.` };
}

export default async function PersonPage({ params }: Props) {
  const person = await getPerson((await params).slug);
  if (!person) notFound();
  const lifespan = formatLifespan(person.birthYear, person.deathYear);
  const paragraphs = person.content?.split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean) ?? [];

  return <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
    <Link href="/people" className="text-sm font-semibold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600">← People</Link>
    <header className="mt-8 border-b border-stone-200 pb-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">{person.name}</h1>
      {lifespan && <p className="mt-4 text-slate-600">{lifespan}</p>}
      {person.occupations && <p className="mt-2 font-medium text-amber-800">{person.occupations}</p>}
      {person.civilization && <p className="mt-4 text-slate-600">Civilization: <Link href={`/civilizations/${person.civilization.slug}`} className="font-semibold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600">{person.civilization.name}</Link></p>}
    </header>
    {person.summary && <section aria-labelledby="overview-heading" className="mt-10">
      <h2 id="overview-heading" className="text-2xl font-bold text-slate-900">Overview</h2>
      <p className="mt-4 text-lg leading-8 text-slate-700">{person.summary}</p>
    </section>}
    {paragraphs.length > 0 && <section aria-labelledby="life-heading" className="mt-10">
      <h2 id="life-heading" className="text-2xl font-bold text-slate-900">Life and work</h2>
      <div className="mt-4 space-y-4 leading-8 text-slate-700">{paragraphs.map((text, index) => <p key={index}>{text}</p>)}</div>
    </section>}
    <RelationList relations={person.relations} />
  </main>;
}
