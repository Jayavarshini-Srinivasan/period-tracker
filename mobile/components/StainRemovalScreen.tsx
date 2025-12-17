import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { essentialsContent } from '../data/essentialsContent';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
    onBack: () => void;
}

export default function StainRemovalScreen({ onBack }: Props) {
    const tips = essentialsContent.stainRemoval;
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButtonContainer}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Stain Removal Tips</Text>
            </View>

            <View style={styles.grid}>
                {tips.map((tip, index) => {
                    const isReassurance = tip.id === 'reassurance';
                    const isExpanded = expandedId === tip.id;

                    if (isReassurance) {
                        return (
                            <View key={tip.id} style={styles.reassuranceCard}>
                                <Text style={styles.reassuranceIcon}>💛</Text>
                                <Text style={styles.reassuranceText}>{tip.goodToKnow}</Text>
                            </View>
                        );
                    }

                    return (
                        <View key={tip.id} style={styles.card}>
                            <TouchableOpacity
                                style={styles.cardHeader}
                                onPress={() => toggleExpand(tip.id)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.titleContainer}>
                                    <Text style={styles.tipTitle}>{tip.title}</Text>
                                    {tip.subtitle ? <Text style={styles.tipSubtitle}>{tip.subtitle}</Text> : null}
                                </View>
                                <Text style={[styles.chevron, isExpanded && styles.chevronRotated]}>⌄</Text>
                            </TouchableOpacity>

                            {isExpanded && (
                                <View style={styles.cardContent}>
                                    {/* Steps */}
                                    <View style={styles.stepsContainer}>
                                        <Text style={styles.sectionLabel}>Steps:</Text>
                                        {tip.steps.map((step, i) => (
                                            <View key={i} style={styles.stepRow}>
                                                <View style={styles.bullet} />
                                                <Text style={styles.stepText}>{step}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    {/* Good to know */}
                                    {tip.goodToKnow && (
                                        <View style={styles.goodToKnowBox}>
                                            <Text style={styles.goodToKnowLabel}>Good to know:</Text>
                                            <Text style={styles.goodToKnowText}>{tip.goodToKnow}</Text>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    );
                })}
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
        paddingBottom: 40,
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
    grid: {
        gap: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
        overflow: 'hidden',
    },
    cardHeader: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
    },
    tipTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#581c87',
    },
    tipSubtitle: {
        fontSize: 14,
        color: '#9333ea',
        marginTop: 2,
    },
    chevron: {
        fontSize: 24,
        color: '#c084fc',
        fontWeight: 'bold',
        marginLeft: 16,
    },
    chevronRotated: {
        transform: [{ rotate: '180deg' }],
    },
    cardContent: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 0,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#581c87',
        marginBottom: 12,
        opacity: 0.6,
    },
    stepsContainer: {
        marginBottom: 20,
    },
    stepRow: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'flex-start',
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#d8b4fe',
        marginTop: 8,
        marginRight: 12,
    },
    stepText: {
        fontSize: 16,
        color: '#4b5563',
        lineHeight: 24,
        flex: 1,
    },
    goodToKnowBox: {
        backgroundColor: '#F3E8FF',
        padding: 16,
        borderRadius: 16,
    },
    goodToKnowLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#7e22ce',
        marginBottom: 4,
    },
    goodToKnowText: {
        fontSize: 15,
        color: '#6b21a8',
        lineHeight: 22,
    },
    reassuranceCard: {
        backgroundColor: '#fdf4ff', // Warmer/different tone for reassurance
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 8,
    },
    reassuranceIcon: {
        fontSize: 32,
        marginBottom: 12,
    },
    reassuranceText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#86198f',
        lineHeight: 24,
        fontStyle: 'italic',
    },
});
