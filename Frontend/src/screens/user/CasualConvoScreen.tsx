// src/screens/user/CasualConvoScreen.tsx
// ✅ Talk to Bean — Casual Convo manual screen (matches Figma)

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

const CasualConvoScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Talk to Bean</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Bean robot in green circle ── */}
        <View style={styles.robotCircle}>
          <Image
            source={require('../../../assets/images/robot-first-page.png')}
            style={styles.robotImage}
            resizeMode="contain"
          />
        </View>

        {/* ── Title + subtitle ── */}
        <Text style={styles.title}>Casual Convo</Text>
        <Text style={styles.subtitle}>
          Control your companion using simple voice commands. Start by getting
          its attention with a wake word.
        </Text>

        {/* ── Info cards ── */}
        <View style={styles.cardsContainer}>
          {/* Wake Word card */}
          <View style={styles.infoCard}>
            <View style={styles.cardIconBox}>
              <Text style={styles.cardIconEmoji}>🎤</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardLabel}>Wake Word</Text>
              <Text style={styles.cardValue}>Say: "Hey Bean"</Text>
            </View>
          </View>

          {/* Interaction card */}
          <View style={styles.infoCard}>
            <View style={styles.cardIconBox}>
              <Text style={styles.cardIconEmoji}>💬</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardLabel}>Interaction</Text>
              <Text style={styles.cardValue}>Ask me anything</Text>
            </View>
          </View>
        </View>

        {/* ── Footer note ── */}
        <Text style={styles.footerNote}>
          You can always access this guide by clicking upon the relevant feature
        </Text>

        {/* ── Start chatting button ── */}
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.navigate('Chat')}
          activeOpacity={0.85}
        >
          <Text style={styles.startBtnText}>Start Chatting</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
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
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 32,
  },
  headerTitle: {
    ...TYPOGRAPHY.H4,
    color: COLORS.TEXT_PRIMARY,
  },

  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MASSIVE,
    alignItems: 'center',
  },

  // ── Robot circle
  robotCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.SECONDARY_LIGHT, // soft green circle ✅
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XL,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  robotImage: {
    width: 140,
    height: 140,
  },

  // ── Title / subtitle
  title: {
    fontSize: 26,
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
    paddingHorizontal: SPACING.MD,
    marginBottom: SPACING.XXL,
  },

  // ── Info cards
  cardsContainer: {
    width: '100%',
    gap: SPACING.MD,
    marginBottom: SPACING.XL,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY_LIGHT, // light green bg ✅
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
    gap: SPACING.MD,
  },
  cardIconBox: {
    width: 42,
    height: 42,
    borderRadius: BORDER_RADIUS.LG,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIconEmoji: {
    fontSize: 22,
  },
  cardText: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: COLORS.PRIMARY_DARK,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
  },

  // ── Footer note
  footerNote: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: SPACING.LG,
    marginBottom: SPACING.XL,
  },

  // ── Start chatting button
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

export default CasualConvoScreen;
