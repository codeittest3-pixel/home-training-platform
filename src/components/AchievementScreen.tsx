import React, { useEffect, useState } from "react";

interface AchievementScreenProps {
  workoutTimeText: string;
  workoutDateText: string;
  streakDays: number;
  onNavigateToRecords: () => void;
}

interface ConfettiPiece {
  id: number;
  left: number;
  duration: number;
  delay: number;
  color: string;
  size: number;
  isCircle: boolean;
}

export default function AchievementScreen({
  workoutTimeText,
  workoutDateText,
  streakDays,
  onNavigateToRecords
}: AchievementScreenProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Generate lightweight confetti particles
  useEffect(() => {
    const colors = ["#ad2a28", "#cf433d", "#ffb3ac", "#77f8ab", "#006d3e"];
    const pieces: ConfettiPiece[] = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 3 + 2, // 2s to 5s
      delay: Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 6, // 6px to 12px
      isCircle: Math.random() > 0.5
    }));
    setConfetti(pieces);
  }, []);

  const handleShare = () => {
    // Generate simulated workout sharing text
    const shareText = `[오늘의 운동 완료] 🏆\n오늘도 ${workoutTimeText} 동안 홈트 완성!\n${streakDays}일 연속으로 운동을 실천하고 있어요. 불타는 에너지를 느껴 보세요! 🔥`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
    }
    
    // Display animated toast notification
    setToastMessage("공유 링크와 멘트가 클립보드에 복사되었습니다! 🎉");
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Confetti Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute rounded-xs"
            style={{
              left: `${c.left}%`,
              top: "-20px",
              backgroundColor: c.color,
              width: `${c.size}px`,
              height: `${c.size}px`,
              borderRadius: c.isCircle ? "50%" : "2px",
              animation: `confettiFall ${c.duration}s linear infinite`,
              animationDelay: `${c.delay}s`,
              opacity: 0.8
            }}
          />
        ))}
      </div>

      {/* Embedded CSS for Confetti fall and animations with no other css dependcies */}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* Toast message alert pop */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface text-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-bold animate-pulse">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Container */}
      <main className="w-full max-w-[1200px] mx-auto px-container-margin-mobile md:px-container-margin-desktop py-12 flex flex-col items-center justify-center z-10 text-center relative max-h-screen">
        {/* Celebrate Header */}
        <header className="mb-12 flex flex-col items-center">
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:text-display-lg text-primary mb-6 animate-[bounce_1.2s_ease-in-out_infinite] font-extrabold tracking-tight">
            오늘도 해내셨습니다!
          </h1>
          <div className="inline-flex items-center gap-2 bg-surface-container-highest px-5 py-2.5 rounded-full shadow-sm hover:scale-105 transition-transform">
            <span className="font-label-bold text-label-bold text-on-surface-variant text-[14px]">
              {streakDays}일 연속 운동 중
            </span>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
          </div>
        </header>

        {/* Summary bento grids */}
        <section className="grid grid-cols-2 gap-gutter w-full max-w-md mb-12">
          {/* Time Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-card-padding shadow-sm border border-surface-container-high flex flex-col items-center justify-center text-center hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                timer
              </span>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">운동 시간</p>
            <p className="font-headline-md text-headline-md text-on-background select-all">
              {workoutTimeText}
            </p>
          </div>

          {/* Date Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-card-padding shadow-sm border border-surface-container-high flex flex-col items-center justify-center text-center hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                calendar_month
              </span>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant font-semibold mb-1">날짜</p>
            <p className="font-headline-md text-headline-md text-on-background select-all">
              {workoutDateText}
            </p>
          </div>
        </section>

        {/* Action Button Row */}
        <section className="flex flex-col sm:flex-row gap-gutter w-full max-w-md">
          {/* View records */}
          <button
            onClick={onNavigateToRecords}
            className="flex-1 h-[56px] text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 duration-200 cursor-pointer shadow-md"
            style={{ backgroundColor: "#ad2a28" }}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              emoji_events
            </span>
            내 기록 보기
          </button>

          {/* Share routine */}
          <button
            onClick={handleShare}
            className="flex-1 h-[56px] bg-transparent border-2 border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container/20 active:scale-95 duration-200 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              share
            </span>
            공유하기
          </button>
        </section>

        <p className="text-xs text-on-surface-variant mt-8 select-none">
          스스로를 이겨낸 스스로에게 가벼운 칭찬 한마디를 건네 보는 것은 어떨까요? 😉
        </p>
      </main>
    </div>
  );
}
