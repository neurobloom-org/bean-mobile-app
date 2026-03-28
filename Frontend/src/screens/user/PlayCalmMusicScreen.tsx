// Play Calm Music screen — shows a Bean mascot, a row of compatible streaming
// services, and a list of example voice commands the user can try.
// Fully dark/light theme aware via useTheme.

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

const { width } = Dimensions.get('window');

const PlayCalmMusicScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  // Sample voice commands displayed as prompt cards below the mascot
  const COMMANDS = [
    {
      icon: require('../../../assets/images/try-saying.png'),
      label: '"Hey Bean,',
      value: 'Play some lo-fi beats."',
    },
    {
      icon: require('../../../assets/images/bean-sound.png'),
      label: '"Hey Bean,',
      value: 'Increase volume to 70%."',
    },
    {
      icon: require('../../../assets/images/bean-question.png'),
      label: '"Hey Bean,',
      value: 'What song is playing?"',
    },
  ];

  // Music service chips — only Bean Music is live; others show "Coming Soon!"
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
          Play Calm Music
        </Text>
        {/* Spacer keeps the title centred */}
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Large circular Bean mascot — visual centrepiece of the screen */}
        <View
          style={[
            styles.beanCircle,
            { backgroundColor: colors.SECONDARY_LIGHT },
          ]}
        >
          <Image
            source={require('../../../assets/images/bean-calm-music.png')}
            style={styles.beanImage}
            resizeMode="contain"
          />
        </View>

        {/* ── Compatible Services ── */}
        <Text style={[styles.sectionGreen, { color: colors.PRIMARY_DARK }]}>
          Compatible Services
        </Text>

        {/* Horizontal chip row — unavailable services have activeOpacity locked to 1 */}
        <View style={styles.servicesRow}>
          {SERVICES.map((svc, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.serviceChip,
                {
                  backgroundColor: colors.SURFACE,
                  borderColor: colors.BORDER,
                },
              ]}
              activeOpacity={svc.available ? 0.75 : 1}
            >
              <Image
                source={svc.icon}
                style={styles.serviceIcon}
                resizeMode="contain"
              />
              <Text
                style={[styles.serviceLabel, { color: colors.TEXT_PRIMARY }]}
              >
                {svc.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Voice Commands ── */}
        <Text style={[styles.sectionGreen, { color: colors.PRIMARY_DARK }]}>
          Voice Commands, Try these...
        </Text>

        {/* Each card shows an icon, the prompt opener, and the example command */}
        <View style={styles.commandsContainer}>
          {COMMANDS.map((cmd, i) => (
            <View
              key={i}
              style={[styles.commandCard, { backgroundColor: colors.SURFACE }]}
            >
              <View
                style={[
                  styles.cmdIconCircle,
                  { backgroundColor: colors.SECONDARY_LIGHT },
                ]}
              >
                <Image
                  source={cmd.icon}
                  style={styles.cmdIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.cmdTextBlock}>
                {/* Muted opener line e.g. "Hey Bean," */}
                <Text
                  style={[styles.cmdLabel, { color: colors.TEXT_SECONDARY }]}
                >
                  {cmd.label}
                </Text>
                {/* Bold command text e.g. 'Play some lo-fi beats."' */}
                <Text style={[styles.cmdValue, { color: colors.TEXT_PRIMARY }]}>
                  {cmd.value}
                </Text>
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

  // Circular container for the Bean mascot image
  beanCircle: {
    width: width * 0.68,
    height: width * 0.68,
    borderRadius: width * 0.34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XL,
    elevation: 5,
  },
  beanImage: { width: width * 0.56, height: width * 0.56 },

  // Section heading styled in the primary-dark brand colour
  sectionGreen: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: SPACING.MD,
  },

  // ── Services row
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
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
  },
  serviceIcon: { width: 22, height: 22, borderRadius: 11 },
  serviceLabel: { fontSize: 12, fontWeight: '600' as const, lineHeight: 16 },

  // ── Command cards
  commandsContainer: { width: '100%', gap: SPACING.MD },
  commandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
    gap: SPACING.MD,
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
  cmdIcon: { width: 42, height: 42, alignSelf: 'center' },
  cmdTextBlock: { flex: 1 },
  cmdLabel: { fontSize: 14, lineHeight: 20 },
  cmdValue: { fontSize: 15, fontWeight: '700' as const, lineHeight: 22 },
});

export default PlayCalmMusicScreen;
