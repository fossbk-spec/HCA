"use client";

import Link from "next/link";
import { Compass, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const navigationItems = [
  { href: "/chat", en: "AI Guide", vi: "Trợ lý AI" },
  { href: "/map", en: "Map", vi: "Bản đồ" },
  { href: "/artifacts", en: "Artifacts", vi: "Cổ vật" },
  { href: "/timeline", en: "Timeline", vi: "Dòng thời gian" },
  { href: "/civilizations", en: "Civilizations", vi: "Nền văn minh" },
  { href: "/people", en: "People", vi: "Nhân vật" },
  { href: "/ideas", en: "Ideas", vi: "Tư tưởng" },
  { href: "/books", en: "Books", vi: "Tác phẩm" },
  { href: "/events", en: "Events", vi: "Sự kiện" },
  { href: "/graph", en: "Graph", vi: "Đồ thị" },
  { href: "/search", en: "Search", vi: "Tìm kiếm" },
] as const;

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-tight"
          aria-label={t("Human Civilization Atlas home", "Trang chủ Bản đồ Văn minh Nhân loại")}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/20">
            <Compass size={21} strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-base sm:text-lg">
              Human Civilization <span className="text-amber-400">Atlas</span>
            </span>
            <span className="text-[10px] font-normal tracking-wider text-slate-400 uppercase">
              {t("World History & Heritage", "Bản đồ Văn minh & Di sản Thế giới")}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav aria-label="Main navigation" className="flex max-w-full gap-0.5 overflow-x-auto text-xs sm:text-sm text-slate-300 sm:gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-lg px-2.5 py-1.5 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-amber-400"
              >
                {t(item.en, item.vi)}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center rounded-lg border border-white/15 bg-slate-900/80 p-0.5 text-xs font-semibold shadow-inner" role="group" aria-label="Language switcher">
            <button
              type="button"
              onClick={() => setLanguage("vi")}
              className={`flex items-center gap-1 rounded-md px-2 py-1 transition-all ${
                language === "vi"
                  ? "bg-amber-400 text-slate-950 shadow font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Tiếng Việt"
              aria-pressed={language === "vi"}
            >
              <span className="text-xs">🇻🇳</span> VI
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`flex items-center gap-1 rounded-md px-2 py-1 transition-all ${
                language === "en"
                  ? "bg-amber-400 text-slate-950 shadow font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
              title="English"
              aria-pressed={language === "en"}
            >
              <span className="text-xs">🇬🇧</span> EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
