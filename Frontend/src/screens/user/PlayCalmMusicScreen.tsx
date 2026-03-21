// src/screens/user/PlayCalmMusicScreen.tsx
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
  Dimensions,
} from 'react-native';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

const PlayCalmMusicScreen = ({ navigation }: any) => {
  const { colors } = useTheme(); // ✅

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
          Play Calm Music
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Bean circle */}
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

        {/* Compatible Services */}
        <Text style={[styles.sectionGreen, { color: colors.PRIMARY_DARK }]}>
          Compatible Services
        </Text>

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

        {/* Voice Commands */}
        <Text style={[styles.sectionGreen, { color: colors.PRIMARY_DARK }]}>
          Voice Commands, Try these...
        </Text>

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
                <Text
                  style={[styles.cmdLabel, { color: colors.TEXT_SECONDARY }]}
                >
                  {cmd.label}
                </Text>
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
  sectionGreen: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: SPACING.MD,
  },
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
