import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';

interface WelcomeScreenProps {
    onContinue: () => void;
}

const { width } = Dimensions.get('window');

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
    return (
        <LinearGradient
            colors={['#FAF5FF', '#F0FDF4', '#FAF5FF']}
            style={styles.container}
        >
            <View style={styles.content}>
                {/* Soft illustration */}
                <View style={styles.illustrationContainer}>
                    <View style={styles.illustration}>
                        {/* Background blobs simulated with Views for blur effect if possible, 
                but using Opacity circles here for simplicity */}
                        <View style={[styles.blob, styles.purpleBlob]} />
                        <View style={[styles.blob, styles.greenBlob]} />

                        <Svg width="200" height="200" viewBox="0 0 200 200" style={styles.svg}>
                            <Circle cx="100" cy="80" r="40" fill="#D8B5E8" opacity="0.6" />
                            <Circle cx="80" cy="120" r="35" fill="#B8D4BE" opacity="0.6" />
                            <Circle cx="120" cy="125" r="30" fill="#C5ADBE" opacity="0.6" />
                        </Svg>
                    </View>
                </View>

                {/* Welcome text */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Welcome to your space</Text>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                            This is a calm, private place to track how you're feeling, learn about periods, and ask questions anonymously.
                        </Text>

                        <View style={styles.featuresCard}>
                            <View style={styles.featureRow}>
                                <View style={[styles.iconContainer, styles.purpleIconBg]}>
                                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <Path d="M5 13l4 4L19 7" />
                                    </Svg>
                                </View>
                                <Text style={styles.featureText}>Everything you share is anonymous</Text>
                            </View>

                            <View style={styles.featureRow}>
                                <View style={[styles.iconContainer, styles.greenIconBg]}>
                                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <Path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </Svg>
                                </View>
                                <Text style={styles.featureText}>Your information stays private</Text>
                            </View>

                            <View style={styles.featureRow}>
                                <View style={[styles.iconContainer, styles.purpleIconBg]}>
                                    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <Path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </Svg>
                                </View>
                                <Text style={styles.featureText}>This is a judgment-free space</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* CTA */}
                <TouchableOpacity
                    onPress={onContinue}
                    style={styles.button}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
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
    illustrationContainer: {
        marginBottom: 48,
        alignItems: 'center',
    },
    illustration: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    blob: {
        position: 'absolute',
        borderRadius: 100,
        opacity: 0.3,
    },
    purpleBlob: {
        width: 200,
        height: 200,
        backgroundColor: '#E9D5FF', // purple-200
        top: 0,
        left: 0,
    },
    greenBlob: {
        width: 160,
        height: 160,
        backgroundColor: '#BBF7D0', // green-200
        top: 20,
        left: 20,
    },
    svg: {
        zIndex: 10,
    },
    textContainer: {
        width: '100%',
        marginBottom: 48,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#581c87', // purple-900
        textAlign: 'center',
        marginBottom: 24,
    },
    descriptionContainer: {
        paddingHorizontal: 8,
    },
    description: {
        fontSize: 16,
        color: '#6b21a8', // purple-800
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 24,
    },
    featuresCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 24,
        padding: 24,
        gap: 12,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    iconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    purpleIconBg: {
        backgroundColor: 'rgba(233, 213, 255, 0.5)', // purple-200/50
    },
    greenIconBg: {
        backgroundColor: 'rgba(187, 247, 208, 0.5)', // green-200/50
    },
    featureText: {
        fontSize: 14,
        color: '#333',
    },
    button: {
        width: '100%',
        backgroundColor: '#c084fc', // purple-400
        paddingVertical: 16,
        borderRadius: 100,
        alignItems: 'center',
        shadowColor: '#e9d5ff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
