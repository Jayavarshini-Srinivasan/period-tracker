import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface BottomNavProps {
    currentScreen: 'tracker' | 'feed' | 'ask' | 'essentials' | 'reflection';
    onNavigate: (screen: 'tracker' | 'feed' | 'ask' | 'essentials' | 'reflection') => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
    const navItems = [
        {
            id: 'tracker' as const,
            label: 'Tracker',
            icon: (active: boolean) => (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke={active ? 'currentColor' : 'currentColor'} strokeWidth={active ? 0 : 2} color={active ? '#9333ea' : '#c084fc'}>
                    {/* Note: In web version, fill was used with stroke. In RN SVG, behavior might differ. 
              The web code used fill={active ? 'currentColor'} but also stroke. 
              For "fill" style icons vs "outline", we usually switch paths or properties.
              The web paths: "M8 7V3m8 4V3..." looks like outline. */}
                    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" fill={active ? 'currentColor' : 'none'} />
                </Svg>
            ),
        },
        {
            id: 'feed' as const,
            label: 'Feed',
            icon: (active: boolean) => (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke={active ? 'currentColor' : 'currentColor'} strokeWidth={active ? 0 : 2} color={active ? '#9333ea' : '#c084fc'}>
                    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" fill={active ? 'currentColor' : 'none'} />
                </Svg>
            ),
        },
        {
            id: 'ask' as const,
            label: 'Ask',
            icon: (active: boolean) => (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke={active ? 'currentColor' : 'currentColor'} strokeWidth={active ? 0 : 2} color={active ? '#9333ea' : '#c084fc'}>
                    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </Svg>
            ),
        },
        {
            id: 'essentials' as const,
            label: 'Essentials',
            icon: (active: boolean) => (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke={active ? 'currentColor' : 'currentColor'} strokeWidth={active ? 0 : 2} color={active ? '#9333ea' : '#c084fc'}>
                    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" fill={active ? 'currentColor' : 'none'} />
                </Svg>
            ),
        },
        {
            id: 'reflection' as const,
            label: 'Reflection',
            icon: (active: boolean) => (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke={active ? 'currentColor' : 'currentColor'} strokeWidth={active ? 0 : 2} color={active ? '#9333ea' : '#c084fc'}>
                    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" fill={active ? 'currentColor' : 'none'} />
                </Svg>
            ),
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {navItems.map(item => {
                    const isActive = currentScreen === item.id;
                    return (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => onNavigate(item.id)}
                            style={[
                                styles.navItem,
                                isActive && styles.activeNavItem
                            ]}
                            activeOpacity={0.7}
                        >
                            {item.icon(isActive)}
                            <Text style={[styles.label, isActive && styles.activeLabel]}>{item.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f3e8ff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 8,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navItem: {
        alignItems: 'center',
        padding: 8,
        borderRadius: 16,
        minWidth: 60,
        gap: 4,
    },
    activeNavItem: {
        backgroundColor: '#faf5ff',
    },
    label: {
        fontSize: 10,
        color: '#c084fc',
        fontWeight: '500',
    },
    activeLabel: {
        color: '#9333ea',
    },
});
