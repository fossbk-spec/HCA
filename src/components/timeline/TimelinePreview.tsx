"use client";

import Link from "next/link";
import type { TimelineItem } from "@/repositories/timeline";
import { useLanguage } from "@/context/LanguageContext";

export function TimelinePreview({ items }: { items: TimelineItem[] }) {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const formatYearText = (year: number) => {
    if (!isVi) {
      return year < 0 ? `${Math.abs(year).toLocaleString("en-US")} BCE` : `${year.toLocaleString("en-US")} CE`;
    }
    return year < 0 ? `${Math.abs(year).toLocaleString("vi-VN")} TCN` : `${year.toLocaleString("vi-VN")} SCN`;
  };

  return (
    <div className="relative overflow-x-auto pb-4" role="region" aria-label={t("Timeline preview", "Xem trước dòng thời gian")} tabIndex={0}>
      <ol className="flex min-w-max border-t border-amber-500/50 pt-8">
        {items.map((item) => {
          const title = isVi && item.titleVi ? item.titleVi : item.title;
          const kindLabel = item.kind === "event" ? t("Event", "Sự kiện") : t("Civilization", "Nền văn minh");
          return (
            <li key={`${item.kind}-${item.slug}`} className="relative w-48 shrink-0 pr-5 sm:w-56">
              <span className="absolute -top-[38px] left-0 size-4 rounded-full border-4 border-slate-900 bg-amber-400" aria-hidden="true" />
              <Link href={item.href} className="group block rounded-xl px-3 py-3 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-amber-400">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">{formatYearText(item.year)}</span>
                <span className="mt-2 block text-base font-semibold text-white group-hover:text-amber-300">{title}</span>
                <span className="mt-1 block text-xs text-slate-400">
                  {kindLabel}
                  {item.endYear !== null ? ` · ${t("until", "đến")} ${formatYearText(item.endYear)}` : ""}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      {items.length === 0 && <p className="text-slate-300">{t("Timeline entries are being prepared.", "Dữ liệu dòng thời gian đang được cập nhật.")}</p>}
    </div>
  );
}
