"use client";

import Link from "next/link";
import { ArrowRight, Globe2 } from "lucide-react";
import { SearchBox } from "@/components/search/SearchBox";
import { useLanguage } from "@/context/LanguageContext";

export function HomeHero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(245,158,11,.18),transparent_35%),radial-gradient(circle_at_10%_90%,rgba(14,116,144,.22),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
          <Globe2 size={15} aria-hidden="true" />
          {t("A world of connected history", "Thế giới của lịch sử kết nối")}
        </div>
        <h1 className="max-w-4xl text-5xl font-bold leading-[1.07] tracking-tight sm:text-6xl lg:text-7xl">
          {t("Discover the story of", "Khám phá câu chuyện")}{" "}
          <span className="text-amber-400">
            {t("human civilization.", "văn minh nhân loại.")}
          </span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
          {t(
            "Travel across time and place. Explore the civilizations, people, books, and ideas that shaped the world we share.",
            "Du hành xuyên thời gian và không gian. Khám phá các nền văn minh, danh nhân, tác phẩm và tư tưởng đã định hình thế giới chúng ta đang sống."
          )}
        </p>
        <SearchBox className="mt-9 max-w-2xl" />
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-300">
          <Link href="/timeline" className="inline-flex items-center gap-2 hover:text-amber-300">
            {t("Explore the timeline", "Khám phá dòng thời gian")}{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/civilizations" className="inline-flex items-center gap-2 hover:text-amber-300">
            {t("Browse civilizations", "Xem các nền văn minh")}{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
