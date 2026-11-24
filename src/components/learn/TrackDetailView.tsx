"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { LearningTrack, LearningStep } from "@/lib/learning-paths-data";
import {
  Compass,
  Lightbulb,
  Atom,
  BookOpen,
  Landmark,
  CheckCircle2,
  Circle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Layers,
  GraduationCap,
  Clock,
  RotateCcw
} from "lucide-react";

const iconMap = {
  Compass,
  Lightbulb,
  Atom,
  BookOpen,
  Landmark
};

interface TrackDetailViewProps {
  track: LearningTrack;
}

export function TrackDetailView({ track }: TrackDetailViewProps) {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const currentStep: LearningStep = track.steps[activeStepIndex] || track.steps[0];
  const Icon = iconMap[track.iconName] || Compass;

  // Load completed steps from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hca_learning_progress");
      if (saved) {
        setCompletedSteps(JSON.parse(saved));
      }
    } catch {
      // Ignore errors
    }
  }, []);

  // Reset quiz state when switching steps
  useEffect(() => {
    setSelectedOption(null);
    setQuizSubmitted(false);
  }, [activeStepIndex]);

  const isStepCompleted = (stepId: string) => {
    return !!completedSteps[`${track.slug}_${stepId}`];
  };

  const markStepComplete = (stepId: string) => {
    const updated = {
      ...completedSteps,
      [`${track.slug}_${stepId}`]: true
    };
    setCompletedSteps(updated);
    try {
      localStorage.setItem("hca_learning_progress", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleQuizAnswer = (index: number) => {
    if (quizSubmitted) return;
    setSelectedOption(index);
    setQuizSubmitted(true);
    if (index === currentStep.quiz.correctIndex) {
      markStepComplete(currentStep.id);
    }
  };

  const completedCount = track.steps.filter((s) => isStepCompleted(s.id)).length;
  const progressPercent = Math.round((completedCount / track.steps.length) * 100);

  const entityTypeRoutes: Record<string, string> = {
    civilization: "/civilizations",
    person: "/people",
    idea: "/ideas",
    book: "/books",
    event: "/events",
    artifact: "/artifacts"
  };

  return (
    <div className="space-y-8">
      {/* Top Track Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/learn"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={13} />
                <span>{isVi ? "Tất cả lộ trình" : "All tracks"}</span>
              </Link>
              <span className="text-slate-600">/</span>
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300">
                {isVi ? track.categoryVi : track.category}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300">
                {isVi ? track.badgeVi : track.badgeEn}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {isVi ? track.titleVi : track.titleEn}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {isVi ? track.descriptionVi : track.descriptionEn}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Clock size={15} className="text-amber-400" />
                <span>{track.estimatedHours} {isVi ? "giờ học" : "hours"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers size={15} className="text-amber-400" />
                <span>{track.steps.length} {isVi ? "chặng kiến thức" : "learning stages"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap size={15} className="text-amber-400" />
                <span>{isVi ? track.difficultyVi : track.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Overall Track Progress Radial / Box */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 text-center min-w-[170px]">
            <span className="text-xs font-medium text-slate-400">{isVi ? "Hoàn thành" : "Completion"}</span>
            <span className="text-3xl font-extrabold text-amber-400 font-mono mt-0.5">
              {progressPercent}%
            </span>
            <span className="text-xs text-slate-400 mt-1">
              {completedCount} / {track.steps.length} {isVi ? "chặng" : "steps"}
            </span>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full transition-all duration-500 ${
                  progressPercent === 100 ? "bg-emerald-400" : "bg-amber-400"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace: Left Stepper Navigation + Right Step Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Left Column: Stepper Menu (4 cols) */}
        <aside className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {isVi ? "Các chặng học tập" : "Curriculum Steps"}
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              {activeStepIndex + 1}/{track.steps.length}
            </span>
          </div>

          <div className="space-y-2">
            {track.steps.map((step, idx) => {
              const active = idx === activeStepIndex;
              const completed = isStepCompleted(step.id);

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`w-full flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                    active
                      ? "border-amber-400 bg-amber-400/10 shadow-md ring-1 ring-amber-400/20"
                      : "border-white/5 bg-slate-900/50 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {completed ? (
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    ) : (
                      <span
                        className={`flex size-5 items-center justify-center rounded-full text-[11px] font-bold ${
                          active
                            ? "bg-amber-400 text-slate-950"
                            : "bg-white/10 text-slate-400"
                        }`}
                      >
                        {step.stepNumber}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold text-amber-400/80 block uppercase tracking-wider">
                      {isVi ? step.epochVi : step.epochEn}
                    </span>
                    <p
                      className={`text-xs sm:text-sm font-semibold leading-tight line-clamp-2 ${
                        active ? "text-white font-bold" : "text-slate-300"
                      }`}
                    >
                      {isVi ? step.titleVi : step.titleEn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Active Step Detail (8 cols) */}
        <main className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 shadow-md space-y-6">
            
            {/* Step Header */}
            <div className="space-y-2 border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-xs font-bold text-amber-400">
                  {isVi ? `Chặng ${currentStep.stepNumber}` : `Step ${currentStep.stepNumber}`}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {isVi ? currentStep.epochVi : currentStep.epochEn}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {isVi ? currentStep.titleVi : currentStep.titleEn}
              </h2>
            </div>

            {/* Step Summary Content */}
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm sm:text-base space-y-4">
              <p>{isVi ? currentStep.summaryVi : currentStep.summaryEn}</p>
            </div>

            {/* Core Takeaway Callout Box */}
            <div className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-slate-950 font-bold">
                  💡
                </span>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    {isVi ? "Ý nghĩa Cốt lõi & Bài học Lịch sử" : "Core Takeaway"}
                  </h4>
                  <p className="text-sm font-medium text-amber-100 leading-relaxed">
                    {isVi ? currentStep.coreTakeawayVi : currentStep.coreTakeawayEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Entities from Atlas */}
            {currentStep.relatedEntities.length > 0 && (
              <div className="space-y-3 border-t border-white/10 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <ExternalLink size={13} className="text-amber-400" />
                  <span>{isVi ? "Thực thể liên quan trong Bản đồ Tri thức" : "Atlas Knowledge Connections"}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentStep.relatedEntities.map((entity) => {
                    const route = entityTypeRoutes[entity.type] || "/";
                    const href = entity.type === "artifact" ? "/artifacts" : `${route}/${entity.slug}`;

                    return (
                      <Link
                        key={`${entity.type}-${entity.slug}`}
                        href={href}
                        className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-2.5 text-xs transition-colors hover:border-amber-400 hover:bg-white/10"
                      >
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-slate-300 group-hover:text-amber-300">
                            {entity.type}
                          </span>
                          <span className="font-semibold text-white group-hover:text-amber-400">
                            {isVi ? entity.nameVi : entity.nameEn}
                          </span>
                        </div>
                        <ExternalLink size={12} className="text-slate-500 group-hover:text-amber-400" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Micro-Quiz Knowledge Check */}
            <div className="rounded-xl border border-white/15 bg-slate-950/70 p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <HelpCircle size={16} />
                <span>{isVi ? "Câu hỏi Kiểm tra Tri thức (Micro-Quiz)" : "Knowledge Check"}</span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-white">
                {isVi ? currentStep.quiz.questionVi : currentStep.quiz.questionEn}
              </p>

              <div className="space-y-2">
                {(isVi ? currentStep.quiz.optionsVi : currentStep.quiz.optionsEn).map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentStep.quiz.correctIndex;

                  let optionStyle = "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20";
                  if (quizSubmitted) {
                    if (isCorrect) {
                      optionStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-200 font-semibold ring-1 ring-emerald-500";
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "border-rose-500 bg-rose-500/20 text-rose-200 line-through";
                    }
                  } else if (isSelected) {
                    optionStyle = "border-amber-400 bg-amber-400/20 text-amber-300 font-semibold";
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={quizSubmitted}
                      onClick={() => handleQuizAnswer(idx)}
                      className={`w-full flex items-center justify-between rounded-lg border p-3 text-left text-xs sm:text-sm transition-all ${optionStyle}`}
                    >
                      <span>{option}</span>
                      {quizSubmitted && isCorrect && (
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {quizSubmitted && (
                <div
                  className={`rounded-lg border p-3.5 text-xs sm:text-sm animate-fade-in ${
                    selectedOption === currentStep.quiz.correctIndex
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                      : "border-amber-500/40 bg-amber-500/10 text-amber-200"
                  }`}
                >
                  <p className="font-bold">
                    {selectedOption === currentStep.quiz.correctIndex
                      ? (isVi ? "✓ Chính xác! Bạn đã ghi nhớ chặng này." : "✓ Correct! Step mastered.")
                      : (isVi ? "Chưa chuẩn xác. Hãy cùng xem lý giải dưới đây:" : "Not quite. Here is the explanation:")}
                  </p>
                  <p className="mt-1 text-slate-300">
                    {isVi ? currentStep.quiz.explanationVi : currentStep.quiz.explanationEn}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Buttons: Previous / Next Step */}
            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <button
                type="button"
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ArrowLeft size={14} />
                <span>{isVi ? "Chặng trước" : "Previous Step"}</span>
              </button>

              <div className="flex items-center gap-2">
                {!isStepCompleted(currentStep.id) && (
                  <button
                    type="button"
                    onClick={() => markStepComplete(currentStep.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
                  >
                    <CheckCircle2 size={14} />
                    <span>{isVi ? "Đánh dấu hoàn thành" : "Mark as Completed"}</span>
                  </button>
                )}

                {activeStepIndex < track.steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex((prev) => Math.min(track.steps.length - 1, prev + 1))}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-amber-400/20 hover:bg-amber-300 transition-all"
                  >
                    <span>{isVi ? "Chặng kế tiếp" : "Next Step"}</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <Link
                    href="/learn"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-400 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-emerald-400/20 hover:bg-emerald-300 transition-all"
                  >
                    <span>{isVi ? "Hoàn thành Lộ trình" : "Finish Track"}</span>
                    <Sparkles size={14} />
                  </Link>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
