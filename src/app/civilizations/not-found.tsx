import Link from "next/link";

export default function CivilizationNotFound() {
  return <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold text-slate-900">Civilization not found</h1>
    <p className="mt-4 text-slate-600">This civilization is not in the atlas.</p>
    <Link href="/civilizations" className="mt-6 inline-block font-semibold text-amber-800 hover:underline">Browse civilizations</Link>
  </main>;
}
