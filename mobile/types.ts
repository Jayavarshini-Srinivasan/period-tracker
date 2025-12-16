export type AgeRange = '13-14' | '15-16' | '17-18' | null;
export type Mood = 'okay' | 'low' | 'anxious' | 'irritable' | null;

export interface TrackerEntry {
    date: string;
    isPeriodDay: boolean;
    symptoms: string[];
    mood: Mood;
}

export interface Question {
    id: string;
    ageRange: string;
    category: string;
    text: string;
    previewText: string;
    answers: Answer[];
    timestamp: number;
    isExpired: boolean;
}

export interface Answer {
    id: string;
    text: string;
    helpfulCount: number;
    isHelpfulByUser: boolean;
}
