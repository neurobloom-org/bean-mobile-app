// src/screens/auth/PasswordResetSuccessScreen.tsx
// ✅ Looping fireworks animation that runs continuously while on screen

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
import { COLORS, SPACING } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

const { width, height } = Dimensions.get('window');

// Single firework particle
const Particle = ({
  startX,
  startY,
  angle,
  color,
  delay,
}: {
  startX: number;
  startY: number;
  angle: number;
  color: string;
  delay: number;
}) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const distance = 60 + Math.random() * 40;
  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.cos(angle) * distance],
  });
  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.sin(angle) * distance],
  });
  const opacity = anim.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [0, 1, 0.6, 0],
  });
  const scale = anim.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 1.2, 0.4],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: startX,
        top: startY,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: color,
        opacity,
        transform: [{ translateX }, { translateY }, { scale }],
      }}
    />
  );
};

// One firework burst
const Firework = ({
  x,
  y,
  colors,
  baseDelay,
}: {
  x: number;
  y: number;
  colors: string[];
  baseDelay: number;
}) => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * 2 * Math.PI,
    color: colors[i % colors.length],
    delay: baseDelay + i * 40,
  }));

  return (
    <>
      {particles.map((p, i) => (
        <Particle key={i} startX={x} startY={y} {...p} />
      ))}
    </>
  );
};

const FIREWORKS = [
  {
    x: width * 0.15,
    y: height * 0.08,
    colors: ['#07882C', '#4ECCA3', '#A8F0C6'],
    delay: 0,
  },
  {
    x: width * 0.75,
    y: height * 0.06,
    colors: ['#FFD700', '#FFA500', '#FF6B6B'],
    delay: 300,
  },
  {
    x: width * 0.85,
    y: height * 0.18,
    colors: ['#07882C', '#00C851', '#AAFF00'],
    delay: 600,
  },
  {
    x: width * 0.1,
    y: height * 0.22,
    colors: ['#FF69B4', '#FF1493', '#FFB6C1'],
    delay: 200,
  },
  {
    x: width * 0.6,
    y: height * 0.04,
    colors: ['#00BFFF', '#1E90FF', '#87CEEB'],
    delay: 500,
  },
  {
    x: width * 0.4,
    y: height * 0.12,
    colors: ['#FFD700', '#07882C', '#FF6B6B'],
    delay: 800,
  },
];

const PasswordResetSuccessScreen = ({ navigation, route }: any) => {
  const { userType } = route.params || { userType: 'user' };

  const handleBackToLogin = () => {
    if (userType === 'guardian') {
      navigation.navigate('LoginGuardian');
    } else {
      navigation.navigate('LoginUser');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fireworks layer — behind everything */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {FIREWORKS.map((fw, i) => (
          <Firework
            key={i}
            x={fw.x}
            y={fw.y}
            colors={fw.colors}
            baseDelay={fw.delay}
          />
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

        <Text style={styles.title}>Success!</Text>
        <Text style={styles.body}>
          Your password has been{' '}
          <Text style={styles.bodyBold}>successfully</Text> reset.
        </Text>

        {/* Account Updated badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Account Updated ✓</Text>
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
  container: { flex: 1, backgroundColor: COLORS.WHITE },
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
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.MD,
  },
  body: {
    fontSize: 15,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.LG,
  },
  bodyBold: {
    fontWeight: '800',
    color: COLORS.TEXT_PRIMARY,
  },
  badge: {
    backgroundColor: '#EFF9F2',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XS,
    marginBottom: SPACING.MASSIVE,
    borderWidth: 1,
    borderColor: 'rgba(7,136,44,0.25)',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#07882C',
  },
  btnWrapper: { width: '100%' },
});

export default PasswordResetSuccessScreen;
