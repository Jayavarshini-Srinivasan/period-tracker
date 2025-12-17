import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { essentialsContent } from '../data/essentialsContent';

interface Props {
    onBack: () => void;
}

export default function ReproductiveHealthScreen({ onBack }: Props) {
    const { cycle, discharge } = essentialsContent.reproductiveHealth;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButtonContainer}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{cycle.title}</Text>
            </View>

            {/* Cycle Section - States Tiles */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{cycle.teaser}</Text>
            </View>

            <View style={styles.grid}>
                {cycle.states.map((state, index) => (
                    <View key={index} style={styles.tile}>
                        <Text style={styles.tileTitle}>{state.title}</Text>
                        <Text style={styles.tileText}>{state.text}</Text>
                    </View>
                ))}
            </View>

            <View style={[styles.noteBox, { marginBottom: 32 }]}>
                <Text style={styles.noteText}>{cycle.normalization}</Text>
            </View>

            {/* Discharge Section */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardIcon}>💧</Text>
                    <View>
                        <Text style={styles.cardTitle}>{discharge.title}</Text>
                        <Text style={styles.cardSubtitle}>{discharge.teaser}</Text>
                    </View>
                </View>

                <View style={styles.listContainer}>
                    {discharge.patterns.map((pattern, idx) => (
                        <View key={idx} style={styles.row}>
                            <View style={styles.dot} />
                            <View style={styles.rowContent}>
                                <Text style={styles.rowLabel}>{pattern.label}</Text>
                                <Text style={styles.rowDesc}>{pattern.desc}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.noteBox}>
                    <Text style={styles.noteText}>{discharge.normalization}</Text>
                </View>
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
        fontSize: 22,
        fontWeight: '700',
        color: '#581c87',
        flex: 1,
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#7e22ce',
        opacity: 0.8,
        fontStyle: 'italic',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    tile: {
        width: '48%', // roughly half width with gap
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 20,
        marginBottom: 0,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    tileTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#581c87',
        marginBottom: 8,
    },
    tileText: {
        fontSize: 14,
        color: '#4b5563',
        lineHeight: 20,
    },
    card: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 16,
    },
    cardIcon: {
        fontSize: 28,
        backgroundColor: '#F3E8FF',
        width: 48,
        height: 48,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 24,
        lineHeight: 48, // for iOS centering
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#581c87',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#7e22ce',
        marginTop: 2,
    },
    listContainer: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 12,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#c084fc',
        marginTop: 6,
    },
    rowContent: {
        flex: 1,
    },
    rowLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6b21a8',
        marginBottom: 4,
    },
    rowDesc: {
        fontSize: 15,
        color: '#4b5563',
        lineHeight: 22,
    },
    noteBox: {
        backgroundColor: '#f0fdf4',
        padding: 16,
        borderRadius: 16,
    },
    noteText: {
        fontSize: 15,
        color: '#166534',
        fontStyle: 'italic',
        lineHeight: 22,
    }
});
