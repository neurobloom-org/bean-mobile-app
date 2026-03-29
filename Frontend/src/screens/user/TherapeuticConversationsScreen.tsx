// Dark theme aware

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
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

// ─── Constants ────────────────────────────────────────────────────────────────

// Device screen width used to size the circular hero image proportionally
const { width } = Dimensions.get('window');

// Static list of suggested voice prompts displayed as tappable cards.
// Each card navigates to the Chat screen when pressed.
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

// ─── Component ────────────────────────────────────────────────────────────────

const TherapeuticConversationsScreen = ({ navigation }: any) => {
  // Pull current color palette from the global theme context
  const { colors } = useTheme();

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND_LIGHT }]}
    >
      {/* Top bar: back button and screen title */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.SURFACE,
            borderBottomColor: colors.BORDER_LIGHT,
          },
        ]}
      >
        {/* Back chevron — pops the screen from the navigation stack */}
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
          Therapeutic Conversations
        </Text>
        {/* Spacer keeps the title centred */}
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Image ── */}
        {/* Circular clipped image sized to 62% of the screen width */}
        <View style={styles.heroCircle}>
          <Image
            source={require('../../../assets/images/therapeutic-convo-top-icon.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* ── Subtitle ── */}
        {/* Brief description of the screen's purpose shown beneath the hero */}
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Your companion is here to listen and help you navigate your emotions.
          Use these voice prompts to begin a session and check your mental
          well-being.
        </Text>

        {/* ── Section Label ── */}
        {/* Left-aligned green heading that introduces the prompt cards below */}
        <Text style={[styles.sectionGreen, { color: colors.PRIMARY_DARK }]}>
          Try saying these prompts...
        </Text>

        {/* ── Prompt Cards ── */}
        {/* Render one tappable card per entry in the PROMPTS array;
            pressing any card navigates directly to the Chat screen */}
        <View style={styles.promptsContainer}>
          {PROMPTS.map(prompt => (
            <TouchableOpacity
              key={prompt.id}
              style={[styles.promptCard, { backgroundColor: colors.SURFACE }]}
              onPress={() => navigation.navigate('Chat')}
              activeOpacity={0.8}
            >
              {/* Circular icon container with a soft secondary background tint */}
              <View
                style={[
                  styles.promptIconCircle,
                  { backgroundColor: colors.SECONDARY_LIGHT },
                ]}
              >
                <Image
                  source={prompt.icon}
                  style={styles.promptIcon}
                  resizeMode="contain"
                />
              </View>

              {/* Prompt title (the voice phrase) and a short description */}
              <View style={styles.promptText}>
                <Text
                  style={[styles.promptTitle, { color: colors.TEXT_PRIMARY }]}
                >
                  {prompt.title}
                </Text>
                <Text
                  style={[styles.promptDesc, { color: colors.TEXT_SECONDARY }]}
                >
                  {prompt.desc}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Start Session Button ── */}
        {/* Full-width primary CTA — navigates to the Chat screen to begin a session */}
        <TouchableOpacity
          style={[styles.startBtn, { backgroundColor: colors.PRIMARY }]}
          onPress={() => navigation.navigate('Chat')}
          activeOpacity={0.85}
        >
          <Text style={[styles.startBtnText, { color: colors.WHITE }]}>
            Start a Session
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
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
  headerTitle: { fontSize: 15, fontWeight: '700' as const },

  // Scrollable content area
  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MASSIVE,
    alignItems: 'center',
  },

  // Circular hero image container
  heroCircle: {
    width: width * 0.62,
    height: width * 0.62,
    borderRadius: width * 0.31,
    overflow: 'hidden',
    marginBottom: SPACING.XL,
    elevation: 5,
  },
  heroImage: { width: '100%', height: '100%' },

  // Introductory subtitle
  subtitle: {
    ...TYPOGRAPHY.BODY,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.SM,
  },

  // Left-aligned green section heading above the prompt cards
  sectionGreen: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '700' as const,
    marginBottom: SPACING.MD,
  },

  // Prompt card list container
  promptsContainer: {
    width: '100%',
    gap: SPACING.MD,
    marginBottom: SPACING.XL,
  },

  // Individual prompt card
  promptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
    gap: SPACING.MD,
    elevation: 2,
  },

  // Circular icon wrapper inside each prompt card
  promptIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  promptIcon: { width: 36, height: 36, alignSelf: 'center' },

  // Text block (title + description) inside each prompt card
  promptText: { flex: 1 },
  promptTitle: { fontSize: 15, fontWeight: '700' as const, marginBottom: 3 },
  promptDesc: { ...TYPOGRAPHY.BODY_SMALL, lineHeight: 18 },

  // Full-width primary CTA button
  startBtn: {
    width: '100%',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    elevation: 5,
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: '700' as const,
    letterSpacing: 0.3,
  },
});

export default TherapeuticConversationsScreen;
