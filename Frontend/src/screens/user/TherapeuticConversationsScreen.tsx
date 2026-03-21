// src/screens/user/TherapeuticConversationsScreen.tsx
// ✅ FIGMA-MATCHED — Hero · Try saying prompts · Navigate to Chat

import React from 'react';
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

const { width } = Dimensions.get('window');

// ─── Prompts ──────────────────────────────────────────────────────────────────
const PROMPTS = [
  {
    id: '1',
    icon: require('../../../assets/images/talk.png'),
    title: '"I need to talk"',
    desc: 'Starts an open-ended session',
  },
  {
    id: '2',
    icon: require('../../../assets/images/mood-check.png'),
    title: '"Check my mood"',
    desc: 'Analyzes tone and expression',
  },
  {
    id: '3',
    icon: require('../../../assets/images/feeling-stressed.png'),
    title: '"I\'m feeling stressed"',
    desc: 'Triggers calming breathing exercises',
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────
const TherapeuticConversationsScreen = ({ navigation }: any) => {
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
        <Text style={styles.headerTitle}>Therapeutic Conversations</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero image — circular ── */}
        <View style={styles.heroCircle}>
          <Image
            source={require('../../../assets/images/therapeutic-convo-top-icon.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* ── Subtitle ── */}
        <Text style={styles.subtitle}>
          Your companion is here to listen and help you navigate your emotions.
          Use these voice prompts to begin a session and check your mental
          well-being.
        </Text>

        {/* ── Try saying label ── */}
        <Text style={styles.sectionGreen}>Try saying these prompts...</Text>

        {/* ── Prompt cards ── */}
        <View style={styles.promptsContainer}>
          {PROMPTS.map(prompt => (
            <TouchableOpacity
              key={prompt.id}
              style={styles.promptCard}
              onPress={() => navigation.navigate('Chat')}
              activeOpacity={0.8}
            >
              {/* Icon circle */}
              <View style={styles.promptIconCircle}>
                <Image
                  source={prompt.icon}
                  style={styles.promptIcon}
                  resizeMode="contain"
                />
              </View>

              {/* Text */}
              <View style={styles.promptText}>
                <Text style={styles.promptTitle}>{prompt.title}</Text>
                <Text style={styles.promptDesc}>{prompt.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Start session button ── */}
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.navigate('Chat')}
          activeOpacity={0.85}
        >
          <Text style={styles.startBtnText}>Start a Session</Text>
        </TouchableOpacity>
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
  headerTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
  },

  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MASSIVE,
    alignItems: 'center',
  },

  // ── Hero — circular image ✅
  heroCircle: {
    width: width * 0.62,
    height: width * 0.62,
    borderRadius: width * 0.31,
    overflow: 'hidden',
    marginBottom: SPACING.XL,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },

  // Subtitle
  subtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.SM,
  },

  // Section label — green
  sectionGreen: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '700' as const,
    color: COLORS.PRIMARY_DARK, // ✅ green like Figma
    marginBottom: SPACING.MD,
  },

  // Prompt cards
  promptsContainer: {
    width: '100%',
    gap: SPACING.MD,
    marginBottom: SPACING.XL,
  },
  promptCard: {
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

  // Icon circle
  promptIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.SECONDARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  promptIcon: {
    width: 36,
    height: 36,
    alignSelf: 'center',
  },

  // Prompt text
  promptText: { flex: 1 },
  promptTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 3,
  },
  promptDesc: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 18,
  },

  // Start Session button
  startBtn: {
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.WHITE,
    letterSpacing: 0.3,
  },
});

export default TherapeuticConversationsScreen;
