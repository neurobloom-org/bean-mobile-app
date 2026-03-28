// src/screens/onboarding/PrivacyScreen.tsx
// ✅ Dark theme aware

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { PrimaryButton, PaginationDots } from '../../components';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

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

interface PolicyCardProps {
  iconSource: any;
  title: string;
  description: string;
  colors: any;
}

const PolicyCard = ({
  iconSource,
  title,
  description,
  colors,
}: PolicyCardProps) => (
  <View style={[styles.card, { backgroundColor: colors.SURFACE }]}>
    <Image source={iconSource} style={styles.cardIcon} resizeMode="contain" />
    <View style={styles.cardContent}>
      <Text style={[styles.cardTitle, { color: colors.TEXT_PRIMARY }]}>
        {title}
      </Text>
      <Text style={[styles.cardDescription, { color: colors.TEXT_SECONDARY }]}>
        {description}
      </Text>
    </View>
  </View>
);

const PrivacyScreen = ({ navigation }: any) => {
  const { colors } = useTheme(); // ✅

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND_LIGHT }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.SURFACE,
            borderBottomColor: colors.BORDER_LIGHT,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backArrow, { color: colors.TEXT_PRIMARY }]}>
            ‹
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
          Privacy Policy
        </Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* Last updated */}
        <Text style={[styles.lastUpdated, { color: colors.TEXT_TERTIARY }]}>
          LAST UPDATED: OCTOBER 2025
        </Text>

        {/* Policy Cards */}
        {POLICIES.map(policy => (
          <PolicyCard
            key={policy.id}
            iconSource={policy.iconSource}
            title={policy.title}
            description={policy.description}
            colors={colors}
          />
        ))}

        {/* Contact link */}
        <Text style={[styles.contactText, { color: colors.TEXT_TERTIARY }]}>
          Questions?{' '}
          <Text
            style={[styles.contactLink, { color: colors.PRIMARY }]}
            onPress={() => Linking.openURL('https://www.neurobloom.pro/')}
          >
            Contact us at Neurobloom.pro
          </Text>
        </Text>

        {/* I Understand Button */}
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title="I Understand"
            onPress={() => navigation.navigate('RoleSelection')}
            variant="primary"
            size="large"
            fullWidth
          />
        </View>

        <PaginationDots currentStep={2} totalSteps={3} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: { fontSize: 28, lineHeight: 32, marginTop: -2 },
  headerTitle: { ...TYPOGRAPHY.H4 },
  scrollContent: {
    paddingHorizontal: SPACING.LG,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.XXXL,
  },
  lastUpdated: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.8,
    marginBottom: SPACING.LG,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    marginBottom: SPACING.MD,
    elevation: 3,
  },
  cardIcon: { width: 52, height: 52, marginRight: SPACING.MD, flexShrink: 0 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: SPACING.XS },
  cardDescription: { ...TYPOGRAPHY.BODY, lineHeight: 21 },
  contactText: {
    ...TYPOGRAPHY.CAPTION,
    textAlign: 'center',
    marginTop: SPACING.SM,
    marginBottom: SPACING.XL,
  },
  contactLink: { fontWeight: '600', textDecorationLine: 'underline' },
  buttonWrapper: { marginBottom: SPACING.MD },
});

export default PrivacyScreen;
