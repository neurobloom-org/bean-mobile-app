import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';

const TOTAL_TIME = 25 * 60; // 25 minutes in seconds

const FocusModeScreen = ({ navigation }: any) => {
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(0);

  // Timer logic
  useEffect(() => {
    let interval: any = null;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          const newTime = time - 1;
          const progress = ((TOTAL_TIME - newTime) / TOTAL_TIME) * 100;
          setSessionProgress(progress);
          return newTime;
        });
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(TOTAL_TIME);
    setSessionProgress(0);
  };

  const encouragingMessages = [
    "You're doing great, just keep breathing.",
    "Stay focused, you've got this!",
    "One step at a time, you're amazing!",
    'Keep going, I believe in you!',
    "You're making great progress!",
  ];

  const [currentMessage] = useState(
    encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F9F6" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Focus Mode</Text>

        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Circular Timer */}
        <View style={styles.timerContainer}>
          <View style={styles.circularTimer}>
            {/* Gray Background Circle */}
            <View style={styles.backgroundCircle} />

            {/* Green Progress Arc */}
            <View
              style={[
                styles.progressArc,
                {
                  transform: [
                    { rotate: '-90deg' },
                    { rotate: `${(sessionProgress / 100) * 360}deg` },
                  ],
                },
              ]}
            />

            {/* Time Display */}
            <View style={styles.timeDisplay}>
              <Text style={styles.timeText}>{formatTime(timeRemaining)}</Text>
              <Text style={styles.remainingText}>Remaining</Text>
            </View>
          </View>
        </View>

        {/* Session Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Session Progress</Text>
            <Text style={styles.progressPercentage}>
              {Math.round(sessionProgress)}% complete
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBarFill, { width: `${sessionProgress}%` }]}
            />
          </View>
        </View>

        {/* Control Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartPause}
            activeOpacity={0.8}
          >
            <Text style={styles.startButtonText}>
              {isRunning ? 'Pause' : 'Start Focus'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Bean Mascot Section - NO OVERLAP */}
        <View style={styles.mascotSection}>
          <View style={styles.mascotRow}>
            {/* Bean Image */}
            <Image
              source={require('../../assets/images/focus-mode-bean.png')}
              style={styles.mascotImage}
            />

            {/* Speech Bubble */}
            <View style={styles.speechBubble}>
              <Text style={styles.speechText}>{currentMessage}</Text>
              <View style={styles.bubbleTail} />
            </View>
          </View>
        </View>

        {/* Extra padding at bottom for scrolling */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 28,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  settingsIcon: {
    fontSize: 22,
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  circularTimer: {
    width: 240,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 10,
    borderColor: '#E0E0E0',
  },
  progressArc: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 10,
    borderColor: '#4ECCA3',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  timeDisplay: {
    alignItems: 'center',
    zIndex: 10,
  },
  timeText: {
    fontSize: 48,
    fontWeight: '300',
    color: '#000',
    letterSpacing: 2,
  },
  remainingText: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4ECCA3',
    borderRadius: 4,
  },
  buttonsContainer: {
    gap: 12,
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#4ECCA3',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#4ECCA3',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  resetButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
  },
  mascotSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  mascotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mascotImage: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  speechBubble: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginLeft: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#000',
  },
  speechText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  bubbleTail: {
    position: 'absolute',
    bottom: 20,
    left: -10,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderRightWidth: 12,
    borderBottomWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: '#000',
    borderBottomColor: 'transparent',
  },
});

export default FocusModeScreen;
