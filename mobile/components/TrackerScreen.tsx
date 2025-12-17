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
    // Track if user has manually touched form for the selected date
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Update form when date changes
    React.useEffect(() => {
        const entry = getEntryForDate(selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear());
        if (entry) {
            setIsPeriodDay(entry.isPeriodDay);
            setSelectedSymptoms(entry.symptoms || []);
            setSelectedMood(entry.mood || null);
        } else {
            setIsPeriodDay(null);
            setSelectedSymptoms([]);
            setSelectedMood(null);
        }
        setHasUnsavedChanges(false);
    }, [selectedDate, trackerData]);

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

    const isSelected = (day: number) => {
        return day === selectedDate.getDate();
    };

    const getEntryForDate = (day: number, m = month, y = year) => {
        const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return trackerData.find(e => e.date === dateStr);
    };

    const handlePrevMonth = () => {
        setSelectedDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setSelectedDate(new Date(year, month + 1, 1));
    };

    const handleDayPress = (day: number) => {
        setSelectedDate(new Date(year, month, day));
    };

    const toggleSymptom = (symptomId: string) => {
        setHasUnsavedChanges(true);
        setSelectedSymptoms(prev =>
            prev.includes(symptomId)
                ? prev.filter(s => s !== symptomId)
                : [...prev, symptomId]
        );
    };

    const handleSetIsPeriodDay = (val: boolean) => {
        setHasUnsavedChanges(true);
        setIsPeriodDay(val);
    };

    const handleSetMood = (val: Mood) => {
        setHasUnsavedChanges(true);
        setSelectedMood(val);
    };

    const handleSave = () => {
        if (isPeriodDay === null) return;

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        onUpdateEntry({
            date: dateStr,
            isPeriodDay,
            symptoms: selectedSymptoms,
            mood: selectedMood,
        });

        Alert.alert('Saved', 'Entry updated successfully.');
        setHasUnsavedChanges(false);
    };

    const getPrediction = () => {
        // Find last period day
        // Sort data by date desc
        const sorted = [...trackerData]
            .filter(e => e.isPeriodDay)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        if (sorted.length === 0) return "Log your first period to see predictions.";

        const lastPeriod = new Date(sorted[0].date);
        const nextPeriod = new Date(lastPeriod);
        nextPeriod.setDate(lastPeriod.getDate() + 28); // Simple 28 day cycle for MVP

        const diffTime = nextPeriod.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < -5) return "Ensure you're logging your period days.";
        if (diffDays < 0) return "Your period might be due any day now.";
        if (diffDays === 0) return "Your period is predicted for today.";
        if (diffDays <= 5) return `Period likely starting in ${diffDays} days.`;

        return `Next cycle predicted around ${nextPeriod.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.`;
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tracker</Text>
                <Text style={styles.headerSubtitle}>
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </Text>
            </View>

            {/* Calendar */}
            <View style={styles.card}>
                <View style={styles.calendarHeader}>
                    <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
                        <Text style={styles.navButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.monthTitle}>
                        {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </Text>
                    <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
                        <Text style={styles.navButtonText}>→</Text>
                    </TouchableOpacity>
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
                        const isSelectedDate = isSelected(day);

                        return (
                            <TouchableOpacity
                                key={day}
                                onPress={() => handleDayPress(day)}
                                style={[
                                    styles.cell,
                                    isSelectedDate && styles.selectedCell, // Selected takes precedence for bg
                                    (!isSelectedDate && isTodayDate) && styles.todayCell,
                                    (!isSelectedDate && !isTodayDate && entry?.isPeriodDay) && styles.periodCell,
                                ]}
                            >
                                <Text style={[
                                    styles.cellText,
                                    isSelectedDate && styles.selectedText,
                                    (!isSelectedDate && isTodayDate) && styles.todayText
                                ]}>
                                    {day}
                                </Text>
                                {/* Dot logic: Show if period, but handle color contrast */}
                                {entry?.isPeriodDay && (
                                    <View style={styles.periodDotContainer}>
                                        <View style={[
                                            styles.periodDot,
                                            isSelectedDate && { backgroundColor: 'white' }
                                        ]} />
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.predictionBox}>
                    <Text style={styles.predictionText}>
                        {getPrediction()}
                    </Text>
                </View>
            </View>

            {/* Entry Form */}
            <View style={styles.section}>
                {/* Period day question */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Period today?</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            onPress={() => handleSetIsPeriodDay(true)}
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
                            onPress={() => handleSetIsPeriodDay(false)}
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
                    <Text style={styles.cardTitle}>Symptoms</Text>
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
                    <Text style={styles.cardTitle}>Mood</Text>
                    <View style={styles.moodGrid}>
                        {moods.map(mood => (
                            <TouchableOpacity
                                key={mood.id}
                                onPress={() => handleSetMood(mood.id)}
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
                <TouchableOpacity
                    onPress={handleSave}
                    style={[styles.saveButton, !hasUnsavedChanges && { opacity: 0.8, backgroundColor: '#d8b4fe' }]}
                    disabled={!hasUnsavedChanges}
                >
                    <Text style={styles.saveButtonText}>
                        {hasUnsavedChanges ? "Save Changes" : "Saved"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF5FF',
    },
    contentContainer: {
        padding: CALENDAR_PADDING,
        paddingBottom: 100,
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    navButton: {
        padding: 8,
    },
    navButtonText: {
        fontSize: 18,
        color: '#7e22ce',
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
    selectedCell: {
        backgroundColor: '#581c87',
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
    selectedText: {
        color: 'white',
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
        marginTop: 16,
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
        opacity: 0.8,
        lineHeight: 18,
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
