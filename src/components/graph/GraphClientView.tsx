"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { GraphView } from "@/components/graph/GraphView";
import { RelationList } from "@/components/entity/RelationList";
import { entityHref } from "@/lib/routes";
import { PageHeader } from "@/components/layout/PageHeader";
import type { EgoGraph } from "@/services/graph";
import type { SearchType } from "@/repositories/search";

interface StarterGroup {
  groupEn: string;
  groupVi: string;
  items: Array<{
    type: SearchType;
    slug: string;
    titleEn: string;
    titleVi: string;
    descEn: string;
    descVi: string;
  }>;
}

export function GraphClientView({
  graph,
  notFound,
  starterGroups,
}: {
  graph: EgoGraph | null;
  notFound: boolean;
  starterGroups: StarterGroup[];
}) {
  const { language, t } = useLanguage();

  if (notFound) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <PageHeader
          badgeEn="Error"
          badgeVi="Lỗi"
          titleEn="Knowledge Object Not Found"
          titleVi="Không tìm thấy thực thể tri thức"
          descriptionEn="We couldn’t find that knowledge object. Check the type and slug, then try again."
          descriptionVi="Không tìm thấy thực thể tri thức này trong đồ thị. Vui lòng kiểm tra lại phân loại và định danh slug."
        />
        <div className="mt-8">
          <Link
            href="/graph"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-800 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-amber-900 transition-colors"
          >
            ← {t("Browse graph starters", "Duyệt danh sách đồ thị mẫu")}
          </Link>
        </div>
      </div>
    );
  }

  if (graph) {
    const centerTitle =
      language === "vi" && graph.center.titleVi ? graph.center.titleVi : graph.center.title;
    const hasViAlt = language === "vi" && graph.center.titleVi && graph.center.titleVi !== graph.center.title;

    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <div className="flex items-center gap-3">
            <Link
              href="/graph"
              className="text-xs font-semibold uppercase tracking-wider text-amber-800 hover:underline"
            >
              ← {t("Back to Graph Explorer", "Quay lại Khám phá Đồ thị")}
            </Link>
            <span className="text-stone-300">•</span>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">
              {t("One-hop neighbourhood", "Vùng lân cận liên kết trực tiếp")}
            </p>
          </div>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
            {centerTitle}
          </h1>
          {hasViAlt && (
            <p className="mt-1 text-sm font-medium italic text-stone-500">
              {graph.center.title}
            </p>
          )}
          <p className="mt-3 text-lg text-slate-600">
            {t(
              "Explore the people, events, ideas, books, and civilizations directly connected to this entity.",
              "Khám phá các nhân vật, sự kiện, tư tưởng, tác phẩm và nền văn minh kết nối trực tiếp với thực thể này."
            )}
          </p>
        </header>

        <div className="mt-8">
          <GraphView nodes={graph.nodes} edges={graph.edges} />
        </div>

        {graph.truncated && (
          <p className="mt-4 text-sm font-medium text-amber-800 bg-amber-50 rounded-lg p-3 border border-amber-200">
            {t(
              `Displaying top 40 of ${graph.totalNeighbours} connections for clarity. View entity page for full relationships.`,
              `Đang hiển thị 40 trong tổng số ${graph.totalNeighbours} liên kết để tối ưu hóa đồ thị trực quan. Xem trang chi tiết để có danh sách đầy đủ.`
            )}
          </p>
        )}

        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {t("Structured Connection Index", "Chỉ mục liên kết chi tiết")}
              </h2>
              <p className="text-sm text-slate-600">
                {t("Accessible text alternative for", "Bản liệt kê văn bản chi tiết cho")}{" "}
                <Link
                  href={entityHref(graph.center.type, graph.center.slug)}
                  className="font-bold text-amber-800 hover:underline"
                >
                  {centerTitle}
                </Link>
              </p>
            </div>
            <Link
              href={entityHref(graph.center.type, graph.center.slug)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-800/20 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
            >
              {t("View full profile", "Xem hồ sơ đầy đủ")} →
            </Link>
          </div>
          <RelationList relations={graph.relations} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">
          {t("Interactive Knowledge Graph", "Đồ thị tri thức tương tác")}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          {t("Atlas Connections Explorer", "Khám phá Mạng lưới Tri thức")}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          {t(
            "Traverse the interconnected web of human history. Select a curated landmark below or enter any entity to visualize its immediate network of influences, creations, and contemporaries.",
            "Khám phá mạng lưới liên kết của lịch sử văn minh nhân loại. Chọn một điểm khởi đầu tiêu biểu bên dưới hoặc nhấp vào bất kỳ đối tượng nào để trực quan hóa mạng lưới ảnh hưởng, sáng tác và bối cảnh đương thời."
          )}
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {starterGroups.map((group) => (
          <section key={group.groupEn} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                {t(group.groupEn, group.groupVi)}
              </h2>
              <div className="h-px flex-1 bg-stone-200" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <Link
                  key={`${item.type}:${item.slug}`}
                  href={`/graph?type=${item.type}&slug=${item.slug}`}
                  className="group flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-5 shadow-xs transition hover:border-amber-300 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                        {item.type}
                      </span>
                      <span className="text-xs text-stone-400 group-hover:text-amber-700 transition-colors">
                        {t("Inspect Graph →", "Xem đồ thị →")}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {language === "vi" ? item.titleVi : item.titleEn}
                    </h3>
                    {language === "vi" && item.titleVi !== item.titleEn && (
                      <p className="text-xs italic text-stone-500">{item.titleEn}</p>
                    )}
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {language === "vi" ? item.descVi : item.descEn}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
