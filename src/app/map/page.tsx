import type { Metadata } from "next";
import { WorldMapExplorer } from "@/components/map/WorldMapExplorer";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Civilization Map | Bản đồ Địa lý Văn minh Thế giới",
  description:
    "Interactive geographic atlas mapping the cradles of human civilizations—Mesopotamia, Egypt, Greece, Rome, China, India, Đại Việt, Persia, Islam, and Maya.",
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        badgeEn="Geographic Cartography"
        badgeVi="Địa lý & Bản đồ học"
        titleEn="Civilization Atlas Map"
        titleVi="Bản đồ Địa lý Các Nền Văn minh"
        descriptionEn="Explore the geographic cradles, fertile river basins, and ancient capitals where humanity's foundational civilizations took root and flourished."
        descriptionVi="Khám phá các lưu vực sông màu mỡ, cao nguyên trù phú và kinh đô cổ kính nơi các nền văn minh nền tảng của nhân loại đâm chồi và tỏa sáng."
      />

      <div className="mt-8">
        <WorldMapExplorer />
      </div>
    </div>
  );
}
