"use client";

import { useState } from "react";
import Link from "next/link";
import { formatYear } from "@/lib/utils";
import type { TimelineDetailItem } from "@/repositories/timeline";

function formatYears(item: TimelineDetailItem): string {
  if (item.endYear === null || item.endYear === item.year) return formatYear(item.year);
  return `${formatYear(item.year)} – ${formatYear(item.endYear)}`;
}

export function TimelineExplorer({ items }: { items: TimelineDetailItem[] }) {
  const [selectedKey, setSelectedKey] = useState(items[0] ? `${items[0].kind}-${items[0].slug}` : "");
  const selected = items.find((item) => `${item.kind}-${item.slug}` === selectedKey) ?? items[0];

  if (!selected) return <p className="text-slate-500">No timeline entries in this epoch yet.</p>;

  return <div className="space-y-6">
    <div className="overflow-x-auto pb-4" aria-label="Timeline entries">
      <ol className="flex min-w-max border-t border-amber-500 pt-8">
        {items.map((item) => {
          const key = `${item.kind}-${item.slug}`;
          return <li key={key} className="relative w-56 shrink-0 pr-4">
            <span className="absolute -top-[37px] left-3 size-3 rounded-full bg-amber-500" aria-hidden="true" />
            <button type="button" aria-pressed={key === `${selected.kind}-${selected.slug}`} onClick={() => setSelectedKey(key)} className="w-full rounded-lg border border-stone-200 bg-white p-4 text-left shadow-sm transition-colors hover:border-amber-500 focus-visible:outline-2 focus-visible:outline-amber-600 aria-pressed:border-amber-600 aria-pressed:bg-amber-50">
              <span className="block text-xs font-semibold text-amber-800">{formatYear(item.year)}</span>
              <span className="mt-2 block font-semibold text-slate-900">{item.title}</span>
              <span className="mt-2 block text-xs capitalize text-slate-500">{item.kind}</span>
            </button>
          </li>;
        })}
      </ol>
    </div>
    <section aria-live="polite" className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">{selected.kind}</p>
      <h3 className="mt-2 text-2xl font-bold text-slate-900">{selected.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{formatYears(selected)}</p>
      <p className="mt-4 text-slate-700">{selected.summary ?? "A detailed summary is being prepared."}</p>
      <Link href={selected.href} className="mt-5 inline-block font-semibold text-amber-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-amber-600">Explore {selected.kind} →</Link>
    </section>
  </div>;
}
