"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TimelineExplorer } from "@/components/timeline/TimelineExplorer";
import { EpochSectionHeader } from "@/components/timeline/EpochSectionHeader";
import type { TimelineGroup } from "@/services/timeline";
import type { CivilizationSummary } from "@/repositories/civilizations";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  Globe2,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

type DensityMode = "compact" | "normal" | "spacious";
type KindFilter = "ALL" | "event" | "civilization";

export function TimelineInteractiveContainer({
  groups,
  civilizations,
}: {
  groups: TimelineGroup[];
  civilizations: CivilizationSummary[];
}) {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  // Filter states
  const [selectedEpochId, setSelectedEpochId] = useState<string>("ALL");
  const [selectedCivilization, setSelectedCivilization] = useState<string>("ALL");
  const [kindFilter, setKindFilter] = useState<KindFilter>("ALL");
  const [density, setDensity] = useState<DensityMode>("normal");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Map civilizations by slug for easy lookup
  const civMap = useMemo(() => {
    const map = new Map<string, CivilizationSummary>();
    civilizations.forEach((c) => map.set(c.slug, c));
    return map;
  }, [civilizations]);

  // Compute filtered groups and items
  const filteredGroups = useMemo(() => {
    return groups
      .filter((group) => {
        if (selectedEpochId === "ALL") return true;
        return group.epoch.id === selectedEpochId;
      })
      .map((group) => {
        const filteredItems = group.items.filter((item) => {
          // Kind filter
          if (kindFilter !== "ALL" && item.kind !== kindFilter) return false;

          // Civilization filter
          if (selectedCivilization !== "ALL") {
            if (item.kind === "civilization" && item.slug !== selectedCivilization) {
              return false;
            }
            if (
              item.kind === "event" &&
              item.civilizationSlug !== selectedCivilization
            ) {
              return false;
            }
          }

          // Search keyword query
          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            const titleMatch = item.title.toLowerCase().includes(query);
            const titleViMatch = item.titleVi?.toLowerCase().includes(query) ?? false;
            const summaryMatch = item.summary?.toLowerCase().includes(query) ?? false;
            const summaryViMatch = item.summaryVi?.toLowerCase().includes(query) ?? false;
            if (!titleMatch && !titleViMatch && !summaryMatch && !summaryViMatch) {
              return false;
            }
          }

          return true;
        });

        return {
          ...group,
          items: filteredItems,
        };
      });
  }, [groups, selectedEpochId, selectedCivilization, kindFilter, searchQuery]);

  // Total count of matching timeline items
  const totalVisibleItems = useMemo(() => {
    return filteredGroups.reduce((acc, g) => acc + g.items.length, 0);
  }, [filteredGroups]);

  // Handle Zoom In / Zoom Out
  const zoomIn = () => {
    if (density === "compact") setDensity("normal");
    else if (density === "normal") setDensity("spacious");
  };

  const zoomOut = () => {
    if (density === "spacious") setDensity("normal");
    else if (density === "normal") setDensity("compact");
  };

  const resetFilters = () => {
    setSelectedEpochId("ALL");
    setSelectedCivilization("ALL");
    setKindFilter("ALL");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedEpochId !== "ALL" ||
    selectedCivilization !== "ALL" ||
    kindFilter !== "ALL" ||
    searchQuery.trim() !== "";

  return (
    <div className="space-y-8">
      {/* Interactive Control & Filter Panel */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
        {/* Top Controls: Zoom Density, Kind, Search */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-1 flex items-center gap-1">
              <Filter size={14} />
              {t("Type", "Loại")}:
            </span>
            {(
              [
                { id: "ALL", labelEn: "All Types", labelVi: "Tất cả" },
                { id: "event", labelEn: "Events", labelVi: "Sự kiện" },
                { id: "civilization", labelEn: "Civilizations", labelVi: "Văn minh" },
              ] as const
            ).map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setKindFilter(k.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  kindFilter === k.id
                    ? "bg-amber-800 text-white shadow-xs"
                    : "border border-stone-200 bg-stone-50 text-slate-700 hover:bg-stone-100"
                }`}
              >
                {t(k.labelEn, k.labelVi)}
              </button>
            ))}
          </div>

          {/* Zoom Density Toolbar */}
          <div className="flex items-center gap-2 border-stone-200 bg-stone-50 p-1 rounded-xl border">
            <span className="text-xs font-semibold text-stone-500 px-2 flex items-center gap-1">
              <Maximize2 size={13} />
              {t("Scale", "Mức xem")}:
            </span>
            <button
              type="button"
              onClick={zoomOut}
              disabled={density === "compact"}
              title={t("Zoom Out (Compact)", "Thu nhỏ (Gọn)")}
              className={`rounded-lg p-1.5 transition-colors ${
                density === "compact"
                  ? "text-stone-300 cursor-not-allowed"
                  : "text-stone-700 hover:bg-stone-200"
              }`}
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-xs font-bold text-amber-900 capitalize px-1">
              {density === "compact"
                ? t("Compact", "Gọn")
                : density === "normal"
                ? t("Normal", "Chuẩn")
                : t("Spacious", "Rộng")}
            </span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={density === "spacious"}
              title={t("Zoom In (Spacious)", "Phóng to (Chi tiết)")}
              className={`rounded-lg p-1.5 transition-colors ${
                density === "spacious"
                  ? "text-stone-300 cursor-not-allowed"
                  : "text-stone-700 hover:bg-stone-200"
              }`}
            >
              <ZoomIn size={16} />
            </button>
          </div>
        </div>

        {/* Civilizations Dropdown & Epoch Quick Pills */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-stone-100 items-center">
          {/* Civilization Select */}
          <div className="md:col-span-5 flex items-center gap-2">
            <Globe2 size={16} className="text-amber-800 shrink-0" />
            <label htmlFor="civ-filter" className="sr-only">
              {t("Filter by Civilization", "Lọc theo Nền văn minh")}
            </label>
            <select
              id="civ-filter"
              value={selectedCivilization}
              onChange={(e) => setSelectedCivilization(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-xs focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
            >
              <option value="ALL">
                🌍 {t("All Civilizations (10 civilizations)", "Tất cả các nền văn minh (10 nền văn minh)")}
              </option>
              {civilizations.map((civ) => (
                <option key={civ.slug} value={civ.slug}>
                  {isVi && civ.nameVi ? civ.nameVi : civ.name} (
                  {civ.periodStart
                    ? civ.periodStart < 0
                      ? `${Math.abs(civ.periodStart)} TCN`
                      : `${civ.periodStart} SCN`
                    : ""}{" "}
                  –{" "}
                  {civ.periodEnd
                    ? civ.periodEnd < 0
                      ? `${Math.abs(civ.periodEnd)} TCN`
                      : `${civ.periodEnd} SCN`
                    : t("Present", "Nay")}
                  )
                </option>
              ))}
            </select>
          </div>

          {/* Search Query Input */}
          <div className="md:col-span-5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t(
                "Filter timeline milestones by keyword...",
                "Lọc cột mốc theo từ khóa..."
              )}
              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-xs placeholder:text-stone-400 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
          </div>

          {/* Reset button if active */}
          <div className="md:col-span-2 flex justify-end">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-amber-800 hover:text-amber-900 underline"
              >
                {t("Reset filters", "Xóa bộ lọc")}
              </button>
            )}
          </div>
        </div>

        {/* Quick Epoch Selector Navigation Bar */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-2 shrink-0 flex items-center gap-1">
              <Layers size={14} />
              {t("Epoch", "Kỷ nguyên")}:
            </span>
            <button
              type="button"
              onClick={() => setSelectedEpochId("ALL")}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedEpochId === "ALL"
                  ? "bg-amber-800 text-white shadow-xs"
                  : "border border-stone-200 bg-stone-50 text-slate-700 hover:bg-stone-100"
              }`}
            >
              {t("All Epochs (9 phases)", "Tất cả kỷ nguyên (9 giai đoạn)")}
            </button>
            {groups.map(({ epoch, items }) => {
              const isSelected = selectedEpochId === epoch.id;
              const epochName = isVi ? epoch.labelVi : epoch.label;
              return (
                <button
                  key={epoch.id}
                  type="button"
                  onClick={() => setSelectedEpochId(epoch.id)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-amber-800 text-white shadow-xs"
                      : "border border-stone-200 bg-stone-50 text-slate-700 hover:bg-stone-100"
                  }`}
                >
                  {epochName} ({items.length})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary of matching items */}
      <div className="flex items-center justify-between text-sm text-stone-600 px-1">
        <p>
          {t("Showing", "Đang hiển thị")}{" "}
          <span className="font-bold text-slate-900">{totalVisibleItems}</span>{" "}
          {t("historical milestones across human history", "cột mốc lịch sử")}
          {selectedCivilization !== "ALL" && (
            <span>
              {" "}
              {t("belonging to", "thuộc")}{" "}
              <strong className="text-amber-800">
                {civMap.get(selectedCivilization)?.nameVi ??
                  civMap.get(selectedCivilization)?.name}
              </strong>
            </span>
          )}
          {selectedEpochId !== "ALL" && (
            <span>
              {" "}
              • {t("Epoch", "Kỷ nguyên")}:{" "}
              <strong className="text-amber-800">
                {groups.find((g) => g.epoch.id === selectedEpochId)?.epoch[
                  isVi ? "labelVi" : "label"
                ]}
              </strong>
            </span>
          )}
        </p>

        {hasActiveFilters && (
          <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-medium">
            {t("Filtered view active", "Đang áp dụng bộ lọc")}
          </span>
        )}
      </div>

      {/* Epoch Sections */}
      <div className="space-y-16">
        {filteredGroups.map(({ epoch, items }) => (
          <section
            key={epoch.id}
            id={epoch.id}
            aria-labelledby={`${epoch.id}-heading`}
            className="scroll-mt-8"
          >
            <EpochSectionHeader epoch={epoch} />
            {items.length > 0 ? (
              <TimelineExplorer items={items} density={density} />
            ) : (
              <div className="rounded-xl border border-dashed border-stone-300 p-8 text-center bg-stone-50/50">
                <p className="text-sm text-stone-500">
                  {hasActiveFilters
                    ? t(
                        "No events or civilizations in this epoch match your active filter criteria.",
                        "Không có sự kiện hay nền văn minh nào trong kỷ nguyên này khớp với bộ lọc đã chọn."
                      )
                    : t(
                        "No entries recorded for this phase yet.",
                        "Chưa có mục nào được ghi nhận cho giai đoạn này."
                      )}
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-3 text-xs font-semibold text-amber-800 hover:underline"
                  >
                    {t("Reset all filters", "Đặt lại tất cả bộ lọc")}
                  </button>
                )}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
