// SOS Detection screen — explains how to trigger an emergency alert via voice
// ("HELP!") or the physical red button, shows the robot's response behaviour,
// and links to the Emergency Contacts setup screen. Dark theme aware.

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

const SOSDetectionScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

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
          SOS Detection
        </Text>
        {/* Spacer keeps the title centred */}
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Introductory subtitle above the hero image */}
        <Text style={[styles.subtitle, { color: colors.TEXT_PRIMARY }]}>
          Learn how to signal your Bean for{'\n'}immediate assistance.
        </Text>

        {/* Hero image inside a soft green circular glow */}
        <View style={styles.heroOuter}>
          <Image
            source={require('../../../assets/images/sos-front-image.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* ── Trigger cards ── */}
        <View style={styles.cardsContainer}>
          {/* Voice Trigger — shout "HELP!" to activate */}
          <View
            style={[styles.triggerCard, { backgroundColor: colors.SURFACE }]}
          >
            <Image
              source={require('../../../assets/images/sos-voice-trigger.png')}
              style={styles.triggerIcon}
              resizeMode="contain"
            />
            <View style={styles.triggerText}>
              <Text
                style={[styles.triggerTitle, { color: colors.TEXT_PRIMARY }]}
              >
                Voice Trigger
              </Text>
              <Text
                style={[styles.triggerDesc, { color: colors.TEXT_SECONDARY }]}
              >
                Speak clearly toward the robot from any distance. Give it a try
                by shouting <Text style={styles.highlightRed}>"HELP!"</Text>
              </Text>
            </View>
          </View>

          {/* Physical Trigger — double-press the red button to activate */}
          <View
            style={[styles.triggerCard, { backgroundColor: colors.SURFACE }]}
          >
            <Image
              source={require('../../../assets/images/physical-trigger.png')}
              style={styles.triggerIcon}
              resizeMode="contain"
            />
            <View style={styles.triggerText}>
              <Text
                style={[styles.triggerTitle, { color: colors.TEXT_PRIMARY }]}
              >
                Physical Trigger
              </Text>
              <Text
                style={[styles.triggerDesc, { color: colors.TEXT_SECONDARY }]}
              >
                Press the <Text style={styles.highlightRed}>RED</Text> button
                twice to intentionally trigger the SOS.
              </Text>
            </View>
          </View>
        </View>

        {/* Robot Response banner — describes what the robot does when SOS fires */}
        <View
          style={[
            styles.responseCard,
            { backgroundColor: colors.SECONDARY_LIGHT },
          ]}
        >
          <Image
            source={require('../../../assets/images/robot-response.png')}
            style={styles.responseIcon}
            resizeMode="contain"
          />
          <View style={styles.responseText}>
            <Text
              style={[styles.responseTitle, { color: colors.PRIMARY_DARK }]}
            >
              Robot Response:
            </Text>
            <Text
              style={[styles.responseDesc, { color: colors.TEXT_SECONDARY }]}
            >
              When detected, the robot will pulse red lights and send a
              notification to the guardian assigned.
            </Text>
          </View>
        </View>

        {/* Fine-print disclaimer about the internet connection requirement */}
        <Text style={[styles.disclaimer, { color: colors.TEXT_TERTIARY }]}>
          Disclaimer: This feature requires an active internet connection to
          alert emergency contacts.
        </Text>

        {/* CTA button — navigates to the Emergency Contacts setup screen */}
        <TouchableOpacity
          style={[styles.setupBtn, { backgroundColor: colors.PRIMARY }]}
          onPress={() => navigation.navigate('EmergencyContacts')}
          activeOpacity={0.85}
        >
          <Text style={[styles.setupBtnText, { color: colors.WHITE }]}>
            Setup Emergency Contacts
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
  headerTitle: { ...TYPOGRAPHY.H4 },

  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MASSIVE,
    alignItems: 'center',
  },

  // Introductory subtitle
  subtitle: {
    fontSize: 16,
    fontWeight: '500' as const,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.XL,
  },

  // Circular green glow container behind the hero image
  heroOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  heroImage: { width: 150, height: 150 },

  // ── Trigger cards
  cardsContainer: { width: '100%', gap: SPACING.MD, marginBottom: SPACING.LG },
  triggerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    gap: SPACING.MD,
    elevation: 2,
  },
  triggerIcon: { width: 48, height: 48, flexShrink: 0 },
  triggerText: { flex: 1 },
  triggerTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    marginBottom: SPACING.XS,
  },
  triggerDesc: { ...TYPOGRAPHY.BODY_SMALL, lineHeight: 20 },

  // Red emphasis used for "HELP!" and "RED" inside trigger descriptions
  highlightRed: { color: '#E74C3C', fontWeight: '700' as const },

  // Robot Response banner
  responseCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    gap: SPACING.MD,
    width: '100%',
    marginBottom: SPACING.LG,
  },
  responseIcon: { width: 32, height: 32, flexShrink: 0, marginTop: 2 },
  responseText: { flex: 1 },
  responseTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    marginBottom: SPACING.XS,
  },
  responseDesc: { ...TYPOGRAPHY.BODY_SMALL, lineHeight: 19 },

  // Fine-print disclaimer
  disclaimer: {
    ...TYPOGRAPHY.CAPTION,
    textAlign: 'center',
    lineHeight: 17,
    paddingHorizontal: SPACING.MD,
    marginBottom: SPACING.XL,
  },

  // Full-width primary CTA button
  setupBtn: {
    width: '100%',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    elevation: 5,
  },
  setupBtnText: {
    fontSize: 16,
    fontWeight: '700' as const,
    letterSpacing: 0.3,
  },
});

export default SOSDetectionScreen;
