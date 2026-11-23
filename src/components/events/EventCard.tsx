"use client";

import Link from "next/link";
import { formatYear } from "@/lib/utils";
import type { Event } from "@/repositories/events";
import { useLanguage } from "@/context/LanguageContext";

export function EventCard({ event }: { event: Event }) {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const formatEventYears = (start: number | null, end: number | null): string => {
    const yearText = (y: number) => {
      if (!isVi) return formatYear(y);
      return y < 0 ? `${Math.abs(y)} TCN` : `${y} SCN`;
    };

    if (start === null && end === null) return t("Date unknown", "Chưa rõ thời gian");
    if (start !== null && end !== null && start === end) return yearText(start);
    if (start !== null && end !== null) return `${yearText(start)} – ${yearText(end)}`;
    if (start !== null) return isVi ? `Từ năm ${yearText(start)}` : `From ${formatYear(start)}`;
    return isVi ? `Đến năm ${yearText(end!)}` : `Until ${formatYear(end!)}`;
  };

  const title = isVi && event.titleVi ? event.titleVi : event.title;
  const originalTitle = isVi && event.titleVi && event.titleVi !== event.title ? event.title : null;
  const summary = isVi && event.summaryVi ? event.summaryVi : event.summary;

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md hover:border-amber-300">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
          {formatEventYears(event.startYear, event.endYear)}
        </p>
        <h2 className="mt-2 text-xl font-bold text-slate-900">
          <Link
            href={`/events/${event.slug}`}
            className="hover:text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600"
          >
            {title}
          </Link>
          {originalTitle && <span className="block text-xs font-normal text-slate-400 mt-0.5">{originalTitle}</span>}
        </h2>
        {summary && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{summary}</p>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-stone-100">
        <Link
          href={`/events/${event.slug}`}
          className="text-sm font-semibold text-amber-800 hover:text-amber-900 hover:underline"
        >
          {t("Read full event →", "Xem chi tiết sự kiện →")}
        </Link>
      </div>
    </article>
  );
}
