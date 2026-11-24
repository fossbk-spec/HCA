import type { Metadata } from "next";
import { ComparisonExplorer } from "@/components/compare/ComparisonExplorer";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Historical Comparisons | So sánh Đối chiếu Lịch sử Song song",
  description:
    "Cross-civilization comparative studies examining world epics (Dam San vs Gilgamesh, Mahabharata vs Iliad) and legendary thinkers (Confucius vs Socrates, Tran Hung Dao vs Sun Tzu).",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        badgeEn="Comparative Historiography"
        badgeVi="Sử học Đối chiếu"
        titleEn="Cross-Civilization Comparisons"
        titleVi="So sánh Đối chiếu Lịch sử Song song"
        descriptionEn="Examine humanity's greatest epics, foundational thinkers, and military doctrines side by side to reveal universal human quests, contrasting worldviews, and enduring legacies."
        descriptionVi="Đặt các bản đại sử thi vĩ đại, nhà tư tưởng kiệt xuất và học thuyết quân sự cạnh nhau để làm sáng tỏ khát vọng nhân loại, sự đa dạng thế giới quan và di sản trường tồn."
      />

      <div className="mt-8">
        <ComparisonExplorer />
      </div>
    </div>
  );
}
