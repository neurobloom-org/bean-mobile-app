// src/screens/onboarding/FeaturesScreen.tsx
// ✅ Square cards · Scrollable · Large icons · Exact brand greens

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { PrimaryButton, PaginationDots } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY, withOpacity } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

const { width } = Dimensions.get('window');

// ─── Brand Colors ─────────────────────────────────────────────────────────────
const GREEN_DARK = '#007042'; // Mood Tracking · SOS Alert · Meditation
const GREEN_BRIGHT = '#22C55E'; // Tasks & Routines · Focus Timer · AI Insights

// ─── Layout — perfectly square cards ─────────────────────────────────────────
const H_PAD = SPACING.XL; // 20 each side
const CARD_GAP = SPACING.MD; // 12 between columns
const CARD_SIZE = (width - H_PAD * 2 - CARD_GAP) / 2; // exact square ✅

// Icon sizes — large and prominent
const ICON_WRAP = CARD_SIZE * 0.38; // wrapper circle ~38% of card
const ICON_SIZE = ICON_WRAP * 0.72; // icon inside ~72% of wrapper

// ─── Feature Data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: '1',
    iconSource: require('../../../assets/images/mood-tracking-final.png'),
    title: 'Mood Tracking',
    subtitle:
      'Log your daily emotions with precise sentiment analysis and patterns.',
    variant: 'dark',
  },
  {
    id: '2',
    iconSource: require('../../../assets/images/tasks-and-routines-final.png'),
    title: 'Tasks & Routines',
    subtitle:
      'Build healthy habits and manage your daily rituals effortlessly.',
    variant: 'bright',
  },
  {
    id: '3',
    iconSource: require('../../../assets/images/focus-timer-final.png'),
    title: 'Focus Timer',
    subtitle: 'Boost productivity with deep-focus sessions and ambient sounds.',
    variant: 'bright',
  },
  {
    id: '4',
    iconSource: require('../../../assets/images/SOS-Alert-final.png'),
    title: 'SOS Alert',
    subtitle: 'Immediate access to your support network when you need it most.',
    variant: 'dark',
  },
  {
    id: '5',
    iconSource: require('../../../assets/images/Meditation-final.png'),
    title: 'Meditation',
    subtitle:
      'Curated guided sessions to find your inner calm and reduce stress.',
    variant: 'dark',
  },
  {
    id: '6',
    iconSource: require('../../../assets/images/AI-insight-final.png'),
    title: 'AI Insights',
    subtitle:
      'Personalized data-driven reports on your mental well-being trends.',
    variant: 'bright',
  },
];

// ─── Feature Card ─────────────────────────────────────────────────────────────
interface FeatureCardProps {
  iconSource: any;
  title: string;
  subtitle: string;
  variant: 'dark' | 'bright';
}

const FeatureCard = ({
  iconSource,
  title,
  subtitle,
  variant,
}: FeatureCardProps) => {
  const isDark = variant === 'dark';
  return (
    <View style={[styles.card, isDark ? styles.cardDark : styles.cardBright]}>
      {/* Decorative glow blob — top right */}
      <View
        style={[
          styles.decorCircle,
          { backgroundColor: withOpacity('#FFFFFF', isDark ? 0.06 : 0.14) },
        ]}
      />

      {/* Icon */}
      <View
        style={[
          styles.iconWrapper,
          { backgroundColor: withOpacity('#FFFFFF', isDark ? 0.18 : 0.28) },
        ]}
      >
        <Image
          source={iconSource}
          style={styles.iconImage}
          resizeMode="contain"
        />
      </View>

      {/* Text */}
      <View style={styles.textBlock}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

// ─── Screen ───────────────────────────────────────────────────────────────────
const FeaturesScreen = ({ navigation }: any) => {
  const handleContinue = () => navigation.navigate('Privacy');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Header */}
        <View style={styles.headerBlock}>
          <Text style={styles.title}>
            What <Text style={styles.titleHighlight}>Bean</Text> can do..
          </Text>
          <Text style={styles.subtitle}>
            The ultimate companion for your mental wellness journey, powered by
            AI.
          </Text>
        </View>

        {/* 2-Column Square Grid */}
        <View style={styles.grid}>
          {FEATURES.map(feature => (
            <FeatureCard
              key={feature.id}
              iconSource={feature.iconSource}
              title={feature.title}
              subtitle={feature.subtitle}
              variant={feature.variant as 'dark' | 'bright'}
            />
          ))}
        </View>

        {/* Continue + Pagination */}
        <View style={styles.footer}>
          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            size="large"
            fullWidth
          />
          <PaginationDots currentStep={1} totalSteps={3} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_50, // '#F5F5F5'
  },
  scrollContent: {
    paddingHorizontal: H_PAD, // 20
    paddingTop: SPACING.XL, // 20
    paddingBottom: SPACING.XXXL, // 30
  },

  // ── Header
  headerBlock: {
    alignItems: 'center',
    marginBottom: SPACING.XL, // 20
  },
  title: {
    ...TYPOGRAPHY.H2, // fontSize:24, weight:700
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.SM, // 8
  },
  titleHighlight: {
    ...TYPOGRAPHY.H2,
    color: COLORS.PRIMARY, // '#4ECCA3'
  },
  subtitle: {
    ...TYPOGRAPHY.BODY, // fontSize:14, weight:400
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.SM,
  },

  // ── Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: CARD_GAP, // 12 between rows
    marginBottom: SPACING.XL, // 20
  },

  // ── Card — SQUARE ✅
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE, // same as width = square!
    borderRadius: BORDER_RADIUS.XXL, // 20
    padding: SPACING.MD, // 12
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 7,
  },
  cardDark: {
    backgroundColor: GREEN_DARK, // '#007042'
  },
  cardBright: {
    backgroundColor: GREEN_BRIGHT, // '#22C55E'
  },

  // ── Decorative blob
  decorCircle: {
    position: 'absolute',
    width: CARD_SIZE * 0.7,
    height: CARD_SIZE * 0.7,
    borderRadius: CARD_SIZE,
    top: -CARD_SIZE * 0.22,
    right: -CARD_SIZE * 0.18,
  },

  // ── Icon wrapper
  iconWrapper: {
    width: ICON_WRAP,
    height: ICON_WRAP,
    borderRadius: BORDER_RADIUS.XL, // 16
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },

  // ── Text
  textBlock: {
    gap: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.WHITE,
    letterSpacing: -0.1,
  },
  cardSubtitle: {
    fontSize: 11,
    color: withOpacity(COLORS.WHITE, 0.82),
    lineHeight: 15,
  },

  // ── Footer
  footer: {
    gap: SPACING.SM, // 8
  },
});

export default FeaturesScreen;
