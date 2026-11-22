import Link from "next/link";

export default function IdeaNotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Idea not found</h1>
      <p className="mt-4 text-slate-600">The philosophical concept or scientific theory you requested could not be found.</p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/ideas"
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500"
        >
          View all ideas
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-stone-50"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
