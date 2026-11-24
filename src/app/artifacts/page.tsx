import type { Metadata } from "next";
import { ArtifactsGallery } from "@/components/artifacts/ArtifactsGallery";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Archaeological Artifacts | Kho báu Cổ vật & Di tích Khảo cổ Thế giới",
  description:
    "Explore iconic archaeological treasures of human civilization—Ngọc Lũ bronze drum, Rosetta Stone, Hammurabi stele, Ashoka lion capital, Terracotta Army, Cyrus Cylinder, and Antikythera mechanism.",
};

export default function ArtifactsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        badgeEn="Archaeological Heritage"
        badgeVi="Di sản Khảo cổ học"
        titleEn="Masterpieces of Antiquity"
        titleVi="Kho báu Cổ vật & Hiện vật Khảo cổ"
        descriptionEn="Discover tangible physical treasures left by foundational civilizations—from sacred bronze drums and decipherment steles to imperial sculptures and ancient computers."
        descriptionVi="Khám phá những hiện vật hữu hình vô giá của các nền văn minh nhân loại—từ trống đồng Đông Sơn, phiến đá giải mã Rosetta đến tượng binh mã đất nung và cỗ máy tính cổ đại."
      />

      <div className="mt-8">
        <ArtifactsGallery />
      </div>
    </div>
  );
}
