// src/screens/onboarding/PrivacyScreen.tsx
// ✅ FIGMA-MATCHED — 4 white policy cards with real icon assets

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
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
    {/* Real rounded icon image */}
    <Image source={iconSource} style={styles.cardIcon} resizeMode="contain" />

    {/* Card text */}
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

        {/* Contact */}
        <Text style={styles.contactText}>
          Questions?{' '}
          <Text style={styles.contactLink}>Contact us at Neurobloom.pro</Text>
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
    backgroundColor: COLORS.BACKGROUND_LIGHT, // '#F8F9FA'
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LG, // 16
    paddingVertical: SPACING.MD, // 12
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LIGHT, // '#F0F0F0'
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
    ...TYPOGRAPHY.H4, // fontSize:18, weight:600
    color: COLORS.TEXT_PRIMARY,
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: SPACING.LG, // 16
    paddingTop: SPACING.LG, // 16
    paddingBottom: SPACING.XXXL, // 30
  },

  // Last updated
  lastUpdated: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.TEXT_TERTIARY, // '#999999'
    textAlign: 'center',
    letterSpacing: 0.8,
    marginBottom: SPACING.LG, // 16
  },

  // Card
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL, // 16
    padding: SPACING.LG, // 16
    marginBottom: SPACING.MD, // 12
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },

  // Icon — uses the real rounded PNG directly, no wrapper needed
  cardIcon: {
    width: 52,
    height: 52,
    marginRight: SPACING.MD, // 12
    flexShrink: 0,
  },

  // Card text
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS, // 4
  },
  cardDescription: {
    ...TYPOGRAPHY.BODY, // fontSize:14, weight:400
    color: COLORS.TEXT_SECONDARY, // '#666666'
    lineHeight: 21,
  },

  // Contact
  contactText: {
    ...TYPOGRAPHY.CAPTION, // fontSize:12
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
    marginTop: SPACING.SM, // 8
    marginBottom: SPACING.XL, // 20
  },
  contactLink: {
    color: COLORS.PRIMARY, // '#4ECCA3'
    fontWeight: '600',
  },

  // Button
  buttonWrapper: {
    marginBottom: SPACING.MD, // 12
  },
});

export default PrivacyScreen;
