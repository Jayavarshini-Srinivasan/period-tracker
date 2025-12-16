import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Essential {
    id: string;
    title: string;
    description: string;
    reasons: string[];
    icon: string;
}

export default function EssentialsScreen() {
    const essentials: Essential[] = [
        {
            id: 'pads',
            title: 'Pads',
            description: 'External protection that sticks to underwear',
            reasons: [
                'Easy to use and see when to change',
                'Available in different sizes',
                'Some people find them comfortable for overnight',
            ],
            icon: '🌸',
        },
        {
            id: 'tampons',
            title: 'Tampons',
            description: 'Internal protection that absorbs flow',
            reasons: [
                'Some people like that they\'re less visible',
                'Can be worn while swimming',
                'Available in different absorbency levels',
            ],
            icon: '🌿',
        },
        {
            id: 'cups',
            title: 'Menstrual Cups',
            description: 'Reusable internal cup that collects flow',
            reasons: [
                'Can be worn for longer periods',
                'Some people like the reusable aspect',
                'Comes in different sizes',
            ],
            icon: '🌙',
        },
        {
            id: 'underwear',
            title: 'Period Underwear',
            description: 'Absorbent underwear designed for periods',
            reasons: [
                'Can be worn alone or as backup',
                'Reusable and washable',
                'Some people find them comfortable',
            ],
            icon: '💜',
        },
        {
            id: 'heat',
            title: 'Heat Pads',
            description: 'Warmth for cramp relief',
            reasons: [
                'Can help ease discomfort',
                'Available in reusable or disposable options',
                'Some are portable and discreet',
            ],
            icon: '☀️',
        },
        {
            id: 'comfort',
            title: 'Comfort Basics',
            description: 'Other things that might help',
            reasons: [
                'Comfortable clothes you feel good in',
                'Whatever snacks sound good to you',
                'A water bottle to stay hydrated',
            ],
            icon: '✨',
        },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Period Essentials</Text>
                <Text style={styles.headerSubtitle}>
                    Learn about different options — everyone finds what works for them
                </Text>
            </View>

            {/* Essential cards */}
            <View style={styles.cardsContainer}>
                {essentials.map(essential => (
                    <View key={essential.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.iconContainer}>
                                <Text style={styles.icon}>{essential.icon}</Text>
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{essential.title}</Text>
                                <Text style={styles.description}>{essential.description}</Text>
                            </View>
                        </View>

                        <View style={styles.reasonsContainer}>
                            <Text style={styles.reasonsTitle}>Some people like this because:</Text>
                            <View style={styles.reasonsList}>
                                {essential.reasons.map((reason, idx) => (
                                    <View key={idx} style={styles.reasonRow}>
                                        <Text style={styles.bullet}>•</Text>
                                        <Text style={styles.reasonText}>{reason}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            {/* Bottom note */}
            <View style={styles.noteContainer}>
                <Text style={styles.noteText}>
                    There's no "right" choice — it's about finding what feels comfortable and works for you. You can try different things at different times.
                </Text>
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
        paddingBottom: 100, // Space for bottom nav
    },
    header: {
        marginBottom: 24,
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
    cardsContainer: {
        gap: 16,
        marginBottom: 24,
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
    },
    cardHeader: {
        flexDirection: 'row',
        gap: 16,
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
    icon: {
        fontSize: 24,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#581c87',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#7e22ce',
        opacity: 0.7,
    },
    reasonsContainer: {
        backgroundColor: '#f0fdf4',
        borderRadius: 16,
        padding: 16,
    },
    reasonsTitle: {
        fontSize: 14,
        color: '#166534',
        opacity: 0.7,
        marginBottom: 8,
        fontWeight: '500',
    },
    reasonsList: {
        gap: 8,
    },
    reasonRow: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'flex-start',
    },
    bullet: {
        color: '#22c55e',
        fontSize: 14,
        marginTop: 2,
    },
    reasonText: {
        flex: 1,
        fontSize: 14,
        color: '#166534',
        opacity: 0.8,
        lineHeight: 20,
    },
    noteContainer: {
        backgroundColor: 'rgba(233, 213, 255, 0.3)', // purple-100/30
        borderRadius: 24,
        padding: 24,
    },
    noteText: {
        fontSize: 14,
        color: '#7e22ce',
        opacity: 0.7,
        textAlign: 'center',
        lineHeight: 20,
    },
});
