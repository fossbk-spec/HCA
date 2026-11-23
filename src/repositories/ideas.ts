import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { withDatabase } from "@/lib/seed-fallback";
import { featuredIdeaSlugs, pickBySlugs } from "@/lib/featured";

export type Idea = {
  slug: string;
  title: string;
  titleVi: string | null;
  category: string | null;
  categoryVi: string | null;
  summary: string | null;
  summaryVi: string | null;
  content: string | null;
  contentVi: string | null;
};

export type IdeaSummary = Omit<Idea, "content" | "contentVi">;

type SeedIdea = Idea;

async function seedIdeas(): Promise<Idea[]> {
  const file = path.join(process.cwd(), "data", "seed", "ideas.json");
  const raw = JSON.parse(await readFile(file, "utf8")) as SeedIdea[];
  return raw.map((i) => ({
    slug: i.slug,
    title: i.title,
    titleVi: i.titleVi ?? null,
    category: i.category ?? null,
    categoryVi: i.categoryVi ?? null,
    summary: i.summary ?? null,
    summaryVi: i.summaryVi ?? null,
    content: i.content ?? null,
    contentVi: i.contentVi ?? null,
  }));
}

function sortIdeas(ideas: Idea[]): Idea[] {
  return ideas.sort((a, b) => a.title.localeCompare(b.title));
}

const ideaSelect = {
  slug: true,
  title: true,
  titleVi: true,
  category: true,
  categoryVi: true,
  summary: true,
  summaryVi: true,
  content: true,
  contentVi: true,
} as const;

export async function listFeaturedIdeas(): Promise<IdeaSummary[]> {
  return withDatabase("ideas.featured", async () => {
      const rows = await prisma.idea.findMany({
        where: { slug: { in: [...featuredIdeaSlugs] } },
        select: {
          slug: true,
          title: true,
          titleVi: true,
          category: true,
          categoryVi: true,
          summary: true,
          summaryVi: true,
        },
      });
      return pickBySlugs(rows, featuredIdeaSlugs);
  }, async () => pickBySlugs(await seedIdeas(), featuredIdeaSlugs));
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
