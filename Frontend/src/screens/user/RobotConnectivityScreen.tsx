// src/screens/user/RobotConnectivityScreen.tsx
// ✅ Dark theme aware + battery colour logic
// ✅ Network Name row now navigates to BluetoothConnectivityScreen

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
import { SPACING } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const getBatteryColor = (level: number): string => {
  if (level < 20) return '#EF4444';
  if (level <= 75) return '#F59E0B';
  return '#07882C';
};

const DEFAULT_BATTERY = 85;
const DEFAULT_FIRMWARE = 'v2.1.0';
const DEFAULT_NETWORK = 'Home_WiFi_5G';
const IS_CONNECTED = true;

const RobotConnectivityScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme();
  const iconTint = isDark ? '#F1F5F9' : '#000000';
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
        >
          <Text style={[styles.backIcon, { color: colors.TEXT_PRIMARY }]}>
            ‹
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
          Robot Connectivity
        </Text>
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
        <Text style={[styles.robotName, { color: colors.TEXT_PRIMARY }]}>
          Bean Robot v2
        </Text>
        <View style={styles.statusRow}>
          {IS_CONNECTED ? (
            <>
              <View style={styles.statusDotGreen} />
              <Text style={styles.statusTextGreen}>Active & Synced</Text>
            </>
          ) : (
            <>
              <View style={styles.statusDotRed} />
              <Text style={[styles.statusTextRed, { color: colors.ERROR }]}>
                Not Connected
              </Text>
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
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.SURFACE,
                borderWidth: 1,
                borderColor: colors.BORDER_LIGHT,
              },
            ]}
          >
            <View style={styles.statCardHeader}>
              <Image
                source={require('../../../assets/images/firmware.png')}
                style={[styles.statIcon, { tintColor: colors.TEXT_SECONDARY }]}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.statCardLabelDark,
                  { color: colors.TEXT_SECONDARY },
                ]}
              >
                Firmware
              </Text>
            </View>
            <Text
              style={[styles.statCardValueDark, { color: colors.TEXT_PRIMARY }]}
            >
              {DEFAULT_FIRMWARE}
            </Text>
          </View>
        </View>

        {/* Options section */}
        <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
          Options
        </Text>
        <View style={[styles.optionsCard, { backgroundColor: colors.SURFACE }]}>
          {/* ✅ Network Name → navigates to BluetoothConnectivityScreen */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate('BluetoothConnectivity')}
            activeOpacity={0.7}
          >
            <Image
              source={require('../../../assets/images/network-name.png')}
              style={[styles.optionIcon, { tintColor: iconTint }]}
              resizeMode="contain"
            />
            <View style={styles.optionText}>
              <Text
                style={[styles.optionLabel, { color: colors.TEXT_PRIMARY }]}
              >
                Network Name
              </Text>
              <Text
                style={[styles.optionSub, { color: colors.TEXT_SECONDARY }]}
              >
                {DEFAULT_NETWORK}
              </Text>
            </View>
            <Text style={[styles.chevron, { color: colors.TEXT_TERTIARY }]}>
              ›
            </Text>
          </TouchableOpacity>

          <View
            style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
          />

          {/* Auto-Update */}
          <View style={styles.optionRow}>
            <Image
              source={require('../../../assets/images/auto-update.png')}
              style={[styles.optionIcon, { tintColor: iconTint }]}
              resizeMode="contain"
            />
            <View style={styles.optionText}>
              <Text
                style={[styles.optionLabel, { color: colors.TEXT_PRIMARY }]}
              >
                Auto-Update
              </Text>
              <Text
                style={[styles.optionSub, { color: colors.TEXT_SECONDARY }]}
              >
                {autoUpdate ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
            <Switch
              value={autoUpdate}
              onValueChange={setAutoUpdate}
              trackColor={{ false: colors.BORDER, true: '#07882C' }}
              thumbColor={colors.WHITE}
            />
          </View>
        </View>

        {/* Disconnect button */}
        <TouchableOpacity
          style={[
            styles.disconnectBtn,
            { borderColor: colors.ERROR, backgroundColor: colors.SURFACE },
          ]}
          onPress={handleDisconnect}
          activeOpacity={0.85}
        >
          <Text style={[styles.disconnectText, { color: colors.ERROR }]}>
            Disconnect Robot
          </Text>
        </TouchableOpacity>
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
  headerTitle: { fontSize: 17, fontWeight: '700' as const },
  scroll: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MASSIVE,
    alignItems: 'center',
  },
  robotContainer: { width: 160, height: 160, marginBottom: SPACING.MD },
  robotImage: { width: '100%', height: '100%' },
  robotName: {
    fontSize: 20,
    fontWeight: '800' as const,
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
    backgroundColor: '#EF4444',
  },
  statusTextRed: { fontSize: 14, fontWeight: '600' as const },
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
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
    marginBottom: SPACING.SM,
  },
  statIcon: { width: 18, height: 18, tintColor: '#FFFFFF' },
  statCardLabel: { fontSize: 12, fontWeight: '600' as const, color: '#FFFFFF' },
  statCardLabelDark: { fontSize: 12, fontWeight: '600' as const },
  statCardValue: { fontSize: 28, fontWeight: '800' as const, color: '#FFFFFF' },
  statCardValueDark: { fontSize: 28, fontWeight: '800' as const },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    alignSelf: 'flex-start',
    marginBottom: SPACING.MD,
  },
  optionsCard: {
    width: '100%',
    borderRadius: BORDER_RADIUS.XL,
    overflow: 'hidden',
    marginBottom: SPACING.XL,
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
  optionLabel: { fontSize: 15, fontWeight: '600' as const },
  optionSub: { fontSize: 12, marginTop: 2 },
  chevron: { fontSize: 20 },
  divider: { height: 1, marginLeft: SPACING.LG + 26 + SPACING.MD },
  disconnectBtn: {
    width: '100%',
    borderWidth: 1.5,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
  },
  disconnectText: { fontSize: 16, fontWeight: '700' as const },
});

export default RobotConnectivityScreen;
