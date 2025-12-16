import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { essentialsContent } from '../data/essentialsContent';

interface Props {
    essentialId: string;
    onBack: () => void;
}

export default function EssentialsDetailScreen({ essentialId, onBack }: Props) {
    const product = essentialsContent.products.find(p => p.id === essentialId);

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Product not found</Text>
                <TouchableOpacity onPress={onBack}><Text style={styles.backButton}>Back</Text></TouchableOpacity>
            </View>
        );
    }

    const { sections, tutorial, image } = product;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButtonContainer}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{product.title}</Text>
            </View>

            {/* Main Intro with Image */}
            <View style={styles.introCard}>
                {image ? (
                    <Image source={image} style={styles.productImage} resizeMode="contain" />
                ) : (
                    <Text style={styles.introIcon}>{product.icon}</Text>
                )}
                <Text style={styles.introText}>{product.description}</Text>
            </View>

            {/* Section A: What this is */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>What is it?</Text>
                <Text style={styles.sectionText}>{sections.what}</Text>
            </View>

            {/* Section B: Types */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Common Options</Text>
                {sections.types.map((type, index) => (
                    <View key={index} style={styles.bulletRow}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.sectionText}>{type}</Text>
                    </View>
                ))}
            </View>

            {/* NEW: Tutorial Section */}
            {tutorial && tutorial.length > 0 && (
                <View style={styles.tutorialSection}>
                    <Text style={styles.tutorialTitle}>How to Use It</Text>
                    <View style={styles.tutorialCard}>
                        {tutorial.map((step, index) => (
                            <View key={index} style={styles.tutorialStep}>
                                <View style={styles.stepNumber}>
                                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                                </View>
                                <Text style={styles.stepText}>{step}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Section C: How people use it */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>General Usage</Text>
                <Text style={styles.sectionText}>{sections.usage}</Text>
            </View>

            {/* Section D: Why choose this */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Why people like it</Text>
                <Text style={styles.sectionText}>{sections.why}</Text>
            </View>

            {/* Section E: Reminder */}
            <View style={styles.reminderCard}>
                <Text style={styles.reminderIcon}>💜</Text>
                <Text style={styles.reminderText}>{sections.reminder}</Text>
            </View>

            <View style={{ height: 40 }} />
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
    introCard: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 24,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    productImage: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    introIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    introText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#6b21a8',
        fontWeight: '500',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#581c87',
        marginBottom: 12,
    },
    sectionText: {
        fontSize: 16,
        color: '#4b5563',
        lineHeight: 24,
    },
    bulletRow: {
        flexDirection: 'row',
        marginBottom: 8,
        paddingRight: 16,
    },
    bullet: {
        fontSize: 16,
        color: '#7e22ce',
        marginRight: 8,
        marginTop: 2,
    },
    tutorialSection: {
        marginBottom: 24,
    },
    tutorialTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#581c87',
        marginBottom: 12,
    },
    tutorialCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    tutorialStep: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    stepNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#f3e8ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    stepNumberText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#7e22ce',
    },
    stepText: {
        flex: 1,
        fontSize: 15,
        color: '#4b5563',
        lineHeight: 22,
    },
    reminderCard: {
        backgroundColor: '#f0fdf4',
        padding: 20,
        borderRadius: 16,
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
    },
    reminderIcon: {
        fontSize: 20,
    },
    reminderText: {
        flex: 1,
        fontSize: 15,
        color: '#166534',
        lineHeight: 22,
        fontStyle: 'italic',
    },
    backButton: {
        color: '#7e22ce',
        fontSize: 16,
        marginTop: 20,
    }
});
