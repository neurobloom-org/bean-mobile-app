// src/screens/user/SOSDetectionScreen.tsx
// ✅ FIGMA-MATCHED — SOS Detection · Voice Trigger · Physical Trigger · Robot Response

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

const SOSDetectionScreen = ({ navigation }: any) => {
  const handleSetupEmergencyContacts = () => {
    Alert.alert(
      'Setup Emergency Contacts',
      'This feature will allow you to add emergency contacts who will be notified when SOS is triggered.',
      [{ text: 'OK' }],
    );
  };

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
        <Text style={styles.headerTitle}>SOS Detection</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Subtitle ── */}
        <Text style={styles.subtitle}>
          Learn how to signal your Bean for{'\n'}immediate assistance.
        </Text>

        {/* ✅ Light green outer ring only — image already has green circle baked in */}
        <View style={styles.heroOuter}>
          <Image
            source={require('../../../assets/images/sos-front-image.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* ── Trigger cards ── */}
        <View style={styles.cardsContainer}>
          {/* Voice Trigger */}
          <View style={styles.triggerCard}>
            <Image
              source={require('../../../assets/images/sos-voice-trigger.png')}
              style={styles.triggerIcon}
              resizeMode="contain"
            />
            <View style={styles.triggerText}>
              <Text style={styles.triggerTitle}>Voice Trigger</Text>
              <Text style={styles.triggerDesc}>
                Speak clearly toward the robot from any distance. Give it a try
                by shouting <Text style={styles.highlightRed}>"HELP!"</Text>
              </Text>
            </View>
          </View>

          {/* Physical Trigger */}
          <View style={styles.triggerCard}>
            <Image
              source={require('../../../assets/images/physical-trigger.png')}
              style={styles.triggerIcon}
              resizeMode="contain"
            />
            <View style={styles.triggerText}>
              <Text style={styles.triggerTitle}>Physical Trigger</Text>
              <Text style={styles.triggerDesc}>
                Press the <Text style={styles.highlightRed}>RED</Text> button
                twice to intentionally trigger the SOS.
              </Text>
            </View>
          </View>
        </View>

        {/* ── Robot Response card — green bg ── */}
        <View style={styles.responseCard}>
          <Image
            source={require('../../../assets/images/robot-response.png')}
            style={styles.responseIcon}
            resizeMode="contain"
          />
          <View style={styles.responseText}>
            <Text style={styles.responseTitle}>Robot Response:</Text>
            <Text style={styles.responseDesc}>
              When detected, the robot will pulse red lights and send a
              notification to the guardian assigned.
            </Text>
          </View>
        </View>

        {/* ── Disclaimer ── */}
        <Text style={styles.disclaimer}>
          Disclaimer: This feature requires an active internet connection to
          alert emergency contacts.
        </Text>

        {/* ── Setup Emergency Contacts button ── */}
        <TouchableOpacity
          style={styles.setupBtn}
          onPress={handleSetupEmergencyContacts}
          activeOpacity={0.85}
        >
          <Text style={styles.setupBtnText}>Setup Emergency Contacts</Text>
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

  // Subtitle
  subtitle: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.XL,
  },

  // ✅ Light green outer ring only
  heroOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(34, 197, 94, 0.15)', // soft light green ring ✅
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  // ✅ Image fills most of the ring — it already has green circle inside
  heroImage: {
    width: 150,
    height: 150,
  },

  // Trigger cards container
  cardsContainer: {
    width: '100%',
    gap: SPACING.MD,
    marginBottom: SPACING.LG,
  },

  // Each trigger card
  triggerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    gap: SPACING.MD,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  triggerIcon: {
    width: 48,
    height: 48,
    flexShrink: 0,
  },
  triggerText: {
    flex: 1,
  },
  triggerTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  triggerDesc: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
  },
  // ✅ Red highlight for "HELP!" and "RED"
  highlightRed: {
    color: COLORS.ERROR, // '#E74C3C'
    fontWeight: '700' as const,
  },

  // Robot Response card — green background ✅
  responseCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.SECONDARY_LIGHT, // '#E0F7F1' mint green
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    gap: SPACING.MD,
    width: '100%',
    marginBottom: SPACING.LG,
  },
  responseIcon: {
    width: 32,
    height: 32,
    flexShrink: 0,
    marginTop: 2,
  },
  responseText: {
    flex: 1,
  },
  responseTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: COLORS.PRIMARY_DARK, // ✅ dark green title
    marginBottom: SPACING.XS,
  },
  responseDesc: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 19,
  },

  // Disclaimer
  disclaimer: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
    lineHeight: 17,
    paddingHorizontal: SPACING.MD,
    marginBottom: SPACING.XL,
  },

  // Setup button
  setupBtn: {
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
  setupBtnText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.WHITE,
    letterSpacing: 0.3,
  },
});

export default SOSDetectionScreen;
