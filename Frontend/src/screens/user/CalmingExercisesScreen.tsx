// src/screens/user/CalmingExercisesScreen.tsx
// ✅ FIGMA-MATCHED — Sync Your Breath · Duration selector · Start Session · Info cards

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

const { width } = Dimensions.get('window');
const CIRCLE = width * 0.52;

// ─── Duration Options ─────────────────────────────────────────────────────────
const DURATIONS = [
  { label: '3 min', breaths: 18, minutes: 3 },
  { label: '4 min', breaths: 24, minutes: 4 },
  { label: '5 min', breaths: 30, minutes: 5 },
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
  const [selected, setSelected] = useState(1); // default 4 min (index 1)

  const current = DURATIONS[selected];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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
        {/* ── Page title ── */}
        <Text style={styles.pageTitle}>Sync Your Breath</Text>
        <Text style={styles.pageSubtitle}>
          Regulate your nervous system with your{'\n'}Bean's rhythmic guidance.
        </Text>

        {/* ── Breathing circle ── */}
        <View style={styles.circleOuter}>
          <View style={styles.circleMiddle}>
            <View style={styles.circleInner}>
              <Text style={styles.circleNumber}>{current.minutes}</Text>
              <Text style={styles.circleLabel}>MINUTES</Text>
            </View>
          </View>
        </View>

        {/* ── Breath count ── */}
        <Text style={styles.breathCount}>
          {current.breaths} breaths, estimated duration:
        </Text>
        <Text style={styles.breathDuration}>{current.minutes} minutes</Text>

        {/* ── Duration selector ── */}
        <View style={styles.durationRow}>
          {DURATIONS.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.durationBtn,
                selected === i && styles.durationBtnActive,
              ]}
              onPress={() => setSelected(i)}
              activeOpacity={0.8}
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

        {/* ── Start Session button ── */}
        <TouchableOpacity style={styles.startBtn} activeOpacity={0.85}>
          <Text style={styles.startBtnText}>▶ Start Session</Text>
        </TouchableOpacity>

        {/* ── Info cards ── */}
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

  // Header
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

  // Page title
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

  // ── Breathing circle — 3 layered rings ✅
  circleOuter: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    backgroundColor: 'rgba(74, 204, 163, 0.15)', // outermost very faint green
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  circleMiddle: {
    width: CIRCLE * 0.8,
    height: CIRCLE * 0.8,
    borderRadius: CIRCLE * 0.4,
    backgroundColor: 'rgba(74, 204, 163, 0.25)', // mid green ring
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
    borderColor: COLORS.PRIMARY, // ✅ green ring border
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  circleNumber: {
    fontSize: 42,
    fontWeight: '800' as const,
    color: COLORS.PRIMARY, // ✅ green number
    lineHeight: 46,
  },
  circleLabel: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: COLORS.TEXT_TERTIARY,
    letterSpacing: 1.5,
  },

  // Breath count
  breathCount: {
    fontSize: 13,
    color: COLORS.PRIMARY_DARK, // green text ✅
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
    backgroundColor: COLORS.PRIMARY, // ✅ green active pill
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: COLORS.TEXT_SECONDARY,
  },
  durationTextActive: {
    color: COLORS.WHITE,
  },

  // Start Session button
  startBtn: {
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    marginBottom: SPACING.XL,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.WHITE,
    letterSpacing: 0.3,
  },

  // Info cards
  infoContainer: {
    width: '100%',
    gap: SPACING.MD,
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
    backgroundColor: COLORS.SECONDARY_LIGHT, // ✅ soft green bg
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
