// src/screens/user/HomeScreen.tsx
// ✅ Dark theme aware

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
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';
import DropdownMenu from '../../components/common/DropdownMenu';
import BottomTabBar from '../../components/navigation/BottomTabBar';

const { width } = Dimensions.get('window');
const TILE_GAP = SPACING.MD;
const TILE_SIZE = (width - SPACING.XL * 2 - TILE_GAP) / 2;

// ─── Donut Chart ──────────────────────────────────────────────────────────────
const DonutChart = ({ colors }: { colors: any }) => {
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
            borderColor: colors.PRIMARY,
          },
        ]}
      >
        <View
          style={[
            donut.hole,
            {
              width: INNER,
              height: INNER,
              borderRadius: INNER / 2,
              backgroundColor: colors.SURFACE,
            },
          ]}
        />
      </View>
      <View style={donut.legend}>
        {[
          { label: 'Calm', color: colors.PRIMARY_LIGHT },
          { label: 'Joy', color: colors.PRIMARY },
          { label: 'Active', color: colors.PRIMARY_DARK },
        ].map(item => (
          <View key={item.label} style={donut.row}>
            <View style={[donut.dot, { backgroundColor: item.color }]} />
            <Text style={[donut.label, { color: colors.TEXT_SECONDARY }]}>
              {item.label}
            </Text>
            <Text style={[donut.value, { color: colors.TEXT_PRIMARY }]}>
              0%
            </Text>
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
  hole: {},
  legend: { gap: SPACING.SM },
  row: { flexDirection: 'row', alignItems: 'center', gap: SPACING.XS },
  dot: { width: 9, height: 9, borderRadius: 5 },
  label: { fontSize: 13, width: 48 },
  value: { fontSize: 13, fontWeight: '700' as const },
});

// ─── Feature Tile ─────────────────────────────────────────────────────────────
interface TileProps {
  iconSource: any;
  label: string;
  fullWidth?: boolean;
  onPress: () => void;
  tileBg: string;
  textColor: string;
}

const FeatureTile = ({
  iconSource,
  label,
  fullWidth,
  onPress,
  tileBg,
  textColor,
}: TileProps) => (
  <TouchableOpacity
    style={[
      styles.tile,
      fullWidth && styles.tileFullWidth,
      { backgroundColor: tileBg },
    ]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Image source={iconSource} style={styles.tileIcon} resizeMode="contain" />
    <Text
      style={[
        styles.tileLabel,
        fullWidth && styles.tileLabelFull,
        { color: textColor },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// ─── Screen ───────────────────────────────────────────────────────────────────
const HomeScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const TILE_BG = isDark ? '#1E1E3A' : '#F1F5F9';

  const goTo = (screen: string) => {
    try {
      navigation.navigate(screen);
    } catch {}
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND }]}
    >
      {/* Top bar */}
      <View
        style={[
          styles.topBar,
          {
            backgroundColor: colors.SURFACE,
            borderBottomColor: colors.BORDER_LIGHT,
          },
        ]}
      >
        <View style={styles.topBarLeft}>
          <Image
            source={require('../../../assets/images/login-page.png')}
            style={styles.topBarIcon}
            resizeMode="contain"
          />
          <Text style={[styles.topBarName, { color: colors.TEXT_PRIMARY }]}>
            Bean
          </Text>
        </View>
        <TouchableOpacity onPress={() => setDropdownVisible(true)}>
          <Text style={[styles.hamburger, { color: colors.TEXT_PRIMARY }]}>
            ≡
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.greeting, { color: colors.TEXT_PRIMARY }]}>
          Hey Alex!
        </Text>
        <Text style={[styles.focusLabel, { color: colors.TEXT_SECONDARY }]}>
          Today's Focus
        </Text>

        {/* Combined card */}
        <View
          style={[styles.combinedCard, { backgroundColor: colors.SURFACE }]}
        >
          <Text style={[styles.cardTitle, { color: colors.TEXT_PRIMARY }]}>
            Mood Balance
          </Text>
          <DonutChart colors={colors} />
          <View
            style={[
              styles.inCardDivider,
              { backgroundColor: colors.BORDER_LIGHT },
            ]}
          />
          <Text
            style={[
              styles.cardTitle,
              { color: colors.TEXT_PRIMARY, marginTop: SPACING.LG },
            ]}
          >
            Daily Progress
          </Text>
          <Text style={[styles.progressSub, { color: colors.TEXT_SECONDARY }]}>
            0/5 Tasks Done • 0m Focus Time
          </Text>
          <View style={styles.progressRow}>
            <View
              style={[
                styles.streakBadge,
                { backgroundColor: colors.SECONDARY_LIGHT },
              ]}
            >
              <Text style={[styles.streakText, { color: colors.PRIMARY_DARK }]}>
                🔥 0 Day Streak
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.calendarBtn, { backgroundColor: colors.PRIMARY }]}
            >
              <Text style={styles.calendarText}>Mood Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
          Features
        </Text>

        <View style={styles.grid}>
          <FeatureTile
            iconSource={require('../../../assets/images/talk-to-bean.png')}
            label="Talk to Bean"
            tileBg={TILE_BG}
            textColor={colors.TEXT_PRIMARY}
            onPress={() => goTo('CasualConvo')}
          />
          <FeatureTile
            iconSource={require('../../../assets/images/timer-icon.png')}
            label="Start Focus Mode"
            tileBg={TILE_BG}
            textColor={colors.TEXT_PRIMARY}
            onPress={() => goTo('FocusMode')}
          />
          <FeatureTile
            iconSource={require('../../../assets/images/games.png')}
            label="Games"
            tileBg={TILE_BG}
            textColor={colors.TEXT_PRIMARY}
            onPress={() => goTo('PlayGames')}
          />
          <FeatureTile
            iconSource={require('../../../assets/images/play-calm-music.png')}
            label="Play calm music"
            tileBg={TILE_BG}
            textColor={colors.TEXT_PRIMARY}
            onPress={() => goTo('PlayCalmMusic')}
          />
          <FeatureTile
            iconSource={require('../../../assets/images/detecting-SOS.png')}
            label="Detecting SOS"
            tileBg={TILE_BG}
            textColor={colors.TEXT_PRIMARY}
            onPress={() => goTo('SOSDetection')}
          />

          {/* Calming Exercises */}
          <TouchableOpacity
            style={[styles.tile, { backgroundColor: TILE_BG }]}
            activeOpacity={0.8}
            onPress={() => goTo('CalmingExercises')}
          >
            <Image
              source={require('../../../assets/images/calming-exercises.png')}
              style={styles.tileIcon}
              resizeMode="contain"
            />
            <Text style={[styles.tileLabel, { color: colors.TEXT_PRIMARY }]}>
              Calming Exercises
            </Text>
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
            tileBg={TILE_BG}
            textColor={colors.TEXT_PRIMARY}
            onPress={() => goTo('TherapeuticConversations')}
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
  },
  topBarLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.SM },
  topBarIcon: { width: 32, height: 32, borderRadius: 16 },
  topBarName: { ...TYPOGRAPHY.H4 },
  hamburger: { fontSize: 26, lineHeight: 28 },
  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MASSIVE,
  },
  greeting: {
    fontSize: 30,
    fontWeight: '800' as const,
    marginBottom: SPACING.XS,
  },
  focusLabel: { ...TYPOGRAPHY.BODY, marginBottom: SPACING.LG },
  combinedCard: {
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    marginBottom: SPACING.XL,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    marginBottom: SPACING.LG,
  },
  inCardDivider: { height: 1 },
  progressSub: { ...TYPOGRAPHY.BODY_SMALL, marginBottom: SPACING.MD },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streakBadge: {
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
  },
  streakText: { fontSize: 12, fontWeight: '600' as const },
  calendarBtn: {
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XS,
  },
  calendarText: { fontSize: 12, fontWeight: '700' as const, color: '#000000' },
  sectionTitle: { ...TYPOGRAPHY.H3, marginBottom: SPACING.MD },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: TILE_GAP },
  tile: {
    width: TILE_SIZE,
    minHeight: TILE_SIZE,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    justifyContent: 'flex-start',
    overflow: 'visible',
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
  tileLabel: { fontSize: 13, fontWeight: '600' as const, lineHeight: 18 },
  tileLabelFull: { marginBottom: 0, fontSize: 14 },
  beanHitArea: {
    position: 'absolute',
    bottom: -22,
    right: -22,
    width: 105,
    height: 105,
  },
  beanOnTile: { width: 105, height: 105 },
});

export default HomeScreen;
