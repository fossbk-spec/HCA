import type { Metadata } from "next";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { listIdeasByCategory } from "@/services/ideas";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ideas & Worldviews | Tư tưởng & Thế giới quan",
  description: "Explore the core philosophical, scientific, and political ideas that transformed human civilization.",
};

export default async function IdeasPage() {
  const categories = await listIdeasByCategory();
  const totalCount = categories.reduce((sum, g) => sum + g.ideas.length, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        badgeEn="Intellectual Heritage"
        badgeVi="Di sản Trí tuệ"
        titleEn="Ideas That Shaped Humanity"
        titleVi="Những Tư tưởng Định hình Nhân loại"
        descriptionEn={`Discover ${totalCount} foundational concepts across philosophy, ethics, statecraft, cosmology, and mathematics.`}
        descriptionVi={`Khám phá ${totalCount} tư tưởng nền tảng xuyên suốt triết học, đạo đức học, nghệ thuật trị quốc, vũ trụ quan và toán học.`}
      />

      <div className="mt-12 space-y-12">
        {categories.map((group) => (
          <section key={group.category} aria-labelledby={`cat-${group.category}`}>
            <h2 id={`cat-${group.category}`} className="text-2xl font-bold text-slate-900 border-l-4 border-amber-600 pl-3">
              {group.category}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.ideas.map((idea) => (
                <IdeaCard key={idea.slug} idea={idea} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
