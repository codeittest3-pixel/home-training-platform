import React from "react";
import { Workout } from "../types";

interface RecommendScreenProps {
  workout: Workout;
  onStart: () => void;
  onNavigateToRecords: () => void;
  onNavigateToSettings: () => void;
}

export default function RecommendScreen({
  workout,
  onStart,
  onNavigateToRecords,
  onNavigateToSettings
}: RecommendScreenProps) {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col pb-24 md:pb-8">
      {/* TopAppBar */}
      <header className="bg-surface text-primary font-headline-md text-headline-md docked full-width top-0 bg-surface flat no-shadows flex justify-between items-center px-container-margin-mobile md:px-container-margin-desktop h-16 w-full sticky z-40 max-w-[1200px] mx-auto">
        <div className="font-extrabold text-[24px] text-primary select-none flex items-center gap-2">
          <span>오늘의 운동</span>
        </div>
        <button
          onClick={onNavigateToSettings}
          className="hover:bg-surface-container-low p-2 rounded-full transition-colors cursor-pointer text-primary"
          aria-label="알림 설정 일제"
          title="루틴 알림 설정"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
            settings
          </span>
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-container-margin-mobile md:px-container-margin-desktop mt-4 md:mt-12 flex flex-col items-center flex-grow justify-center w-full">
        {/* Daily Recommendation Card */}
        <article className="w-full max-w-lg bg-surface-container-lowest rounded-2xl overflow-hidden relative border border-surface-container-high transition-all" style={{ boxShadow: "0 10px 30px rgba(173, 42, 40, 0.05)" }}>
          {/* Badge overlays */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-primary/90 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
              Today's Pick 🔥
            </span>
          </div>

          <div
            onClick={onStart}
            className="relative w-full aspect-[4/3] bg-surface-container-high overflow-hidden group cursor-pointer border-2 border-transparent hover:border-primary/50 transition-colors"
          >
            <img
              alt={workout.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={workout.thumbnail}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
              <div className="w-16 h-16 bg-surface-container-lowest/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1", fontSize: "32px" }}>
                  play_arrow
                </span>
              </div>
            </div>
          </div>

          <div className="p-card-padding text-center">
            <h1 className="text-[24px] font-bold text-on-surface mb-2 tracking-tight">
              {workout.title}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              {workout.description}
            </p>

            {/* Info Chips */}
            <div className="flex justify-center gap-gutter mb-8">
              <span className="inline-flex items-center gap-1 bg-surface border border-outline-variant text-on-surface-variant font-label-bold text-label-bold px-4 py-2 rounded-full">
                <span className="material-symbols-outlined text-[16px]">accessibility_new</span>
                맨몸
              </span>
              <span className="inline-flex items-center gap-1 bg-surface border border-outline-variant text-on-surface-variant font-label-bold text-label-bold px-4 py-2 rounded-full">
                <span className="material-symbols-outlined text-[16px] text-primary">local_fire_department</span>
                {workout.difficulty}
              </span>
              <span className="inline-flex items-center gap-1 bg-surface border border-outline-variant text-on-surface-variant font-label-bold text-label-bold px-4 py-2 rounded-full">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                {workout.durationMinutes}분
              </span>
            </div>

            <button
              onClick={onStart}
              className="w-full h-[56px] hover:bg-opacity-95 text-on-primary font-bold text-[18px] rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: "#cf433d" }}
            >
              시작하기
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                arrow_forward
              </span>
            </button>
          </div>
        </article>

        <p className="text-center font-label-sm text-label-sm text-on-surface-variant mt-6 max-w-sm">
          매일 자정에 새로운 홈트레이닝이 추천됩니다. 고민하지 말고 건강한 땀방울을 시작해 보세요!
        </p>
      </main>

    </div>
  );
}
