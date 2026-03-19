// src/screens/onboarding/FeaturesScreen.tsx
// ✅ FIGMA-MATCHED — Fixed layout (no scroll), bigger icons, exact brand greens

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
import { COLORS, SPACING, TYPOGRAPHY, withOpacity } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

const { width, height } = Dimensions.get('window');

// ─── Exact Brand Colors ───────────────────────────────────────────────────────
const GREEN_DARK = '#007042'; // Mood Tracking · SOS Alert · Meditation
const GREEN_BRIGHT = '#22C55E'; // Tasks & Routines · Focus Timer · AI Insights

// ─── Feature Data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: '1',
    iconSource: require('../../../assets/images/mood-tracking-final.png'),
    title: 'Mood Tracking',
    subtitle: 'Log daily emotions with precise sentiment analysis.',
    variant: 'dark',
  },
  {
    id: '2',
    iconSource: require('../../../assets/images/tasks-and-routines-final.png'),
    title: 'Tasks & Routines',
    subtitle: 'Build healthy habits and manage daily rituals.',
    variant: 'bright',
  },
  {
    id: '3',
    iconSource: require('../../../assets/images/focus-timer-final.png'),
    title: 'Focus Timer',
    subtitle: 'Deep-focus sessions with ambient sounds.',
    variant: 'bright',
  },
  {
    id: '4',
    iconSource: require('../../../assets/images/SOS-Alert-final.png'),
    title: 'SOS Alert',
    subtitle: 'Instant access to your support network.',
    variant: 'dark',
  },
  {
    id: '5',
    iconSource: require('../../../assets/images/Meditation-final.png'),
    title: 'Meditation',
    subtitle: 'Guided sessions to find calm and ease stress.',
    variant: 'dark',
  },
  {
    id: '6',
    iconSource: require('../../../assets/images/AI-insight-final.png'),
    title: 'AI Insights',
    subtitle: 'Data-driven reports on your well-being trends.',
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
      {/* Glassy icon pill */}
      <View
        style={[
          styles.iconWrapper,
          {
            backgroundColor: isDark
              ? withOpacity('#FFFFFF', 0.15)
              : withOpacity('#FFFFFF', 0.25),
          },
        ]}
      >
        <Image
          source={iconSource}
          style={styles.cardIcon}
          resizeMode="contain"
        />
      </View>

      {/* Text */}
      <View style={styles.cardTextBlock}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>

      {/* Decorative circle — top-right corner glow */}
      <View
        style={[
          styles.decorCircle,
          {
            backgroundColor: isDark
              ? withOpacity('#FFFFFF', 0.05)
              : withOpacity('#FFFFFF', 0.12),
          },
        ]}
      />
    </View>
  );
};

// ─── Screen ───────────────────────────────────────────────────────────────────

const FeaturesScreen = ({ navigation }: any) => {
  const handleContinue = () => {
    navigation.navigate('Privacy');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.headerBlock}>
        <Text style={styles.title}>
          What <Text style={styles.titleHighlight}>Bean</Text> can do..
        </Text>
        <Text style={styles.subtitle}>
          The ultimate companion for your mental wellness journey, powered by
          AI.
        </Text>
      </View>

      {/* ── 2-Column Grid — fixed, no scroll ── */}
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

      {/* ── Continue Button ── */}
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
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

// Dynamic card height so all 3 rows + header + footer fill screen exactly
const HORIZONTAL_PADDING = SPACING.LG; // 16 each side
const CARD_GAP = SPACING.SM; // 8 between columns
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;
const ROW_GAP = SPACING.SM; // 8 between rows
const HEADER_HEIGHT = 110;
const FOOTER_HEIGHT = 110;
const AVAILABLE = height - HEADER_HEIGHT - FOOTER_HEIGHT - 60; // 60 = safeArea
const CARD_HEIGHT = (AVAILABLE - ROW_GAP * 2) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_50, // '#F5F5F5'
    paddingHorizontal: HORIZONTAL_PADDING,
  },

  // ── Header
  headerBlock: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.SM, // 8
  },
  title: {
    ...TYPOGRAPHY.H2, // fontSize:24, weight:700
    color: COLORS.TEXT_PRIMARY, // '#000000'
    textAlign: 'center',
    marginBottom: SPACING.XS, // 4
  },
  titleHighlight: {
    ...TYPOGRAPHY.H2,
    color: COLORS.PRIMARY, // '#4ECCA3' — Bean mint green ✅
  },
  subtitle: {
    ...TYPOGRAPHY.BODY, // fontSize:14, weight:400
    color: COLORS.TEXT_SECONDARY, // '#666666'
    textAlign: 'center',
    lineHeight: 20,
  },

  // ── Grid
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    rowGap: ROW_GAP,
  },

  // ── Card
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: BORDER_RADIUS.XXL, // 20
    padding: SPACING.LG, // 16
    justifyContent: 'space-between',
    overflow: 'hidden',

    // Depth shadow
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },
  cardDark: {
    backgroundColor: GREEN_DARK, // '#007042'
  },
  cardBright: {
    backgroundColor: GREEN_BRIGHT, // '#22C55E'
  },

  // ── Decorative background circle (top-right)
  decorCircle: {
    position: 'absolute',
    width: CARD_WIDTH * 0.75,
    height: CARD_WIDTH * 0.75,
    borderRadius: CARD_WIDTH,
    top: -CARD_WIDTH * 0.25,
    right: -CARD_WIDTH * 0.2,
  },

  // ── Icon
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: BORDER_RADIUS.XL, // 16
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    width: 34, // bigger icons ✅
    height: 34,
  },

  // ── Card text
  cardTextBlock: {
    gap: 3,
  },
  cardTitle: {
    ...TYPOGRAPHY.LABEL, // fontSize:14, weight:500
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.WHITE, // '#FFFFFF'
  },
  cardSubtitle: {
    ...TYPOGRAPHY.CAPTION, // fontSize:12, weight:400
    color: withOpacity(COLORS.WHITE, 0.8), // soft white ✅
    lineHeight: 16,
  },

  // ── Footer
  footer: {
    height: FOOTER_HEIGHT,
    justifyContent: 'center',
    gap: SPACING.SM, // 8
  },
});

export default FeaturesScreen;
