"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ARTIFACTS_DATA, type Artifact } from "@/lib/artifacts-data";
import {
  Compass,
  MapPin,
  Calendar,
  Building2,
  Sparkles,
  ExternalLink,
  Layers,
  Filter,
  Search,
  ShieldAlert,
} from "lucide-react";

export function ArtifactsGallery() {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const [selectedCivilization, setSelectedCivilization] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeArtifactSlug, setActiveArtifactSlug] = useState<string>(
    ARTIFACTS_DATA[0].slug
  );

  // Filtered artifacts
  const filteredArtifacts = useMemo(() => {
    return ARTIFACTS_DATA.filter((art) => {
      if (
        selectedCivilization !== "ALL" &&
        art.civilizationSlug !== selectedCivilization
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = art.title.toLowerCase().includes(q);
        const titleViMatch = art.titleVi.toLowerCase().includes(q);
        const summaryMatch = art.summary.toLowerCase().includes(q);
        const summaryViMatch = art.summaryVi.toLowerCase().includes(q);
        const materialMatch = art.material.toLowerCase().includes(q);
        const materialViMatch = art.materialVi.toLowerCase().includes(q);
        if (
          !titleMatch &&
          !titleViMatch &&
          !summaryMatch &&
          !summaryViMatch &&
          !materialMatch &&
          !materialViMatch
        ) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCivilization, searchQuery]);

  const activeArtifact =
    filteredArtifacts.find((a) => a.slug === activeArtifactSlug) ??
    filteredArtifacts[0] ??
    ARTIFACTS_DATA[0];

  // Distinct civilizations with artifacts
  const civilizationsWithArtifacts = useMemo(() => {
    const map = new Map<string, { slug: string; name: string; nameVi: string }>();
    ARTIFACTS_DATA.forEach((a) => {
      if (!map.has(a.civilizationSlug)) {
        map.set(a.civilizationSlug, {
          slug: a.civilizationSlug,
          name: a.civilizationName,
          nameVi: a.civilizationNameVi,
        });
      }
    });
    return Array.from(map.values());
  }, []);

  return (
    <div className="space-y-8">
      {/* Filtering Toolbar */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t(
                "Search artifacts by name, material, or keyword...",
                "Tìm kiếm cổ vật theo tên, chất liệu, từ khóa..."
              )}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 pl-10 pr-4 py-2 text-sm text-slate-800 placeholder:text-stone-400 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
          </div>

          {/* Counter Badge */}
          <div className="text-xs font-semibold text-stone-500 flex items-center gap-1.5 self-end sm:self-center">
            <span className="flex size-2 rounded-full bg-amber-500" />
            <span>
              {t("Displaying", "Đang hiển thị")}:{" "}
              <strong className="text-slate-900 font-bold">
                {filteredArtifacts.length}
              </strong>{" "}
              {t("masterpieces", "bảo vật khảo cổ")}
            </span>
          </div>
        </div>

        {/* Civilization Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={() => setSelectedCivilization("ALL")}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCivilization === "ALL"
                ? "bg-amber-800 text-white shadow-xs"
                : "border border-stone-200 bg-stone-50 text-slate-700 hover:bg-stone-100"
            }`}
          >
            {t("All Civilizations", "Tất cả Nền văn minh")}
          </button>
          {civilizationsWithArtifacts.map((civ) => (
            <button
              key={civ.slug}
              type="button"
              onClick={() => setSelectedCivilization(civ.slug)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedCivilization === civ.slug
                  ? "bg-amber-800 text-white shadow-xs"
                  : "border border-stone-200 bg-stone-50 text-slate-700 hover:bg-stone-100"
              }`}
            >
              {civ.slug === "vietnam" && "🇻🇳 "}
              {isVi ? civ.nameVi : civ.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Showcase Stage: Featured Detail Card + Artifact Grid */}
      {activeArtifact && (
        <section
          aria-live="polite"
          className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 space-y-6"
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
                  {isVi ? activeArtifact.iconTagVi : activeArtifact.iconTag}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs font-semibold text-slate-600">
                  {isVi
                    ? activeArtifact.civilizationNameVi
                    : activeArtifact.civilizationName}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs font-mono font-medium text-amber-800">
                  {activeArtifact.periodLabel}
                </span>
              </div>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {isVi ? activeArtifact.titleVi : activeArtifact.title}
              </h2>
              {isVi && activeArtifact.titleVi !== activeArtifact.title && (
                <p className="mt-1 text-sm italic text-stone-500">
                  {activeArtifact.title}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/civilizations/${activeArtifact.civilizationSlug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-stone-50 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-stone-100 transition-colors"
              >
                <Compass size={14} />
                {t("Civilization Profile", "Hồ sơ Văn minh")}
              </Link>

              <Link
                href="/map"
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-800 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-amber-900 transition-colors"
              >
                <MapPin size={14} />
                {t("Locate on Map", "Định vị trên Bản đồ")}
              </Link>
            </div>
          </div>

          {/* Description & Historical Significance */}
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  {t("Archaeological Description", "Mô tả Khảo cổ học")}
                </h3>
                <p className="mt-2 text-base text-slate-700 leading-relaxed">
                  {isVi ? activeArtifact.summaryVi : activeArtifact.summary}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200/60 bg-amber-50/60 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  {t("Civilizational Significance", "Ý nghĩa Văn minh & Di sản")}
                </h3>
                <p className="mt-1.5 text-sm text-amber-950 leading-relaxed font-medium">
                  {isVi ? activeArtifact.significanceVi : activeArtifact.significance}
                </p>
              </div>
            </div>

            <div className="md:col-span-5 space-y-3">
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5">
                <span className="block text-[11px] font-bold uppercase text-stone-500">
                  {t("Material & Craftsmanship", "Chất liệu & Kỹ nghệ")}
                </span>
                <span className="mt-1 block font-semibold text-slate-900 text-sm">
                  {isVi ? activeArtifact.materialVi : activeArtifact.material}
                </span>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5">
                <span className="block text-[11px] font-bold uppercase text-stone-500">
                  {t("Discovery Site / Provenance", "Địa điểm Khai quật & Xuất xứ")}
                </span>
                <span className="mt-1 block font-semibold text-slate-900 text-sm">
                  {isVi ? activeArtifact.discoverySiteVi : activeArtifact.discoverySite}
                </span>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5">
                <span className="block text-[11px] font-bold uppercase text-stone-500">
                  {t("Current Repository", "Nơi lưu giữ Hiện vật")}
                </span>
                <span className="mt-1 block font-semibold text-slate-900 text-sm">
                  {isVi
                    ? activeArtifact.currentLocationVi
                    : activeArtifact.currentLocation}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of All Artifact Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Layers size={20} className="text-amber-800" />
          {t("Masterpieces Gallery", "Bộ sưu tập Bảo vật Khảo cổ Thế giới")}
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArtifacts.map((art) => {
            const isSelected = art.slug === activeArtifact.slug;
            const isVietnam = art.civilizationSlug === "vietnam";

            return (
              <button
                key={art.slug}
                type="button"
                onClick={() => setActiveArtifactSlug(art.slug)}
                className={`group flex flex-col justify-between rounded-2xl border text-left p-5 transition-all shadow-xs ${
                  isSelected
                    ? "border-amber-600 bg-amber-50/70 ring-2 ring-amber-600/30 shadow-md"
                    : isVietnam
                    ? "border-red-200 bg-white hover:border-red-400 hover:shadow-md"
                    : "border-stone-200 bg-white hover:border-amber-300 hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isVietnam
                          ? "bg-red-100 text-red-800"
                          : "bg-stone-100 text-stone-700"
                      }`}
                    >
                      {isVietnam && "🇻🇳 "}
                      {isVi ? art.iconTagVi : art.iconTag}
                    </span>
                    <span className="text-xs font-semibold text-amber-800">
                      {art.periodLabel}
                    </span>
                  </div>

                  <h4 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                    {isVi ? art.titleVi : art.title}
                  </h4>

                  {isVi && art.titleVi !== art.title && (
                    <p className="text-xs text-stone-500 italic truncate mt-0.5">
                      {art.title}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {isVi ? art.summaryVi : art.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="truncate">
                    {isVi ? art.civilizationNameVi : art.civilizationName}
                  </span>
                  <span className="text-amber-800 font-semibold group-hover:underline shrink-0">
                    {t("Inspect →", "Chiêm ngưỡng →")}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
