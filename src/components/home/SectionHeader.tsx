"use client";

import Link from "next/link";
import { ArrowRight, MoveRight, Lightbulb } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function SectionHeader({
  badgeEn,
  badgeVi,
  titleEn,
  titleVi,
  subtitleEn,
  subtitleVi,
  linkHref,
  linkTextEn,
  linkTextVi,
  icon,
  dark = false,
}: {
  badgeEn: string;
  badgeVi: string;
  titleEn: string;
  titleVi: string;
  subtitleEn: string;
  subtitleVi: string;
  linkHref: string;
  linkTextEn: string;
  linkTextVi: string;
  icon?: React.ReactNode;
  dark?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p
          className={`mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] ${
            dark ? "text-amber-400" : "text-amber-700"
          }`}
        >
          {icon}
          {t(badgeEn, badgeVi)}
        </p>
        <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>
          {t(titleEn, titleVi)}
        </h2>
        <p className={`mt-3 ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {t(subtitleEn, subtitleVi)}
        </p>
      </div>
      <Link
        href={linkHref}
        className={`inline-flex items-center gap-2 text-sm font-semibold ${
          dark
            ? "text-amber-300 hover:text-amber-200"
            : "text-amber-800 hover:underline"
        }`}
      >
        {t(linkTextEn, linkTextVi)}
        {dark ? <MoveRight size={17} aria-hidden="true" /> : <ArrowRight size={17} aria-hidden="true" />}
      </Link>
    </div>
  );
}
