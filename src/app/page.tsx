import Link from "next/link";
import { ArrowRight, BookOpen, Globe2, Lightbulb, MoveRight } from "lucide-react";
import { CivilizationCard } from "@/components/civilization/CivilizationCard";
import { SearchBox } from "@/components/search/SearchBox";
import { TimelinePreview } from "@/components/timeline/TimelinePreview";
import { getHomeData } from "@/services/home";

export const revalidate = 3600;

export default async function HomePage() {
  const { civilizations, ideas, timeline } = await getHomeData();

  return <>
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(245,158,11,.18),transparent_35%),radial-gradient(circle_at_10%_90%,rgba(14,116,144,.22),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300"><Globe2 size={15} aria-hidden="true" /> A world of connected history</div>
        <h1 className="max-w-4xl text-5xl font-bold leading-[1.07] tracking-tight sm:text-6xl lg:text-7xl">Discover the story of <span className="text-amber-400">human civilization.</span></h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">Travel across time and place. Explore the civilizations, people, books, and ideas that shaped the world we share.</p>
        <SearchBox className="mt-9 max-w-2xl" />
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-300">
          <Link href="/timeline" className="inline-flex items-center gap-2 hover:text-amber-300">Explore the timeline <ArrowRight size={16} aria-hidden="true" /></Link>
          <Link href="/civilizations" className="inline-flex items-center gap-2 hover:text-amber-300">Browse civilizations <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>

    <section className="bg-slate-900 py-16 text-white" aria-labelledby="timeline-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Across the centuries</p><h2 id="timeline-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">A journey through time</h2><p className="mt-3 text-slate-300">Follow the rise of civilizations and defining moments.</p></div><Link href="/timeline" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200">Full timeline <MoveRight size={17} aria-hidden="true" /></Link></div>
        <TimelinePreview items={timeline} />
      </div>
    </section>

    <section className="py-20" aria-labelledby="civilizations-heading"><div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Explore the world</p><h2 id="civilizations-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">Featured civilizations</h2><p className="mt-3 text-slate-600">Discover societies whose legacies reach across centuries.</p></div><Link href="/civilizations" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:underline">View all civilizations <ArrowRight size={17} aria-hidden="true" /></Link></div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{civilizations.map((item, index) => <CivilizationCard key={item.slug} civilization={item} index={index} />)}</div>
    </div></section>

    <section className="border-t border-slate-200 bg-white py-20" aria-labelledby="ideas-heading"><div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-700"><Lightbulb size={16} aria-hidden="true" /> The ideas behind change</p><h2 id="ideas-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">Featured ideas</h2><p className="mt-3 text-slate-600">Explore concepts that continue to shape how we live.</p></div><Link href="/ideas" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:underline">Explore ideas <ArrowRight size={17} aria-hidden="true" /></Link></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{ideas.map((idea, index) => <Link key={idea.slug} href={`/ideas/${idea.slug}`} className="group flex min-h-44 flex-col justify-between rounded-2xl border border-slate-200 bg-stone-50 p-5 transition-colors hover:border-amber-400 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"><div className="flex items-start justify-between"><BookOpen size={23} className="text-amber-700" aria-hidden="true" /><span className="text-xs font-semibold text-slate-400">{String(index + 1).padStart(2, "0")}</span></div><div><h3 className="text-lg font-semibold text-slate-900">{idea.title}</h3><p className="mt-2 text-sm text-slate-600">{idea.summary ?? idea.category ?? "Explore this enduring idea"}</p></div><ArrowRight size={17} className="mt-3 text-slate-400 group-hover:text-amber-700" aria-hidden="true" /></Link>)}</div>
    </div></section>
  </>;
}
