import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RelationList } from "@/components/entity/RelationList";
import { formatYear } from "@/lib/utils";
import { listEventSlugs } from "@/repositories/events";
import { getEvent } from "@/services/events";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listEventSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent((await params).slug);
  if (!event) return { title: "Event not found" };
  return {
    title: `${event.title} | Human Civilization Atlas`,
    description: event.summary ?? `Historical record of ${event.title}.`,
  };
}

function formatEventYears(start: number | null, end: number | null): string {
  if (start === null && end === null) return "Date unknown";
  if (start !== null && end !== null && start === end) return formatYear(start);
  if (start !== null && end !== null) return `${formatYear(start)} – ${formatYear(end)}`;
  if (start !== null) return `From ${formatYear(start)}`;
  return `Until ${formatYear(end!)}`;
}

export default async function EventPage({ params }: Props) {
  const event = await getEvent((await params).slug);
  if (!event) notFound();

  const timeLabel = formatEventYears(event.startYear, event.endYear);
  const paragraphs = event.content?.split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean) ?? [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/events"
        className="text-sm font-semibold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600"
      >
        ← Historical Events
      </Link>
      <header className="mt-8 border-b border-stone-200 pb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">{timeLabel}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{event.title}</h1>
      </header>

      {event.summary && (
        <section aria-labelledby="overview-heading" className="mt-10">
          <h2 id="overview-heading" className="text-2xl font-bold text-slate-900">
            Historical Summary
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-700">{event.summary}</p>
        </section>
      )}

      {paragraphs.length > 0 && (
        <section aria-labelledby="narrative-heading" className="mt-10">
          <h2 id="narrative-heading" className="text-2xl font-bold text-slate-900">
            Historical Narrative & Consequences
          </h2>
          <div className="mt-4 space-y-4 leading-8 text-slate-700">
            {paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </section>
      )}

      <RelationList relations={event.relations} />

      <p className="mt-12 border-t border-stone-200 pt-6">
        <Link
          href="/timeline"
          className="font-semibold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600"
        >
          Explore the Timeline →
        </Link>
      </p>
    </main>
  );
}
