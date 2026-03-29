// Animated brand introduction shown on every cold launch.
// Three elements appear in sequence — Bean logo, rotating face icon,
// Neurobloom logo — before the screen replaces itself with Welcome.

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Image } from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  // ── Animation value declarations ──────────────────────────────────────────
  const beanLogoOpacity = useRef(new Animated.Value(0)).current;
  const beanLogoScale = useRef(new Animated.Value(0.5)).current;
  const iconScale = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const neurobloomSlide = useRef(new Animated.Value(-300)).current;
  const neurobloomOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimations();
  }, []);

  const startAnimations = () => {
    // Step 1 (0 – 0.8 s): Bean logo fades in and springs up to full scale.
    Animated.parallel([
      Animated.timing(beanLogoOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.spring(beanLogoScale, {
        toValue: 1,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Step 2 (0.5 – 2 s): Face icon scales in while completing a full rotation.
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(iconScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);

    // Step 3 (2 s): Neurobloom logo slides in from the left and fades to full opacity.
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(neurobloomSlide, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(neurobloomOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);

    // Step 4 (3.5 s): Replace this screen with Welcome so it is removed from the stack.
    setTimeout(() => {
      navigation.replace('Welcome');
    }, 3500);
  };

  // Maps the 0 → 1 animation progress to 0° → 360° for the icon rotation.
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Bean wordmark — first element to appear */}
      <Animated.View
        style={[
          styles.beanLogoContainer,
          { opacity: beanLogoOpacity, transform: [{ scale: beanLogoScale }] },
        ]}
      >
        <Image
          source={require('../../../assets/images/Bean-image.png')}
          style={styles.beanLogoImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Face icon — scales in and spins once before settling */}
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ scale: iconScale }, { rotate: rotation }] },
        ]}
      >
        <Image
          source={require('../../../assets/images/select-user.png')}
          style={styles.faceIcon}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Neurobloom logo — slides in from the left edge */}
      <Animated.View
        style={[
          styles.neurobloomContainer,
          {
            opacity: neurobloomOpacity,
            transform: [{ translateX: neurobloomSlide }],
          },
        ]}
      >
        <Image
          source={require('../../../assets/images/neurobloom-logo.png')}
          style={styles.neurobloomLogo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  // White background matches the Bean logo and keeps the splash screen brand-consistent.
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  beanLogoContainer: { marginBottom: 20 },
  beanLogoImage: { width: 150, height: 60 },
  iconContainer: { marginBottom: 30 },
  faceIcon: { width: 100, height: 100 },
  neurobloomContainer: { marginTop: 10 },
  neurobloomLogo: { width: 200, height: 50 },
});

export default SplashScreen;
