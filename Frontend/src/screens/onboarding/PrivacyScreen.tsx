// src/screens/onboarding/PrivacyScreen.tsx
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

const PrivacyScreen = ({ navigation }: any) => {
  const handleContinue = () => {
    navigation.navigate('RoleSelection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <BackButton />

        {/* Privacy Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/images/privacy-page-image.png')}
            style={styles.privacyIcon}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Your Privacy Really Matters for US !</Text>

        {/* Terms Box */}
        <View style={styles.termsBox}>
          <Text style={styles.termsText}>
            By continuing to access or use the Bean Robot, its software, and
            related services, you expressly acknowledge that you have read,
            understood, and agree to be legally bound by these Terms and
            Conditions and the Privacy Policy, which together form a binding
            agreement between you and the service provider. You consent to the
            collection, use, storage, and processing of your personal data in
            accordance with the Privacy Policy and applicable laws. Your
            continued use of the service constitutes your full, informed, and
            voluntary acceptance of all terms, obligations, limitations, and
            disclaimers set forth herein.
          </Text>

          {/* Bottom Text */}
          <Text style={styles.bottomText}>
            By <Text style={styles.linkText}>continuing</Text>, you agree to our
            Terms & Privacy Policy
          </Text>
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
        <PaginationDots currentStep={2} totalSteps={3} />
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  privacyIcon: {
    width: 80,
    height: 80,
  },
  title: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.MD,
  },
  termsBox: {
    backgroundColor: COLORS.SECONDARY_LIGHT,
    borderRadius: SPACING.XL,
    padding: SPACING.XL,
    marginBottom: SPACING.XL,
  },
  termsText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: SPACING.XL,
  },
  bottomText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: SPACING.XS,
  },
  linkText: {
    color: COLORS.ERROR,
    fontWeight: '600',
  },
});

export default PrivacyScreen;
