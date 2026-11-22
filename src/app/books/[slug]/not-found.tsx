import Link from "next/link";

export default function BookNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Book not found</h1>
      <p className="mt-4 text-slate-600">The historical text or manuscript you requested could not be found.</p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/books"
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500"
        >
          View all books
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-stone-50"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
