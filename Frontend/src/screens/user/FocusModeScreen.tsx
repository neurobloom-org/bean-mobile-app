// src/screens/user/FocusModeScreen.tsx
// ✅ Dark theme aware

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
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.62;

const FocusModeScreen = ({ navigation }: any) => {
  const { colors } = useTheme(); // ✅

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
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={[styles.backIcon, { color: colors.TEXT_PRIMARY }]}>
            ‹
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
          Start Focus Mode
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Timer Circle */}
        <View
          style={[
            styles.timerRing,
            { backgroundColor: colors.SURFACE, borderColor: colors.PRIMARY },
          ]}
        >
          <View style={styles.timerInner}>
            <Text style={[styles.timerText, { color: colors.TEXT_PRIMARY }]}>
              {formatTime(timeLeft)}
            </Text>

            <TouchableOpacity
              style={[
                styles.playBtn,
                {
                  backgroundColor: colors.TEXT_PRIMARY,
                  borderColor: colors.PRIMARY,
                },
                isRunning && styles.pauseBtn,
              ]}
              onPress={() => setIsRunning(prev => !prev)}
            >
              {isRunning ? (
                <View style={styles.pauseIconWrap}>
                  <View style={styles.pauseBar} />
                  <View style={styles.pauseBar} />
                </View>
              ) : (
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
            style={[styles.resetBtn, { borderColor: colors.BORDER }]}
            onPress={() => {
              setIsRunning(false);
              setTimeLeft(TOTAL);
            }}
          >
            <Text style={[styles.resetText, { color: colors.TEXT_SECONDARY }]}>
              Reset
            </Text>
          </TouchableOpacity>
        )}

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Boost your productivity. While in Focus Mode,{'\n'}
          your robot helps you stay in the zone.
        </Text>

        {/* During the Focus Mode */}
        <Text style={[styles.sectionGreen, { color: colors.PRIMARY_DARK }]}>
          During the Focus Mode...
        </Text>

        <View style={styles.duringRow}>
          <View
            style={[styles.duringCard, { backgroundColor: colors.SURFACE }]}
          >
            <Image
              source={require('../../../assets/images/silent.png')}
              style={styles.duringIconImg}
              resizeMode="contain"
            />
            <Text
              style={[styles.duringCardTitle, { color: colors.TEXT_PRIMARY }]}
            >
              Silent
            </Text>
            <Text
              style={[styles.duringCardSub, { color: colors.TEXT_SECONDARY }]}
            >
              Notifications are muted on all devices
            </Text>
          </View>

          <View
            style={[styles.duringCard, { backgroundColor: colors.SURFACE }]}
          >
            <Image
              source={require('../../../assets/images/ambient.png')}
              style={styles.duringIconImg}
              resizeMode="contain"
            />
            <Text
              style={[styles.duringCardTitle, { color: colors.TEXT_PRIMARY }]}
            >
              Ambient
            </Text>
            <Text
              style={[styles.duringCardSub, { color: colors.TEXT_SECONDARY }]}
            >
              Bean plays soft white noise
            </Text>
          </View>
        </View>

        {/* How to start */}
        <Text style={[styles.sectionGreen, { color: colors.PRIMARY_DARK }]}>
          How to start
        </Text>

        {/* Voice Command */}
        <View style={[styles.howCard, { backgroundColor: colors.SURFACE }]}>
          <View
            style={[
              styles.howIconCircle,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <Image
              source={require('../../../assets/images/voice-command.png')}
              style={styles.howIconImg}
              resizeMode="contain"
            />
          </View>
          <View style={styles.howText}>
            <Text style={[styles.howTitle, { color: colors.TEXT_PRIMARY }]}>
              Voice Command
            </Text>
            <Text style={[styles.howSub, { color: colors.TEXT_SECONDARY }]}>
              Simply say, "Hey Bean, start focus mode" to begin the timer.
            </Text>
          </View>
        </View>

        {/* Physical Interaction */}
        <View style={[styles.howCard, { backgroundColor: colors.SURFACE }]}>
          <View
            style={[
              styles.howIconCircle,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <Image
              source={require('../../../assets/images/physical-interation.png')}
              style={styles.howIconImg}
              resizeMode="contain"
            />
          </View>
          <View style={styles.howText}>
            <Text style={[styles.howTitle, { color: colors.TEXT_PRIMARY }]}>
              Physical Interaction
            </Text>
            <Text style={[styles.howSub, { color: colors.TEXT_SECONDARY }]}>
              Tap the focus icon on the robot's chest display or double-tap its
              head.
            </Text>
          </View>
        </View>

        {/* Manual Trigger */}
        <View style={[styles.howCard, { backgroundColor: colors.SURFACE }]}>
          <View style={[styles.howIconCircle, styles.howIconCircleGreen]}>
            <Image
              source={require('../../../assets/images/manual-trigger.png')}
              style={styles.howIconImg}
              resizeMode="contain"
            />
          </View>
          <View style={styles.howText}>
            <Text style={[styles.howTitle, { color: colors.TEXT_PRIMARY }]}>
              Manual Trigger
            </Text>
            <Text style={[styles.howSub, { color: colors.TEXT_SECONDARY }]}>
              Use the "Play" button above to start the mode immediately from the
              app.
            </Text>
          </View>
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
  timerRing: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: SPACING.LG,
  },
  timerInner: { alignItems: 'center', gap: SPACING.LG },
  timerText: { fontSize: 52, fontWeight: '700' as const, letterSpacing: 2 },
  playBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    elevation: 4,
  },
  pauseBtn: {
    backgroundColor: '#22C55E',
    borderColor: '#16A34A',
  },
  playBtnIcon: { width: 28, height: 28, tintColor: '#FFFFFF' },
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
    backgroundColor: '#FFFFFF',
  },
  resetBtn: {
    marginBottom: SPACING.LG,
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.ROUND,
    borderWidth: 1.5,
  },
  resetText: { fontSize: 14, fontWeight: '600' as const },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XL,
  },
  sectionGreen: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '700' as const,
    marginBottom: SPACING.MD,
  },
  duringRow: {
    flexDirection: 'row',
    gap: SPACING.MD,
    width: '100%',
    marginBottom: SPACING.XL,
  },
  duringCard: {
    flex: 1,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    alignItems: 'center',
    elevation: 2,
  },
  duringIconImg: { width: 52, height: 52, marginBottom: SPACING.SM },
  duringCardTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    marginBottom: SPACING.XS,
    textAlign: 'center',
  },
  duringCardSub: { ...TYPOGRAPHY.CAPTION, textAlign: 'center', lineHeight: 16 },
  howCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    marginBottom: SPACING.MD,
    width: '100%',
    gap: SPACING.MD,
    elevation: 2,
  },
  howIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  howIconCircleGreen: { backgroundColor: '#22C55E' },
  howIconImg: { width: 34, height: 34 },
  howText: { flex: 1 },
  howTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    marginBottom: SPACING.XS,
  },
  howSub: { ...TYPOGRAPHY.BODY_SMALL, lineHeight: 18 },
});

export default FocusModeScreen;
