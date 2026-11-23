"use client";

import Link from "next/link";
import { formatLifespanBilingual, formatLifespan } from "@/lib/utils";
import type { Person } from "@/repositories/people";
import { useLanguage } from "@/context/LanguageContext";

export { formatLifespanBilingual, formatLifespan };

export function PersonCard({ person }: { person: Person }) {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const name = isVi && person.nameVi ? person.nameVi : person.name;
  const originalName = isVi && person.nameVi && person.nameVi !== person.name ? person.name : null;
  const occupations = isVi && person.occupationsVi ? person.occupationsVi : person.occupations;
  const summary = isVi && person.summaryVi ? person.summaryVi : person.summary;
  const lifespan = formatLifespanBilingual(person.birthYear, person.deathYear, isVi);

  return (
    <article className="h-full rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-amber-300 hover:shadow-md">
      <h3 className="text-xl font-semibold text-slate-900">
        <Link href={`/people/${person.slug}`} className="hover:text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
          {name}
        </Link>
        {originalName && <span className="block text-xs font-normal text-slate-400 mt-0.5">{originalName}</span>}
      </h3>
      {lifespan && <p className="mt-1 text-sm text-slate-500">{lifespan}</p>}
      {occupations && <p className="mt-3 text-sm font-medium text-amber-800">{occupations}</p>}
      {summary && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{summary}</p>}
    </article>
  );
}
