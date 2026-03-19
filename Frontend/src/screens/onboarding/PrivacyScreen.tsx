// src/screens/onboarding/PrivacyScreen.tsx
// ✅ FIGMA-MATCHED — 4 white policy cards with real icon assets + tappable link

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking, // ✅ Added for URL opening
} from 'react-native';
import { PrimaryButton, PaginationDots } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

// ─── Privacy Policy Data ──────────────────────────────────────────────────────
const POLICIES = [
  {
    id: '1',
    iconSource: require('../../../assets/images/privacy-first.png'),
    title: 'Privacy First',
    description:
      'At our platform, your mental well-being is our priority. This includes the safety and confidentiality of your data. We design our systems to protect your sensitive information from the ground up.',
  },
  {
    id: '2',
    iconSource: require('../../../assets/images/data-collection.png'),
    title: 'Data Collection',
    description:
      'We collect information you provide directly to us, such as when you create an account, fill out a mood check-in, or communicate with our support team.',
  },
  {
    id: '3',
    iconSource: require('../../../assets/images/your-rights.png'),
    title: 'Your Rights',
    description:
      'You have the right to access, update, or delete your personal information at any time. We ensure your data remains under your absolute control within our ecosystem.',
  },
  {
    id: '4',
    iconSource: require('../../../assets/images/data-usage.png'),
    title: 'Data Usage',
    description:
      'Your data is used solely to provide and improve our services. We never sell your personal information. All health data is encrypted at rest and in transit.',
  },
];

// ─── Policy Card ──────────────────────────────────────────────────────────────
interface PolicyCardProps {
  iconSource: any;
  title: string;
  description: string;
}

const PolicyCard = ({ iconSource, title, description }: PolicyCardProps) => (
  <View style={styles.card}>
    <Image source={iconSource} style={styles.cardIcon} resizeMode="contain" />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  </View>
);

// ─── Screen ───────────────────────────────────────────────────────────────────
const PrivacyScreen = ({ navigation }: any) => {
  const handleUnderstand = () => {
    navigation.navigate('RoleSelection');
  };

  // ✅ Opens the Neurobloom website in the device's default browser
  const handleOpenWebsite = () => {
    Linking.openURL('https://www.neurobloom.pro/');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.backButton} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* Last updated */}
        <Text style={styles.lastUpdated}>LAST UPDATED: OCTOBER 2025</Text>

        {/* 4 Policy Cards */}
        {POLICIES.map(policy => (
          <PolicyCard
            key={policy.id}
            iconSource={policy.iconSource}
            title={policy.title}
            description={policy.description}
          />
        ))}

        {/* ✅ Tappable contact line */}
        <Text style={styles.contactText}>
          Questions?{' '}
          <Text
            style={styles.contactLink}
            onPress={handleOpenWebsite} // ✅ opens https://www.neurobloom.pro/
          >
            Contact us at Neurobloom.pro
          </Text>
        </Text>

        {/* I Understand Button */}
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title="I Understand"
            onPress={handleUnderstand}
            variant="primary"
            size="large"
            fullWidth
          />
        </View>

        {/* Pagination */}
        <PaginationDots currentStep={2} totalSteps={3} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LIGHT,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 28,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 32,
    marginTop: -2,
  },
  headerTitle: {
    ...TYPOGRAPHY.H4,
    color: COLORS.TEXT_PRIMARY,
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: SPACING.LG,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.XXXL,
  },

  // Last updated
  lastUpdated: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
    letterSpacing: 0.8,
    marginBottom: SPACING.LG,
  },

  // Card
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    marginBottom: SPACING.MD,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  cardIcon: {
    width: 52,
    height: 52,
    marginRight: SPACING.MD,
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  cardDescription: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 21,
  },

  // Contact
  contactText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
    marginTop: SPACING.SM,
    marginBottom: SPACING.XL,
  },
  contactLink: {
    color: COLORS.PRIMARY, // '#4ECCA3' — looks like a link ✅
    fontWeight: '600',
    textDecorationLine: 'underline', // ✅ underline shows it's tappable
  },

  // Button
  buttonWrapper: {
    marginBottom: SPACING.MD,
  },
});

export default PrivacyScreen;
