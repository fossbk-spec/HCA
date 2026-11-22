import Link from "next/link";
import { entityHref } from "@/repositories/relationships";
import type { RelationGroup } from "@/services/people";

export function RelationList({ relations }: { relations: RelationGroup[] }) {
  if (relations.length === 0) return null;
  return <section aria-labelledby="connections-heading" className="mt-10">
    <h2 id="connections-heading" className="text-2xl font-bold text-slate-900">Connections</h2>
    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      {relations.map(({ label, relations: items }) => <div key={label} className="rounded-xl border border-stone-200 p-5">
        <h3 className="font-semibold capitalize text-slate-700">{label}</h3>
        <ul className="mt-3 space-y-2">
          {items.map(({ other }) => <li key={`${other.type}:${other.slug}`}>
            <Link href={entityHref(other.type, other.slug)} className="text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">{other.title}</Link>
          </li>)}
        </ul>
      </div>)}
    </div>
  </section>;
}
