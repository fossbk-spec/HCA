"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export interface BilingualEntityDetailProps {
  backHref: string;
  backTextEn: string;
  backTextVi: string;
  tagEn?: string | null;
  tagVi?: string | null;
  titleEn: string;
  titleVi?: string | null;
  subtitleEn?: React.ReactNode;
  subtitleVi?: React.ReactNode;
  summaryEn?: string | null;
  summaryVi?: string | null;
  contentEn?: string | null;
  contentVi?: string | null;
  overviewHeadingEn?: string;
  overviewHeadingVi?: string;
  contentHeadingEn?: string;
  contentHeadingVi?: string;
  children?: React.ReactNode;
}

export function BilingualEntityDetail({
  backHref,
  backTextEn,
  backTextVi,
  tagEn,
  tagVi,
  titleEn,
  titleVi,
  subtitleEn,
  subtitleVi,
  summaryEn,
  summaryVi,
  contentEn,
  contentVi,
  overviewHeadingEn = "Overview",
  overviewHeadingVi = "Tổng quan",
  contentHeadingEn = "Detailed Narrative & Historical Significance",
  contentHeadingVi = "Nội dung & Ý nghĩa Lịch sử Chi tiết",
  children,
}: BilingualEntityDetailProps) {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const currentTitle = isVi && titleVi ? titleVi : titleEn;
  const originalTitle = isVi && titleVi && titleVi !== titleEn ? titleEn : null;
  const currentTag = isVi && tagVi ? tagVi : tagEn;
  const currentSubtitle = isVi && subtitleVi ? subtitleVi : subtitleEn;
  const currentSummary = isVi && summaryVi ? summaryVi : summaryEn;
  const currentContent = isVi && contentVi ? contentVi : contentEn;

  const paragraphs =
    currentContent
      ?.split(/\n\s*\n/)
      .map((text) => text.trim())
      .filter(Boolean) ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600"
      >
        ← {t(backTextEn, backTextVi)}
      </Link>

      <header className="mt-8 border-b border-stone-200 pb-8">
        {currentTag && (
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">
            {currentTag}
          </p>
        )}
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          {currentTitle}
        </h1>
        {originalTitle && (
          <p className="mt-1 text-sm font-normal text-slate-500">
            {t("Original title:", "Tên nguyên bản:")} <span className="font-medium text-slate-700">{originalTitle}</span>
          </p>
        )}
        {currentSubtitle && (
          <div className="mt-4 text-base text-slate-600">
            {currentSubtitle}
          </div>
        )}
      </header>

      {currentSummary && (
        <section aria-labelledby="overview-heading" className="mt-10">
          <h2 id="overview-heading" className="text-2xl font-bold text-slate-900">
            {t(overviewHeadingEn, overviewHeadingVi)}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            {currentSummary}
          </p>
        </section>
      )}

      {paragraphs.length > 0 && (
        <section aria-labelledby="narrative-heading" className="mt-10">
          <h2 id="narrative-heading" className="text-2xl font-bold text-slate-900">
            {t(contentHeadingEn, contentHeadingVi)}
          </h2>
          <div className="mt-4 space-y-4 leading-8 text-slate-700">
            {paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </section>
      )}

      {children}

      <p className="mt-12 border-t border-stone-200 pt-6">
        <Link
          href="/timeline"
          className="font-semibold text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600"
        >
          {t("Explore the Timeline →", "Khám phá Dòng thời gian →")}
        </Link>
      </p>
    </div>
  );
}
