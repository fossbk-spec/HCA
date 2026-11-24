"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-8 text-sm text-slate-600 sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} Human Civilization Atlas (Bản đồ Văn minh Nhân loại)</p>
        <p>
          {t(
            "Explore the stories, people, and ideas that shaped our world.",
            "Khám phá các nền văn minh, danh nhân, tác phẩm và tư tưởng định hình thế giới."
          )}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://vietnam-history-atlas.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-red-700 underline-offset-4 hover:underline flex items-center gap-1"
          >
            <span>🇻🇳</span> {t("Vietnamese History Atlas", "Bản đồ Lịch sử Việt Nam")}
          </a>
          <span className="text-slate-300">•</span>
          <Link href="/about" className="font-medium text-slate-900 underline-offset-4 hover:underline">
            {t("About", "Giới thiệu")}
          </Link>
          <Link href="/" className="font-medium text-slate-900 underline-offset-4 hover:underline">
            {t("Back to top", "Lên đầu trang")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
