import type { Metadata } from "next";
import Link from "next/link";
import { formatYear } from "@/lib/utils";
import { listAllBooks } from "@/services/books";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Classic Books & Manuscripts | Human Civilization Atlas",
  description: "Browse the seminal books, legal codes, epics, and philosophical treatises of human civilization.",
};

export default async function BooksPage() {
  const books = await listAllBooks();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-b border-stone-200 pb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">Knowledge & Literature</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Classic Books & Treatises</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Discover {books.length} transformative texts—from ancient legal codes and sacred scriptures to revolutionary
          scientific works and national epics.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <article
            key={book.slug}
            className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                {book.publicationYear !== null ? `c. ${formatYear(book.publicationYear)}` : "Ancient Era"}
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                <Link
                  href={`/books/${book.slug}`}
                  className="hover:text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600"
                >
                  {book.title}
                </Link>
              </h2>
              {book.author && <p className="mt-1 text-sm font-medium text-slate-600">By {book.author}</p>}
              {book.summary && (
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{book.summary}</p>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100">
              <Link
                href={`/books/${book.slug}`}
                className="text-sm font-semibold text-amber-800 hover:text-amber-900 hover:underline"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
