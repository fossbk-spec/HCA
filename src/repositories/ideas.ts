import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

export type IdeaSummary = {
  slug: string;
  title: string;
  category: string | null;
  summary: string | null;
};

async function seedIdeas(): Promise<IdeaSummary[]> {
  const file = path.join(process.cwd(), "data", "seed", "ideas.json");
  const rows = JSON.parse(await readFile(file, "utf8")) as Array<Partial<IdeaSummary> & Pick<IdeaSummary, "slug" | "title">>;
  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    category: row.category ?? null,
    summary: row.summary ?? null,
  }));
}

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
  return (await seedIdeas()).slice(0, limit);
}
