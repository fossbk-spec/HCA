import type { Metadata } from "next";
import { LearningPathsList } from "@/components/learn/LearningPathsList";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Learning Paths | Lộ trình Khám phá Tri thức & Lịch sử Văn minh Nhân loại",
  description:
    "Curated, step-by-step learning tracks guiding you through the grand story of humanity, the evolution of philosophy and democracy, the history of science, world epics, and Vietnamese heritage.",
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        badgeEn="Curated Learning Tracks"
        badgeVi="Lộ trình Học tập Toàn diện"
        titleEn="Journeys Across Human Civilization"
        titleVi="Lộ trình Khám phá Tri thức & Văn minh Nhân loại"
        descriptionEn="Follow structured, sequential learning paths through history, science, philosophy, world epics, and national heritage—accompanied by micro-quizzes and direct knowledge graph connections."
        descriptionVi="Theo bước các lộ trình học tập mạch lạc, có cấu trúc dẫn dắt xuyên suốt lịch sử, khoa học, tư tưởng, sử thi thế giới và di sản dân tộc—tích hợp câu hỏi kiểm tra tri thức và liên kết bản đồ thực thể."
      />

      <div className="mt-8">
        <LearningPathsList />
      </div>
    </div>
  );
}
