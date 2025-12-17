import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { essentialsContent } from '../data/essentialsContent';

interface Props {
    onSelectProduct: (id: string) => void;
    onSelectHealth: () => void;
    onSelectStainRemoval: () => void;
}

export default function EssentialsScreen({ onSelectProduct, onSelectHealth, onSelectStainRemoval }: Props) {
    const { products } = essentialsContent;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Period Essentials</Text>
                <Text style={styles.headerSubtitle}>
                    Learn about different options — everyone finds what works for them
                </Text>
            </View>

            {/* New: Reproductive Health Entry */}
            <TouchableOpacity onPress={onSelectHealth} style={styles.healthCard}>
                <View style={styles.healthIconContainer}>
                    <Text style={styles.healthIcon}>✨</Text>
                </View>
                <View style={styles.healthTextContainer}>
                    <Text style={styles.healthTitle}>Understanding Your Body</Text>
                    <Text style={styles.healthDesc}>
                        Cycles, discharge, and what's normal
                    </Text>
                </View>
                <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>

            <Text style={styles.sectionHeader}>Options to Try</Text>

            {/* Essential cards */}
            <View style={styles.cardsContainer}>
                {products.map(essential => (
                    <TouchableOpacity
                        key={essential.id}
                        style={styles.card}
                        onPress={() => onSelectProduct(essential.id)}
                    >
                        <View style={styles.cardHeader}>
                            <View style={styles.iconContainer}>
                                {essential.image ? (
                                    <Image source={essential.image} style={styles.productImage} resizeMode="cover" />
                                ) : (
                                    <Text style={styles.icon}>{essential.icon}</Text>
                                )}
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{essential.title}</Text>
                                <Text style={styles.description}>{essential.teaser}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Stain Removal Entry */}
            <TouchableOpacity onPress={onSelectStainRemoval} style={styles.utilityRow}>
                <Text style={styles.utilityIcon}>🧼</Text>
                <Text style={styles.utilityText}>Period Stain Removal Tips</Text>
                <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>

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
        lineHeight: 22,
    },
    healthCard: {
        backgroundColor: '#f3e8ff', // darker purple tint
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    healthIconContainer: {
        width: 48,
        height: 48,
        backgroundColor: 'white',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    healthIcon: {
        fontSize: 24,
    },
    healthTextContainer: {
        flex: 1,
    },
    healthTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#581c87',
    },
    healthDesc: {
        fontSize: 14,
        color: '#7e22ce',
        marginTop: 4,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: '600',
        color: '#581c87',
        marginBottom: 16,
    },
    cardsContainer: {
        gap: 16,
        marginBottom: 24,
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
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#faf5ff',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Ensure image respects border radius
    },
    productImage: {
        width: '100%',
        height: '100%',
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
    utilityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginBottom: 24,
        gap: 12,
    },
    utilityIcon: {
        fontSize: 20,
    },
    utilityText: {
        flex: 1,
        fontSize: 16,
        color: '#581c87',
        fontWeight: '500',
    },
    arrowIcon: {
        fontSize: 20,
        color: '#d8b4fe',
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
