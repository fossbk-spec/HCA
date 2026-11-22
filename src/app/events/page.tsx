import type { Metadata } from "next";
import Link from "next/link";
import { formatYear } from "@/lib/utils";
import { listAllEvents } from "@/services/events";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Historical Events | Human Civilization Atlas",
  description: "Chronological catalog of transformative events, turning points, and battles in world history.",
};

function formatEventYears(start: number | null, end: number | null): string {
  if (start === null && end === null) return "Date unknown";
  if (start !== null && end !== null && start === end) return formatYear(start);
  if (start !== null && end !== null) return `${formatYear(start)} – ${formatYear(end)}`;
  if (start !== null) return `From ${formatYear(start)}`;
  return `Until ${formatYear(end!)}`;
}

export default async function EventsPage() {
  const events = await listAllEvents();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-b border-stone-200 pb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">Historical Chronology</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Transformative Historical Events</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Chronological record of {events.length} decisive moments—revolutions, military triumphs, edicts, reforms, and
          cultural turning points that charted the destiny of human civilization.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <article
            key={event.slug}
            className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                {formatEventYears(event.startYear, event.endYear)}
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                <Link
                  href={`/events/${event.slug}`}
                  className="hover:text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600"
                >
                  {event.title}
                </Link>
              </h2>
              {event.summary && (
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{event.summary}</p>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100">
              <Link
                href={`/events/${event.slug}`}
                className="text-sm font-semibold text-amber-800 hover:text-amber-900 hover:underline"
              >
                Read full event →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
