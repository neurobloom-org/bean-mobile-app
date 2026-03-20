// src/screens/user/PlayCalmMusicScreen.tsx
// ✅ FIGMA-MATCHED — Bean listening · Compatible Services · Voice Commands

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

// ─── Voice Commands ───────────────────────────────────────────────────────────
const COMMANDS = [
  {
    icon: require('../../../assets/images/try-saying.png'),
    bg: COLORS.SECONDARY_LIGHT,
    label: '"Hey Bean,',
    value: 'Play some lo-fi beats."',
  },
  {
    icon: require('../../../assets/images/bean-sound.png'),
    bg: COLORS.SECONDARY_LIGHT,
    label: '"Hey Bean,',
    value: 'Increase volume to 70%."',
  },
  {
    icon: require('../../../assets/images/bean-question.png'),
    bg: COLORS.SECONDARY_LIGHT,
    label: '"Hey Bean,',
    value: 'What song is playing?"',
  },
];

// ─── Compatible Services ──────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: require('../../../assets/images/user-dashboard-top-small-bean.png'),
    label: 'Bean\nMusic',
    available: true,
  },
  {
    icon: require('../../../assets/images/bean-question.png'),
    label: 'Coming\nSoon!',
    available: false,
  },
  {
    icon: require('../../../assets/images/bean-question.png'),
    label: 'Coming\nSoon!',
    available: false,
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────
const PlayCalmMusicScreen = ({ navigation }: any) => {
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
        <Text style={styles.headerTitle}>Play Calm Music</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Bean listening image — large green circle ── */}
        <View style={styles.beanCircle}>
          <Image
            source={require('../../../assets/images/bean-calm-music.png')}
            style={styles.beanImage}
            resizeMode="contain"
          />
        </View>

        {/* ── Compatible Services ── */}
        <Text style={styles.sectionGreen}>Compatible Services</Text>

        <View style={styles.servicesRow}>
          {SERVICES.map((svc, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.serviceChip,
                !svc.available && styles.serviceChipDisabled,
              ]}
              activeOpacity={svc.available ? 0.75 : 1}
            >
              <Image
                source={svc.icon}
                style={styles.serviceIcon}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.serviceLabel,
                  !svc.available && styles.serviceLabelDisabled,
                ]}
              >
                {svc.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Voice Commands ── */}
        <Text style={styles.sectionGreen}>Voice Commands, Try these...</Text>

        <View style={styles.commandsContainer}>
          {COMMANDS.map((cmd, i) => (
            <View key={i} style={styles.commandCard}>
              {/* Icon circle */}
              <View style={[styles.cmdIconCircle, { backgroundColor: cmd.bg }]}>
                <Image
                  source={cmd.icon}
                  style={styles.cmdIcon}
                  resizeMode="contain"
                />
              </View>

              {/* Text — first line normal, second line bold ✅ */}
              <View style={styles.cmdTextBlock}>
                <Text style={styles.cmdLabel}>{cmd.label}</Text>
                <Text style={styles.cmdValue}>{cmd.value}</Text>
              </View>
            </View>
          ))}
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

  // ── Bean circle — large ✅
  beanCircle: {
    width: width * 0.68,
    height: width * 0.68,
    borderRadius: width * 0.34,
    backgroundColor: COLORS.SECONDARY_LIGHT, // soft green circle ✅
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XL,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
  beanImage: {
    width: width * 0.56, // ✅ fills most of the circle
    height: width * 0.56,
  },

  // Section label — green
  sectionGreen: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600' as const,
    color: COLORS.PRIMARY_DARK,
    marginBottom: SPACING.MD,
  },

  // ── Compatible Services row
  servicesRow: {
    flexDirection: 'row',
    gap: SPACING.SM,
    alignSelf: 'flex-start',
    marginBottom: SPACING.XL,
  },
  serviceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    backgroundColor: COLORS.WHITE, // ✅ all chips same white bg
  },
  serviceChipDisabled: {
    backgroundColor: COLORS.WHITE, // ✅ same as active — no grey
    borderColor: COLORS.BORDER,
  },
  serviceIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  serviceLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: COLORS.TEXT_PRIMARY, // ✅ same dark color for all chips
    lineHeight: 16,
  },
  serviceLabelDisabled: {
    color: COLORS.TEXT_PRIMARY, // ✅ same — no grey
  },

  // ── Voice command cards
  commandsContainer: {
    width: '100%',
    gap: SPACING.MD,
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
  cmdIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  cmdIcon: {
    width: 42,
    height: 42,
    alignSelf: 'center',
  },
  cmdTextBlock: {
    flex: 1,
  },
  cmdLabel: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY, // normal weight first line
    lineHeight: 20,
  },
  cmdValue: {
    fontSize: 15,
    fontWeight: '700' as const, // ✅ bold second line like Figma
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 22,
  },
});

export default PlayCalmMusicScreen;
