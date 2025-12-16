import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

interface AskQuestionProps {
    onPostQuestion: (category: string, text: string) => void;
}

export default function AskQuestion({ onPostQuestion }: AskQuestionProps) {
    const [category, setCategory] = useState('Periods');
    const [questionText, setQuestionText] = useState('');

    const categories = ['Periods', 'Symptoms', 'Managing', 'Emotions', 'Other'];

    const handlePost = () => {
        if (questionText.trim()) {
            onPostQuestion(category, questionText.trim());
            setQuestionText('');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Ask a Question</Text>
                    <Text style={styles.headerSubtitle}>
                        Ask anonymously. No judgment, just support.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Category</Text>
                    <View style={styles.categoryContainer}>
                        {categories.map((c) => (
                            <TouchableOpacity
                                key={c}
                                onPress={() => setCategory(c)}
                                style={[
                                    styles.categoryChip,
                                    category === c ? styles.activeCategory : styles.inactiveCategory
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        category === c ? styles.activeCategoryText : styles.inactiveCategoryText
                                    ]}
                                >
                                    {c}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Your Question</Text>
                    <TextInput
                        value={questionText}
                        onChangeText={setQuestionText}
                        placeholder="Type your question here..."
                        placeholderTextColor="#c084fc"
                        multiline
                        style={styles.input}
                        textAlignVertical="top"
                    />
                </View>

                <TouchableOpacity
                    onPress={handlePost}
                    disabled={!questionText.trim()}
                    style={[
                        styles.postButton,
                        !questionText.trim() && styles.disabledButton
                    ]}
                >
                    <Text style={styles.postButtonText}>Post Question</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF5FF',
    },
    content: {
        padding: 24,
        paddingBottom: 100,
    },
    header: {
        marginBottom: 32,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#581c87',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#7e22ce',
        opacity: 0.6,
    },
    section: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        color: '#581c87',
        fontWeight: '600',
        marginBottom: 12,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
    },
    activeCategory: {
        backgroundColor: '#c084fc',
    },
    inactiveCategory: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e9d5ff',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
    },
    activeCategoryText: {
        color: 'white',
    },
    inactiveCategoryText: {
        color: '#7e22ce',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 16,
        minHeight: 150,
        fontSize: 16,
        color: '#581c87',
        borderWidth: 1,
        borderColor: '#e9d5ff',
    },
    postButton: {
        backgroundColor: '#c084fc',
        paddingVertical: 16,
        borderRadius: 100,
        alignItems: 'center',
        shadowColor: '#e9d5ff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 4,
        marginTop: 12,
    },
    disabledButton: {
        backgroundColor: '#e9d5ff',
        shadowOpacity: 0,
        elevation: 0,
    },
    postButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
