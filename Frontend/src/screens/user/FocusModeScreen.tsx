// src/screens/user/FocusModeScreen.tsx
// ✅ Real icons · Bigger images · Green section labels · Dark play button

import React, { useState, useEffect } from 'react';
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
const CIRCLE_SIZE = width * 0.62;

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
        <View style={styles.timerRing}>
          <View style={styles.timerInner}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

            {/* ✅ Play = dark circle with green arrow | Pause = green circle with two bars */}
            <TouchableOpacity
              style={[styles.playBtn, isRunning && styles.pauseBtn]}
              onPress={() => setIsRunning(prev => !prev)}
            >
              {isRunning ? (
                // PAUSE — two white vertical bars
                <View style={styles.pauseIconWrap}>
                  <View style={styles.pauseBar} />
                  <View style={styles.pauseBar} />
                </View>
              ) : (
                // PLAY — manual-trigger image
                <Image
                  source={require('../../../assets/images/manual-trigger.png')}
                  style={styles.playBtnIcon}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Reset */}
        {!isRunning && timeLeft !== TOTAL && (
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => {
              setIsRunning(false);
              setTimeLeft(TOTAL);
            }}
          >
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        )}

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Boost your productivity. While in Focus Mode,{'\n'}
          your robot helps you stay in the zone.
        </Text>

        {/* ── During the Focus Mode ── */}
        <Text style={styles.sectionGreen}>During the Focus Mode...</Text>

        <View style={styles.duringRow}>
          {/* Silent */}
          <View style={styles.duringCard}>
            <Image
              source={require('../../../assets/images/silent.png')}
              style={styles.duringIconImg}
              resizeMode="contain"
            />
            <Text style={styles.duringCardTitle}>Silent</Text>
            <Text style={styles.duringCardSub}>
              Notifications are muted on all devices
            </Text>
          </View>

          {/* Ambient */}
          <View style={styles.duringCard}>
            <Image
              source={require('../../../assets/images/ambient.png')}
              style={styles.duringIconImg}
              resizeMode="contain"
            />
            <Text style={styles.duringCardTitle}>Ambient</Text>
            <Text style={styles.duringCardSub}>
              Bean plays soft white noise
            </Text>
          </View>
        </View>

        {/* ── How to Start — ✅ green label like During ── */}
        <Text style={styles.sectionGreen}>How to start</Text>

        {/* Voice Command */}
        <View style={styles.howCard}>
          <View style={styles.howIconCircle}>
            <Image
              source={require('../../../assets/images/voice-command.png')}
              style={styles.howIconImg}
              resizeMode="contain"
            />
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
          <View style={styles.howIconCircle}>
            <Image
              source={require('../../../assets/images/physical-interation.png')}
              style={styles.howIconImg}
              resizeMode="contain"
            />
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
          <View style={[styles.howIconCircle, styles.howIconCircleGreen]}>
            <Image
              source={require('../../../assets/images/manual-trigger.png')}
              style={styles.howIconImg}
              resizeMode="contain"
            />
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

  // ── Timer ring
  timerRing: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 8,
    borderColor: COLORS.PRIMARY, // green ring ✅
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: SPACING.LG,
  },
  timerInner: {
    alignItems: 'center',
    gap: SPACING.LG,
  },
  timerText: {
    fontSize: 52,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    letterSpacing: 2,
  },

  // ✅ PLAY — dark circle with green border
  playBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.TEXT_PRIMARY, // dark ✅
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.PRIMARY, // green ring around dark circle
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  // ✅ PAUSE — solid green circle (clearly different)
  pauseBtn: {
    backgroundColor: '#22C55E', // bright green when running ✅
    borderColor: '#16A34A', // darker green border
    shadowColor: '#22C55E',
  },
  playBtnIcon: {
    width: 28,
    height: 28,
    tintColor: COLORS.WHITE,
  },
  // Pause icon — two white bars
  pauseIconWrap: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseBar: {
    width: 5,
    height: 20,
    borderRadius: 3,
    backgroundColor: COLORS.WHITE,
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
  },

  // ✅ Both section labels now green
  sectionGreen: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '700' as const,
    color: COLORS.PRIMARY_DARK, // green ✅
    marginBottom: SPACING.MD,
  },

  // ── During row — 2 cards
  duringRow: {
    flexDirection: 'row',
    gap: SPACING.MD,
    width: '100%',
    marginBottom: SPACING.XL,
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
  // ✅ Bigger during icons — 52x52
  duringIconImg: {
    width: 52,
    height: 52,
    marginBottom: SPACING.SM,
  },
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
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.SECONDARY_LIGHT, // light green bg
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  howIconCircleGreen: {
    backgroundColor: '#22C55E', // solid green for manual trigger ✅
  },
  // ✅ Bigger how-to icons — 34x34
  howIconImg: {
    width: 34,
    height: 34,
  },
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
