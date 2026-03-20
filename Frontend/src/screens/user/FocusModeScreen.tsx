// src/screens/user/FocusModeScreen.tsx
// ✅ FIGMA-MATCHED — Timer circle · During Focus · How to Start

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.62;
const RING_WIDTH = 8;

const FocusModeScreen = ({ navigation }: any) => {
  const TOTAL = 25 * 60;
  const [timeLeft, setTimeLeft] = useState(TOTAL);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  };

  const handleStartPause = () => setIsRunning(prev => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(TOTAL);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Start Focus Mode</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Timer Circle ── */}
        <View style={styles.timerWrap}>
          {/* Outer green ring */}
          <View style={styles.timerRing}>
            {/* Inner white circle */}
            <View style={styles.timerInner}>
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

              {/* Play / Pause button below time */}
              <TouchableOpacity
                style={styles.playBtn}
                onPress={handleStartPause}
              >
                <Text style={styles.playIcon}>{isRunning ? '⏸' : '▶'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Reset — only shown after timer starts */}
        {!isRunning && timeLeft !== TOTAL && (
          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        )}

        {/* ── Subtitle ── */}
        <Text style={styles.subtitle}>
          Boost your productivity. While in Focus Mode,{'\n'}
          your robot helps you stay in the zone.
        </Text>

        {/* ── During the Focus Mode ── */}
        <Text style={styles.sectionGreen}>During the Focus Mode...</Text>

        <View style={styles.duringRow}>
          {/* Silent card */}
          <View style={styles.duringCard}>
            <View style={styles.duringIconBox}>
              <Text style={styles.duringIcon}>🔕</Text>
            </View>
            <Text style={styles.duringCardTitle}>Silent</Text>
            <Text style={styles.duringCardSub}>
              Notifications are muted on all devices
            </Text>
          </View>

          {/* Ambient card */}
          <View style={styles.duringCard}>
            <View style={styles.duringIconBox}>
              <Text style={styles.duringIcon}>🎵</Text>
            </View>
            <Text style={styles.duringCardTitle}>Ambient</Text>
            <Text style={styles.duringCardSub}>
              Bean plays soft white noise
            </Text>
          </View>
        </View>

        {/* ── How to Start ── */}
        <Text style={styles.sectionDark}>How to start</Text>

        {/* Voice Command */}
        <View style={styles.howCard}>
          <View
            style={[
              styles.howIconCircle,
              { backgroundColor: COLORS.SECONDARY_LIGHT },
            ]}
          >
            <Text style={styles.howIcon}>🔊</Text>
          </View>
          <View style={styles.howText}>
            <Text style={styles.howTitle}>Voice Command</Text>
            <Text style={styles.howSub}>
              Simply say, "Hey Bean, start focus mode" to begin the timer.
            </Text>
          </View>
        </View>

        {/* Physical Interaction */}
        <View style={styles.howCard}>
          <View
            style={[
              styles.howIconCircle,
              { backgroundColor: COLORS.SECONDARY_LIGHT },
            ]}
          >
            <Text style={styles.howIcon}>👆</Text>
          </View>
          <View style={styles.howText}>
            <Text style={styles.howTitle}>Physical Interaction</Text>
            <Text style={styles.howSub}>
              Tap the focus icon on the robot's chest display or double-tap its
              head.
            </Text>
          </View>
        </View>

        {/* Manual Trigger */}
        <View style={styles.howCard}>
          <View style={[styles.howIconCircle, { backgroundColor: '#22C55E' }]}>
            <Text style={styles.howIcon}>▶</Text>
          </View>
          <View style={styles.howText}>
            <Text style={styles.howTitle}>Manual Trigger</Text>
            <Text style={styles.howSub}>
              Use the "Play" button above to start the mode immediately from the
              app.
            </Text>
          </View>
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

  // ── Timer
  timerWrap: {
    marginBottom: SPACING.LG,
  },
  timerRing: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: RING_WIDTH,
    borderColor: COLORS.PRIMARY, // ✅ green ring
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  timerInner: {
    alignItems: 'center',
    gap: SPACING.MD,
  },
  timerText: {
    fontSize: 52,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    letterSpacing: 2,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.TEXT_PRIMARY, // dark circle like Figma
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 14,
    color: COLORS.WHITE,
  },

  // Reset
  resetBtn: {
    marginBottom: SPACING.LG,
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.ROUND,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: COLORS.TEXT_SECONDARY,
  },

  // Subtitle
  subtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.SM,
  },

  // Section labels
  sectionGreen: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '700' as const,
    color: COLORS.PRIMARY_DARK, // ✅ green label like Figma
    marginBottom: SPACING.MD,
  },
  sectionDark: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
    marginTop: SPACING.LG,
  },

  // ── During row
  duringRow: {
    flexDirection: 'row',
    gap: SPACING.MD,
    width: '100%',
    marginBottom: SPACING.LG,
  },
  duringCard: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    alignItems: 'center',
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  duringIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.SECONDARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  duringIcon: { fontSize: 22 },
  duringCardTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
    textAlign: 'center',
  },
  duringCardSub: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 16,
  },

  // ── How to start cards
  howCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    marginBottom: SPACING.MD,
    width: '100%',
    gap: SPACING.MD,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  howIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  howIcon: { fontSize: 20 },
  howText: { flex: 1 },
  howTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  howSub: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 18,
  },
});

export default FocusModeScreen;
