import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Modal, Pressable } from 'react-native';
import { essentialsContent } from '../data/essentialsContent';

interface Props {
    essentialId: string;
    onBack: () => void;
}

export default function EssentialsDetailScreen({ essentialId, onBack }: Props) {
    const product = essentialsContent.products.find(p => p.id === essentialId);
    const [showTutorial, setShowTutorial] = useState(false);
    const [selectedVariation, setSelectedVariation] = useState<{ label: string; desc: string } | null>(null);

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

            {/* Main Image */}
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={image} style={styles.productImage} resizeMode="contain" />
                ) : (
                    <Text style={styles.introIcon}>{product.icon}</Text>
                )}
            </View>

            {/* Orientation */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>What is it?</Text>
                <Text style={styles.sectionText}>{sections.orientation}</Text>
            </View>

            {/* Variations - Interactive Chips */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Common Variations</Text>
                <View style={styles.chipContainer}>
                    {sections.variations.map((v, i) => (
                        <TouchableOpacity
                            key={i}
                            style={styles.chip}
                            onPress={() => setSelectedVariation(v)}
                        >
                            <Text style={styles.chipText}>{v.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Usage - Experience based */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>How people usually use it</Text>
                <Text style={styles.sectionText}>{sections.usage}</Text>
            </View>

            {/* Feeling - Emotional */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>How it different options feel</Text>
                <Text style={styles.sectionText}>{sections.feeling}</Text>
            </View>

            {/* Normalization Card */}
            <View style={styles.normalizationCard}>
                <Text style={styles.normalizationIcon}>💜</Text>
                <Text style={styles.normalizationText}>{sections.normalization}</Text>
            </View>

            {/* Hidden Tutorial Toggle */}
            <View style={styles.tutorialContainer}>
                <TouchableOpacity
                    style={styles.tutorialButton}
                    onPress={() => setShowTutorial(!showTutorial)}
                >
                    <Text style={styles.tutorialButtonText}>
                        {showTutorial ? `Hide "How to use"` : `See how to use ${product.title}`}
                    </Text>
                    <Text style={styles.tutorialArrow}>{showTutorial ? '▲' : '▼'}</Text>
                </TouchableOpacity>

                {showTutorial && (
                    <View style={styles.tutorialSteps}>
                        {tutorial.map((step, index) => (
                            <View key={index} style={styles.stepRow}>
                                <View style={styles.stepNumber}>
                                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                                </View>
                                <Text style={styles.stepText}>{step}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            <View style={{ height: 40 }} />

            {/* Custom Modal for Web Compatibility */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={!!selectedVariation}
                onRequestClose={() => setSelectedVariation(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedVariation?.label}</Text>
                        <Text style={styles.modalText}>{selectedVariation?.desc}</Text>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => setSelectedVariation(null)}
                        >
                            <Text style={styles.modalButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
    imageContainer: {
        alignItems: 'center',
        marginBottom: 24,
        height: 140,
        justifyContent: 'center',
    },
    productImage: {
        width: 140,
        height: 140,
    },
    introIcon: {
        fontSize: 64,
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
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#e9d5ff',
        shadowColor: '#000',
        shadowOpacity: 0.02,
        shadowRadius: 2,
        elevation: 1,
    },
    chipText: {
        color: '#6b21a8',
        fontSize: 14,
        fontWeight: '500',
    },
    normalizationCard: {
        backgroundColor: '#f3e8ff',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        marginBottom: 32,
    },
    normalizationIcon: {
        fontSize: 24,
    },
    normalizationText: {
        flex: 1,
        fontSize: 15,
        color: '#581c87',
        fontStyle: 'italic',
        lineHeight: 22,
    },
    tutorialContainer: {
        backgroundColor: 'white',
        borderRadius: 24,
        overflow: 'hidden',
    },
    tutorialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'white',
    },
    tutorialButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#7e22ce',
    },
    tutorialArrow: {
        fontSize: 14,
        color: '#d8b4fe',
    },
    tutorialSteps: {
        padding: 24,
        paddingTop: 0,
        backgroundColor: 'white',
    },
    stepRow: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 12,
    },
    stepNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f3e8ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    stepNumberText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#7e22ce',
    },
    stepText: {
        flex: 1,
        fontSize: 15,
        color: '#4b5563',
        lineHeight: 22,
    },
    backButton: {
        color: '#7e22ce',
        marginTop: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#581c87',
        marginBottom: 12,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 24,
    },
    modalButton: {
        backgroundColor: '#f3e8ff',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 100,
    },
    modalButtonText: {
        color: '#6b21a8',
        fontWeight: '600',
        fontSize: 16,
    }
});
