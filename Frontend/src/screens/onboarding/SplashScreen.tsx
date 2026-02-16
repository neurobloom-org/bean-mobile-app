import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Image } from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  // Animation values
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
    // 1. Fade in and scale up "Bean" logo image (0-0.8 seconds)
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

    // 2. Scale up and rotate face icon after 0.5 seconds (0.5-2 seconds)
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

    // 3. Slide in "Neurobloom" logo from left after 2 seconds
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

    // 4. Navigate to Welcome screen after 3.5 seconds
    setTimeout(() => {
      navigation.replace('Welcome');
    }, 3500);
  };

  // Interpolate rotation
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Bean Logo Image - Appears first at top */}
      <Animated.View
        style={[
          styles.beanLogoContainer,
          {
            opacity: beanLogoOpacity,
            transform: [{ scale: beanLogoScale }],
          },
        ]}
      >
        <Image
          source={require('../../../assets/images/Bean-image.png')}
          style={styles.beanLogoImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Rotating Face Icon - Appears second in middle */}
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [{ scale: iconScale }, { rotate: rotation }],
          },
        ]}
      >
        <Image
          source={require('../../../assets/images/select-user.png')}
          style={styles.faceIcon}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Neurobloom Logo - Slides from left at bottom */}
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  beanLogoContainer: {
    marginBottom: 20,
  },
  beanLogoImage: {
    width: 150,
    height: 60,
  },
  iconContainer: {
    marginBottom: 30,
  },
  faceIcon: {
    width: 100,
    height: 100,
  },
  neurobloomContainer: {
    marginTop: 10,
  },
  neurobloomLogo: {
    width: 200,
    height: 50,
  },
});

export default SplashScreen;
