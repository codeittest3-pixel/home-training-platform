import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";
import { Workout, WorkoutLog, UserSettings } from "./types";
import { WORKOUTS, DEFAULT_LOGS, getWorkoutForToday } from "./data";
import RecommendScreen from "./components/RecommendScreen";
import PlaybackScreen from "./components/PlaybackScreen";
import AchievementScreen from "./components/AchievementScreen";
import RecordsScreen from "./components/RecordsScreen";
import SettingsScreen from "./components/SettingsScreen";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Default settings object
const DEFAULT_SETTINGS: UserSettings = {
  alarmTime: "08:30",
  meridiem: "pm",
  alarmHour: "08",
  alarmMin: "30",
  repeatDays: ["mon", "tue", "wed", "fri"],
  motivation: "오늘도 화이팅! 할 수 있다!"
};

type ScreenType = "RECOMMEND" | "PLAYBACK" | "ACHIEVEMENT" | "RECORDS_LIST" | "RECORDS_REPORT" | "SETTINGS";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("RECOMMEND");
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem("today_workout_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing settings", e);
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [activeWorkout, setActiveWorkout] = useState<Workout>(() => {
    return getWorkoutForToday();
  });

  const [lastCompletedMinutes, setLastCompletedMinutes] = useState<number>(15);
  const [lastCompletedDateText, setLastCompletedDateText] = useState<string>("2026.05.26");

  // Fetch logs from Firestore
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const q = query(collection(db, "workoutLogs"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const logs: WorkoutLog[] = [];
        querySnapshot.forEach((doc) => {
          logs.push({ ...doc.data() as WorkoutLog, firestoreId: doc.id });
        });

        // Deduplicate
        const uniqueLogsMap = new Map<string, WorkoutLog>();
        logs.forEach(log => {
          const key = `${log.dateString}-${log.title}`;
          if (!uniqueLogsMap.has(key) || log.timestamp > uniqueLogsMap.get(key)!.timestamp) {
            uniqueLogsMap.set(key, log);
          }
        });
        
        setWorkoutLogs(Array.from(uniqueLogsMap.values()).sort((a,b) => b.timestamp - a.timestamp));
      } catch (e) {
        console.error("Error fetching logs", e);
      }
    };
    fetchLogs();
  }, []);

  // Keep settings synchronized with local storage
  useEffect(() => {
    localStorage.setItem("today_workout_settings", JSON.stringify(settings));
  }, [settings]);

  // Calculate dynamic streak based on consecutive logs count
  // We match the initial 3 from mockup, incrementing as they add actions
  const totalLgCount = workoutLogs.length;
  const computedStreak = Math.max(3, totalLgCount);

  // Handle start workout trigger
  const handleStartWorkout = () => {
    setCurrentScreen("PLAYBACK");
  };

  // Complete workout handler
  const handleCompleteWorkout = async (elapsedSeconds: number) => {
    const minutes = Math.max(1, Math.round(elapsedSeconds / 60));
    setLastCompletedMinutes(minutes);

    const now = new Date();
    const YYYY = now.getFullYear();
    const MM = (now.getMonth() + 1).toString().padStart(2, "0");
    const DD = now.getDate().toString().padStart(2, "0");
    const dateFormatted = `${YYYY}.${MM}.${DD}`;
    setLastCompletedDateText(dateFormatted);

    // Create a new log entry
    const newLog: WorkoutLog = {
      id: `log-${Date.now()}`,
      workoutId: activeWorkout.id,
      title: activeWorkout.title,
      dateString: dateFormatted,
      timestamp: now.getTime(),
      durationMinutes: minutes,
      target: activeWorkout.target,
      thumbnail: activeWorkout.thumbnail
    };

    try {
      // Check for existing log
      const q = query(collection(db, "workoutLogs"), 
        where("dateString", "==", dateFormatted),
        where("title", "==", activeWorkout.title)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Update existing log
        const docRef = doc(db, "workoutLogs", querySnapshot.docs[0].id);
        await updateDoc(docRef, { ...newLog });
        
        // Update local state by replacing old log
        setWorkoutLogs((prev) => prev.map(log => 
          log.title === activeWorkout.title && log.dateString === dateFormatted 
            ? newLog 
            : log
        ));
      } else {
        // Add new log
        await addDoc(collection(db, "workoutLogs"), newLog);
        setWorkoutLogs((prev) => [newLog, ...prev]);
      }
      setCurrentScreen("ACHIEVEMENT");
    } catch (e) {
      console.error("Error adding/updating log", e);
    }
  };

  // Safe handler to reset/wipe data to match starting templates easily
  const handleClearLogs = () => {
    setWorkoutLogs([]);
    localStorage.removeItem("today_workout_logs");
  };

  // Handle router selection
  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-fixed select-none pb-28">
      {currentScreen === "RECOMMEND" && (
        <RecommendScreen
          workout={activeWorkout}
          onStart={handleStartWorkout}
          onNavigateToRecords={() => setCurrentScreen("RECORDS_LIST")}
          onNavigateToSettings={() => setCurrentScreen("SETTINGS")}
        />
      )}

      {currentScreen === "PLAYBACK" && (
        <PlaybackScreen
          workout={activeWorkout}
          onClose={() => setCurrentScreen("RECOMMEND")}
          onComplete={handleCompleteWorkout}
        />
      )}

      {currentScreen === "ACHIEVEMENT" && (
        <AchievementScreen
          workoutTimeText={`${lastCompletedMinutes}분`}
          workoutDateText={lastCompletedDateText}
          streakDays={computedStreak}
          onNavigateToRecords={() => setCurrentScreen("RECORDS_LIST")}
        />
      )}

      {currentScreen === "RECORDS_LIST" && (
        <RecordsScreen
          logs={workoutLogs}
          activeTab="LIST"
          onNavigateToRecommend={() => setCurrentScreen("RECOMMEND")}
          onNavigateToSettings={() => setCurrentScreen("SETTINGS")}
          onClearLogs={handleClearLogs}
        />
      )}

      {currentScreen === "RECORDS_REPORT" && (
        <RecordsScreen
          logs={workoutLogs}
          activeTab="REPORT"
          onNavigateToRecommend={() => setCurrentScreen("RECOMMEND")}
          onNavigateToSettings={() => setCurrentScreen("SETTINGS")}
          onClearLogs={handleClearLogs}
        />
      )}

      {currentScreen === "SETTINGS" && (
        <SettingsScreen
          initialSettings={settings}
          onSave={setSettings}
          onClose={() => setCurrentScreen("RECOMMEND")}
        />
      )}

      {/* Global Bottom Navigation Bar across all screens except playback */}
      {currentScreen !== "PLAYBACK" && (
        <nav id="app-global-bottom-nav" className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-50 bg-surface/95 backdrop-blur-md border-t border-outline-variant/80 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] flex justify-around items-center py-2.5 px-4 select-none">
          {/* 홈 Tab */}
          <button
            id="nav-tab-recommend"
            onClick={() => setCurrentScreen("RECOMMEND")}
            className={`flex flex-col items-center justify-center pt-1 px-5 cursor-pointer active:scale-95 transition-all duration-200 ${
              currentScreen === "RECOMMEND"
                ? "text-primary border-t-2 border-primary font-bold"
                : "text-on-surface-variant/85 hover:text-primary font-medium border-t-2 border-transparent"
            }`}
          >
            <span
              className="material-symbols-outlined mb-0.5"
              style={{ fontVariationSettings: `'FILL' ${currentScreen === "RECOMMEND" ? 1 : 0}` }}
            >
              home
            </span>
            <span className="text-[12px]">홈</span>
          </button>

          {/* 완료 목록 Tab */}
          <button
            id="nav-tab-completed-list"
            onClick={() => setCurrentScreen("RECORDS_LIST")}
            className={`flex flex-col items-center justify-center pt-1 px-5 cursor-pointer active:scale-95 transition-all duration-200 ${
              currentScreen === "RECORDS_LIST"
                ? "text-primary border-t-2 border-primary font-bold"
                : "text-on-surface-variant/85 hover:text-primary font-medium border-t-2 border-transparent"
            }`}
          >
            <span
              className="material-symbols-outlined mb-0.5"
              style={{ fontVariationSettings: `'FILL' ${currentScreen === "RECORDS_LIST" ? 1 : 0}` }}
            >
              list_alt
            </span>
            <span className="text-[12px]">완료 목록</span>
          </button>

          {/* 달성 리포트 Tab */}
          <button
            id="nav-tab-achievement-report"
            onClick={() => setCurrentScreen("RECORDS_REPORT")}
            className={`flex flex-col items-center justify-center pt-1 px-5 cursor-pointer active:scale-95 transition-all duration-200 ${
              currentScreen === "RECORDS_REPORT"
                ? "text-primary border-t-2 border-primary font-bold"
                : "text-on-surface-variant/85 hover:text-primary font-medium border-t-2 border-transparent"
            }`}
          >
            <span
              className="material-symbols-outlined mb-0.5"
              style={{ fontVariationSettings: `'FILL' ${currentScreen === "RECORDS_REPORT" ? 1 : 0}` }}
            >
              equalizer
            </span>
            <span className="text-[12px]">달성 리포트</span>
          </button>
        </nav>
      )}
    </div>
  );
}
