import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RelationList } from "@/components/entity/RelationList";
import { listIdeaSlugs } from "@/repositories/ideas";
import { getIdea } from "@/services/ideas";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listIdeaSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idea = await getIdea((await params).slug);
  if (!idea) return { title: "Idea not found" };
  return {
    title: `${idea.title} | Human Civilization Atlas`,
    description: idea.summary ?? `Explore the concept of ${idea.title}.`,
  };
}

export default async function IdeaPage({ params }: Props) {
  const idea = await getIdea((await params).slug);
  if (!idea) notFound();

  const paragraphs = idea.content?.split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean) ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/ideas"
        className="text-sm font-semibold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600"
      >
        ← Philosophical & Scientific Ideas
      </Link>
      <header className="mt-8 border-b border-stone-200 pb-8">
        {idea.category && (
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">{idea.category}</p>
        )}
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{idea.title}</h1>
      </header>

      {idea.summary && (
        <section aria-labelledby="overview-heading" className="mt-10">
          <h2 id="overview-heading" className="text-2xl font-bold text-slate-900">
            Overview
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-700">{idea.summary}</p>
        </section>
      )}

      {paragraphs.length > 0 && (
        <section aria-labelledby="discourse-heading" className="mt-10">
          <h2 id="discourse-heading" className="text-2xl font-bold text-slate-900">
            Philosophical & Historical Discourse
          </h2>
          <div className="mt-4 space-y-4 leading-8 text-slate-700">
            {paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </section>
      )}

      <RelationList relations={idea.relations} />

      <p className="mt-12 border-t border-stone-200 pt-6">
        <Link
          href="/timeline"
          className="font-semibold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600"
        >
          Explore the Timeline →
        </Link>
      </p>
    </div>
  );
}
