// Onboarding step 2 of 3. Presents the six core Bean features as a two-column
// card grid. Cards are intentionally kept green regardless of the active theme
// because they form part of the brand identity.

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
import { SPACING, TYPOGRAPHY, withOpacity } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

// Two shades of green used for card backgrounds; not drawn from the theme palette.
const GREEN_DARK = '#007042';
const GREEN_BRIGHT = '#22C55E';

const H_PAD = SPACING.XL;
const CARD_GAP = SPACING.MD;

// Card fills half the available width minus one gap.
const CARD_SIZE = (width - H_PAD * 2 - CARD_GAP) / 2;

// Icon wrapper and icon dimensions derived proportionally from card size.
const ICON_WRAP = CARD_SIZE * 0.38;
const ICON_SIZE = ICON_WRAP * 0.72;

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

interface FeatureCardProps {
  iconSource: any;
  title: string;
  subtitle: string;
  // 'dark' uses GREEN_DARK background; 'bright' uses GREEN_BRIGHT.
  variant: 'dark' | 'bright';
}

// Cards intentionally stay green regardless of the system theme — brand colours
// are not overridden by the dark/light palette switch.
const FeatureCard = ({
  iconSource,
  title,
  subtitle,
  variant,
}: FeatureCardProps) => {
  const isDark = variant === 'dark';
  return (
    <View style={[styles.card, isDark ? styles.cardDark : styles.cardBright]}>
      {/* Decorative circle positioned behind the content for depth */}
      <View
        style={[
          styles.decorCircle,
          { backgroundColor: withOpacity('#FFFFFF', isDark ? 0.06 : 0.14) },
        ]}
      />
      {/* Icon container with a semi-transparent white background */}
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
      <View style={styles.textBlock}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const FeaturesScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND_LIGHT }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* Screen header */}
        <View style={styles.headerBlock}>
          <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
            What{' '}
            <Text style={[styles.titleHighlight, { color: colors.PRIMARY }]}>
              Bean
            </Text>{' '}
            can do..
          </Text>
          <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
            The ultimate companion for your mental wellness journey, powered by
            AI.
          </Text>
        </View>

        {/* Two-column feature card grid */}
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

        {/* Navigation footer: continue button and step indicator */}
        <View style={styles.footer}>
          <PrimaryButton
            title="Continue"
            onPress={() => navigation.navigate('Privacy')}
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: H_PAD,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.XXXL,
  },
  headerBlock: { alignItems: 'center', marginBottom: SPACING.XL },
  title: { ...TYPOGRAPHY.H2, textAlign: 'center', marginBottom: SPACING.SM },
  titleHighlight: { ...TYPOGRAPHY.H2 },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.SM,
  },

  // Wrapping row layout; cards break to the next row automatically.
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: CARD_GAP,
    marginBottom: SPACING.XL,
  },

  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: BORDER_RADIUS.XXL,
    padding: SPACING.MD,
    justifyContent: 'space-between',
    overflow: 'hidden',
    elevation: 7,
  },
  cardDark: { backgroundColor: GREEN_DARK },
  cardBright: { backgroundColor: GREEN_BRIGHT },

  // Large translucent circle partially off the top-right corner for decoration.
  decorCircle: {
    position: 'absolute',
    width: CARD_SIZE * 0.7,
    height: CARD_SIZE * 0.7,
    borderRadius: CARD_SIZE,
    top: -CARD_SIZE * 0.22,
    right: -CARD_SIZE * 0.18,
  },

  iconWrapper: {
    width: ICON_WRAP,
    height: ICON_WRAP,
    borderRadius: BORDER_RADIUS.XL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: { width: ICON_SIZE, height: ICON_SIZE },
  textBlock: { gap: 3 },

  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  cardSubtitle: {
    fontSize: 11,
    color: withOpacity('#FFFFFF', 0.82),
    lineHeight: 15,
  },

  footer: { gap: SPACING.SM },
});

export default FeaturesScreen;
