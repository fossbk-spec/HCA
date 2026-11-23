"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { IdeaSummary } from "@/repositories/ideas";
import { useLanguage } from "@/context/LanguageContext";

export function FeaturedIdeaCard({ idea, index }: { idea: IdeaSummary; index: number }) {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const title = isVi && idea.titleVi ? idea.titleVi : idea.title;
  const originalTitle = isVi && idea.titleVi && idea.titleVi !== idea.title ? idea.title : null;
  const summary = isVi && idea.summaryVi ? idea.summaryVi : idea.summary;
  const category = isVi && idea.categoryVi ? idea.categoryVi : idea.category;

  return (
    <Link
      href={`/ideas/${idea.slug}`}
      className="group flex min-h-44 flex-col justify-between rounded-2xl border border-slate-200 bg-stone-50 p-5 transition-colors hover:border-amber-400 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
    >
      <div className="flex items-start justify-between">
        <BookOpen size={23} className="text-amber-700" aria-hidden="true" />
        <span className="text-xs font-semibold text-slate-400">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {originalTitle && <p className="text-xs text-slate-400 mt-0.5">{originalTitle}</p>}
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
          {summary ?? category ?? t("Explore this enduring idea", "Khám phá tư tưởng trường tồn này")}
        </p>
      </div>
      <ArrowRight size={17} className="mt-3 text-slate-400 group-hover:text-amber-700" aria-hidden="true" />
    </Link>
  );
}
