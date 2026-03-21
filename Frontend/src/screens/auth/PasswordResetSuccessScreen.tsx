// src/screens/auth/PasswordResetSuccessScreen.tsx
// ✅ Dark theme aware + flower cracker fireworks

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
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');

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

const BURSTS = [
  {
    x: width * 0.52,
    y: height * 0.1,
    spikeCount: 18,
    spikeLength: 28,
    colors: ['#07882C', '#2ECC71', '#A8F0C6', '#00C851'],
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
    colors: ['#07882C', '#4ECCA3', '#B8F5D4'],
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
    colors: ['#2ECC71', '#07882C', '#A8F0C6'],
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
    colors: ['#07882C', '#00C851', '#B8F5D4'],
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
    colors: ['#4ECCA3', '#07882C'],
    delay: 900,
    duration: 1000,
    minDist: 3,
    maxDist: 40,
    starCount: 3,
  },
];

const PasswordResetSuccessScreen = ({ navigation, route }: any) => {
  const { colors } = useTheme(); // ✅
  const { userType } = route.params || { userType: 'user' };

  const handleBackToLogin = () => {
    if (userType === 'guardian') navigation.navigate('LoginGuardian');
    else navigation.navigate('LoginUser');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND_LIGHT }]}
    >
      {/* Fireworks layer */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {BURSTS.map((b, i) => (
          <FireworkBurst key={i} {...b} />
        ))}
      </View>

      <View style={styles.content}>
        {/* Success icon */}
        <View style={styles.glowOuter}>
          <View style={styles.glowInner}>
            <Image
              source={require('../../../assets/images/security-requirements.png')}
              style={styles.successIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Success!
        </Text>

        <Text style={[styles.body, { color: colors.TEXT_SECONDARY }]}>
          Your password has been{'\n'}
          <Text style={styles.bodyBold}>successfully</Text> reset.
        </Text>

        {/* Account Updated badge */}
        <View
          style={[
            styles.badge,
            {
              backgroundColor: colors.SECONDARY_LIGHT,
              borderColor: 'rgba(7,136,44,0.2)',
            },
          ]}
        >
          <Text style={[styles.badgeText, { color: colors.TEXT_PRIMARY }]}>
            Account Updated{' '}
          </Text>
          <View style={styles.badgeTick}>
            <Text style={styles.badgeTickText}>✓</Text>
          </View>
        </View>

        <View style={styles.btnWrapper}>
          <PrimaryButton
            title="Back to Login"
            onPress={handleBackToLogin}
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
  },
  glowOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(7,136,44,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  glowInner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(7,136,44,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: { width: 72, height: 72 },
  title: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: SPACING.MD,
  },
  body: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.LG,
  },
  bodyBold: { fontWeight: '800', color: '#07882C' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XS,
    marginBottom: SPACING.MASSIVE,
    borderWidth: 1,
  },
  badgeText: { fontSize: 13, fontWeight: '600' },
  badgeTick: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTickText: { fontSize: 10, color: '#FFFFFF', fontWeight: '800' },
  btnWrapper: { width: '100%' },
});

export default PasswordResetSuccessScreen;
