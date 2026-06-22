import { Workout, WorkoutLog } from "./types";

export const WORKOUTS: Workout[] = [
  {
    id: "full-body-15",
    title: "전신 칼로리 폭발 15분 루틴",
    description: "장비 없이 맨몸으로 끝내는 고효율 전신 운동",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHDW4UgBmVLoNu8AJc-Kv2tJGErAsICo7TMDB0fyUdRB7xNbTH0ibZJ2gBNJWuMnAipcYqhkleEz1kWeK1IbD9WlH6peU4lqpHX-aYcTqyq2lypPwnlJo0mdAVZjMmTX8z8ySKEahvTxN6OnUvuDuv_g3wRIaZaC7ZpzHVie62ka3RVxo3k7hz-RmgKO4F6syqdXYjfcT5DmpmbGgysqX-dCVt-tZ8xjxk5AH4GXeWHsAA3MX3id3WrhdLdlwPVAW60HiRtmDdetXZ",
    thumbnailPlayback: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVsrQUkApCgxq3nn-VIwqmSkKYV-EjTE89ARBPriLXB_jOMHJvfkH5rrE3brwv9e4mrsDq8T0AXcOVcrZw8Q2fFwb-qArFmgm3zR5nGN3aJILBswliKMCTeReOflQWOBsfbyqcQsQk1fekF8aDHFZ4OGb8V9XhRF93Q2DoUaO4R8Xn2Bbd0L3hrHu8pjRlc0Q9TG6uqTjDN-dbTTemIeQ2FJZz5hx4lfUZh-Ga_-ziAuO7l3MbRcCxwjNb6nLEerpGns7kINs2wc77",
    durationMinutes: 15,
    durationSeconds: 900,
    tags: ["맨몸", "고강도"],
    target: "전신",
    difficulty: "고강도",
    difficultyDesc: "고강도 매운맛"
  },
  {
    id: "core-intensive-20",
    title: "코어 강화 집중 훈련",
    description: "탄탄한 코어와 바른 자세를 위한 20분 자극 루틴",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlY1OXbzHSeez4PmGyCWNkqC22xV5GiYiioxwoHqjBv1_ruZXui4xwPro10cXeUhyDbGubbBJcPIFQEUNIAyQ7hILLVHt-aJQKwhjHZlrPxRuWhmhtRBZI47esIroy9TGwqxweJtgfB75VFYqTsBNvXwSorExPMJYOZKEt8X85TL0lV21BJfnu1oc9GHKj0k5qcWJbQbOxPA_WPQa0c5jw9MsIj5AgIszphic6zZ0ewUVivHy1TT9QlIIhnljix8DTXXMdF8YudxED",
    thumbnailPlayback: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlY1OXbzHSeez4PmGyCWNkqC22xV5GiYiioxwoHqjBv1_ruZXui4xwPro10cXeUhyDbGubbBJcPIFQEUNIAyQ7hILLVHt-aJQKwhjHZlrPxRuWhmhtRBZI47esIroy9TGwqxweJtgfB75VFYqTsBNvXwSorExPMJYOZKEt8X85TL0lV21BJfnu1oc9GHKj0k5qcWJbQbOxPA_WPQa0c5jw9MsIj5AgIszphic6zZ0ewUVivHy1TT9QlIIhnljix8DTXXMdF8YudxED",
    durationMinutes: 20,
    durationSeconds: 1200,
    tags: ["맨몸", "중강도"],
    target: "코어",
    difficulty: "중강도",
    difficultyDesc: "코어 집중"
  },
  {
    id: "stretching-10",
    title: "가벼운 스트레칭 마무리",
    description: "피로를 회복하고 몸을 유연하게 풀어주는 10분 힐링 요가",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqLV5d33UOLJpSBV6QEt64FZdnx_h8tNXJ0L4CoL3RZlXRg2TDeolJ32QVVqS4QkziLStWBrem7AGATkTLqYXaYH3tOjiknPkCYFFG0W_Yj7km8bECuMuyPRI5bya9revUJxrb_OgOSclwUDHSueM2F3uZ25w-4vm7yfn_aZCULseM6lU4xSaCVEa6dko47dnjCO9WdjqX_iJBJpBda1GK84lh-uQ_-akAQF9vwhSxCP-KiwsQnAZX55zoXLAOdeufxVPJn23KeATw",
    thumbnailPlayback: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqLV5d33UOLJpSBV6QEt64FZdnx_h8tNXJ0L4CoL3RZlXRg2TDeolJ32QVVqS4QkziLStWBrem7AGATkTLqYXaYH3tOjiknPkCYFFG0W_Yj7km8bECuMuyPRI5bya9revUJxrb_OgOSclwUDHSueM2F3uZ25w-4vm7yfn_aZCULseM6lU4xSaCVEa6dko47dnjCO9WdjqX_iJBJpBda1GK84lh-uQ_-akAQF9vwhSxCP-KiwsQnAZX55zoXLAOdeufxVPJn23KeATw",
    durationMinutes: 10,
    durationSeconds: 600,
    tags: ["맨몸", "저강도"],
    target: "유연성",
    difficulty: "저강도",
    difficultyDesc: "유연성 힐링"
  },
  {
    id: "lower-body-15",
    title: "하체 라인 버닝 피트니스",
    description: "장비 없이 런지와 스쿼트로 단련하는 탄탄한 하체 라인 루틴",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXrBhEMeAwFcizAcUhvnRaKfUwpZUNSS0mcZrmTVlWVHbTu-jgmYqMfnKYkj-eDtXpGhWFw14grZ5iH00Pu7FY6YmSlZEgCTMXI3URYSpto5QesSHWh2WqWqnE9aRcPz-0a3kJjoRCwRfxMoC2TgNrn-XWpi7FO998zLq3H6ev4wKCQKuGi5JfgCCGDo5aKfaANlGOHrhXSLiu0dZgpv9bcCjSxl6dgQEaG_o67e1oIe4iSi9L-h7F9sydpjG5eHGElYbyE6h-jI8c",
    thumbnailPlayback: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXrBhEMeAwFcizAcUhvnRaKfUwpZUNSS0mcZrmTVlWVHbTu-jgmYqMfnKYkj-eDtXpGhWFw14grZ5iH00Pu7FY6YmSlZEgCTMXI3URYSpto5QesSHWh2WqWqnE9aRcPz-0a3kJjoRCwRfxMoC2TgNrn-XWpi7FO998zLq3H6ev4wKCQKuGi5JfgCCGDo5aKfaANlGOHrhXSLiu0dZgpv9bcCjSxl6dgQEaG_o67e1oIe4iSi9L-h7F9sydpjG5eHGElYbyE6h-jI8c",
    durationMinutes: 15,
    durationSeconds: 900,
    tags: ["맨몸", "고강도"],
    target: "하체",
    difficulty: "고강도",
    difficultyDesc: "하체 불태우기"
  },
  {
    id: "upper-body-12",
    title: "거북목 탈출 상체 교정 테라피",
    description: "굽은 어깨와 뭉친 등 근육을 시원하게 늘려주는 자세 밀착 관리",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlY1OXbzHSeez4PmGyCWNkqC22xV5GiYiioxwoHqjBv1_ruZXui4xwPro10cXeUhyDbGubbBJcPIFQEUNIAyQ7hILLVHt-aJQKwhjHZlrPxRuWhmhtRBZI47esIroy9TGwqxweJtgfB75VFYqTsBNvXwSorExPMJYOZKEt8X85TL0lV21BJfnu1oc9GHKj0k5qcWJbQbOxPA_WPQa0c5jw9MsIj5AgIszphic6zZ0ewUVivHy1TT9QlIIhnljix8DTXXMdF8YudxED",
    thumbnailPlayback: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlY1OXbzHSeez4PmGyCWNkqC22xV5GiYiioxwoHqjBv1_ruZXui4xwPro10cXeUhyDbGubbBJcPIFQEUNIAyQ7hILLVHt-aJQKwhjHZlrPxRuWhmhtRBZI47esIroy9TGwqxweJtgfB75VFYqTsBNvXwSorExPMJYOZKEt8X85TL0lV21BJfnu1oc9GHKj0k5qcWJbQbOxPA_WPQa0c5jw9MsIj5AgIszphic6zZ0ewUVivHy1TT9QlIIhnljix8DTXXMdF8YudxED",
    durationMinutes: 12,
    durationSeconds: 720,
    tags: ["맨몸", "저강도"],
    target: "상체",
    difficulty: "저강도",
    difficultyDesc: "어깨 등 스트레칭"
  },
  {
    id: "tabata-18",
    title: "지방 연소 끝판왕 활력 타바타",
    description: "바쁜 아침, 전신 활력 충전으로 하루 대사를 극대화하는 홈트",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHDW4UgBmVLoNu8AJc-Kv2tJGErAsICo7TMDB0fyUdRB7xNbTH0ibZJ2gBNJWuMnAipcYqhkleEz1kWeK1IbD9WlH6peU4lqpHX-aYcTqyq2lypPwnlJo0mdAVZjMmTX8z8ySKEahvTxN6OnUvuDuv_g3wRIaZaC7ZpzHVie62ka3RVxo3k7hz-RmgKO4F6syqdXYjfcT5DmpmbGgysqX-dCVt-tZ8xjxk5AH4GXeWHsAA3MX3id3WrhdLdlwPVAW60HiRtmDdetXZ",
    thumbnailPlayback: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVsrQUkApCgxq3nn-VIwqmSkKYV-EjTE89ARBPriLXB_jOMHJvfkH5rrE3brwv9e4mrsDq8T0AXcOVcrZw8Q2fFwb-qArFmgm3zR5nGN3aJILBswliKMCTeReOflQWOBsfbyqcQsQk1fekF8aDHFZ4OGb8V9XhRF93Q2DoUaO4R8Xn2Bbd0L3hrHu8pjRlc0Q9TG6uqTjDN-dbTTemIeQ2FJZz5hx4lfUZh-Ga_-ziAuO7l3MbRcCxwjNb6nLEerpGns7kINs2wc77",
    durationMinutes: 18,
    durationSeconds: 1080,
    tags: ["맨몸", "고강도"],
    target: "전신",
    difficulty: "고강도",
    difficultyDesc: "타바타 버닝"
  }
];

