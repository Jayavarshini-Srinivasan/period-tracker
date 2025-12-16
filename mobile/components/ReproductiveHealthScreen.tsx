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
                <Text style={styles.headerTitle}>Understanding Your Body</Text>
            </View>

            {/* Cycle Section */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardIcon}>🔄</Text>
                    <Text style={styles.cardTitle}>{cycle.title}</Text>
                </View>
                <Text style={styles.text}>{cycle.content}</Text>
                <View style={styles.noteBox}>
                    <Text style={styles.noteText}>{cycle.note}</Text>
                </View>
            </View>

            {/* Discharge Section */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardIcon}>💧</Text>
                    <Text style={styles.cardTitle}>{discharge.title}</Text>
                </View>
                <Text style={styles.text}>{discharge.content}</Text>

                <View style={styles.listContainer}>
                    {discharge.types.map((type, idx) => (
                        <View key={idx} style={styles.bulletRow}>
                            <Text style={styles.bullet}>•</Text>
                            {/* Parse bold text simply */}
                            <Text style={styles.text}>
                                {type.split('**').map((part, i) =>
                                    i % 2 === 1 ? <Text key={i} style={styles.bold}>{part}</Text> : part
                                )}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.noteBox}>
                    <Text style={styles.noteText}>{discharge.reminder}</Text>
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
        marginBottom: 16,
        gap: 12,
    },
    cardIcon: {
        fontSize: 24,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#581c87',
    },
    text: {
        fontSize: 16,
        color: '#4b5563',
        lineHeight: 24,
        marginBottom: 12,
    },
    listContainer: {
        marginTop: 8,
        marginBottom: 16,
    },
    bulletRow: {
        flexDirection: 'row',
        marginBottom: 8,
        paddingRight: 8,
    },
    bullet: {
        fontSize: 16,
        color: '#7e22ce',
        marginRight: 8,
        marginTop: 2,
    },
    bold: {
        fontWeight: '700',
        color: '#6b21a8',
    },
    noteBox: {
        backgroundColor: '#f0fdf4',
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
    },
    noteText: {
        fontSize: 15,
        color: '#166534',
        fontStyle: 'italic',
        lineHeight: 22,
    }
});
