"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { LEARNING_TRACKS, type LearningTrack } from "@/lib/learning-paths-data";
import {
  Compass,
  Lightbulb,
  Atom,
  BookOpen,
  Landmark,
  Clock,
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Layers
} from "lucide-react";

const iconMap = {
  Compass,
  Lightbulb,
  Atom,
  BookOpen,
  Landmark
};

export function LearningPathsList() {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [completedStepsMap, setCompletedStepsMap] = useState<Record<string, number>>({});

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hca_learning_progress");
      if (saved) {
        const parsed = JSON.parse(saved);
        const counts: Record<string, number> = {};
        for (const track of LEARNING_TRACKS) {
          const completedInTrack = track.steps.filter(
            (s) => parsed[`${track.slug}_${s.id}`] === true
          ).length;
          counts[track.slug] = completedInTrack;
        }
        setCompletedStepsMap(counts);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const categories = [
    { id: "ALL", en: "All Tracks", vi: "Tất cả Lộ trình" },
    { id: "History", en: "History", vi: "Lịch sử Toàn cầu" },
    { id: "Philosophy", en: "Philosophy", vi: "Triết học & Thể chế" },
    { id: "Science", en: "Science", vi: "Khoa học & Tự nhiên" },
    { id: "Literature", en: "Literature", vi: "Văn chương & Sử thi" },
    { id: "Regional", en: "Regional", vi: "Di sản Bản địa" }
  ];

  const filteredTracks = LEARNING_TRACKS.filter((track) => {
    if (selectedCategory !== "ALL" && track.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {categories.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                active
                  ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {isVi ? cat.vi : cat.en}
            </button>
          );
        })}
      </div>

      {/* Track Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTracks.map((track) => {
          const Icon = iconMap[track.iconName] || Compass;
          const completedCount = completedStepsMap[track.slug] || 0;
          const totalSteps = track.steps.length;
          const progressPercent = Math.round((completedCount / totalSteps) * 100);

          return (
            <Link
              key={track.id}
              href={`/learn/${track.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:bg-white/10 hover:shadow-xl hover:shadow-amber-400/5"
            >
              {/* Header Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 transition-colors group-hover:bg-amber-400 group-hover:text-slate-950">
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300">
                    {isVi ? track.badgeVi : track.badgeEn}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-amber-400/90 uppercase">
                    {isVi ? track.categoryVi : track.category}
                  </span>
                  <h3 className="mt-1 font-serif text-lg font-bold text-white transition-colors group-hover:text-amber-400">
                    {isVi ? track.titleVi : track.titleEn}
                  </h3>
                </div>

                <p className="line-clamp-3 text-xs text-slate-400 leading-relaxed">
                  {isVi ? track.descriptionVi : track.descriptionEn}
                </p>
              </div>

              {/* Progress & Meta Footer */}
              <div className="mt-6 space-y-4 border-t border-white/10 pt-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-amber-400" />
                    <span>{track.estimatedHours} {isVi ? "giờ học" : "hours"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers size={14} className="text-amber-400" />
                    <span>{track.steps.length} {isVi ? "chặng" : "steps"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap size={14} className="text-amber-400" />
                    <span>{isVi ? track.difficultyVi : track.difficulty}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                    <span>{isVi ? "Tiến độ học tập" : "Progress"}</span>
                    <span className={progressPercent === 100 ? "text-emerald-400 font-bold" : "text-amber-400"}>
                      {completedCount}/{totalSteps} ({progressPercent}%)
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full transition-all duration-500 ${
                        progressPercent === 100 ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Call to action link */}
                <div className="flex items-center justify-between text-xs font-semibold text-amber-400 pt-1">
                  <span>{completedCount > 0 ? (isVi ? "Tiếp tục học" : "Continue Track") : (isVi ? "Bắt đầu lộ trình" : "Start Track")}</span>
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
