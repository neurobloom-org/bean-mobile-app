// src/screens/user/HomeScreen.tsx
// ✅ Bean robot on Calming Exercises → Chat · Merged card · DropdownMenu

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

const TILE_BG = '#F1F5F9';
const TILE_GAP = SPACING.MD;
const TILE_SIZE = (width - SPACING.XL * 2 - TILE_GAP) / 2;

// ─── Donut Chart ──────────────────────────────────────────────────────────────
const DonutChart = () => {
  const SIZE = 120;
  const THICKNESS = 16;
  const INNER = SIZE - THICKNESS * 2;
  return (
    <View style={donut.wrapper}>
      <View
        style={[
          donut.ring,
          {
            width: SIZE,
            height: SIZE,
            borderRadius: SIZE / 2,
            borderWidth: THICKNESS,
            borderColor: COLORS.PRIMARY,
          },
        ]}
      >
        <View
          style={[
            donut.hole,
            { width: INNER, height: INNER, borderRadius: INNER / 2 },
          ]}
        />
      </View>
      <View style={donut.legend}>
        {[
          { label: 'Calm', color: COLORS.PRIMARY_LIGHT },
          { label: 'Joy', color: COLORS.PRIMARY },
          { label: 'Active', color: COLORS.PRIMARY_DARK },
        ].map(item => (
          <View key={item.label} style={donut.row}>
            <View style={[donut.dot, { backgroundColor: item.color }]} />
            <Text style={donut.label}>{item.label}</Text>
            <Text style={donut.value}>0%</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const donut = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XL,
    marginBottom: SPACING.LG,
  },
  ring: { justifyContent: 'center', alignItems: 'center' },
  hole: { backgroundColor: COLORS.WHITE },
  legend: { gap: SPACING.SM },
  row: { flexDirection: 'row', alignItems: 'center', gap: SPACING.XS },
  dot: { width: 9, height: 9, borderRadius: 5 },
  label: { fontSize: 13, color: COLORS.TEXT_SECONDARY, width: 48 },
  value: {
    fontSize: 13,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
  },
});

// ─── Feature Tile ─────────────────────────────────────────────────────────────
interface TileProps {
  iconSource: any;
  label: string;
  fullWidth?: boolean;
  onPress: () => void;
}

const FeatureTile = ({ iconSource, label, fullWidth, onPress }: TileProps) => (
  <TouchableOpacity
    style={[styles.tile, fullWidth && styles.tileFullWidth]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Image source={iconSource} style={styles.tileIcon} resizeMode="contain" />
    <Text style={[styles.tileLabel, fullWidth && styles.tileLabelFull]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// ─── Screen ───────────────────────────────────────────────────────────────────
const HomeScreen = ({ navigation }: any) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const goTo = (screen: string) => {
    try {
      navigation.navigate(screen);
    } catch {}
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Image
            source={require('../../../assets/images/login-page.png')}
            style={styles.topBarIcon}
            resizeMode="contain"
          />
          <Text style={styles.topBarName}>Bean</Text>
        </View>
        <TouchableOpacity onPress={() => setDropdownVisible(true)}>
          <Text style={styles.hamburger}>≡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <Text style={styles.greeting}>Hey Alex!</Text>
        <Text style={styles.focusLabel}>Today's Focus</Text>

        {/* Combined Mood + Progress Card */}
        <View style={styles.combinedCard}>
          <Text style={styles.cardTitle}>Mood Balance</Text>
          <DonutChart />
          <View style={styles.inCardDivider} />
          <Text style={[styles.cardTitle, { marginTop: SPACING.LG }]}>
            Daily Progress
          </Text>
          <Text style={styles.progressSub}>0/5 Tasks Done • 0m Focus Time</Text>
          <View style={styles.progressRow}>
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>🔥 0 Day Streak</Text>
            </View>
            <TouchableOpacity style={styles.calendarBtn}>
              <Text style={styles.calendarText}>Mood Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features */}
        <Text style={styles.sectionTitle}>Features</Text>

        <View style={styles.grid}>
          {/* Row 1 */}
          <FeatureTile
            iconSource={require('../../../assets/images/talk-to-bean.png')}
            label="Talk to Bean"
            onPress={() => goTo('CasualConvo')} // ✅ → CasualConvoScreen
          />
          <FeatureTile
            iconSource={require('../../../assets/images/timer-icon.png')}
            label="Start Focus Mode"
            onPress={() => goTo('FocusMode')}
          />

          {/* Row 2 */}
          <FeatureTile
            iconSource={require('../../../assets/images/games.png')}
            label="Games"
            onPress={() => goTo('PlayGames')} // ✅ → PlayGamesScreen
          />
          <FeatureTile
            iconSource={require('../../../assets/images/play-calm-music.png')}
            label="Play calm music"
            onPress={() => goTo('PlayCalmMusic')} // ✅ → PlayCalmMusicScreen
          />

          {/* Row 3 */}
          <FeatureTile
            iconSource={require('../../../assets/images/detecting-SOS.png')}
            label="Detecting SOS"
            onPress={() => goTo('SOSDetection')} // ✅ → SOSDetectionScreen
          />

          {/* Calming Exercises — tile → CalmingExercises · bean robot → Chat ✅ */}
          <TouchableOpacity
            style={styles.tile}
            activeOpacity={0.8}
            onPress={() => goTo('CalmingExercises')}
          >
            <Image
              source={require('../../../assets/images/calming-exercises.png')}
              style={styles.tileIcon}
              resizeMode="contain"
            />
            <Text style={styles.tileLabel}>Calming Exercises</Text>

            {/* ✅ Bean robot — own TouchableOpacity → navigates to Chat ONLY */}
            <TouchableOpacity
              style={styles.beanHitArea}
              onPress={() => navigation.navigate('Chat')}
              activeOpacity={0.8}
            >
              <Image
                source={require('../../../assets/images/user-dashboard-bean-thinking.png')}
                style={styles.beanOnTile}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </TouchableOpacity>

          <FeatureTile
            iconSource={require('../../../assets/images/therapeutic-conversation.png')}
            label="Therapeutic Conversations"
            fullWidth
            onPress={() => goTo('TherapeuticConversations')} // ✅
          />
        </View>
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Home" />

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
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND },

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
  topBarLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.SM },
  topBarIcon: { width: 32, height: 32, borderRadius: 16 },
  topBarName: { ...TYPOGRAPHY.H4, color: COLORS.TEXT_PRIMARY },
  hamburger: { fontSize: 26, color: COLORS.TEXT_PRIMARY, lineHeight: 28 },

  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MASSIVE,
  },

  greeting: {
    fontSize: 30,
    fontWeight: '800' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  focusLabel: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.LG,
  },

  combinedCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    marginBottom: SPACING.XL,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.LG,
  },
  inCardDivider: { height: 1, backgroundColor: COLORS.BORDER_LIGHT },
  progressSub: {
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
    fontWeight: '600' as const,
    color: COLORS.PRIMARY_DARK,
  },
  calendarBtn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XS,
  },
  calendarText: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: COLORS.WHITE,
  },

  sectionTitle: {
    ...TYPOGRAPHY.H3,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: TILE_GAP },

  tile: {
    width: TILE_SIZE,
    minHeight: TILE_SIZE,
    backgroundColor: TILE_BG,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    justifyContent: 'flex-start',
    overflow: 'visible',
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  tileFullWidth: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 80,
    gap: SPACING.MD,
  },
  tileIcon: { width: 52, height: 52, marginBottom: SPACING.MD },
  tileLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 18,
  },
  tileLabelFull: { marginBottom: 0, fontSize: 14 },

  // ✅ Tappable hit area wrapping the bean robot
  beanHitArea: {
    position: 'absolute',
    bottom: -22,
    right: -22,
    width: 105,
    height: 105,
  },
  beanOnTile: {
    width: 105,
    height: 105,
  },
});

export default HomeScreen;
