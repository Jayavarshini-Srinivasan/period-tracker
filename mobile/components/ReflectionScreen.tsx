import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { TrackerEntry, Question } from '../types';

interface ReflectionScreenProps {
    trackerData: TrackerEntry[];
    questions: Question[];
}

export default function ReflectionScreen({ trackerData, questions }: ReflectionScreenProps) {
    const getPeriodDayCount = () => {
        return trackerData.filter(e => e.isPeriodDay).length;
    };

    const getMoodSummary = () => {
        const moods = trackerData.filter(e => e.mood).map(e => e.mood);
        if (moods.length === 0) return null;

        // @ts-ignore
        const moodCounts: Record<string, number> = {};
        moods.forEach(mood => {
            // @ts-ignore
            if (mood) moodCounts[mood] = (moodCounts[mood] || 0) + 1;
        });

        const mostCommon = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
        return mostCommon ? mostCommon[0] : null;
    };

    const getSymptomSummary = () => {
        const allSymptoms = trackerData.flatMap(e => e.symptoms);
        if (allSymptoms.length === 0) return null;

        const symptomCounts: Record<string, number> = {};
        allSymptoms.forEach(symptom => {
            symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
        });

        return Object.entries(symptomCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([symptom]) => symptom);
    };

    const getHelpfulCount = () => {
        let count = 0;
        questions.forEach(q => {
            q.answers.forEach(a => {
                if (a.isHelpfulByUser) count++;
            });
        });
        return count;
    };

    const periodDayCount = getPeriodDayCount();
    const commonMood = getMoodSummary();
    const topSymptoms = getSymptomSummary();
    const helpfulCount = getHelpfulCount();

    const moodEmojis: Record<string, string> = {
        okay: '😐',
        low: '😔',
        anxious: '😟',
        irritable: '😡',
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>This Month</Text>
                <Text style={styles.headerSubtitle}>
                    A gentle look at patterns and how you've been
                </Text>
            </View>

            {/* Period summary */}
            {periodDayCount > 0 ? (
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>🌙</Text>
                        </View>
                        <Text style={styles.cardTitle}>Period Summary</Text>
                    </View>
                    <Text style={styles.cardText}>
                        You tracked {periodDayCount} period {periodDayCount === 1 ? 'day' : 'days'} this month.
                    </Text>
                </View>
            ) : (
                <View style={[styles.card, styles.centerCard]}>
                    <View style={[styles.iconContainer, styles.centerIcon]}>
                        <Text style={styles.icon}>🌙</Text>
                    </View>
                    <Text style={styles.emptyText}>
                        No period days tracked yet this month
                    </Text>
                </View>
            )}

            {/* Mood reflection */}
            {commonMood ? (
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.iconContainer, styles.greenIconWithBg]}>
                            <Text style={styles.icon}>{moodEmojis[commonMood] || '💭'}</Text>
                        </View>
                        <Text style={styles.cardTitle}>Mood Pattern</Text>
                    </View>
                    <Text style={styles.cardText}>
                        You felt "{commonMood}" on several days this month. Your feelings can shift day to day, and that's completely normal.
                    </Text>
                </View>
            ) : null}

            {/* Symptom mentions */}
            {topSymptoms && topSymptoms.length > 0 ? (
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>💭</Text>
                        </View>
                        <Text style={styles.cardTitle}>What You Noticed</Text>
                    </View>
                    <Text style={styles.cardText}>
                        You mentioned experiencing:
                    </Text>
                    <View style={styles.tagsContainer}>
                        {topSymptoms.map(symptom => (
                            <View key={symptom} style={styles.tag}>
                                <Text style={styles.tagText}>{symptom}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            ) : null}

            {/* Community engagement */}
            {helpfulCount > 0 && (
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>💜</Text>
                        </View>
                        <Text style={styles.cardTitle}>You Found Support</Text>
                    </View>
                    <Text style={styles.cardText}>
                        You found {helpfulCount} {helpfulCount === 1 ? 'answer' : 'answers'} helpful this month. It's good to know others understand what you're going through.
                    </Text>
                </View>
            )}

            {/* Preparedness */}
            <LinearGradient
                colors={['#faf5ff', '#f0fdf4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientCard}
            >
                <View style={styles.cardHeader}>
                    <View style={styles.whiteIconContainer}>
                        <Text style={styles.icon}>✨</Text>
                    </View>
                    <Text style={styles.cardTitle}>You're Doing Great</Text>
                </View>
                <Text style={styles.cardText}>
                    By tracking and learning, you're getting to know your own patterns. That can help you feel more prepared.
                </Text>
                <Text style={styles.subText}>
                    Remember: patterns can change month to month, and that's completely okay. Your body is still figuring things out.
                </Text>
            </LinearGradient>

            {/* Empty state */}
            {periodDayCount === 0 && !commonMood && (!topSymptoms || topSymptoms.length === 0) && (
                <View style={styles.emptyStateContainer}>
                    <View style={styles.emptyIconContainer}>
                        <Text style={styles.emptyIconEmoji}>📝</Text>
                    </View>
                    <Text style={styles.emptyTitle}>Start tracking to see your reflection</Text>
                    <Text style={styles.emptySubTitle}>
                        As you track your periods and moods, you'll see gentle patterns and reflections here
                    </Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF5FF',
    },
    content: {
        padding: 24,
        paddingBottom: 100, // Space for bottom nav
    },
    header: {
        marginBottom: 24,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: '#581c87',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#7e22ce',
        opacity: 0.6,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        backgroundColor: '#faf5ff',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greenIconWithBg: {
        backgroundColor: '#dcfce7',
    },
    whiteIconContainer: {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 24,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#581c87',
    },
    cardText: {
        fontSize: 16,
        color: '#6b21a8',
        opacity: 0.8,
        lineHeight: 24,
        marginBottom: 8,
    },
    centerCard: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    centerIcon: {
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 14,
        color: '#7e22ce',
        opacity: 0.7,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
    },
    tag: {
        backgroundColor: '#dcfce7',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
    },
    tagText: {
        fontSize: 14,
        color: '#166534',
    },
    gradientCard: {
        borderRadius: 24,
        padding: 24,
        marginBottom: 16,
    },
    subText: {
        fontSize: 14,
        color: '#7e22ce',
        opacity: 0.7,
        marginTop: 8,
        lineHeight: 20,
    },
    emptyStateContainer: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 48,
        alignItems: 'center',
        marginTop: 24,
    },
    emptyIconContainer: {
        width: 64,
        height: 64,
        backgroundColor: '#faf5ff',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    emptyIconEmoji: {
        fontSize: 32,
    },
    emptyTitle: {
        fontSize: 16,
        color: '#7e22ce',
        opacity: 0.7,
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubTitle: {
        fontSize: 14,
        color: '#9333ea',
        opacity: 0.5,
        textAlign: 'center',
        lineHeight: 20,
    },
});
