import type { Metadata } from "next";
import { TimelineExplorer } from "@/components/timeline/TimelineExplorer";
import { formatYear } from "@/lib/utils";
import { getTimelineGroups } from "@/services/timeline";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Timeline Explorer",
  description: "Explore the events and civilizations that shaped human history.",
};

export default async function TimelinePage() {
  const groups = await getTimelineGroups();

  return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <header className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">Explore history</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Timeline Explorer</h1>
      <p className="mt-4 text-lg text-slate-600">Move through the ages and select a milestone to learn more.</p>
    </header>
    <nav aria-label="Epoch navigation" className="mt-10 flex gap-3 overflow-x-auto pb-3">
      {groups.map(({ epoch }) => <a key={epoch.id} href={`#${epoch.id}`} className="shrink-0 rounded-full border border-stone-300 px-4 py-2 font-medium text-slate-800 hover:border-amber-600 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-amber-600">{epoch.label}</a>)}
    </nav>
    <div className="mt-12 space-y-16">
      {groups.map(({ epoch, items }) => <section key={epoch.id} id={epoch.id} aria-labelledby={`${epoch.id}-heading`} className="scroll-mt-8">
        <div className="mb-8">
          <h2 id={`${epoch.id}-heading`} className="text-3xl font-bold text-slate-900">{epoch.label}</h2>
          <p className="mt-1 text-sm text-slate-500">{epoch.id === "prehistory" ? `Before ${formatYear(epoch.endYear)}` : epoch.id === "modern" ? `Since ${formatYear(epoch.startYear)}` : `${formatYear(epoch.startYear)} to ${formatYear(epoch.endYear)}`}</p>
        </div>
        <TimelineExplorer items={items} />
      </section>)}
    </div>
  </div>;
}
