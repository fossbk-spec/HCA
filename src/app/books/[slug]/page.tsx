import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RelationList } from "@/components/entity/RelationList";
import { formatYear } from "@/lib/utils";
import { listBookSlugs } from "@/repositories/books";
import { getBook } from "@/services/books";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listBookSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBook((await params).slug);
  if (!book) return { title: "Book not found" };
  return {
    title: `${book.title} | Human Civilization Atlas`,
    description: book.summary ?? `Explore the classic work ${book.title}.`,
  };
}

export default async function BookPage({ params }: Props) {
  const book = await getBook((await params).slug);
  if (!book) notFound();

  const paragraphs = book.content?.split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean) ?? [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/books"
        className="text-sm font-semibold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600"
      >
        ← Classic Books
      </Link>
      <header className="mt-8 border-b border-stone-200 pb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">
          {book.publicationYear !== null ? `Published c. ${formatYear(book.publicationYear)}` : "Classic Work"}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{book.title}</h1>
        {book.author && (
          <p className="mt-4 text-lg font-medium text-slate-700">
            Author: <span className="text-amber-900">{book.author}</span>
          </p>
        )}
      </header>

      {book.summary && (
        <section aria-labelledby="overview-heading" className="mt-10">
          <h2 id="overview-heading" className="text-2xl font-bold text-slate-900">
            Overview
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-700">{book.summary}</p>
        </section>
      )}

      {paragraphs.length > 0 && (
        <section aria-labelledby="content-heading" className="mt-10">
          <h2 id="content-heading" className="text-2xl font-bold text-slate-900">
            Content and Historical Significance
          </h2>
          <div className="mt-4 space-y-4 leading-8 text-slate-700">
            {paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </section>
      )}

      <RelationList relations={book.relations} />

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
