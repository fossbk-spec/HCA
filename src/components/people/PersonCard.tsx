import Link from "next/link";
import { formatYear } from "@/lib/utils";
import type { Person } from "@/repositories/people";

export function formatLifespan(birthYear: number | null, deathYear: number | null): string | null {
  if (birthYear === null && deathYear === null) return null;
  if (birthYear === null) return `Died ${formatYear(deathYear!)}`;
  if (deathYear === null) return `Born ${formatYear(birthYear)}`;
  return `${formatYear(birthYear)} – ${formatYear(deathYear)}`;
}

export function PersonCard({ person }: { person: Person }) {
  const lifespan = formatLifespan(person.birthYear, person.deathYear);
  return <article className="h-full rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-amber-300 hover:shadow-md">
    <h3 className="text-xl font-semibold text-slate-900">
      <Link href={`/people/${person.slug}`} className="hover:text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">{person.name}</Link>
    </h3>
    {lifespan && <p className="mt-1 text-sm text-slate-500">{lifespan}</p>}
    {person.occupations && <p className="mt-3 text-sm font-medium text-amber-800">{person.occupations}</p>}
    {person.summary && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{person.summary}</p>}
  </article>;
}
