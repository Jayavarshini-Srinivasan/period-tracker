import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { AgeRange } from '../types';

interface AgeSelectionProps {
    onSelectAge: (age: AgeRange) => void;
}

export default function AgeSelection({ onSelectAge }: AgeSelectionProps) {
    const ageRanges: AgeRange[] = ['13-14', '15-16', '17-18'];

    return (
        <LinearGradient
            colors={['#FAF5FF', '#F0FDF4', '#FAF5FF']}
            style={styles.container}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>What's your age range?</Text>
                    <Text style={styles.description}>
                        We use this to show you questions and information from others in a similar age group. We don't collect your exact date of birth.
                    </Text>
                </View>

                <View style={styles.optionsContainer}>
                    {ageRanges.map((range) => (
                        <TouchableOpacity
                            key={range}
                            onPress={() => onSelectAge(range)}
                            style={styles.optionButton}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.optionText}>{range}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.footerText}>
                    You can change this later in settings if needed
                </Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#581c87', // purple-900
        marginBottom: 16,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#6b21a8', // purple-800
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 8,
        opacity: 0.8,
    },
    optionsContainer: {
        width: '100%',
        gap: 16,
        marginBottom: 32,
    },
    optionButton: {
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 20,
        borderRadius: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    optionText: {
        fontSize: 18,
        color: '#581c87',
        fontWeight: '500',
    },
    footerText: {
        fontSize: 14,
        color: '#7e22ce', // purple-700
        opacity: 0.6,
        textAlign: 'center',
    },
});
