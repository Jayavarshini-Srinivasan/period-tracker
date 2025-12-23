import Constants from 'expo-constants';
import type { AgeRange, Mood, Question, TrackerEntry, Answer } from '../types';

const getBaseUrl = () => {
    return 'https://period-tracker-topaz.vercel.app/api';
}

const BASE_URL = getBaseUrl();

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
