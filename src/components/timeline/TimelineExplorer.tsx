"use client";

import { useState } from "react";
import Link from "next/link";
import { formatYear } from "@/lib/utils";
import type { TimelineDetailItem } from "@/repositories/timeline";
import { useLanguage } from "@/context/LanguageContext";
import { ZoomIn, ZoomOut, Check, ExternalLink } from "lucide-react";

export function TimelineExplorer({
  items,
  density = "normal",
}: {
  items: TimelineDetailItem[];
  density?: "compact" | "normal" | "spacious";
}) {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const [selectedKey, setSelectedKey] = useState(
    items[0] ? `${items[0].kind}-${items[0].slug}` : ""
  );
  const selected =
    items.find((item) => `${item.kind}-${item.slug}` === selectedKey) ?? items[0];

  const formatYearText = (year: number) => {
    if (!isVi) return formatYear(year);
    return year < 0 ? `${Math.abs(year).toLocaleString("vi-VN")} TCN` : `${year.toLocaleString("vi-VN")} SCN`;
  };

  const formatYears = (item: TimelineDetailItem): string => {
    if (item.endYear === null || item.endYear === item.year) {
      return formatYearText(item.year);
    }
    return `${formatYearText(item.year)} – ${formatYearText(item.endYear)}`;
  };

  if (!selected) {
    return (
      <div className="rounded-xl border border-stone-200 bg-stone-50 p-6 text-center text-stone-500">
        {t("No timeline entries matching the current filter in this epoch.", "Không có mục nào phù hợp với bộ lọc hiện tại trong kỷ nguyên này.")}
      </div>
    );
  }

  const selectedTitle = isVi && selected.titleVi ? selected.titleVi : selected.title;
  const selectedSummary = isVi && selected.summaryVi ? selected.summaryVi : selected.summary;
  const selectedKind =
    selected.kind === "event" ? t("Event", "Sự kiện") : t("Civilization", "Nền văn minh");

  // Dynamic card widths according to zoom density
  const cardWidthClass =
    density === "compact"
      ? "w-44 pr-3 text-xs"
      : density === "spacious"
      ? "w-72 pr-5 text-base"
      : "w-56 pr-4 text-sm";

  return (
    <div className="space-y-6">
      {/* Horizontal Milestone Ribbon */}
      <div
        className="overflow-x-auto pb-4 pt-2 scroll-smooth focus:outline-none"
        role="region"
        aria-label={t("Timeline entries", "Các mục dòng thời gian")}
        tabIndex={0}
      >
        <ol className="flex min-w-max border-t-2 border-amber-500 pt-7 relative">
          {items.map((item) => {
            const key = `${item.kind}-${item.slug}`;
            const isSelected = key === `${selected.kind}-${selected.slug}`;
            const title = isVi && item.titleVi ? item.titleVi : item.title;
            const kindLabel =
              item.kind === "event" ? t("Event", "Sự kiện") : t("Civilization", "Nền văn minh");

            return (
              <li key={key} className={`relative shrink-0 ${cardWidthClass}`}>
                {/* Visual node pin on timeline rail */}
                <span
                  className={`absolute -top-[36px] left-3 rounded-full transition-all ${
                    isSelected
                      ? "size-4 -top-[38px] bg-amber-600 ring-4 ring-amber-200"
                      : "size-3 bg-amber-500 hover:scale-125"
                  }`}
                  aria-hidden="true"
                />

                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedKey(key)}
                  className={`w-full rounded-xl border text-left transition-all ${
                    density === "compact" ? "p-3" : density === "spacious" ? "p-5" : "p-4"
                  } ${
                    isSelected
                      ? "border-amber-600 bg-amber-50/80 shadow-md ring-1 ring-amber-600/30 font-medium"
                      : "border-stone-200 bg-white hover:border-amber-400 hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="block text-xs font-bold text-amber-800 tracking-tight">
                      {formatYearText(item.year)}
                    </span>
                    <span
                      className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                        item.kind === "event"
                          ? "bg-sky-100 text-sky-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {item.kind === "event" ? t("Event", "Sự kiện") : t("Civ", "Văn minh")}
                    </span>
                  </div>

                  <span
                    className={`mt-2 block font-semibold text-slate-900 leading-snug line-clamp-2 ${
                      density === "compact" ? "text-xs" : density === "spacious" ? "text-base" : "text-sm"
                    }`}
                  >
                    {title}
                  </span>

                  {isVi && item.titleVi && item.titleVi !== item.title && density !== "compact" && (
                    <span className="mt-0.5 block text-[11px] text-stone-500 italic truncate">
                      {item.title}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Selected Milestone Inspection Card */}
      <section
        aria-live="polite"
        className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs relative overflow-hidden transition-all"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${
                selected.kind === "event"
                  ? "bg-sky-100 text-sky-900"
                  : "bg-emerald-100 text-emerald-900"
              }`}
            >
              {selectedKind}
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-sm font-semibold text-amber-800">{formatYears(selected)}</span>
          </div>

          <Link
            href={selected.href}
            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-800/20 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
          >
            {t(`Explore full profile`, `Khám phá hồ sơ đầy đủ`)}
            <ExternalLink size={14} />
          </Link>
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{selectedTitle}</h3>

        {isVi && selected.titleVi && selected.titleVi !== selected.title && (
          <p className="mt-0.5 text-sm italic text-stone-500">{selected.title}</p>
        )}

        <p className="mt-3 text-slate-700 leading-relaxed text-base">
          {selectedSummary ??
            t(
              "A detailed summary is being prepared for this historical milestone.",
              "Bản tóm tắt chi tiết đang được cập nhật cho cột mốc lịch sử này."
            )}
        </p>
      </section>
    </div>
  );
}