export const DEFAULT_LOGS: WorkoutLog[] = [
  {
    id: "log-1",
    workoutId: "full-body-15",
    title: "전신 칼로리 폭발 15분 루틴",
    dateString: "2023.10.27",
    timestamp: new Date("2023-10-27T08:00:00").getTime(),
    durationMinutes: 15,
    target: "전신",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXrBhEMeAwFcizAcUhvnRaKfUwpZUNSS0mcZrmTVlWVHbTu-jgmYqMfnKYkj-eDtXpGhWFw14grZ5iH00Pu7FY6YmSlZEgCTMXI3URYSpto5QesSHWh2WqWqnE9aRcPz-0a3kJjoRCwRfxMoC2TgNrn-XWpi7FO998zLq3H6ev4wKCQKuGi5JfgCCGDo5aKfaANlGOHrhXSLiu0dZgpv9bcCjSxl6dgQEaG_o67e1oIe4iSi9L-h7F9sydpjG5eHGElYbyE6h-jI8c"
  },
  {
    id: "log-2",
    workoutId: "core-intensive-20",
    title: "코어 강화 집중 훈련",
    dateString: "2023.10.25",
    timestamp: new Date("2023-10-25T18:30:00").getTime(),
    durationMinutes: 20,
    target: "코어",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlY1OXbzHSeez4PmGyCWNkqC22xV5GiYiioxwoHqjBv1_ruZXui4xwPro10cXeUhyDbGubbBJcPIFQEUNIAyQ7hILLVHt-aJQKwhjHZlrPxRuWhmhtRBZI47esIroy9TGwqxweJtgfB75VFYqTsBNvXwSorExPMJYOZKEt8X85TL0lV21BJfnu1oc9GHKj0k5qcWJbQbOxPA_WPQa0c5jw9MsIj5AgIszphic6zZ0ewUVivHy1TT9QlIIhnljix8DTXXMdF8YudxED"
  },
  {
    id: "log-3",
    workoutId: "stretching-10",
    title: "가벼운 스트레칭 마무리",
    dateString: "2023.10.23",
    timestamp: new Date("2023-10-23T20:15:00").getTime(),
    durationMinutes: 10,
    target: "유연성",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqLV5d33UOLJpSBV6QEt64FZdnx_h8tNXJ0L4CoL3RZlXRg2TDeolJ32QVVqS4QkziLStWBrem7AGATkTLqYXaYH3tOjiknPkCYFFG0W_Yj7km8bECuMuyPRI5bya9revUJxrb_OgOSclwUDHSueM2F3uZ25w-4vm7yfn_aZCULseM6lU4xSaCVEa6dko47dnjCO9WdjqX_iJBJpBda1GK84lh-uQ_-akAQF9vwhSxCP-KiwsQnAZX55zoXLAOdeufxVPJn23KeATw"
  }
];

export function getWorkoutForToday(date: Date = new Date()): Workout {
  // Let's seed by day of year so it rotates perfectly or simply use day of month
  const day = date.getDate();
  const index = day % WORKOUTS.length;
  return WORKOUTS[index];
}
