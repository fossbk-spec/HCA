import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { withDatabase } from "@/lib/seed-fallback";

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
  return withDatabase("ideas.featured", () => prisma.idea.findMany({
        take: limit,
        orderBy: { createdAt: "asc" },
        select: { slug: true, title: true, category: true, summary: true },
      }), async () => {
  const all = await seedIdeas();
  return all.slice(0, limit).map(({ slug, title, category, summary }) => ({ slug, title, category, summary }));
  });
}

export async function listIdeas(): Promise<Idea[]> {
  return withDatabase("ideas.list", async () => sortIdeas(await prisma.idea.findMany({ select: ideaSelect })),
    async () => sortIdeas(await seedIdeas()));
}

export async function getIdeaBySlug(slug: string): Promise<Idea | null> {
  return withDatabase("ideas.detail", () => prisma.idea.findUnique({ where: { slug }, select: ideaSelect }),
    async () => (await seedIdeas()).find((i) => i.slug === slug) ?? null);
}

export async function listIdeaSlugs(): Promise<string[]> {
  return withDatabase("ideas.slugs", async () => {
      const rows = await prisma.idea.findMany({ select: { slug: true }, orderBy: { slug: "asc" } });
      return rows.map(({ slug }) => slug);
  }, async () => (await seedIdeas()).map(({ slug }) => slug).sort());
}
