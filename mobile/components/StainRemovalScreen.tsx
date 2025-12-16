import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { essentialsContent } from '../data/essentialsContent';

interface Props {
    onBack: () => void;
}

export default function StainRemovalScreen({ onBack }: Props) {
    const tips = essentialsContent.stainRemoval;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButtonContainer}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Stain Removal Tips</Text>
            </View>

            <View style={styles.introBox}>
                <Text style={styles.introText}>
                    Stains happen to everyone. It's completely normal and nothing to be embarrassed about. Here are some simple ways to handle them.
                </Text>
            </View>

            <View style={styles.grid}>
                {tips.map((tip, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.numberCircle}>
                            <Text style={styles.number}>{index + 1}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.tipTitle}>{tip.title}</Text>
                            <Text style={styles.tipText}>{tip.text}</Text>
                        </View>
                    </View>
                ))}
            </View>

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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    backButtonContainer: {
        padding: 8,
        marginRight: 16,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    backIcon: {
        fontSize: 20,
        color: '#7e22ce',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#581c87',
    },
    introBox: {
        marginBottom: 32,
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#c084fc',
    },
    introText: {
        fontSize: 16,
        color: '#6b21a8',
        lineHeight: 24,
    },
    grid: {
        gap: 16,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        gap: 16,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    numberCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f3e8ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        fontSize: 14,
        fontWeight: '700',
        color: '#7e22ce',
    },
    textContainer: {
        flex: 1,
    },
    tipTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#581c87',
        marginBottom: 4,
    },
    tipText: {
        fontSize: 15,
        color: '#4b5563',
        lineHeight: 22,
    }
});
