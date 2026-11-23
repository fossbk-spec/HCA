import type { Metadata } from "next";
import { CivilizationCard } from "@/components/civilization/CivilizationCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { listCivilizations } from "@/services/civilizations";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Civilization Atlas | Bản đồ Nền văn minh",
  description: "Explore civilizations across regions and eras of human history. Khám phá các nền văn minh qua các khu vực và thời đại.",
};

export default async function CivilizationsPage() {
  const groups = await listCivilizations();
  let index = 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        badgeEn="Explore history"
        badgeVi="Khám phá lịch sử"
        titleEn="Civilization Atlas"
        titleVi="Bản đồ các Nền văn minh"
        descriptionEn="Discover the societies, people, and ideas that shaped our world."
        descriptionVi="Khám phá các xã hội, danh nhân và tư tưởng vĩ đại đã định hình thế giới của chúng ta."
      />
      <div className="mt-12 space-y-14">
        {groups.map(({ region, civilizations }, groupIndex) => (
          <section key={region} aria-labelledby={`region-${groupIndex}`}>
            <h2 id={`region-${groupIndex}`} className="mb-6 text-2xl font-bold text-slate-900 border-l-4 border-amber-500 pl-3">
              {region}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {civilizations.map((civilization) => (
                <CivilizationCard key={civilization.slug} civilization={civilization} index={index++} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
