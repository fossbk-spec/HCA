import Link from "next/link";

export default function PersonNotFound() {
  return <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold text-slate-900">Person not found</h1>
    <p className="mt-4 text-slate-600">We could not find that person.</p>
    <Link href="/people" className="mt-6 inline-block font-semibold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600">Explore people</Link>
  </main>;
}
