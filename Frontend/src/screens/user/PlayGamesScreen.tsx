// src/screens/user/PlayGamesScreen.tsx
// ✅ Dark theme aware

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
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const COMMANDS = [
  '"Let\'s play a trivia game"',
  '"Start a word puzzle"',
  '"Play hide and seek"',
];

const PlayGamesScreen = ({ navigation }: any) => {
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
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backIcon, { color: colors.TEXT_PRIMARY }]}>
            ‹
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
          Play Games
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero image */}
        <Image
          source={require('../../../assets/images/game-time.png')}
          style={styles.heroImage}
          resizeMode="contain"
        />

        {/* Title + subtitle */}
        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Game Time!
        </Text>
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Engage your companion in fun activities.{'\n'}
          Try saying these voice commands to start playing.
        </Text>

        {/* Try Saying cards */}
        <View style={styles.commandsContainer}>
          {COMMANDS.map((cmd, i) => (
            <View
              key={i}
              style={[styles.commandCard, { backgroundColor: colors.SURFACE }]}
            >
              <View
                style={[
                  styles.micCircle,
                  { backgroundColor: colors.SECONDARY_LIGHT },
                ]}
              >
                <Image
                  source={require('../../../assets/images/try-saying.png')}
                  style={styles.micIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.commandText}>
                <Text
                  style={[
                    styles.trySayingLabel,
                    { color: colors.PRIMARY_DARK },
                  ]}
                >
                  Try Saying
                </Text>
                <Text
                  style={[styles.commandValue, { color: colors.TEXT_PRIMARY }]}
                >
                  {cmd}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Pro Tip card */}
        <View
          style={[
            styles.proTipCard,
            { backgroundColor: colors.SECONDARY_LIGHT },
          ]}
        >
          <Image
            source={require('../../../assets/images/pro-tip.png')}
            style={styles.proTipIcon}
            resizeMode="contain"
          />
          <View style={styles.proTipText}>
            <Text style={[styles.proTipLabel, { color: colors.PRIMARY_DARK }]}>
              Pro Tip:
            </Text>
            <Text
              style={[styles.proTipValue, { color: colors.TEXT_SECONDARY }]}
            >
              Your robot learns new games automatically through cloud updates.
            </Text>
          </View>
        </View>
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
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  backIcon: { fontSize: 28, lineHeight: 32 },
  headerTitle: { ...TYPOGRAPHY.H4 },
  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MASSIVE,
    alignItems: 'center',
  },
  heroImage: { width: 140, height: 140, marginBottom: SPACING.XL },
  title: {
    fontSize: 28,
    fontWeight: '800' as const,
    marginBottom: SPACING.MD,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.MD,
  },
  commandsContainer: {
    width: '100%',
    gap: SPACING.MD,
    marginBottom: SPACING.XL,
  },
  commandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
    gap: SPACING.MD,
    elevation: 2,
  },
  micCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  micIcon: { width: 58, height: 58, alignSelf: 'center' },
  commandText: { flex: 1 },
  trySayingLabel: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.4,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  commandValue: { fontSize: 15, fontWeight: '600' as const },
  proTipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    width: '100%',
    gap: SPACING.MD,
  },
  proTipIcon: { width: 32, height: 32, flexShrink: 0, marginTop: 2 },
  proTipText: { flex: 1 },
  proTipLabel: { fontSize: 13, fontWeight: '700' as const, marginBottom: 4 },
  proTipValue: { ...TYPOGRAPHY.BODY_SMALL, lineHeight: 18 },
});

export default PlayGamesScreen;
