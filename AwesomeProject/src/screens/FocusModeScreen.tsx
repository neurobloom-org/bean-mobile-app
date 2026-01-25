import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

const FocusModeScreen = ({ navigation }: any) => {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(0); // 0% for first time
  const totalTime = 25 * 60; // 25 minutes

  // Timer logic
  useEffect(() => {
    let interval: any = null;
    
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          const newTime = time - 1;
          // Update progress
          const progress = ((totalTime - newTime) / totalTime) * 100;
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

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(25 * 60);
    setSessionProgress(0);
  };

  const encouragingMessages = [
    "You're doing great, just keep breathing.",
    "Stay focused, you've got this!",
    "One step at a time, you're amazing!",
    "Keep going, I believe in you!",
    "You're making great progress!",
  ];

  const [currentMessage] = useState(
    encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)]
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

      {/* Main Content */}
      <View style={styles.content}>
        {/* Circular Timer */}
        <View style={styles.timerContainer}>
          <View style={styles.circularTimer}>
            {/* Progress Circle */}
            <View style={styles.progressCircle}>
              <View 
                style={[
                  styles.progressArc,
                  {
                    transform: [
                      { rotate: `${(sessionProgress / 100) * 360}deg` }
                    ]
                  }
                ]}
              />
            </View>
            
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
              style={[
                styles.progressBarFill,
                { width: `${sessionProgress}%` }
              ]}
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
              {isRunning ? 'Stop Focus' : 'Start Focus'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.pauseButton}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Text style={styles.pauseButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Bean Mascot with Speech Bubble */}
        <View style={styles.mascotSection}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>{currentMessage}</Text>
            <View style={styles.bubbleTail} />
          </View>
          
          <View style={styles.mascotContainer}>
            <View style={styles.mascotBackground} />
            <Image
              source={require('../../assets/images/focus-mode-bean.png')}
              style={styles.mascotImage}
            />
          </View>
        </View>
      </View>
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
  },
  settingsIcon: {
    fontSize: 22,
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  circularTimer: {
    width: 280,
    height: 280,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 12,
    borderColor: '#E0E0E0',
  },
  progressArc: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 12,
    borderColor: '#4ECCA3',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  timeDisplay: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 56,
    fontWeight: '300',
    color: '#000',
    letterSpacing: 2,
  },
  remainingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  progressSection: {
    marginBottom: 32,
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
    gap: 16,
    marginBottom: 32,
  },
  startButton: {
    backgroundColor: '#4ECCA3',
    paddingVertical: 18,
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
  pauseButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  pauseButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
  },
  mascotSection: {
    position: 'relative',
    marginTop: 'auto',
    marginBottom: 20,
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    marginBottom: 12,
    marginLeft: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  speechText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -10,
    left: 25,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
  },
  mascotContainer: {
    position: 'relative',
    width: 160,
    height: 160,
    marginLeft: 20,
  },
  mascotBackground: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#B8E6D5',
    opacity: 0.5,
  },
  mascotImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
});

export default FocusModeScreen;