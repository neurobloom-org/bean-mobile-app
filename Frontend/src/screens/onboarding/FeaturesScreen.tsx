// src/screens/onboarding/FeaturesScreen.tsx
// ✅ REFACTORED VERSION

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { BackButton, PrimaryButton, PaginationDots } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

interface FeatureItemProps {
  iconSource: any;
  title: string;
  subtitle: string;
}

const FeatureItem = ({ iconSource, title, subtitle }: FeatureItemProps) => (
  <View style={styles.featureCard}>
    <View style={styles.iconContainer}>
      <Image
        source={iconSource}
        style={styles.iconImage}
        resizeMode="contain"
      />
    </View>
    <View style={styles.featureTextContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

const FeaturesScreen = ({ navigation }: any) => {
  const handleContinue = () => {
    navigation.navigate('Privacy');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <BackButton />

        {/* Title */}
        <Text style={styles.title}>What Bean can do...</Text>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <FeatureItem
            iconSource={require('../../../assets/images/mood-tracking.png')}
            title="Mood Tracking"
            subtitle="Track how you feel daily"
          />
          <FeatureItem
            iconSource={require('../../../assets/images/tasks-and-routines.png')}
            title="Tasks & Routines"
            subtitle="Stay organized"
          />
          <FeatureItem
            iconSource={require('../../../assets/images/focus-timer.png')}
            title="Focus Timer"
            subtitle="Stay productive"
          />
          <FeatureItem
            iconSource={require('../../../assets/images/sos-alert.png')}
            title="SOS Alert"
            subtitle="Quick help when needed"
          />
          <FeatureItem
            iconSource={require('../../../assets/images/meditation.png')}
            title="Meditation"
            subtitle="Find your calm"
          />
        </View>

        {/* Continue Button */}
        <PrimaryButton
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
        />

        {/* Pagination Dots */}
        <PaginationDots currentStep={1} totalSteps={3} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.XXL,
  },
  title: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XXL,
  },
  featuresContainer: {
    flex: 1,
    gap: SPACING.LG,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.SECONDARY_LIGHT,
    borderRadius: SPACING.XL,
    padding: SPACING.LG,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.LG,
    overflow: 'hidden',
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XXS,
  },
  featureSubtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
  },
});

export default FeaturesScreen;
