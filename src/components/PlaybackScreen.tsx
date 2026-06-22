import React, { useState, useEffect, useRef } from "react";
import { Workout } from "../types";

interface PlaybackScreenProps {
  workout: Workout;
  onClose: () => void;
  onComplete: (elapsedSeconds: number) => void;
}

export default function PlaybackScreen({ workout, onClose, onComplete }: PlaybackScreenProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [elapsed, setElapsed] = useState<number>(0); // Start workout progress (e.g. 7 * 60 + 23 = 443 seconds to match the mockup's initial state of 07:23)

  // Initialize elapsed to roughly match 07:23 for a 15-minute routine, just to look like the exact screenshot immediately!
  // Fallback to 0 if the routine has a different length or we want a fresh start, let's start at half of the total duration to feel instantly relatable.
  useEffect(() => {
    const defaultStart = Math.min(Math.floor(workout.durationSeconds * 0.49), 443);
    setElapsed(defaultStart);
  }, [workout]);

  // Handle timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsed((prev) => {
          if (prev >= workout.durationSeconds) {
            clearInterval(interval);
            setIsPlaying(false);
            return workout.durationSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, workout.durationSeconds]);

  // Format time (mm:ss)
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRewind = () => {
    setElapsed((prev) => Math.max(0, prev - 10));
  };

  const handleForward = () => {
    setElapsed((prev) => Math.min(workout.durationSeconds, prev + 10));
  };

  const progressPercent = Math.min(100, Math.max(0, (elapsed / workout.durationSeconds) * 100));

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col pb-[120px]">
      {/* Mini App Bar */}
      <header className="bg-surface docked full-width top-0 z-50 flex justify-between items-center px-container-margin-mobile md:px-container-margin-desktop py-4 w-full max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            aria-label="Back to recommend page"
            className="text-on-surface-variant hover:bg-surface-container/60 p-2 rounded-full transition-all active:scale-95 duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              close
            </span>
          </button>
          <h1 className="font-headline-md text-headline-md font-black text-primary select-none">
            오늘의 운동
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-primary-fixed text-primary px-2.5 py-1 rounded-full font-bold select-none">
            실시간 재생중 ⚡
          </span>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center w-full max-w-[1200px] mx-auto">
        {/* Video Player Section */}
        <section className="w-full relative bg-surface-container-highest md:rounded-3xl overflow-hidden shadow-[0_4px_25px_0_rgba(173,42,40,0.06)] border border-surface-container-high">
          <div className="aspect-video w-full relative">
            <img
              className="w-full h-full object-cover select-none"
              alt="High definition home gym setting"
              src={workout.thumbnailPlayback || workout.thumbnail}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"></div>

            {/* Video center status badge when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs transition-all pointer-events-none">
                <div className="bg-primary text-white font-bold px-6 py-3 rounded-full flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    pause
                  </span>
                  <span>운동 일시정지됨</span>
                </div>
              </div>
            )}

            {/* Floating text metadata overlay inside player */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 text-white pointer-events-auto">
              <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full font-bold text-xs inline-block w-max">
                {workout.difficultyDesc || `${workout.difficulty} 매운맛`}
              </span>
              <h2 className="font-headline-md text-headline-md text-white drop-shadow-md tracking-tight">
                {workout.title}
              </h2>
            </div>
          </div>
        </section>

        {/* Player Controls Section */}
        <section className="w-full px-container-margin-mobile md:px-container-margin-desktop py-8 flex flex-col items-center gap-8 mt-4">
          {/* Progress Slider */}
          <div className="w-full max-w-2xl flex flex-col gap-2">
            <div className="flex justify-between font-label-sm text-label-sm text-tertiary select-none">
              <span className="font-mono font-bold tracking-wider">{formatTime(elapsed)}</span>
              <span className="font-mono">{formatTime(workout.durationSeconds)}</span>
            </div>
            
            {/* Clickable track interface to easily scrub / test play */}
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percent = Math.min(100, Math.max(0, clickX / rect.width));
                setElapsed(Math.floor(workout.durationSeconds * (percent / 100)));
              }}
              className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden cursor-pointer relative"
            >
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Action trigger row */}
          <div className="flex items-center justify-center gap-8">
            {/* Rewind 10 secs */}
            <button
              onClick={handleRewind}
              title="10초 뒤로 가기"
              className="w-14 h-14 rounded-full bg-surface-container-lowest shadow-[0_4px_20px_0_rgba(0,0,0,0.04)] hover:shadow-md border border-surface-container-high hover:border-primary flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                replay_10
              </span>
            </button>

            {/* Core toggle trigger */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "일시정지" : "다시 재생"}
              className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg active:scale-95 hover:scale-105 transition-all hover:bg-opacity-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>

            {/* Fast forward 10 secs */}
            <button
              onClick={handleForward}
              title="10초 앞으로 가기"
              className="w-14 h-14 rounded-full bg-surface-container-lowest shadow-[0_4px_20px_0_rgba(0,0,0,0.04)] hover:shadow-md border border-surface-container-high hover:border-primary flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                forward_10
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* Fixed bottom action with beautiful smooth gradient background underlay */}
      <div className="fixed bottom-0 left-0 w-full px-container-margin-mobile py-6 bg-gradient-to-t from-background via-background/90 to-transparent z-40">
        <div className="max-w-[1200px] mx-auto">
          <button
            onClick={() => onComplete(elapsed)}
            className="w-full h-[56px] text-[#fff] rounded-xl font-bold flex items-center justify-center shadow-lg active:scale-[0.98] transition-transform cursor-pointer"
            style={{ backgroundColor: "#ad2a28" }}
          >
            오늘 운동 완료
          </button>
        </div>
      </div>
    </div>
  );
}
