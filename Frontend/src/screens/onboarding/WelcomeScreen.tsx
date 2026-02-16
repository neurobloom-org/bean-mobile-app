// src/screens/onboarding/WelcomeScreen.tsx
// ✅ REFACTORED VERSION - Uses components and constants!

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { PrimaryButton, PaginationDots } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }: any) => {
  const handleGetStarted = () => {
    navigation.navigate('Features');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Robot Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/robot-first-page.png')}
            style={styles.robotImage}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Hello, I'm Bean</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Your friendly companion for a calmer, focused mind. Let's take a
          breath and start our journey together.
        </Text>

        {/* Get Started Button */}
        <PrimaryButton
          title="Get Started"
          onPress={handleGetStarted}
          variant="primary"
          size="large"
          fullWidth
        />

        {/* Pagination Dots */}
        <PaginationDots currentStep={0} totalSteps={3} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.XL,
  },
  imageContainer: {
    marginBottom: SPACING.XL,
    width: width * 0.9,
    height: height * 0.55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    ...TYPOGRAPHY.H1,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.BODY_LARGE,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.XXL,
    paddingHorizontal: SPACING.MD,
  },
});

export default WelcomeScreen;
