import React, { useState } from "react";
import { UserSettings } from "../types";

interface SettingsScreenProps {
  initialSettings: UserSettings;
  onSave: (settings: UserSettings) => void;
  onClose: () => void;
}

const WEEKDAYS = [
  { key: "mon", label: "월" },
  { key: "tue", label: "화" },
  { key: "wed", label: "수" },
  { key: "thu", label: "목" },
  { key: "fri", label: "금" },
  { key: "sat", label: "토" },
  { key: "sun", label: "일" }
];

export default function SettingsScreen({
  initialSettings,
  onSave,
  onClose
}: SettingsScreenProps) {
  const [meridiem, setMeridiem] = useState<"am" | "pm">(initialSettings.meridiem);
  const [alarmHour, setAlarmHour] = useState<string>(initialSettings.alarmHour);
  const [alarmMin, setAlarmMin] = useState<string>(initialSettings.alarmMin);
  const [repeatDays, setRepeatDays] = useState<string[]>(initialSettings.repeatDays);
  const [motivation, setMotivation] = useState<string>(initialSettings.motivation);
  const [showToast, setShowToast] = useState<boolean>(false);

  const toggleDay = (dayKey: string) => {
    setRepeatDays((prev) =>
      prev.includes(dayKey) ? prev.filter((d) => d !== dayKey) : [...prev, dayKey]
    );
  };

  const handleSaveClick = () => {
    const finalTime = `${meridiem === "pm" && alarmHour !== "12" ? parseInt(alarmHour, 10) + 12 : alarmHour}:${alarmMin}`;
    
    const updated: UserSettings = {
      alarmTime: finalTime,
      meridiem,
      alarmHour,
      alarmMin,
      repeatDays,
      motivation
    };

    onSave(updated);

    // Show feedback toast
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose(); // Automatically head back to recommending page after showing alert
    }, 1500);
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col antialiased pb-[120px]">
      
      {/* Toast Confirmation box style */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-secondary text-on-secondary px-6 py-3.5 rounded-full shadow-lg flex items-center gap-2 font-bold select-none transition-all">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>운동 배달 알림 설정이 안전하게 저장되었습니다! 🔔</span>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface dark:bg-surface border-b border-surface-container-high flex justify-between items-center px-container-margin-mobile md:px-container-margin-desktop h-16 max-w-[1200px] mx-auto left-0 right-0 select-none">
        <button
          onClick={onClose}
          aria-label="Go back"
          className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
            arrow_back
          </span>
        </button>
        <h1 className="text-headline-md font-headline-md text-primary font-extrabold text-[20px]">
          알림 설정
        </h1>
        <div className="w-10"></div> {/* Balanced offset layout space */}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-12 px-container-margin-mobile md:px-container-margin-desktop max-w-lg mx-auto w-full">
        {/* Title Heading */}
        <section className="mb-12 text-center select-none">
          <h2 className="font-display-lg-mobile text-display-lg-mobile md:text-[32px] md:leading-[40px] text-on-surface font-black tracking-tight mb-3">
            내일 몇 시에<br />운동 배달을 보내드릴까요?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant font-medium">
            원하는 시간에 맞춰 푸시 알림과 다짐 한마디를 매일 전달해드려요.
          </p>
        </section>

        {/* Time Dropdowns Card (Simulating high end native pickers) */}
        <section className="mb-12 bg-surface-container-lowest rounded-2xl p-card-padding shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-surface-variant/70 flex flex-col items-center justify-center">
          <div className="flex items-center space-x-4 select-none">
            {/* AM/PM */}
            <div className="flex flex-col items-center">
              <span className="font-label-bold text-label-bold text-on-surface-variant mb-2">오전/오후</span>
              <select
                value={meridiem}
                onChange={(e) => setMeridiem(e.target.value as "am" | "pm")}
                className="form-select bg-surface border-surface-variant text-on-surface font-headline-md text-[18px] rounded-xl focus:ring-primary focus:border-primary py-2 px-3 outline-none"
              >
                <option value="am">오전</option>
                <option value="pm">오후</option>
              </select>
            </div>

            {/* Hour select */}
            <div className="flex flex-col items-center">
              <span className="font-label-bold text-label-bold text-on-surface-variant mb-2">시</span>
              <select
                value={alarmHour}
                onChange={(e) => setAlarmHour(e.target.value)}
                className="form-select bg-surface border-surface-variant text-on-surface font-display-lg-mobile text-[22px] font-bold rounded-xl focus:ring-primary focus:border-primary px-3 py-1.5 outline-none"
              >
                {Array.from({ length: 12 }).map((_, i) => {
                  const num = (i + 1).toString().padStart(2, "0");
                  return (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Divider colon */}
            <span className="font-display-lg-mobile text-[32px] text-on-surface font-bold mt-5">:</span>

            {/* Minute select */}
            <div className="flex flex-col items-center">
              <span className="font-label-bold text-label-bold text-on-surface-variant mb-2">분</span>
              <select
                value={alarmMin}
                onChange={(e) => setAlarmMin(e.target.value)}
                className="form-select bg-surface border-surface-variant text-on-surface font-display-lg-mobile text-[22px] font-bold rounded-xl focus:ring-primary focus:border-primary px-3 py-1.5 outline-none"
              >
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
            </div>
          </div>
        </section>

        {/* Day selection bubbles */}
        <section className="mb-12">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4 font-extrabold select-none">
            반복 요일
          </h3>
          <div className="flex justify-between md:justify-start md:space-x-3.5 bg-surface-container-lowest p-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-surface-variant/70">
            {WEEKDAYS.map((day) => {
              const isActive = repeatDays.includes(day.key);
              return (
                <button
                  type="button"
                  key={day.key}
                  onClick={() => toggleDay(day.key)}
                  className={`w-11 h-11 rounded-full font-bold text-sm border flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
                    isActive
                      ? "bg-primary-container text-on-primary-container border-primary shadow-sm"
                      : "bg-surface text-on-surface-variant border-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Motivation pledge edit input */}
        <section className="mb-12">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4 font-extrabold select-none">
            다짐 한마디
          </h3>
          <div className="relative">
            <input
              type="text"
              id="motivation-input"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder="예: 오늘도 화이팅! 할 수 있다!"
              className="w-full bg-surface-container-lowest border-2 border-surface-variant/80 text-on-surface font-body-md text-body-md rounded-xl p-4 pr-12 focus:border-primary focus:ring-0 outline-none transition-colors placeholder:text-on-surface-variant/50"
            />
            <label className="sr-only" htmlFor="motivation-input">
              다짐 한마디 입력
            </label>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <span className="material-symbols-outlined text-on-surface-variant/80">edit</span>
            </div>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant/80 mt-2.5 ml-2">
            지정된 배달 시각 알림 메시지에 함께 표시되어 의지를 복돋아 줍니다.
          </p>
        </section>
      </main>

      {/* Save Button (Fixed Bottom panel with nice glass blur effect) */}
      <div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md p-container-margin-mobile border-t border-surface-variant/80 z-50">
        <div className="max-w-lg mx-auto">
          <button
            type="button"
            onClick={handleSaveClick}
            className="w-full h-[56px] text-white font-bold text-[18px] rounded-xl transition-all active:scale-[0.98] shadow-md flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: "#cf433d" }}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
