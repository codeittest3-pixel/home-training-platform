export interface Workout {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailPlayback?: string; // Larger or different image for layout
  durationMinutes: number;
  durationSeconds: number;
  tags: string[];
  target: string; // e.g. "전신", "코어", "유연성"
  difficulty: "고강도" | "중강도" | "저강도";
  difficultyDesc: string; // e.g. "고강도 매운맛", "코어 집중"
}

export interface WorkoutLog {
  id: string;
  workoutId: string;
  title: string;
  dateString: string; // "YYYY.MM.DD"
  timestamp: number;
  durationMinutes: number;
  target: string;
  thumbnail: string;
  firestoreId?: string; // Add this
}

export interface UserSettings {
  alarmTime: string; // "08:30"
  meridiem: "am" | "pm"; // "오전" | "오후"
  alarmHour: string; // "08"
  alarmMin: string; // "30"
  repeatDays: string[]; // ["mon", "tue", "wed", "fri"] (요일들)
  motivation: string; // "오늘도 화이팅! 할 수 있다!"
}
