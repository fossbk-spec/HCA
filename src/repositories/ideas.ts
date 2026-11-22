import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

export type Idea = {
  slug: string;
  title: string;
  category: string | null;
  summary: string | null;
  content: string | null;
};

export type IdeaSummary = Omit<Idea, "content">;

type SeedIdea = Idea;

async function seedIdeas(): Promise<Idea[]> {
  const file = path.join(process.cwd(), "data", "seed", "ideas.json");
  const raw = JSON.parse(await readFile(file, "utf8")) as SeedIdea[];
  return raw.map((i) => ({
    slug: i.slug,
    title: i.title,
    category: i.category ?? null,
    summary: i.summary ?? null,
    content: i.content ?? null,
  }));
}

function sortIdeas(ideas: Idea[]): Idea[] {
  return ideas.sort((a, b) => a.title.localeCompare(b.title));
}

const ideaSelect = {
  slug: true,
  title: true,
  category: true,
  summary: true,
  content: true,
} as const;

export async function listFeaturedIdeas(limit = 5): Promise<IdeaSummary[]> {
  if (process.env.DATABASE_URL) {
    try {
      return await prisma.idea.findMany({
        take: limit,
        orderBy: { createdAt: "asc" },
        select: { slug: true, title: true, category: true, summary: true },
      });
    } catch (error) {
      console.warn("Idea query failed; using seed data.", error);
    }
  }
  const all = await seedIdeas();
  return all.slice(0, limit).map(({ slug, title, category, summary }) => ({ slug, title, category, summary }));
}

export async function listIdeas(): Promise<Idea[]> {
  if (process.env.DATABASE_URL) {
    try {
      return sortIdeas(await prisma.idea.findMany({ select: ideaSelect }));
    } catch (error) {
      console.warn("Ideas query failed; using seed data.", error);
    }
  }
  return sortIdeas(await seedIdeas());
}

export async function getIdeaBySlug(slug: string): Promise<Idea | null> {
  if (process.env.DATABASE_URL) {
    try {
      return await prisma.idea.findUnique({ where: { slug }, select: ideaSelect });
    } catch (error) {
      console.warn("Idea query failed; using seed data.", error);
    }
  }
  return (await seedIdeas()).find((i) => i.slug === slug) ?? null;
}

export async function listIdeaSlugs(): Promise<string[]> {
  if (process.env.DATABASE_URL) {
    try {
      const rows = await prisma.idea.findMany({ select: { slug: true }, orderBy: { slug: "asc" } });
      return rows.map(({ slug }) => slug);
    } catch (error) {
      console.warn("Idea slugs query failed; using seed data.", error);
    }
  }
  return (await seedIdeas()).map(({ slug }) => slug).sort();
}
