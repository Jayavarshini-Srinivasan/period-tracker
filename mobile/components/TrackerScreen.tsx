import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { TrackerEntry, Mood } from '../types';

interface TrackerScreenProps {
    trackerData: TrackerEntry[];
    onUpdateEntry: (entry: TrackerEntry) => void;
}

const { width } = Dimensions.get('window');
const CALENDAR_PADDING = 24;
const CELL_GAP = 8;
// Approximate cell size
const CELL_SIZE = (width - (CALENDAR_PADDING * 2) - (CELL_GAP * 6)) / 7;

export default function TrackerScreen({ trackerData, onUpdateEntry }: TrackerScreenProps) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isPeriodDay, setIsPeriodDay] = useState<boolean | null>(null);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [selectedMood, setSelectedMood] = useState<Mood>(null);

    const symptoms = [
        { id: 'cramps', label: 'cramps' },
        { id: 'tired', label: 'tired' },
        { id: 'headache', label: 'headache' },
        { id: 'bloated', label: 'bloated' },
    ];

    const moods: { id: Mood; emoji: string; label: string }[] = [
        { id: 'okay', emoji: '😐', label: 'okay' },
        { id: 'low', emoji: '😔', label: 'low' },
        { id: 'anxious', emoji: '😟', label: 'anxious' },
        { id: 'irritable', emoji: '😡', label: 'irritable' },
    ];

    const getCurrentMonthDays = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        return { firstDay, daysInMonth, year, month };
    };

    const { firstDay, daysInMonth, year, month } = getCurrentMonthDays();
    const today = new Date();

    const isToday = (day: number) => {
        return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    };

    const getEntryForDate = (day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return trackerData.find(e => e.date === dateStr);
    };

    const toggleSymptom = (symptomId: string) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptomId)
                ? prev.filter(s => s !== symptomId)
                : [...prev, symptomId]
        );
    };

    const handleSave = () => {
        if (isPeriodDay === null) return;

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        onUpdateEntry({
            date: dateStr,
            isPeriodDay,
            symptoms: selectedSymptoms,
            mood: selectedMood,
        });

        Alert.alert('Saved', 'Your entry has been saved.');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tracker</Text>
                <Text style={styles.headerSubtitle}>Track how you're feeling today</Text>
            </View>

            {/* Calendar */}
            <View style={styles.card}>
                <View style={styles.calendarHeader}>
                    <Text style={styles.monthTitle}>
                        {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </Text>
                </View>

                <View style={styles.daysHeader}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <Text key={i} style={styles.dayLabel}>{day}</Text>
                    ))}
                </View>

                <View style={styles.grid}>
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <View key={`empty-${i}`} style={styles.cell} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const entry = getEntryForDate(day);
                        const isTodayDate = isToday(day);

                        return (
                            <View
                                key={day}
                                style={[
                                    styles.cell,
                                    isTodayDate && styles.todayCell,
                                    entry?.isPeriodDay && styles.periodCell,
                                ]}
                            >
                                <Text style={[
                                    styles.cellText,
                                    isTodayDate && styles.todayText
                                ]}>
                                    {day}
                                </Text>
                                {entry?.isPeriodDay && (
                                    <View style={styles.periodDotContainer}>
                                        <View style={styles.periodDot} />
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>

                <View style={styles.predictionBox}>
                    <Text style={styles.predictionText}>
                        Based on past entries, your period may be coming in the next few days
                    </Text>
                </View>
            </View>

            {/* Today's tracking */}
            <View style={styles.section}>
                {/* Period day question */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Is today a period day?</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            onPress={() => setIsPeriodDay(true)}
                            style={[
                                styles.choiceButton,
                                isPeriodDay === true ? styles.activeButton : styles.inactiveButton
                            ]}
                        >
                            <Text style={[
                                styles.choiceText,
                                isPeriodDay === true ? styles.activeText : styles.inactiveText
                            ]}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsPeriodDay(false)}
                            style={[
                                styles.choiceButton,
                                isPeriodDay === false ? styles.activeButton : styles.inactiveButton
                            ]}
                        >
                            <Text style={[
                                styles.choiceText,
                                isPeriodDay === false ? styles.activeText : styles.inactiveText
                            ]}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Symptoms */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Any symptoms? (optional)</Text>
                    <View style={styles.tagsContainer}>
                        {symptoms.map(symptom => (
                            <TouchableOpacity
                                key={symptom.id}
                                onPress={() => toggleSymptom(symptom.id)}
                                style={[
                                    styles.tag,
                                    selectedSymptoms.includes(symptom.id) ? styles.activeTag : styles.inactiveTag
                                ]}
                            >
                                <Text style={[
                                    styles.tagText,
                                    selectedSymptoms.includes(symptom.id) ? styles.activeTagText : styles.inactiveTagText
                                ]}>
                                    {symptom.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Mood */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>How are you feeling?</Text>
                    <View style={styles.moodGrid}>
                        {moods.map(mood => (
                            <TouchableOpacity
                                key={mood.id}
                                onPress={() => setSelectedMood(mood.id)}
                                style={[
                                    styles.moodButton,
                                    selectedMood === mood.id ? styles.activeMood : styles.inactiveMood
                                ]}
                            >
                                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                                <Text style={styles.moodLabel}>{mood.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Save button */}
                {isPeriodDay !== null && (
                    <TouchableOpacity
                        onPress={handleSave}
                        style={styles.saveButton}
                    >
                        <Text style={styles.saveButtonText}>Save today's entry</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF5FF', // background approximate
    },
    contentContainer: {
        padding: CALENDAR_PADDING,
        paddingBottom: 100, // space for bottom nav
    },
    header: {
        marginBottom: 24,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: '#581c87',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#7e22ce',
        opacity: 0.6,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    calendarHeader: {
        alignItems: 'center',
        marginBottom: 16,
    },
    monthTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#581c87',
    },
    daysHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    dayLabel: {
        width: CELL_SIZE,
        textAlign: 'center',
        fontSize: 12,
        color: '#9333ea',
        opacity: 0.5,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 0, // we use fixed width for cells, or we can use justifyContent space-between
        // Actually with gap=0 we can control spacing manually via width if needed, but let's try justifyContent
        justifyContent: 'space-between',
    },
    cell: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: CELL_SIZE / 2,
        marginBottom: CELL_GAP,
    },
    todayCell: {
        backgroundColor: '#F3E8FF',
        borderWidth: 2,
        borderColor: '#D8B4FE',
    },
    periodCell: {
        backgroundColor: 'rgba(216, 180, 254, 0.5)',
    },
    cellText: {
        fontSize: 14,
        color: '#7e22ce',
        opacity: 0.7,
    },
    todayText: {
        color: '#581c87',
        fontWeight: 'bold',
        opacity: 1,
    },
    periodDotContainer: {
        position: 'absolute',
        inset: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    periodDot: {
        width: 4,
        height: 4,
        backgroundColor: '#9333ea',
        borderRadius: 2,
        marginTop: 16, // push it down below text
    },
    predictionBox: {
        marginTop: 16,
        backgroundColor: '#F3E8FF',
        borderRadius: 16,
        padding: 12,
    },
    predictionText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#7e22ce',
        opacity: 0.6,
    },
    section: {
        gap: 20,
    },
    cardTitle: {
        fontSize: 16,
        color: '#581c87',
        opacity: 0.9,
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    choiceButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 100,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#c084fc',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    inactiveButton: {
        backgroundColor: '#F3E8FF',
    },
    choiceText: {
        fontSize: 16,
        fontWeight: '500',
    },
    activeText: {
        color: 'white',
    },
    inactiveText: {
        color: '#7e22ce',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
    },
    activeTag: {
        backgroundColor: '#4ade80',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    inactiveTag: {
        backgroundColor: '#dcfce7',
    },
    tagText: {
        fontSize: 14,
    },
    activeTagText: {
        color: 'white',
        fontWeight: '500',
    },
    inactiveTagText: {
        color: '#166534',
    },
    moodGrid: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
    },
    moodButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 16,
        gap: 8,
    },
    activeMood: {
        backgroundColor: '#F3E8FF',
        borderWidth: 2,
        borderColor: '#d8b4fe',
    },
    inactiveMood: {
        backgroundColor: 'rgba(243, 232, 255, 0.5)',
    },
    moodEmoji: {
        fontSize: 24,
    },
    moodLabel: {
        fontSize: 12,
        color: '#7e22ce',
    },
    saveButton: {
        width: '100%',
        backgroundColor: '#c084fc',
        paddingVertical: 16,
        borderRadius: 100,
        alignItems: 'center',
        shadowColor: '#e9d5ff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 4,
        marginTop: 8,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
