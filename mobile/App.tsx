import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from './components/WelcomeScreen';
import AgeSelection from './components/AgeSelection';
import TrackerScreen from './components/TrackerScreen';
import FeedScreen from './components/FeedScreen';
import QuestionDetail from './components/QuestionDetail';
import AskQuestion from './components/AskQuestion';
import EssentialsScreen from './components/EssentialsScreen';
import ReflectionScreen from './components/ReflectionScreen';
import BottomNav from './components/BottomNav';
import EssentialsDetailScreen from './components/EssentialsDetailScreen';
import ReproductiveHealthScreen from './components/ReproductiveHealthScreen';
import StainRemovalScreen from './components/StainRemovalScreen';
import type { AgeRange, TrackerEntry, Question, Mood } from './types';
import { api } from './services/api';

export default function App() {
    const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
    const [ageRange, setAgeRange] = useState<AgeRange>(null);
    const [currentScreen, setCurrentScreen] = useState<'tracker' | 'feed' | 'ask' | 'essentials' | 'reflection' | 'essentialsDetail' | 'reproductiveHealth' | 'stainRemoval'>('tracker');
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
    const [selectedEssentialId, setSelectedEssentialId] = useState<string | null>(null);
    const [trackerData, setTrackerData] = useState<TrackerEntry[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [userId, setUserId] = useState<string>('');

    // Initialize generic user ID on mount if not exists
    React.useEffect(() => {
        const initUser = async () => {
            try {
                // Check if we have a stored ID
                const storedId = await AsyncStorage.getItem('period_tracker_user_id');
                if (storedId) {
                    setUserId(storedId);
                } else {
                    // Create new one and save it
                    const newId = `user_${Math.floor(Math.random() * 1000000)}`;
                    await AsyncStorage.setItem('period_tracker_user_id', newId);
                    setUserId(newId);
                }
            } catch (e) {
                console.error("Failed to initialize user", e);
                // Fallback to memory ID if storage fails
                setUserId(`user_${Math.floor(Math.random() * 1000000)}`);
            }
        };

        initUser();
    }, []);

    // Fetch data when screens change or dependencies update
    React.useEffect(() => {
        if (!userId || !ageRange) return;

        const loadData = async () => {
            try {
                if (currentScreen === 'tracker' || currentScreen === 'reflection') {
                    const entries = await api.getTrackerEntries(userId);
                    setTrackerData(entries);
                } else if (currentScreen === 'feed') {
                    const fetchedQuestions = await api.getQuestions(ageRange);
                    setQuestions(fetchedQuestions);
                }
            } catch (e) {
                console.error("Failed to load data", e);
            }
        };

        loadData();
    }, [userId, ageRange, currentScreen]);

    const handleContinueFromWelcome = () => {
        setHasSeenWelcome(true);
    };

    const handleAgeSelect = async (age: AgeRange) => {
        setAgeRange(age);
        if (userId) {
            await api.registerUser(userId, age);
        }
    };

    const handleNavigate = (screen: typeof currentScreen) => {
        setCurrentScreen(screen);
        setSelectedQuestionId(null);
    };

    const handleQuestionClick = async (questionId: string) => {
        setSelectedQuestionId(questionId);
        // Fetch latest answers for this question
        // We update the local state for that question to include new answers
        try {
            const answers = await api.getAnswers(questionId);
            setQuestions(prev => prev.map(q =>
                q.id === questionId ? { ...q, answers } : q
            ));
        } catch (e) {
            console.error("Failed to load answers", e);
        }
    };

    const handleBackToFeed = () => {
        setSelectedQuestionId(null);
    };

    const handleAddAnswer = async (questionId: string, answerText: string) => {
        try {
            await api.postAnswer(userId, questionId, answerText);
            // Refresh answers
            const answers = await api.getAnswers(questionId);
            setQuestions(prev => prev.map(q =>
                q.id === questionId ? { ...q, answers } : q
            ));
        } catch (e) {
            console.error("Failed to add answer", e);
        }
    };

    const handleToggleHelpful = async (questionId: string, answerId: string) => {
        // Optimistic Update
        setQuestions(prev => prev.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    answers: q.answers.map(a => {
                        if (a.id === answerId) {
                            return {
                                ...a,
                                isHelpfulByUser: !a.isHelpfulByUser,
                                helpfulCount: a.isHelpfulByUser ? a.helpfulCount - 1 : a.helpfulCount + 1,
                            };
                        }
                        return a;
                    }),
                };
            }
            return q;
        }));

        // API Call
        try {
            await api.toggleHelpful(userId, questionId, answerId);
        } catch (e) {
            console.error("Failed to toggle vote", e);
        }
    };

    const handlePostQuestion = async (category: string, text: string) => {
        if (!ageRange) return;
        try {
            await api.postQuestion(userId, { ageRange, category, text });
            // Refresh feed
            const fetchedQuestions = await api.getQuestions(ageRange);
            setQuestions(fetchedQuestions);
            setCurrentScreen('feed');
        } catch (e) {
            console.error("Failed to post question", e);
        }
    };

    const handleUpdateTrackerEntry = async (entry: TrackerEntry) => {
        // Optimistic update
        setTrackerData(prev => {
            const existing = prev.findIndex(e => e.date === entry.date);
            if (existing >= 0) {
                const updated = [...prev];
                updated[existing] = entry;
                return updated;
            }
            return [...prev, entry];
        });

        // API Call
        try {
            await api.saveTrackerEntry(userId, entry);
        } catch (e) {
            console.error("Failed to save entry", e);
        }
    };

    // Essentials Navigation
    const handleSelectProduct = (id: string) => {
        setSelectedEssentialId(id);
        setCurrentScreen('essentialsDetail');
    };

    const handleSelectHealth = () => {
        setCurrentScreen('reproductiveHealth');
    };

    const handleSelectStainRemoval = () => {
        setCurrentScreen('stainRemoval');
    };

    const handleBackToEssentials = () => {
        setSelectedEssentialId(null);
        setCurrentScreen('essentials');
    };

    // Render logic
    if (!hasSeenWelcome) {
        return <WelcomeScreen onContinue={handleContinueFromWelcome} />;
    }

    if (!ageRange) {
        return <AgeSelection onSelectAge={handleAgeSelect} />;
    }

    const isEssentialsDetail = ['essentialsDetail', 'reproductiveHealth', 'stainRemoval'].includes(currentScreen);
    const shouldHideBottomNav = selectedQuestionId || isEssentialsDetail;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.content}>
                {selectedQuestionId ? (
                    <QuestionDetail
                        question={questions.find(q => q.id === selectedQuestionId)!}
                        onBack={handleBackToFeed}
                        onAddAnswer={handleAddAnswer}
                        onToggleHelpful={handleToggleHelpful}
                    />
                ) : (
                    <>
                        {currentScreen === 'tracker' && (
                            <TrackerScreen
                                trackerData={trackerData}
                                onUpdateEntry={handleUpdateTrackerEntry}
                            />
                        )}
                        {currentScreen === 'feed' && (
                            <FeedScreen
                                questions={questions}
                                onQuestionClick={handleQuestionClick}
                            />
                        )}
                        {currentScreen === 'ask' && (
                            <AskQuestion onPostQuestion={handlePostQuestion} />
                        )}
                        {currentScreen === 'essentials' && (
                            <EssentialsScreen
                                onSelectProduct={handleSelectProduct}
                                onSelectHealth={handleSelectHealth}
                                onSelectStainRemoval={handleSelectStainRemoval}
                            />
                        )}
                        {currentScreen === 'essentialsDetail' && selectedEssentialId && (
                            <EssentialsDetailScreen
                                essentialId={selectedEssentialId}
                                onBack={handleBackToEssentials}
                            />
                        )}
                        {currentScreen === 'reproductiveHealth' && (
                            <ReproductiveHealthScreen onBack={handleBackToEssentials} />
                        )}
                        {currentScreen === 'stainRemoval' && (
                            <StainRemovalScreen onBack={handleBackToEssentials} />
                        )}
                        {currentScreen === 'reflection' && (
                            <ReflectionScreen trackerData={trackerData} questions={questions} />
                        )}
                    </>
                )}
            </View>

            {!shouldHideBottomNav && (
                <BottomNav currentScreen={currentScreen as any} onNavigate={handleNavigate} />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF5FF', // Match main bg
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    content: {
        flex: 1,
    },
});
