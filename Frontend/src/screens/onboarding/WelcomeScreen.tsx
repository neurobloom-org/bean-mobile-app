// Onboarding step 1 of 3. Introduces Bean with a large robot illustration,
// a greeting, a short descriptor, and a "Get Started" button.

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
import { SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.SURFACE }]}
    >
      <View style={styles.content}>
        {/* Robot illustration — sized relative to the screen so it adapts across devices */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/robot-first-page.png')}
            style={styles.robotImage}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Hello, I'm Bean
        </Text>
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Your friendly companion for a calmer, focused mind. Let's take a
          breath and start our journey together.
        </Text>

        {/* Advances to the features overview screen */}
        <PrimaryButton
          title="Get Started"
          onPress={() => navigation.navigate('Features')}
          variant="primary"
          size="large"
          fullWidth
        />

        <PaginationDots currentStep={0} totalSteps={3} />
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

  // Image container fills 90% of screen width and 55% of screen height
  // so the robot scales proportionally on all device sizes.
  imageContainer: {
    marginBottom: SPACING.XL,
    width: width * 0.9,
    height: height * 0.55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotImage: { width: '100%', height: '100%' },

  title: {
    ...TYPOGRAPHY.H1,
    marginBottom: SPACING.MD,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.BODY_LARGE,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.XXL,
    paddingHorizontal: SPACING.MD,
  },
});

export default WelcomeScreen;
