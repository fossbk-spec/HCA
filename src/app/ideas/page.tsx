import type { Metadata } from "next";
import Link from "next/link";
import { listIdeasByCategory } from "@/services/ideas";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ideas & Worldviews | Human Civilization Atlas",
  description: "Explore the core philosophical, scientific, and political ideas that transformed human civilization.",
};

export default async function IdeasPage() {
  const categories = await listIdeasByCategory();
  const totalCount = categories.reduce((sum, g) => sum + g.ideas.length, 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-b border-stone-200 pb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">Intellectual Heritage</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Ideas That Shaped Humanity</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Discover {totalCount} foundational concepts across philosophy, ethics, statecraft, cosmology, and mathematics
          that shaped human thought across millennia.
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {categories.map((group) => (
          <section key={group.category} aria-labelledby={`cat-${group.category}`}>
            <h2 id={`cat-${group.category}`} className="text-2xl font-bold text-slate-900 border-l-4 border-amber-600 pl-3">
              {group.category}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.ideas.map((idea) => (
                <article
                  key={idea.slug}
                  className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      <Link
                        href={`/ideas/${idea.slug}`}
                        className="hover:text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600"
                      >
                        {idea.title}
                      </Link>
                    </h3>
                    {idea.summary && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{idea.summary}</p>
                    )}
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-100">
                    <Link
                      href={`/ideas/${idea.slug}`}
                      className="text-sm font-semibold text-amber-800 hover:text-amber-900 hover:underline"
                    >
                      Explore idea →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
