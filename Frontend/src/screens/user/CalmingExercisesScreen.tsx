// src/screens/user/CalmingExercisesScreen.tsx
// ✅ FIGMA-MATCHED + Working countdown timer

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

const { width } = Dimensions.get('window');
const CIRCLE = width * 0.52;

// ─── Duration Options ─────────────────────────────────────────────────────────
const DURATIONS = [
  { label: '3 min', breaths: 18, minutes: 3, seconds: 180 },
  { label: '4 min', breaths: 24, minutes: 4, seconds: 240 },
  { label: '5 min', breaths: 30, minutes: 5, seconds: 300 },
];

// ─── Info Cards ───────────────────────────────────────────────────────────────
const INFO_CARDS = [
  {
    icon: require('../../../assets/images/try-and-see.png'),
    title: 'Try and See',
    desc: 'Say "Hey Bean, let\'s do a 5-minute calming exercise with bubble sounds."',
  },
  {
    icon: require('../../../assets/images/trigger-session.png'),
    title: 'Trigger Session',
    desc: 'Place both hands on the robot\'s side panels or tap the "Start" button above.',
  },
  {
    icon: require('../../../assets/images/visual-guidance.png'),
    title: 'Visual Guidance',
    desc: 'The robot will pulse a soft green glow. Inhale as the light expands, and exhale as it fades.',
  },
  {
    icon: require('../../../assets/images/haptic-feedback.png'),
    title: 'Haptic Feedback',
    desc: 'Feel the gentle internal motor mimic the rise and fall of a human chest to help you ground.',
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────
const CalmingExercisesScreen = ({ navigation }: any) => {
  const [selected, setSelected] = useState(1); // default 4 min
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATIONS[1].seconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Timer logic ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            Alert.alert(
              '🎉 Session Complete!',
              "Great job! You've completed your calming session.",
              [{ text: 'OK' }],
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // When user picks a different duration — reset timer
  const handleSelectDuration = (index: number) => {
    if (isRunning) return; // can't change while running
    setSelected(index);
    setTimeLeft(DURATIONS[index].seconds);
  };

  const handleStartStop = () => {
    if (timeLeft === 0) {
      // Reset and restart
      setTimeLeft(DURATIONS[selected].seconds);
      setIsRunning(true);
    } else {
      setIsRunning(prev => !prev);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(DURATIONS[selected].seconds);
  };

  // ── Format time as MM:SS ─────────────────────────────────────────────────────
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  };

  // Progress 0-1 for visual ring fill indication
  const progress = 1 - timeLeft / DURATIONS[selected].seconds;
  const current = DURATIONS[selected];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            handleReset();
            navigation.goBack();
          }}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calming Exercises</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Page title */}
        <Text style={styles.pageTitle}>Sync Your Breath</Text>
        <Text style={styles.pageSubtitle}>
          Regulate your nervous system with your{'\n'}Bean's rhythmic guidance.
        </Text>

        {/* ── Breathing circle with live countdown ── */}
        <View style={styles.circleOuter}>
          <View style={styles.circleMiddle}>
            <View
              style={[
                styles.circleInner,
                isRunning && styles.circleInnerActive, // glows green when running
              ]}
            >
              {isRunning ? (
                // ✅ Show MM:SS countdown when running
                <>
                  <Text style={styles.circleTimer}>{formatTime(timeLeft)}</Text>
                  <Text style={styles.circleLabel}>REMAINING</Text>
                </>
              ) : (
                // Show minutes when idle
                <>
                  <Text style={styles.circleNumber}>{current.minutes}</Text>
                  <Text style={styles.circleLabel}>MINUTES</Text>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Breath count */}
        <Text style={styles.breathCount}>
          {current.breaths} breaths, estimated duration:
        </Text>
        <Text style={styles.breathDuration}>{current.minutes} minutes</Text>

        {/* Duration selector — disabled when running */}
        <View style={styles.durationRow}>
          {DURATIONS.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.durationBtn,
                selected === i && styles.durationBtnActive,
                isRunning && styles.durationBtnDisabled,
              ]}
              onPress={() => handleSelectDuration(i)}
              activeOpacity={isRunning ? 1 : 0.8}
            >
              <Text
                style={[
                  styles.durationText,
                  selected === i && styles.durationTextActive,
                ]}
              >
                {d.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ✅ Start / Pause / Resume button */}
        <TouchableOpacity
          style={[styles.startBtn, isRunning && styles.pauseBtn]}
          onPress={handleStartStop}
          activeOpacity={0.85}
        >
          <Text style={styles.startBtnText}>
            {timeLeft === 0
              ? '▶  Start Again'
              : isRunning
              ? '⏸  Pause Session'
              : '▶  Start Session'}
          </Text>
        </TouchableOpacity>

        {/* Reset button — only shows after session started */}
        {!isRunning && timeLeft !== DURATIONS[selected].seconds && (
          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        )}

        {/* Info cards */}
        <View style={styles.infoContainer}>
          {INFO_CARDS.map((card, i) => (
            <View key={i} style={styles.infoCard}>
              <View style={styles.infoIconCircle}>
                <Image
                  source={card.icon}
                  style={styles.infoIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>{card.title}</Text>
                <Text style={styles.infoDesc}>{card.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LIGHT,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  backIcon: { fontSize: 28, color: COLORS.TEXT_PRIMARY, lineHeight: 32 },
  headerTitle: { ...TYPOGRAPHY.H4, color: COLORS.TEXT_PRIMARY },

  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MASSIVE,
    alignItems: 'center',
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: '800' as const,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  pageSubtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XL,
  },

  // ── Breathing circle
  circleOuter: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    backgroundColor: 'rgba(74, 204, 163, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  circleMiddle: {
    width: CIRCLE * 0.8,
    height: CIRCLE * 0.8,
    borderRadius: CIRCLE * 0.4,
    backgroundColor: 'rgba(74, 204, 163, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    width: CIRCLE * 0.58,
    height: CIRCLE * 0.58,
    borderRadius: CIRCLE * 0.29,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.PRIMARY,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  // ✅ Pulses brighter when session is running
  circleInnerActive: {
    borderWidth: 4,
    borderColor: '#22C55E',
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 10,
  },
  circleNumber: {
    fontSize: 42,
    fontWeight: '800' as const,
    color: COLORS.PRIMARY,
    lineHeight: 46,
  },
  // ✅ Countdown timer — slightly smaller to fit MM:SS
  circleTimer: {
    fontSize: 34,
    fontWeight: '800' as const,
    color: '#22C55E',
    lineHeight: 40,
    letterSpacing: 1,
  },
  circleLabel: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: COLORS.TEXT_TERTIARY,
    letterSpacing: 1.5,
  },

  breathCount: {
    fontSize: 13,
    color: COLORS.PRIMARY_DARK,
    fontWeight: '500' as const,
    textAlign: 'center',
  },
  breathDuration: {
    fontSize: 22,
    fontWeight: '800' as const,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.LG,
  },

  // Duration selector
  durationRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.ROUND,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    padding: 4,
    marginBottom: SPACING.XL,
    gap: 4,
  },
  durationBtn: {
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.ROUND,
  },
  durationBtnActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  durationBtnDisabled: {
    opacity: 0.5, // dims when session running
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: COLORS.TEXT_SECONDARY,
  },
  durationTextActive: {
    color: COLORS.WHITE,
  },

  // ✅ Start / Pause button
  startBtn: {
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    marginBottom: SPACING.MD,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  pauseBtn: {
    backgroundColor: '#F97316', // orange when pausing ✅
    shadowColor: '#F97316',
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.WHITE,
    letterSpacing: 0.3,
  },

  // Reset button
  resetBtn: {
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.ROUND,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    marginBottom: SPACING.LG,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: COLORS.TEXT_SECONDARY,
  },

  // Info cards
  infoContainer: {
    width: '100%',
    gap: SPACING.MD,
    marginTop: SPACING.SM,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    gap: SPACING.MD,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  infoIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.SECONDARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  infoIcon: {
    width: 34,
    height: 34,
    alignSelf: 'center',
  },
  infoText: { flex: 1 },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  infoDesc: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 18,
  },
});

export default CalmingExercisesScreen;
