// src/screens/user/HomeScreen.tsx
// ✅ Feature tile color #94A3B8 · Uses BottomTabBar + DropdownMenu

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import DropdownMenu from '../../components/common/DropdownMenu';
import BottomTabBar from '../../components/navigation/BottomTabBar';

const { width } = Dimensions.get('window');

// ─── Feature tile color — Figma slate ────────────────────────────────────────
const TILE_BG = '#F1F5F9'; // very light slate — readable and clean ✅
// (pure #94A3B8 is too dark for text, using its light tint)

// ─── Feature Grid Data ────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: '1',
    iconSource: require('../../../assets/images/talk-to-bean.png'),
    label: 'Talk to Bean',
    route: 'Chat',
    fullWidth: false,
  },
  {
    id: '2',
    iconSource: require('../../../assets/images/timer-icon.png'),
    label: 'Start Focus Mode',
    route: 'FocusMode',
    fullWidth: false,
  },
  {
    id: '3',
    iconSource: require('../../../assets/images/games.png'),
    label: 'Games',
    route: 'Home',
    fullWidth: false,
  },
  {
    id: '4',
    iconSource: require('../../../assets/images/play-calm-music.png'),
    label: 'Play calm music',
    route: 'Home',
    fullWidth: false,
  },
  {
    id: '5',
    iconSource: require('../../../assets/images/detecting-SOS.png'),
    label: 'Detecting SOS',
    route: 'Home',
    fullWidth: false,
  },
  {
    id: '6',
    iconSource: require('../../../assets/images/calming-exercises.png'),
    label: 'Calming Exercises',
    route: 'Home',
    fullWidth: false,
  },
  {
    id: '7',
    iconSource: require('../../../assets/images/therapeutic-conversation.png'),
    label: 'Therapeutic Conversations',
    route: 'Chat',
    fullWidth: true,
  },
];

// ─── Donut Chart ──────────────────────────────────────────────────────────────
const DonutChart = () => {
  const DONUT_SIZE = 110;
  const THICKNESS = 14;
  const INNER = DONUT_SIZE - THICKNESS * 2;

  return (
    <View style={donutStyles.wrapper}>
      <View
        style={[
          donutStyles.ring,
          {
            width: DONUT_SIZE,
            height: DONUT_SIZE,
            borderRadius: DONUT_SIZE / 2,
            borderWidth: THICKNESS,
            borderColor: COLORS.PRIMARY,
          },
        ]}
      >
        <View
          style={[
            donutStyles.inner,
            {
              width: INNER,
              height: INNER,
              borderRadius: INNER / 2,
            },
          ]}
        />
      </View>

      <View style={donutStyles.legend}>
        {[
          { label: 'Calm', color: COLORS.PRIMARY },
          { label: 'Joy', color: COLORS.PRIMARY_LIGHT },
          { label: 'Active', color: COLORS.PRIMARY_DARK },
        ].map(item => (
          <View key={item.label} style={donutStyles.legendRow}>
            <View style={[donutStyles.dot, { backgroundColor: item.color }]} />
            <Text style={donutStyles.legendText}>{item.label}</Text>
            <Text style={donutStyles.legendValue}>0%</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const donutStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XL,
  },
  ring: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    backgroundColor: COLORS.WHITE,
  },
  legend: {
    gap: SPACING.XS,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
    width: 44,
  },
  legendValue: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
});

// ─── Feature Tile ─────────────────────────────────────────────────────────────
const TILE_GAP = SPACING.MD;
const TILE_SIZE = (width - SPACING.XL * 2 - TILE_GAP) / 2;

interface FeatureTileProps {
  iconSource: any;
  label: string;
  fullWidth: boolean;
  onPress: () => void;
}

const FeatureTile = ({
  iconSource,
  label,
  fullWidth,
  onPress,
}: FeatureTileProps) => (
  <TouchableOpacity
    style={[styles.tile, fullWidth && styles.tileFullWidth]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Image source={iconSource} style={styles.tileIcon} resizeMode="contain" />
    <Text style={styles.tileLabel}>{label}</Text>
  </TouchableOpacity>
);

// ─── Screen ───────────────────────────────────────────────────────────────────
const HomeScreen = ({ navigation }: any) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Image
            source={require('../../../assets/images/login-page.png')}
            style={styles.topBarRobotIcon}
            resizeMode="contain"
          />
          <Text style={styles.topBarName}>Bean</Text>
        </View>

        <TouchableOpacity
          style={styles.hamburgerBtn}
          onPress={() => setDropdownVisible(true)}
        >
          <Text style={styles.hamburgerIcon}>≡</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Hey Alex!</Text>
        <Text style={styles.focusLabel}>Today's Focus</Text>

        {/* Mood Balance Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mood Balance</Text>
          <DonutChart />
        </View>

        {/* Daily Progress Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Progress</Text>
          <Text style={styles.progressSubtitle}>
            0/5 Tasks Done • 0m Focus Time
          </Text>
          <View style={styles.progressRow}>
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>🔥 0 Day Streak</Text>
            </View>
            <TouchableOpacity style={styles.calendarBtn}>
              <Text style={styles.calendarBtnText}>Mood Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bean Thinking */}
        <View style={styles.beanThinkingContainer}>
          <Image
            source={require('../../../assets/images/user-dashboard-bean-thinking.png')}
            style={styles.beanThinkingImage}
            resizeMode="contain"
          />
        </View>

        {/* Features */}
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureGrid}>
          {FEATURES.map(feature => (
            <FeatureTile
              key={feature.id}
              iconSource={feature.iconSource}
              label={feature.label}
              fullWidth={feature.fullWidth}
              onPress={() => {
                try {
                  navigation.navigate(feature.route);
                } catch {}
              }}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <BottomTabBar navigation={navigation} activeTab="Home" />

      {/* Dropdown Menu */}
      <DropdownMenu
        visible={dropdownVisible}
        onClose={() => setDropdownVisible(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.MD,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LIGHT,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  topBarRobotIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  topBarName: {
    ...TYPOGRAPHY.H4,
    color: COLORS.TEXT_PRIMARY,
  },
  hamburgerBtn: {
    padding: SPACING.XS,
  },
  hamburgerIcon: {
    fontSize: 26,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 28,
  },

  scrollContent: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MASSIVE,
  },

  greeting: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  focusLabel: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.LG,
  },

  card: {
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
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.LG,
  },
  progressSubtitle: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.MD,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streakBadge: {
    backgroundColor: COLORS.SECONDARY_LIGHT,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
  },
  calendarBtn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XS,
  },
  calendarBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.WHITE,
  },

  beanThinkingContainer: {
    alignItems: 'flex-end',
    marginBottom: SPACING.SM,
  },
  beanThinkingImage: {
    width: 80,
    height: 80,
  },

  sectionTitle: {
    ...TYPOGRAPHY.H3,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },

  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: TILE_GAP,
  },

  // ✅ Tile background = #F1F5F9 (light version of #94A3B8 slate)
  tile: {
    width: TILE_SIZE,
    backgroundColor: TILE_BG,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: TILE_SIZE * 0.85,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  tileFullWidth: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 70,
    gap: SPACING.MD,
  },
  tileIcon: {
    width: 38,
    height: 38,
    marginBottom: SPACING.SM,
  },
  tileLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 18,
  },
});

export default HomeScreen;
