import { Platform } from 'react-native';
import type { AgeRange, Mood, Question, TrackerEntry, Answer } from '../types';

// 172.16.10.131 is your machine's local IP detected from Expo logs. 
// This allows both Emulators and Physical Devices (on same Wifi) to connect.
const BASE_URL = 'http://172.16.18.228:5000/api';

export const api = {
    // Health Check
    checkHealth: async () => {
        try {
            const res = await fetch(`${BASE_URL}/health`);
            return res.ok;
        } catch (e) {
            console.error('API Health Check Failed', e);
            return false;
        }
    },

    // User
    registerUser: async (uid: string, ageRange: AgeRange) => {
        const res = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid, ageRange }),
        });
        return res.json();
    },

    // Tracker
    getTrackerEntries: async (userId: string): Promise<TrackerEntry[]> => {
        const res = await fetch(`${BASE_URL}/tracker/${userId}`);
        if (!res.ok) return [];
        return res.json();
    },

    saveTrackerEntry: async (userId: string, entry: TrackerEntry) => {
        const res = await fetch(`${BASE_URL}/tracker`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, ...entry }),
        });
        return res.json();
    },

    // Feed
    getQuestions: async (ageRange: AgeRange): Promise<Question[]> => {
        const res = await fetch(`${BASE_URL}/feed?ageRange=${ageRange}`);
        if (!res.ok) return [];
        const questions = await res.json();
        return questions.map((q: any) => ({
            ...q,
            answers: [], // Initial load might not have answers attached depending on backend API design, usually separate fetch
        }));
    },

    postQuestion: async (userId: string, question: { ageRange: AgeRange; category: string; text: string }) => {
        const res = await fetch(`${BASE_URL}/feed/questions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, ...question }),
        });
        return res.json();
    },

    getAnswers: async (questionId: string): Promise<Answer[]> => {
        const res = await fetch(`${BASE_URL}/feed/questions/${questionId}/answers`);
        if (!res.ok) return [];
        return res.json();
    },

    postAnswer: async (userId: string, questionId: string, text: string) => {
        const res = await fetch(`${BASE_URL}/feed/questions/${questionId}/answers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, text }),
        });
        return res.json();
    },

    toggleHelpful: async (userId: string, questionId: string, answerId: string) => {
        const res = await fetch(`${BASE_URL}/feed/questions/${questionId}/answers/${answerId}/helpful`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        });
        return res.json();
    },
};
