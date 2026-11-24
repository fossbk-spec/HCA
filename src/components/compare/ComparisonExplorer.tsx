"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PRESET_COMPARISONS, type ComparisonPair } from "@/lib/comparisons-data";
import {
  Scale,
  Sparkles,
  ArrowRight,
  BookOpen,
  Compass,
  MessageSquare,
  Layers,
  CheckCircle2,
} from "lucide-react";

export function ComparisonExplorer() {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const [selectedSlug, setSelectedSlug] = useState<string>(
    PRESET_COMPARISONS[0].slug
  );

  const activeComparison =
    PRESET_COMPARISONS.find((c) => c.slug === selectedSlug) ??
    PRESET_COMPARISONS[0];

  return (
    <div className="space-y-8">
      {/* Selector Pills */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
          <Scale size={16} />
          {t("Curated Comparative Studies", "Các Nghiên cứu Đối chiếu Tiêu biểu")}:
        </p>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {PRESET_COMPARISONS.map((comp) => {
            const isSelected = comp.slug === activeComparison.slug;
            return (
              <button
                key={comp.slug}
                type="button"
                onClick={() => setSelectedSlug(comp.slug)}
                className={`shrink-0 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-amber-800 text-white shadow-xs"
                    : "border border-stone-200 bg-stone-50 text-slate-700 hover:bg-stone-100"
                }`}
              >
                {isVi ? comp.titleVi : comp.titleEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Stage */}
      <section
        aria-live="polite"
        className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 space-y-8"
      >
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
              {t("Comparative Analysis", "Phân tích Đối chiếu")}
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {isVi ? activeComparison.titleVi : activeComparison.titleEn}
            </h2>
          </div>

          <Link
            href={`/chat`}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:bg-amber-600 transition-colors self-start sm:self-center"
          >
            <MessageSquare size={16} />
            <span>{t("AI Deep Comparison", "Hỏi AI So sánh Chuyên sâu")}</span>
          </Link>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="space-y-6">
          {activeComparison.aspects.map((aspect, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200/80 bg-stone-50/50 p-5 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-amber-800 text-white text-xs font-bold">
                  {idx + 1}
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  {isVi ? aspect.dimensionVi : aspect.dimensionEn}
                </h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Left Entity Card */}
                <div className="rounded-xl border border-amber-200/70 bg-white p-4 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-xs font-bold text-amber-900 uppercase">
                      {isVi
                        ? activeComparison.titleVi.split(" vs ")[0]
                        : activeComparison.titleEn.split(" vs ")[0]}
                    </span>
                    <Link
                      href={`/books/${activeComparison.leftSlug}`}
                      className="text-[11px] font-semibold text-amber-800 hover:underline flex items-center gap-1"
                    >
                      {t("View", "Xem")} →
                    </Link>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {isVi ? aspect.leftNoteVi : aspect.leftNoteEn}
                  </p>
                </div>

                {/* Right Entity Card */}
                <div className="rounded-xl border border-sky-200/70 bg-white p-4 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-xs font-bold text-sky-900 uppercase">
                      {isVi
                        ? activeComparison.titleVi.split(" vs ")[1]
                        : activeComparison.titleEn.split(" vs ")[1]}
                    </span>
                    <Link
                      href={`/books/${activeComparison.rightSlug}`}
                      className="text-[11px] font-semibold text-sky-800 hover:underline flex items-center gap-1"
                    >
                      {t("View", "Xem")} →
                    </Link>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {isVi ? aspect.rightNoteVi : aspect.rightNoteEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
