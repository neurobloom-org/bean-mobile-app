// src/screens/user/PlayGamesScreen.tsx
// ✅ FIGMA-MATCHED — Game Time · Try Saying cards · Pro Tip

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

// ─── Try Saying Commands ──────────────────────────────────────────────────────
const COMMANDS = [
  '"Let\'s play a trivia game"',
  '"Start a word puzzle"',
  '"Play hide and seek"',
];

// ─── Screen ───────────────────────────────────────────────────────────────────
const PlayGamesScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Play Games</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Game controller image ── */}
        <Image
          source={require('../../../assets/images/game-time.png')}
          style={styles.heroImage}
          resizeMode="contain"
        />

        {/* ── Title + subtitle ── */}
        <Text style={styles.title}>Game Time!</Text>
        <Text style={styles.subtitle}>
          Engage your companion in fun activities.{'\n'}
          Try saying these voice commands to start playing.
        </Text>

        {/* ── Try Saying cards ── */}
        <View style={styles.commandsContainer}>
          {COMMANDS.map((cmd, i) => (
            <View key={i} style={styles.commandCard}>
              {/* Mic icon */}
              <View style={styles.micCircle}>
                <Image
                  source={require('../../../assets/images/try-saying.png')}
                  style={styles.micIcon}
                  resizeMode="contain"
                />
              </View>

              {/* Text */}
              <View style={styles.commandText}>
                <Text style={styles.trySayingLabel}>Try Saying</Text>
                <Text style={styles.commandValue}>{cmd}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── Pro Tip card ── */}
        <View style={styles.proTipCard}>
          <Image
            source={require('../../../assets/images/pro-tip.png')}
            style={styles.proTipIcon}
            resizeMode="contain"
          />
          <View style={styles.proTipText}>
            <Text style={styles.proTipLabel}>Pro Tip:</Text>
            <Text style={styles.proTipValue}>
              Your robot learns new games automatically through cloud updates.
            </Text>
          </View>
        </View>
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
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  backIcon: { fontSize: 28, color: COLORS.TEXT_PRIMARY, lineHeight: 32 },
  headerTitle: { ...TYPOGRAPHY.H4, color: COLORS.TEXT_PRIMARY },

  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MASSIVE,
    alignItems: 'center',
  },

  // ── Hero image
  heroImage: {
    width: 140,
    height: 140,
    marginBottom: SPACING.XL,
  },

  // ── Title / subtitle
  title: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.MD,
  },

  // ── Try Saying cards
  commandsContainer: {
    width: '100%',
    gap: SPACING.MD,
    marginBottom: SPACING.XL,
  },
  commandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
    gap: SPACING.MD,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  // Mic circle
  micCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.SECONDARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    overflow: 'hidden', // ✅ clips any uneven padding
  },
  micIcon: {
    width: 58,
    height: 58,
    alignSelf: 'center', // ✅ forces true centre
  },

  // Command text
  commandText: {
    flex: 1,
  },
  trySayingLabel: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: COLORS.PRIMARY_DARK, // green label ✅
    letterSpacing: 0.4,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  commandValue: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: COLORS.TEXT_PRIMARY,
  },

  // ── Pro Tip card
  proTipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.SECONDARY_LIGHT, // mint green bg ✅
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    width: '100%',
    gap: SPACING.MD,
  },
  proTipIcon: {
    width: 32,
    height: 32,
    flexShrink: 0,
    marginTop: 2,
  },
  proTipText: {
    flex: 1,
  },
  proTipLabel: {
    fontSize: 13,
    fontWeight: '700' as const,
    color: COLORS.PRIMARY_DARK,
    marginBottom: 4,
  },
  proTipValue: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 18,
  },
});

export default PlayGamesScreen;
