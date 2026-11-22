"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return <section className="mx-auto max-w-3xl px-6 py-16">
    <h1 className="text-2xl font-semibold">Something went wrong. Please try again later.</h1>
    <button type="button" onClick={reset} className="mt-6 rounded bg-slate-900 px-4 py-2 text-white">Try again</button>
  </section>;
}
