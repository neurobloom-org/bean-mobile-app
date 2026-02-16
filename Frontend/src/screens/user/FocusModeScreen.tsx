// src/screens/user/FocusModeScreen.tsx
// ✅ REFACTORED VERSION

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { BackButton, PrimaryButton } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

const { width } = Dimensions.get('window');
const TIMER_SIZE = width * 0.7;

const FocusModeScreen = ({ navigation }: any) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const getProgress = () => {
    return ((25 * 60 - timeLeft) / (25 * 60)) * 100;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Back Button */}
        <BackButton />

        {/* Title */}
        <Text style={styles.title}>Focus Mode</Text>
        <Text style={styles.subtitle}>Stay focused for 25 minutes</Text>

        {/* Timer Circle */}
        <View style={styles.timerContainer}>
          <View style={styles.timerCircle}>
            <View style={styles.progressCircle}>
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              <Text style={styles.timerLabel}>
                {isRunning ? 'Focus Time' : 'Ready?'}
              </Text>
            </View>
          </View>

          {/* Bean Character */}
          <View style={styles.beanContainer}>
            <Image
              source={require('../../../assets/images/robot-first-page.png')}
              style={styles.beanImage}
              resizeMode="contain"
            />
            <View style={styles.speechBubble}>
              <Text style={styles.speechText}>
                {isRunning
                  ? "You're doing great! Keep going! 💪"
                  : "Let's focus together! 🎯"}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Sessions Today</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>125</Text>
            <Text style={styles.statLabel}>Total Minutes</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            title={isRunning ? 'Pause' : 'Start Focus'}
            onPress={handleStartPause}
            variant="primary"
            size="large"
            fullWidth
          />

          {!isRunning && timeLeft !== 25 * 60 && (
            <PrimaryButton
              title="Reset"
              onPress={handleReset}
              variant="outline"
              size="large"
              fullWidth
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
  },
  title: {
    ...TYPOGRAPHY.H1,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginTop: SPACING.XL,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.XXL,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: SPACING.XXL,
  },
  timerCircle: {
    width: TIMER_SIZE,
    height: TIMER_SIZE,
    borderRadius: TIMER_SIZE / 2,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: SPACING.XL,
  },
  progressCircle: {
    width: TIMER_SIZE - 40,
    height: TIMER_SIZE - 40,
    borderRadius: (TIMER_SIZE - 40) / 2,
    backgroundColor: COLORS.SECONDARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: SPACING.SM,
  },
  timerLabel: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
  },
  beanContainer: {
    alignItems: 'center',
  },
  beanImage: {
    width: 80,
    height: 80,
    marginBottom: SPACING.SM,
  },
  speechBubble: {
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    maxWidth: '80%',
  },
  speechText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: SPACING.LG,
    marginBottom: SPACING.XXL,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    alignItems: 'center',
  },
  statNumber: {
    ...TYPOGRAPHY.H2,
    color: COLORS.PRIMARY,
    marginBottom: SPACING.XS,
  },
  statLabel: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: SPACING.LG,
  },
});

export default FocusModeScreen;
