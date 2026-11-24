"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { CIVILIZATION_MAP_DATA, type CivilizationMapItem } from "@/lib/map-data";
import {
  MapPin,
  Globe2,
  ExternalLink,
  Layers,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function WorldMapExplorer() {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const [selectedSlug, setSelectedSlug] = useState<string>("vietnam");
  const selected =
    CIVILIZATION_MAP_DATA.find((item) => item.slug === selectedSlug) ??
    CIVILIZATION_MAP_DATA[0];

  return (
    <div className="space-y-8">
      {/* Interactive SVG World Map Viewport */}
      <div className="relative overflow-hidden rounded-3xl border border-stone-800 bg-slate-950 p-4 shadow-2xl sm:p-6">
        {/* Header HUD inside map */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-stone-300 uppercase tracking-widest text-[11px]">
              {t("Global Civilization Geographic Coordinate Grid", "Hệ thống Tọa độ Địa lý Các Nền Văn minh Cổ đại")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-stone-400 font-mono text-[11px]">
            <span>10 {t("Cradles of Civilization", "Cái nôi Văn minh")}</span>
            <span>•</span>
            <span className="text-amber-400">Equirectangular Proj</span>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800/60">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:5%_10%] opacity-20 pointer-events-none" />

          {/* Equator & Prime Meridian Guide Lines */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-sky-500/20 border-t border-dashed border-sky-400/30" />
          <div className="absolute top-0 left-1/2 h-full w-[1px] bg-amber-500/20 border-l border-dashed border-amber-400/30" />

          {/* Continent Background Vector Silhouettes */}
          <svg
            viewBox="0 0 1000 500"
            className="absolute inset-0 h-full w-full opacity-25 pointer-events-none fill-slate-700"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* North America */}
            <path d="M120 70 Q180 50 250 80 Q320 120 300 200 Q260 250 200 260 Q180 230 140 180 Z" />
            {/* Central America */}
            <path d="M210 260 Q260 290 280 340 Q250 340 210 280 Z" />
            {/* South America */}
            <path d="M280 340 Q380 360 360 460 Q320 490 290 440 Q270 380 280 340 Z" />
            {/* Europe */}
            <path d="M470 90 Q580 80 580 160 Q520 200 480 180 Q450 140 470 90 Z" />
            {/* Africa */}
            <path d="M480 200 Q580 210 600 320 Q560 450 510 440 Q470 340 480 200 Z" />
            {/* Asia */}
            <path d="M580 70 Q850 60 880 220 Q820 330 700 280 Q620 220 580 160 Z" />
            {/* Southeast Asia & Maritime */}
            <path d="M760 270 Q840 280 840 370 Q790 380 760 310 Z" />
            {/* Australia */}
            <path d="M790 390 Q890 390 880 470 Q810 480 790 420 Z" />
          </svg>

          {/* Interactive Civilization Pins */}
          {CIVILIZATION_MAP_DATA.map((civ) => {
            const isSelected = civ.slug === selected.slug;
            const isVietnam = civ.slug === "vietnam";

            return (
              <div
                key={civ.slug}
                style={{
                  left: `${civ.coord.xPercent}%`,
                  top: `${civ.coord.yPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
              >
                {/* Sonar Pulsing Ring for Selected/Vietnam */}
                {isSelected && (
                  <span className="absolute -inset-3 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />
                )}

                <button
                  type="button"
                  onClick={() => setSelectedSlug(civ.slug)}
                  className={`relative flex items-center justify-center rounded-full transition-all transform hover:scale-125 focus:outline-none ${
                    isSelected
                      ? "size-8 bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/50 ring-4 ring-amber-300/30 font-bold scale-110"
                      : isVietnam
                      ? "size-7 bg-red-600 text-amber-300 shadow-md ring-2 ring-amber-400/80 hover:bg-red-500"
                      : "size-6 bg-slate-800 text-amber-400 border border-amber-400/50 hover:bg-amber-400 hover:text-slate-950"
                  }`}
                  aria-label={`${civ.nameVi} (${civ.name})`}
                >
                  <MapPin size={isSelected ? 16 : 13} />
                </button>

                {/* Pin Tooltip Card */}
                <div
                  className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold shadow-lg transition-opacity duration-200 z-30 ${
                    isSelected
                      ? "bg-amber-400 text-slate-950 opacity-100"
                      : "bg-slate-900/90 text-stone-200 border border-slate-700 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {isVi ? civ.nameVi : civ.name}
                  {isVietnam && " 🇻🇳"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Civilization Jump Chips */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {CIVILIZATION_MAP_DATA.map((civ) => {
            const isSelected = civ.slug === selected.slug;
            const isVietnam = civ.slug === "vietnam";

            return (
              <button
                key={civ.slug}
                type="button"
                onClick={() => setSelectedSlug(civ.slug)}
                className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 font-bold shadow-sm"
                    : isVietnam
                    ? "border border-red-500/50 bg-red-950/40 text-red-200 hover:bg-red-900/40"
                    : "border border-slate-800 bg-slate-900/80 text-stone-400 hover:bg-slate-800 hover:text-stone-200"
                }`}
              >
                {isVietnam && "🇻🇳 "}
                {isVi ? civ.nameVi : civ.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Civilization Geographic Dossier */}
      <section
        aria-live="polite"
        className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
                {isVi ? selected.regionVi : selected.region}
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-sm font-semibold text-slate-600">
                {selected.periodLabel}
              </span>
              {selected.slug === "vietnam" && (
                <span className="rounded-full bg-red-100 text-red-800 px-2 py-0.5 text-xs font-bold">
                  🇻🇳 Featured
                </span>
              )}
            </div>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {isVi ? selected.nameVi : selected.name}
            </h2>
            {isVi && selected.nameVi !== selected.name && (
              <p className="mt-0.5 text-sm italic text-stone-500">{selected.name}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/civilizations/${selected.slug}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-800 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-amber-900 transition-colors"
            >
              <BookOpen size={16} />
              {t("Explore Civilization Dossier", "Xem Hồ sơ Nền văn minh")}
              <ArrowRight size={14} />
            </Link>

            <Link
              href={`/graph?type=CIVILIZATION&slug=${selected.slug}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-stone-100 transition-colors"
            >
              <Layers size={16} />
              {t("Inspect Knowledge Graph", "Khảo sát Đồ thị tri thức")}
            </Link>
          </div>
        </div>

        {/* Geographic & Archaeological Highlights */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-stone-100 bg-stone-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
              {t("Geographic Focal Basin", "Lưu vực Địa lý Trọng tâm")}
            </p>
            <p className="mt-2 font-semibold text-slate-900 text-base">
              {isVi ? selected.focalRiverOrCenterVi : selected.focalRiverOrCenter}
            </p>
            <p className="mt-1 text-xs text-stone-500 font-mono">
              Lat {selected.coord.lat}° N, Lng {selected.coord.lng}° E
            </p>
          </div>

          <div className="rounded-2xl border border-stone-100 bg-stone-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
              {t("Historical Centers / Capitals", "Thành bang & Kinh đô Tiêu biểu")}
            </p>
            <p className="mt-2 font-semibold text-slate-900 text-base">
              {isVi ? selected.capitalOrCenterVi : selected.capitalOrCenter}
            </p>
            <p className="mt-1 text-xs text-stone-500">
              {t("Ancient political & religious hubs", "Trung tâm chính trị và tín ngưỡng cổ đại")}
            </p>
          </div>

          <div className="rounded-2xl border border-stone-100 bg-stone-50 p-5 sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
              {t("Civilizational Innovations", "Di sản & Phát minh Tiêu biểu")}
            </p>
            <ul className="mt-2 space-y-1">
              {(isVi ? selected.keyContributionsVi : selected.keyContributions).map(
                (item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <span className="size-1.5 rounded-full bg-amber-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Special Vietnamese History Atlas Sister Project Banner */}
        {selected.slug === "vietnam" && (
          <div className="mt-8 rounded-2xl border-2 border-red-200 bg-gradient-to-r from-red-50 via-amber-50 to-red-50 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇻🇳</span>
                  <h3 className="text-lg font-bold text-red-950">
                    {t(
                      "Dedicated Sister Project: Vietnamese History Atlas",
                      "Dự án Chuyên đề Song hành: Vietnamese History Atlas"
                    )}
                  </h3>
                </div>
                <p className="text-sm text-slate-700 max-w-2xl leading-relaxed">
                  {t(
                    "Explore an in-depth, dedicated interactive atlas of Vietnamese history across millennia—featuring comprehensive historical cartography, royal dynasties, territorial expansions, and heroic anti-invasion campaigns.",
                    "Khám phá dự án chuyên khảo sâu sắc về dòng chảy 4.000 năm lịch sử Việt Nam—từ thời Hồng Bàng, dựng nước Văn Lang - Âu Lạc, các triều đại hưng thịnh Lý, Trần, Lê, Nguyễn đến các chiến công hiển hách bảo vệ chủ quyền non sông."
                  )}
                </p>
              </div>

              <a
                href="https://vietnam-history-atlas.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-red-800 transition-colors"
              >
                <span>{t("Launch Vietnamese History Atlas", "Mở Vietnamese History Atlas")}</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
