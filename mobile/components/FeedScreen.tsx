import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { Question } from '../types';

interface FeedScreenProps {
    questions: Question[];
    onQuestionClick: (questionId: string) => void;
}

export default function FeedScreen({ questions, onQuestionClick }: FeedScreenProps) {
    const getTimeAgo = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'just now';
    };

    const renderItem = ({ item }: { item: Question }) => (
        <TouchableOpacity
            onPress={() => onQuestionClick(item.id)}
            style={styles.card}
            activeOpacity={0.7}
        >
            <View style={styles.cardHeader}>
                <View style={styles.userInfo}>
                    <View style={styles.avatar}>
                        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <Path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </Svg>
                    </View>
                    <Text style={styles.userText}>Someone, {item.ageRange}</Text>
                </View>
                <Text style={styles.timeText}>{getTimeAgo(item.timestamp)}</Text>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <Text style={styles.questionText} numberOfLines={3}>{item.previewText}</Text>
            </View>

            <View style={styles.cardFooter}>
                <View style={styles.replyCount}>
                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                        <Path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </Svg>
                    <Text style={styles.replyText}>
                        {item.answers.length} {item.answers.length === 1 ? 'reply' : 'replies'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Is This Normal?</Text>
                <Text style={styles.headerSubtitle}>
                    Browse questions from others in your age group
                </Text>
            </View>

            {/* Questions feed */}
            {questions.length === 0 ? (
                <View style={styles.emptyState}>
                    <View style={styles.emptyIcon}>
                        <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <Path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </Svg>
                    </View>
                    <Text style={styles.emptyText}>No questions yet</Text>
                    <Text style={styles.emptySubtext}>Be the first to ask something</Text>
                </View>
            ) : (
                <FlatList
                    data={questions}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF5FF',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#581c87',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#7e22ce',
        opacity: 0.6,
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 100, // Space for bottom nav
        gap: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'transparent', // Prepare for hover/active states if needed
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F3E8FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userText: {
        fontSize: 14,
        color: '#7e22ce',
        opacity: 0.7,
    },
    timeText: {
        fontSize: 12,
        color: '#9333ea',
        opacity: 0.5,
    },
    cardContent: {
        marginBottom: 12,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#F0FDF4',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 100,
        marginBottom: 12,
    },
    categoryText: {
        fontSize: 12,
        color: '#166534',
        fontWeight: '500',
    },
    questionText: {
        fontSize: 16,
        color: '#581c87',
        lineHeight: 22,
        opacity: 0.9,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyCount: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    replyText: {
        fontSize: 14,
        color: '#9333ea',
        opacity: 0.6,
    },
    emptyState: {
        padding: 48,
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 24,
        borderRadius: 24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    emptyIcon: {
        width: 64,
        height: 64,
        backgroundColor: '#F3E8FF',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 16,
        color: '#7e22ce',
        opacity: 0.6,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#9333ea',
        opacity: 0.5,
    },
});
