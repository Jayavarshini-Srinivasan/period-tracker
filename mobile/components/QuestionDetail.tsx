import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { Question } from '../types';

interface QuestionDetailProps {
    question: Question;
    onBack: () => void;
    onAddAnswer: (questionId: string, answerText: string) => void;
    onToggleHelpful: (questionId: string, answerId: string) => void;
}

export default function QuestionDetail({ question, onBack, onAddAnswer, onToggleHelpful }: QuestionDetailProps) {
    const [replyText, setReplyText] = useState('');

    const handleSubmit = () => {
        if (replyText.trim() && !question.isExpired) {
            onAddAnswer(question.id, replyText.trim());
            setReplyText('');
        }
    };

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

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#7e22ce" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M15 19l-7-7 7-7" />
                    </Svg>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Question</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Question card */}
                <View style={styles.questionCard}>
                    <View style={styles.userInfo}>
                        <View style={styles.avatar}>
                            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <Path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </Svg>
                        </View>
                        <View>
                            <Text style={styles.userText}>Someone, {question.ageRange}</Text>
                            <Text style={styles.timeText}>{getTimeAgo(question.timestamp)}</Text>
                        </View>
                    </View>

                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{question.category}</Text>
                    </View>

                    <Text style={styles.questionText}>{question.text}</Text>
                </View>

                {/* Expired notice */}
                {question.isExpired && (
                    <View style={styles.expiredNotice}>
                        <Text style={styles.expiredText}>
                            This question is now closed, but you can still read the responses.
                        </Text>
                    </View>
                )}

                {/* Answers */}
                <View style={styles.answersContainer}>
                    {question.answers.length === 0 ? (
                        <View style={styles.emptyAnswers}>
                            <View style={styles.emptyIcon}>
                                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <Path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </Svg>
                            </View>
                            <Text style={styles.emptyText}>No replies yet</Text>
                            <Text style={styles.emptySubtext}>Be the first to respond</Text>
                        </View>
                    ) : (
                        question.answers.map(answer => (
                            <View key={answer.id} style={styles.answerCard}>
                                <View style={styles.answerHeader}>
                                    <View style={styles.answerAvatar}>
                                        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                            <Path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </Svg>
                                    </View>
                                    <View style={styles.answerContent}>
                                        <Text style={styles.answerText}>{answer.text}</Text>
                                        <TouchableOpacity
                                            onPress={() => onToggleHelpful(question.id, answer.id)}
                                            disabled={question.isExpired}
                                            style={[
                                                styles.helpfulButton,
                                                answer.isHelpfulByUser ? styles.helpfulActive : styles.helpfulInactive
                                            ]}
                                        >
                                            <Svg width={14} height={14} viewBox="0 0 24 24" fill={answer.isHelpfulByUser ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" color={answer.isHelpfulByUser ? '#7e22ce' : '#9333ea'}>
                                                <Path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </Svg>
                                            <Text style={[styles.helpfulText, answer.isHelpfulByUser && styles.helpfulTextActive]}>
                                                Helpful {answer.helpfulCount > 0 && `to ${answer.helpfulCount}`}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>

            {/* Reply input */}
            {!question.isExpired && (
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
                >
                    <View style={styles.inputContainer}>
                        <View style={styles.inputRow}>
                            <TextInput
                                value={replyText}
                                onChangeText={setReplyText}
                                placeholder="Write a supportive reply..."
                                placeholderTextColor="#c084fc"
                                style={styles.input}
                                multiline
                            />
                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={!replyText.trim()}
                                style={[
                                    styles.sendButton,
                                    !replyText.trim() && styles.sendButtonDisabled
                                ]}
                            >
                                <Text style={styles.sendButtonText}>Reply</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.privacyNote}>
                            Your reply will be posted anonymously
                        </Text>
                    </View>
                </KeyboardAvoidingView>
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: 50, // Safe area
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f3e8ff',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#faf5ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#581c87',
    },
    content: {
        padding: 24,
        paddingBottom: 100,
    },
    questionCard: {
        backgroundColor: '#FAF5FF',
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#e9d5ff',
    },
    userInfo: {
        flexDirection: 'row',
        items: 'center',
        gap: 12,
        marginBottom: 16,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E9D5FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userText: {
        fontSize: 14,
        color: '#7e22ce',
    },
    timeText: {
        fontSize: 12,
        color: '#9333ea',
        opacity: 0.6,
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
        fontSize: 18,
        color: '#581c87',
        lineHeight: 26,
    },
    expiredNotice: {
        backgroundColor: '#F3E8FF',
        padding: 16,
        borderRadius: 16,
        marginBottom: 24,
        alignItems: 'center',
    },
    expiredText: {
        fontSize: 14,
        color: '#7e22ce',
        opacity: 0.7,
    },
    answersContainer: {
        gap: 16,
    },
    emptyAnswers: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
    },
    emptyIcon: {
        width: 48,
        height: 48,
        backgroundColor: '#F0FDF4',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 14,
        color: '#7e22ce',
        opacity: 0.6,
    },
    emptySubtext: {
        fontSize: 12,
        color: '#9333ea',
        opacity: 0.5,
    },
    answerCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    answerHeader: {
        flexDirection: 'row',
        gap: 12,
    },
    answerAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    answerContent: {
        flex: 1,
    },
    answerText: {
        fontSize: 14,
        color: '#581c87',
        marginBottom: 12,
        lineHeight: 20,
    },
    helpfulButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
    helpfulActive: {
        backgroundColor: '#F3E8FF',
    },
    helpfulInactive: {
        backgroundColor: '#FAF5FF',
    },
    helpfulText: {
        fontSize: 12,
        color: '#9333ea',
    },
    helpfulTextActive: {
        color: '#7e22ce',
        fontWeight: '500',
    },
    inputContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f3e8ff',
        paddingBottom: 32, // Safe area
    },
    inputRow: {
        flexDirection: 'row',
        gap: 12,
    },
    input: {
        flex: 1,
        backgroundColor: '#FAF5FF',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: '#581c87',
        fontSize: 14,
    },
    sendButton: {
        backgroundColor: '#c084fc',
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 20,
    },
    sendButtonDisabled: {
        backgroundColor: '#F3E8FF',
    },
    sendButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    privacyNote: {
        fontSize: 10,
        color: '#9333ea',
        opacity: 0.5,
        textAlign: 'center',
        marginTop: 8,
    },
});
