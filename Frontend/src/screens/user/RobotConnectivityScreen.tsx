// src/screens/user/RobotConnectivityScreen.tsx
// ✅ Battery colour logic: >75 green · 55-75 yellow · <20 red

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS, SPACING } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

// ─── Battery colour logic ─────────────────────────────────────────────────────
const getBatteryColor = (level: number): string => {
  if (level < 20) return '#EF4444'; // red
  if (level <= 75) return '#F59E0B'; // yellow
  return '#07882C'; // green
};

// Default mock state — first phase, not connected
const DEFAULT_BATTERY = 85;
const DEFAULT_FIRMWARE = 'v2.1.0';
const DEFAULT_NETWORK = 'Home_WiFi_5G';
const IS_CONNECTED = true; // ← set to false to show "not connected" state

const RobotConnectivityScreen = ({ navigation }: any) => {
  const [autoUpdate, setAutoUpdate] = useState(true);
  const battery = DEFAULT_BATTERY;
  const batteryColor = getBatteryColor(battery);

  const handleDisconnect = () => {
    Alert.alert(
      'Disconnect Robot',
      'Are you sure you want to disconnect Bean Robot?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Robot Connectivity</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Robot image */}
        <View style={styles.robotContainer}>
          <Image
            source={require('../../../assets/images/robot-connectivity-top-icon.png')}
            style={styles.robotImage}
            resizeMode="contain"
          />
        </View>

        {/* Robot name + status */}
        <Text style={styles.robotName}>Bean Robot v2</Text>
        <View style={styles.statusRow}>
          {IS_CONNECTED ? (
            <>
              <View style={styles.statusDotGreen} />
              <Text style={styles.statusTextGreen}>Active & Synced</Text>
            </>
          ) : (
            <>
              <View style={styles.statusDotRed} />
              <Text style={styles.statusTextRed}>Not Connected</Text>
            </>
          )}
        </View>

        {/* Battery + Firmware row */}
        <View style={styles.statsRow}>
          {/* Battery card */}
          <View style={[styles.statCard, { backgroundColor: batteryColor }]}>
            <View style={styles.statCardHeader}>
              <Image
                source={require('../../../assets/images/battery-level.png')}
                style={styles.statIcon}
                resizeMode="contain"
              />
              <Text style={styles.statCardLabel}>Battery</Text>
            </View>
            <Text style={styles.statCardValue}>{battery}%</Text>
          </View>

          {/* Firmware card */}
          <View style={[styles.statCard, styles.statCardLight]}>
            <View style={styles.statCardHeader}>
              <Image
                source={require('../../../assets/images/firmware.png')}
                style={styles.statIcon}
                resizeMode="contain"
              />
              <Text style={styles.statCardLabelDark}>Firmware</Text>
            </View>
            <Text style={styles.statCardValueDark}>{DEFAULT_FIRMWARE}</Text>
          </View>
        </View>

        {/* Options section */}
        <Text style={styles.sectionTitle}>Options</Text>
        <View style={styles.optionsCard}>
          {/* Network Name */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              Alert.alert('Network', `Connected to: ${DEFAULT_NETWORK}`)
            }
            activeOpacity={0.7}
          >
            <Image
              source={require('../../../assets/images/network-name.png')}
              style={styles.optionIcon}
              resizeMode="contain"
            />
            <View style={styles.optionText}>
              <Text style={styles.optionLabel}>Network Name</Text>
              <Text style={styles.optionSub}>{DEFAULT_NETWORK}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Auto-Update */}
          <View style={styles.optionRow}>
            <Image
              source={require('../../../assets/images/auto-update.png')}
              style={styles.optionIcon}
              resizeMode="contain"
            />
            <View style={styles.optionText}>
              <Text style={styles.optionLabel}>Auto-Update</Text>
              <Text style={styles.optionSub}>
                {autoUpdate ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
            <Switch
              value={autoUpdate}
              onValueChange={setAutoUpdate}
              trackColor={{ false: COLORS.BORDER, true: '#07882C' }}
              thumbColor={COLORS.WHITE}
            />
          </View>
        </View>

        {/* Disconnect button */}
        <TouchableOpacity
          style={styles.disconnectBtn}
          onPress={handleDisconnect}
          activeOpacity={0.85}
        >
          <Text style={styles.disconnectText}>Disconnect Robot</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND_LIGHT },

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
    fontSize: 17,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
  },

  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MASSIVE,
    alignItems: 'center',
  },

  robotContainer: {
    width: 160,
    height: 160,
    marginBottom: SPACING.MD,
  },
  robotImage: { width: '100%', height: '100%' },

  robotName: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
    marginBottom: SPACING.XL,
  },
  statusDotGreen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#07882C',
  },
  statusTextGreen: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#07882C',
  },
  statusDotRed: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ERROR,
  },
  statusTextRed: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: COLORS.ERROR,
  },

  // Stats row
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.MD,
    width: '100%',
    marginBottom: SPACING.XL,
  },
  statCard: {
    flex: 1,
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    minHeight: 90,
    justifyContent: 'space-between',
  },
  statCardLight: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
    marginBottom: SPACING.SM,
  },
  statIcon: { width: 18, height: 18, tintColor: COLORS.WHITE },
  statCardLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: COLORS.WHITE,
  },
  statCardLabelDark: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: COLORS.TEXT_SECONDARY,
  },
  statCardValue: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: COLORS.WHITE,
  },
  statCardValueDark: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: COLORS.TEXT_PRIMARY,
  },

  // Options
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    alignSelf: 'flex-start',
    marginBottom: SPACING.MD,
  },
  optionsCard: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    overflow: 'hidden',
    marginBottom: SPACING.XL,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.LG,
    gap: SPACING.MD,
  },
  optionIcon: { width: 26, height: 26 },
  optionText: { flex: 1 },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: COLORS.TEXT_PRIMARY,
  },
  optionSub: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },
  chevron: { fontSize: 20, color: COLORS.TEXT_TERTIARY },
  divider: {
    height: 1,
    backgroundColor: COLORS.BORDER_LIGHT,
    marginLeft: SPACING.LG + 26 + SPACING.MD,
  },

  // Disconnect
  disconnectBtn: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: COLORS.ERROR,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  disconnectText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.ERROR,
  },
});

export default RobotConnectivityScreen;
