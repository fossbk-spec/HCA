"use client";

import { useState } from "react";
import Link from "next/link";
import { formatYear } from "@/lib/utils";
import type { TimelineDetailItem } from "@/repositories/timeline";
import { useLanguage } from "@/context/LanguageContext";

export function TimelineExplorer({ items }: { items: TimelineDetailItem[] }) {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const [selectedKey, setSelectedKey] = useState(items[0] ? `${items[0].kind}-${items[0].slug}` : "");
  const selected = items.find((item) => `${item.kind}-${item.slug}` === selectedKey) ?? items[0];

  const formatYearText = (year: number) => {
    if (!isVi) return formatYear(year);
    return year < 0 ? `${Math.abs(year)} TCN` : `${year} SCN`;
  };

  const formatYears = (item: TimelineDetailItem): string => {
    if (item.endYear === null || item.endYear === item.year) return formatYearText(item.year);
    return `${formatYearText(item.year)} – ${formatYearText(item.endYear)}`;
  };

  if (!selected) {
    return <p className="text-slate-500">{t("No timeline entries in this epoch yet.", "Chưa có mục dòng thời gian nào trong kỷ nguyên này.")}</p>;
  }

  const selectedTitle = isVi && selected.titleVi ? selected.titleVi : selected.title;
  const selectedSummary = isVi && selected.summaryVi ? selected.summaryVi : selected.summary;
  const selectedKind = selected.kind === "event" ? t("Event", "Sự kiện") : t("Civilization", "Nền văn minh");

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto pb-4" role="region" aria-label={t("Timeline entries", "Các mục dòng thời gian")} tabIndex={0}>
        <ol className="flex min-w-max border-t border-amber-500 pt-8">
          {items.map((item) => {
            const key = `${item.kind}-${item.slug}`;
            const title = isVi && item.titleVi ? item.titleVi : item.title;
            const kindLabel = item.kind === "event" ? t("Event", "Sự kiện") : t("Civilization", "Nền văn minh");

            return (
              <li key={key} className="relative w-56 shrink-0 pr-4">
                <span className="absolute -top-[37px] left-3 size-3 rounded-full bg-amber-500" aria-hidden="true" />
                <button
                  type="button"
                  aria-pressed={key === `${selected.kind}-${selected.slug}`}
                  onClick={() => setSelectedKey(key)}
                  className="w-full rounded-lg border border-stone-200 bg-white p-4 text-left shadow-sm transition-colors hover:border-amber-500 focus-visible:outline-2 focus-visible:outline-amber-600 aria-pressed:border-amber-600 aria-pressed:bg-amber-50"
                >
                  <span className="block text-xs font-semibold text-amber-800">{formatYearText(item.year)}</span>
                  <span className="mt-2 block font-semibold text-slate-900">{title}</span>
                  <span className="mt-2 block text-xs capitalize text-slate-500">{kindLabel}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <section aria-live="polite" className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">{selectedKind}</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-900">{selectedTitle}</h3>
        <p className="mt-2 text-sm text-slate-600">{formatYears(selected)}</p>
        <p className="mt-4 text-slate-700 leading-relaxed">
          {selectedSummary ?? t("A detailed summary is being prepared.", "Bản tóm tắt chi tiết đang được cập nhật.")}
        </p>
        <Link
          href={selected.href}
          className="mt-5 inline-block font-semibold text-amber-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-amber-600"
        >
          {t(`Explore ${selected.kind} →`, `Khám phá ${selectedKind.toLowerCase()} →`)}
        </Link>
      </section>
    </div>
  );
}
