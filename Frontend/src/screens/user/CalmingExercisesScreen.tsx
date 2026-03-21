// src/screens/user/CalmingExercisesScreen.tsx
// ✅ Dark theme aware

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
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');
const CIRCLE = width * 0.52;

const DURATIONS = [
  { label: '3 min', breaths: 18, minutes: 3, seconds: 180 },
  { label: '4 min', breaths: 24, minutes: 4, seconds: 240 },
  { label: '5 min', breaths: 30, minutes: 5, seconds: 300 },
];

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

const CalmingExercisesScreen = ({ navigation }: any) => {
  const { colors } = useTheme(); // ✅

  const [selected, setSelected] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATIONS[1].seconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const handleSelectDuration = (index: number) => {
    if (isRunning) return;
    setSelected(index);
    setTimeLeft(DURATIONS[index].seconds);
  };

  const handleStartStop = () => {
    if (timeLeft === 0) {
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

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  };

  const current = DURATIONS[selected];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND_LIGHT }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.SURFACE,
            borderBottomColor: colors.BORDER_LIGHT,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            handleReset();
            navigation.goBack();
          }}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backIcon, { color: colors.TEXT_PRIMARY }]}>
            ‹
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
          Calming Exercises
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.pageTitle, { color: colors.TEXT_PRIMARY }]}>
          Sync Your Breath
        </Text>
        <Text style={[styles.pageSubtitle, { color: colors.TEXT_SECONDARY }]}>
          Regulate your nervous system with your{'\n'}Bean's rhythmic guidance.
        </Text>

        {/* Breathing circle */}
        <View style={styles.circleOuter}>
          <View style={styles.circleMiddle}>
            <View
              style={[
                styles.circleInner,
                {
                  backgroundColor: colors.SURFACE,
                  borderColor: colors.PRIMARY,
                },
                isRunning && styles.circleInnerActive,
              ]}
            >
              {isRunning ? (
                <>
                  <Text style={styles.circleTimer}>{formatTime(timeLeft)}</Text>
                  <Text
                    style={[
                      styles.circleLabel,
                      { color: colors.TEXT_TERTIARY },
                    ]}
                  >
                    REMAINING
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    style={[styles.circleNumber, { color: colors.PRIMARY }]}
                  >
                    {current.minutes}
                  </Text>
                  <Text
                    style={[
                      styles.circleLabel,
                      { color: colors.TEXT_TERTIARY },
                    ]}
                  >
                    MINUTES
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Breath count */}
        <Text style={[styles.breathCount, { color: colors.PRIMARY_DARK }]}>
          {current.breaths} breaths, estimated duration:
        </Text>
        <Text style={[styles.breathDuration, { color: colors.TEXT_PRIMARY }]}>
          {current.minutes} minutes
        </Text>

        {/* Duration selector */}
        <View
          style={[
            styles.durationRow,
            {
              backgroundColor: colors.SURFACE,
              borderColor: colors.BORDER_LIGHT,
            },
          ]}
        >
          {DURATIONS.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.durationBtn,
                selected === i && { backgroundColor: colors.PRIMARY },
                isRunning && styles.durationBtnDisabled,
              ]}
              onPress={() => handleSelectDuration(i)}
              activeOpacity={isRunning ? 1 : 0.8}
            >
              <Text
                style={[
                  styles.durationText,
                  { color: colors.TEXT_SECONDARY },
                  selected === i && { color: colors.WHITE },
                ]}
              >
                {d.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Start / Pause button */}
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

        {/* Reset button */}
        {!isRunning && timeLeft !== DURATIONS[selected].seconds && (
          <TouchableOpacity
            style={[styles.resetBtn, { borderColor: colors.BORDER }]}
            onPress={handleReset}
          >
            <Text style={[styles.resetText, { color: colors.TEXT_SECONDARY }]}>
              Reset
            </Text>
          </TouchableOpacity>
        )}

        {/* Info cards */}
        <View style={styles.infoContainer}>
          {INFO_CARDS.map((card, i) => (
            <View
              key={i}
              style={[styles.infoCard, { backgroundColor: colors.SURFACE }]}
            >
              <View
                style={[
                  styles.infoIconCircle,
                  { backgroundColor: colors.SECONDARY_LIGHT },
                ]}
              >
                <Image
                  source={card.icon}
                  style={styles.infoIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.infoText}>
                <Text
                  style={[styles.infoTitle, { color: colors.TEXT_PRIMARY }]}
                >
                  {card.title}
                </Text>
                <Text
                  style={[styles.infoDesc, { color: colors.TEXT_SECONDARY }]}
                >
                  {card.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  backIcon: { fontSize: 28, lineHeight: 32 },
  headerTitle: { ...TYPOGRAPHY.H4 },
  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MASSIVE,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800' as const,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  pageSubtitle: {
    ...TYPOGRAPHY.BODY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XL,
  },
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    elevation: 5,
  },
  circleInnerActive: {
    borderWidth: 4,
    borderColor: '#22C55E',
    elevation: 10,
  },
  circleNumber: { fontSize: 42, fontWeight: '800' as const, lineHeight: 46 },
  circleTimer: {
    fontSize: 34,
    fontWeight: '800' as const,
    color: '#22C55E',
    lineHeight: 40,
    letterSpacing: 1,
  },
  circleLabel: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 1.5 },
  breathCount: {
    fontSize: 13,
    fontWeight: '500' as const,
    textAlign: 'center',
  },
  breathDuration: {
    fontSize: 22,
    fontWeight: '800' as const,
    textAlign: 'center',
    marginBottom: SPACING.LG,
  },
  durationRow: {
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS.ROUND,
    borderWidth: 1,
    padding: 4,
    marginBottom: SPACING.XL,
    gap: 4,
  },
  durationBtn: {
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.ROUND,
  },
  durationBtnDisabled: { opacity: 0.5 },
  durationText: { fontSize: 14, fontWeight: '600' as const },
  startBtn: {
    width: '100%',
    backgroundColor: '#4ECCA3',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    marginBottom: SPACING.MD,
    elevation: 5,
  },
  pauseBtn: { backgroundColor: '#F97316' },
  startBtnText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  resetBtn: {
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.ROUND,
    borderWidth: 1.5,
    marginBottom: SPACING.LG,
  },
  resetText: { fontSize: 14, fontWeight: '600' as const },
  infoContainer: { width: '100%', gap: SPACING.MD, marginTop: SPACING.SM },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    gap: SPACING.MD,
    elevation: 2,
  },
  infoIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  infoIcon: { width: 34, height: 34, alignSelf: 'center' },
  infoText: { flex: 1 },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    marginBottom: SPACING.XS,
  },
  infoDesc: { ...TYPOGRAPHY.BODY_SMALL, lineHeight: 18 },
});

export default CalmingExercisesScreen;
