// Confirmation screen shown after the patient email link is successfully verified.
// Displays a layered success icon with looping firework animation and navigates
// to the caregiver dashboard. Firework colors use blue/teal to differentiate
// from the green-themed PasswordResetSuccessScreen.

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import { PrimaryButton } from '../../components';
import { SPACING } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');

// Renders a single radial spike that travels outward from an origin point.
// Opacity fades in quickly and out gradually to simulate an explosion trail.
const Spike = ({
  angle,
  length,
  color,
  thickness,
  progress,
  originX,
  originY,
  minDist,
  maxDist,
}: any) => {
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [Math.cos(angle) * minDist, Math.cos(angle) * maxDist],
  });
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [Math.sin(angle) * minDist, Math.sin(angle) * maxDist],
  });
  const opacity = progress.interpolate({
    inputRange: [0, 0.15, 0.7, 1],
    outputRange: [0, 1, 0.8, 0],
  });
  const scaleX = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.2, 1, 0.6],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: originX,
        top: originY,
        width: length,
        height: thickness,
        backgroundColor: color,
        borderRadius: thickness / 2,
        opacity,
        transform: [
          { translateX },
          { translateY },
          { rotate: `${(angle * 180) / Math.PI}deg` },
          { scaleX },
        ],
        transformOrigin: 'left center',
      }}
    />
  );
};

// Renders a ✦ glyph that flies outward with a scale-in / fade-out effect.
const Star = ({
  progress,
  originX,
  originY,
  angle,
  dist,
  color,
  size,
  delay,
}: any) => {
  const tx = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.cos(angle) * dist],
  });
  const ty = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.sin(angle) * dist],
  });
  const opacity = progress.interpolate({
    inputRange: [0, delay / 1000, Math.min(delay / 1000 + 0.4, 0.9), 1],
    outputRange: [0, 1, 1, 0],
  });
  const scale = progress.interpolate({
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: [0, 1.3, 1, 0],
  });

  return (
    <Animated.Text
      style={{
        position: 'absolute',
        left: originX - size / 2,
        top: originY - size / 2,
        fontSize: size,
        color,
        opacity,
        transform: [{ translateX: tx }, { translateY: ty }, { scale }],
      }}
    >
      ✦
    </Animated.Text>
  );
};

// Composes one burst from evenly-spaced spikes and randomly-placed stars.
// Loops indefinitely with a configurable delay between cycles.
const FireworkBurst = ({
  x,
  y,
  spikeCount,
  spikeLength,
  colors,
  delay,
  duration,
  minDist,
  maxDist,
  starCount,
}: any) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(progress, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.delay(200),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const spikes = Array.from({ length: spikeCount }, (_, i) => ({
    angle: (i / spikeCount) * 2 * Math.PI,
    color: colors[i % colors.length],
  }));

  const stars = Array.from({ length: starCount }, (_, i) => ({
    angle: Math.random() * 2 * Math.PI,
    dist: maxDist * (0.6 + Math.random() * 0.8),
    color: colors[i % colors.length],
    size: 8 + Math.floor(Math.random() * 8),
    delay: Math.random() * 400,
  }));

  return (
    <>
      {spikes.map((s, i) => (
        <Spike
          key={`spike-${i}`}
          angle={s.angle}
          length={spikeLength}
          color={s.color}
          thickness={2.5}
          progress={progress}
          originX={x}
          originY={y}
          minDist={minDist}
          maxDist={maxDist}
        />
      ))}
      {stars.map((s, i) => (
        <Star
          key={`star-${i}`}
          progress={progress}
          originX={x}
          originY={y}
          angle={s.angle}
          dist={s.dist}
          color={s.color}
          size={s.size}
          delay={s.delay}
        />
      ))}
    </>
  );
};

// Blue/teal burst palette — distinct from the green password reset screen.
const BURSTS = [
  {
    x: width * 0.52,
    y: height * 0.1,
    spikeCount: 18,
    spikeLength: 28,
    colors: ['#1565C0', '#42A5F5', '#B3E5FC', '#0288D1'],
    delay: 0,
    duration: 1400,
    minDist: 5,
    maxDist: 90,
    starCount: 8,
  },
  {
    x: width * 0.12,
    y: height * 0.1,
    spikeCount: 14,
    spikeLength: 20,
    colors: ['#0277BD', '#4DD0E1', '#B2EBF2'],
    delay: 400,
    duration: 1200,
    minDist: 4,
    maxDist: 60,
    starCount: 5,
  },
  {
    x: width * 0.08,
    y: height * 0.32,
    spikeCount: 12,
    spikeLength: 16,
    colors: ['#42A5F5', '#1565C0', '#B3E5FC'],
    delay: 700,
    duration: 1100,
    minDist: 3,
    maxDist: 45,
    starCount: 4,
  },
  {
    x: width * 0.88,
    y: height * 0.08,
    spikeCount: 14,
    spikeLength: 20,
    colors: ['#1565C0', '#0288D1', '#B2EBF2'],
    delay: 250,
    duration: 1300,
    minDist: 4,
    maxDist: 65,
    starCount: 5,
  },
  {
    x: width * 0.92,
    y: height * 0.28,
    spikeCount: 10,
    spikeLength: 14,
    colors: ['#4DD0E1', '#1565C0'],
    delay: 900,
    duration: 1000,
    minDist: 3,
    maxDist: 40,
    starCount: 3,
  },
];

const VerificationSuccessfulScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.SURFACE }]}
    >
      {/* Firework bursts rendered on a non-interactive layer behind the content */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {BURSTS.map((b, i) => (
          <FireworkBurst key={i} {...b} />
        ))}
      </View>

      <View style={styles.content}>
        {/* Two concentric blue-tinted circles form a soft glow around the icon */}
        <View style={styles.glowOuter}>
          <View style={styles.glowInner}>
            <Image
              source={require('../../../assets/images/verification-successful.png')}
              style={styles.successIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Verification{'\n'}Successful!
        </Text>

        {/* Patient name is bolded to confirm which profile was linked */}
        <Text style={[styles.body, { color: colors.TEXT_SECONDARY }]}>
          The patient profile for{' '}
          <Text style={[styles.nameHighlight, { color: colors.TEXT_PRIMARY }]}>
            Alex Johnson
          </Text>{' '}
          is now linked and verified. You can now manage their appointments.
        </Text>

        <View style={styles.btnWrapper}>
          <PrimaryButton
            title="Go to Dashboard"
            onPress={() => navigation.navigate('CaregiverDashboard')}
            variant="primary"
            size="large"
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.XL,
    paddingBottom: SPACING.XL,
  },

  // Outer halo ring at 7% blue opacity
  glowOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(21, 101, 192, 0.07)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  // Inner halo ring at 12% blue opacity
  glowInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(21, 101, 192, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: { width: 80, height: 80 },

  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: SPACING.MD,
    lineHeight: 34,
  },
  body: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.MD,
    marginBottom: SPACING.MASSIVE,
  },
  nameHighlight: { fontWeight: '800' },
  btnWrapper: { width: '100%' },
});

export default VerificationSuccessfulScreen;
