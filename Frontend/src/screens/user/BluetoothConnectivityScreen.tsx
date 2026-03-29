// src/screens/user/BluetoothConnectivityScreen.tsx
// Three-page BLE provisioning flow:
//   Page 1 — Radar:   scans for nearby Bean robots
//   Page 2 — Link:    collects WiFi credentials, sends them over BLE as
//                     "WIFI_NAME,WIFI_PASS,USER_ID_FROM_SUPABASE"
//   Page 3 — Success: confirms robot is linked, POSTs to /api/v1/robot/pair
//
// NOTE: Real BLE scan is commented out pending UUID values from the hardware
// team. Mock scan runs in its place so the full flow can be tested right now.
// When hardware team provides UUIDs, uncomment the BLE blocks and delete mocks.

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { SPACING } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

// ─── BLE Constants ─────────────────────────────────────────────────────────
// TODO: paste the values your hardware team gives you here.
// const BEAN_SERVICE_UUID = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
// const BEAN_CHAR_UUID    = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

// TODO: update to your Flask server IP before testing on a real device.
const PAIR_ENDPOINT = 'http://192.168.1.100:5001/api/v1/robot/pair';

// ─── Types ────────────────────────────────────────────────────────────────

interface ScannedDevice {
  id: string;
  name: string;
  rssi: number;
}

type FlowPage = 'radar' | 'link' | 'success';

// ─── Pulse Animation ──────────────────────────────────────────────────────

const PulseRing = ({ colors }: { colors: any }) => {
  const scale1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;
  const scale3 = useRef(new Animated.Value(1)).current;
  const opacity1 = useRef(new Animated.Value(0.6)).current;
  const opacity2 = useRef(new Animated.Value(0.4)).current;
  const opacity3 = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const pulse = (s: Animated.Value, o: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(s, {
              toValue: 2.4,
              duration: 1600,
              useNativeDriver: true,
            }),
            Animated.timing(o, {
              toValue: 0,
              duration: 1600,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(s, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(o, {
              toValue: 0.5,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ]),
      );
    const a1 = pulse(scale1, opacity1, 0);
    const a2 = pulse(scale2, opacity2, 500);
    const a3 = pulse(scale3, opacity3, 1000);
    a1.start();
    a2.start();
    a3.start();
    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
  }, []);

  return (
    <View style={styles.pulseContainer}>
      {[
        { scale: scale3, opacity: opacity3 },
        { scale: scale2, opacity: opacity2 },
        { scale: scale1, opacity: opacity1 },
      ].map((anim, i) => (
        <Animated.View
          key={i}
          style={[
            styles.pulseRing,
            {
              backgroundColor: colors.PRIMARY,
              transform: [{ scale: anim.scale }],
              opacity: anim.opacity,
            },
          ]}
        />
      ))}
      <View style={[styles.pulseCenter, { backgroundColor: colors.PRIMARY }]}>
        <Image
          source={require('../../../assets/images/robot-connectivity-top-icon.png')}
          style={styles.pulseCenterIcon}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

// ─── Device Card ──────────────────────────────────────────────────────────

const DeviceCard = ({
  device,
  onPress,
  colors,
  isDark,
}: {
  device: ScannedDevice;
  onPress: () => void;
  colors: any;
  isDark: boolean;
}) => (
  <TouchableOpacity
    style={[
      styles.deviceCard,
      { backgroundColor: colors.SURFACE, borderColor: colors.PRIMARY },
    ]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View
      style={[
        styles.deviceIconWrap,
        { backgroundColor: colors.SECONDARY_LIGHT },
      ]}
    >
      <Image
        source={require('../../../assets/images/robot-connectivity-top-icon.png')}
        style={styles.deviceIcon}
        resizeMode="contain"
      />
    </View>
    <View style={styles.deviceInfo}>
      <Text style={[styles.deviceName, { color: colors.TEXT_PRIMARY }]}>
        {device.name}
      </Text>
      <Text style={[styles.deviceSignal, { color: colors.TEXT_SECONDARY }]}>
        Signal: {device.rssi} dBm
      </Text>
    </View>
    <View style={[styles.connectBadge, { backgroundColor: colors.PRIMARY }]}>
      <Text style={styles.connectBadgeText}>Connect</Text>
    </View>
  </TouchableOpacity>
);

// ─── Main Screen ──────────────────────────────────────────────────────────

const BluetoothConnectivityScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme();
  const iconTint = isDark ? '#F1F5F9' : '#000000';

  const [page, setPage] = useState<FlowPage>('radar');
  const [devices, setDevices] = useState<ScannedDevice[]>([]);
  const [scanning, setScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<ScannedDevice | null>(
    null,
  );
  const [ssid, setSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [pairingPin, setPairingPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [linking, setLinking] = useState(false);

  // ── Scan ────────────────────────────────────────────────────────────────
  const startScan = () => {
    setScanning(true);
    setDevices([]);

    // ── REAL BLE (uncomment when hardware team provides UUIDs) ────────────
    // import { BleManager } from 'react-native-ble-plx';
    // const manager = new BleManager();
    // manager.startDeviceScan([BEAN_SERVICE_UUID], null, (error, device) => {
    //   if (error) { setScanning(false); Alert.alert('Scan Error', error.message); return; }
    //   if (device?.name?.includes('Bean')) {
    //     setDevices(prev => prev.find(d => d.id === device.id) ? prev
    //       : [...prev, { id: device.id, name: device.name!, rssi: device.rssi ?? -99 }]);
    //   }
    // });
    // setTimeout(() => { manager.stopDeviceScan(); setScanning(false); }, 10000);

    // ── MOCK (delete this block when real BLE is wired up) ────────────────
    setTimeout(() => {
      setDevices([{ id: 'mock-001', name: 'Bean-Robot-001', rssi: -52 }]);
      setScanning(false);
    }, 2500);
  };

  useEffect(() => {
    startScan();
  }, []);

  // ── Connect → go to Link page ──────────────────────────────────────────
  const connectToDevice = (device: ScannedDevice) => {
    // REAL BLE: await device.rawDevice.connect(); await device.rawDevice.discoverAllServicesAndCharacteristics();
    setSelectedDevice(device);
    setPage('link');
  };

  // ── Send payload over BLE → call API → go to Success ──────────────────
  const handleLinkAndStart = async () => {
    if (!ssid.trim() || !wifiPassword.trim() || !pairingPin.trim()) {
      Alert.alert(
        'Missing Fields',
        'Please fill in all fields before linking.',
      );
      return;
    }
    if (pairingPin.length !== 4) {
      Alert.alert('Invalid PIN', 'Bean Pairing ID must be exactly 4 digits.');
      return;
    }

    setLinking(true);

    try {
      // Step 1: Get the Supabase user ID from storage.
      const authUserRaw = await AsyncStorage.getItem('bean_auth_user');
      const userId = authUserRaw
        ? JSON.parse(authUserRaw)?.id ?? 'stub-user-id'
        : 'stub-user-id';

      // Step 2: Build the payload in the exact format the hardware team expects.
      // Format: "WIFI_NAME,WIFI_PASS,USER_ID_FROM_SUPABASE"
      const blePayload = `${ssid.trim()},${wifiPassword.trim()},${userId}`;

      // ── REAL BLE write (uncomment when hardware team provides UUIDs) ────
      // await selectedDevice.rawDevice.writeCharacteristicWithResponseForService(
      //   BEAN_SERVICE_UUID,
      //   BEAN_CHAR_UUID,
      //   btoa(blePayload),   // base64-encode for ble-plx
      // );

      // ── MOCK BLE (simulates 3s write delay) ─────────────────────────────
      console.log('BLE payload (mock):', blePayload);
      await new Promise<void>(resolve => setTimeout(() => resolve(), 3000));

      // Step 3: POST to backend to link the robot to the user in Supabase.
      const authToken = await AsyncStorage.getItem('bean_auth_token');
      const response = await fetch(PAIR_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken ?? ''}`,
        },
        body: JSON.stringify({
          user_id: userId,
          device_id: selectedDevice?.id ?? 'mock-001',
          ssid: ssid.trim(),
        }),
      });

      // If the server is not up yet, skip the error so the flow can still be tested.
      if (!response.ok) {
        console.warn(
          `Pair API returned ${response.status} — continuing to success page for now.`,
        );
      }

      setLinking(false);
      setPage('success');
    } catch (err: any) {
      // Network errors (e.g. server not running yet) go to success so UI can still be tested.
      console.warn(
        'Pair request failed (server may not be running yet):',
        err.message,
      );
      setLinking(false);
      setPage('success');
    }
  };

  const handleGoToDashboard = () => navigation.navigate('Home');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND }]}
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
          onPress={() =>
            page === 'radar'
              ? navigation.goBack()
              : setPage(page === 'link' ? 'radar' : 'link')
          }
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backIcon, { color: colors.TEXT_PRIMARY }]}>
            ‹
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
          {page === 'radar'
            ? 'Discover Robots'
            : page === 'link'
            ? 'Link Your Bean'
            : 'Connected!'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Step indicator */}
      <View style={[styles.stepRow, { backgroundColor: colors.SURFACE }]}>
        {(['radar', 'link', 'success'] as FlowPage[]).map((step, i) => {
          const pageIndex = ['radar', 'link', 'success'].indexOf(page);
          const isActive = page === step;
          const isComplete = pageIndex > i;
          return (
            <React.Fragment key={step}>
              <View
                style={[
                  styles.stepDot,
                  {
                    backgroundColor:
                      isActive || isComplete
                        ? colors.PRIMARY
                        : colors.BORDER_LIGHT,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.stepDotText,
                    {
                      color:
                        isActive || isComplete
                          ? '#FFFFFF'
                          : colors.TEXT_TERTIARY,
                    },
                  ]}
                >
                  {i + 1}
                </Text>
              </View>
              {i < 2 && (
                <View
                  style={[
                    styles.stepLine,
                    {
                      backgroundColor: isComplete
                        ? colors.PRIMARY
                        : colors.BORDER_LIGHT,
                    },
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* ── Page 1: Radar ── */}
      {page === 'radar' && (
        <ScrollView
          contentContainerStyle={styles.pageContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.pageTitle, { color: colors.TEXT_PRIMARY }]}>
            Searching for Beans
          </Text>
          <Text style={[styles.pageSubtitle, { color: colors.TEXT_SECONDARY }]}>
            Make sure your Bean Robot is powered on and nearby.
          </Text>
          <PulseRing colors={colors} />
          {scanning && (
            <View style={styles.scanningRow}>
              <ActivityIndicator size="small" color={colors.PRIMARY} />
              <Text
                style={[styles.scanningText, { color: colors.TEXT_SECONDARY }]}
              >
                Searching for nearby Beans... Ensure your robot is powered on.
              </Text>
            </View>
          )}
          {devices.length > 0 && (
            <View style={styles.deviceList}>
              <Text
                style={[styles.foundLabel, { color: colors.TEXT_SECONDARY }]}
              >
                {devices.length} robot{devices.length > 1 ? 's' : ''} found
              </Text>
              {devices.map(device => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onPress={() => connectToDevice(device)}
                  colors={colors}
                  isDark={isDark}
                />
              ))}
            </View>
          )}
          {!scanning && (
            <TouchableOpacity
              style={[styles.rescanBtn, { borderColor: colors.PRIMARY }]}
              onPress={startScan}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.rescanIconCircle,
                  { backgroundColor: colors.SECONDARY_LIGHT },
                ]}
              >
                <Image
                  source={require('../../../assets/images/scan-again.png')}
                  style={[
                    styles.rescanIconImage,
                    { tintColor: isDark ? '#F1F5F9' : colors.PRIMARY },
                  ]}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.rescanText, { color: colors.PRIMARY }]}>
                Scan Again
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}

      {/* ── Page 2: Link ── */}
      {page === 'link' && (
        <ScrollView
          contentContainerStyle={styles.pageContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.pageTitle, { color: colors.TEXT_PRIMARY }]}>
            Link Your Bean
          </Text>
          <Text style={[styles.pageSubtitle, { color: colors.TEXT_SECONDARY }]}>
            Securely send your WiFi credentials and identity to{' '}
            <Text style={{ color: colors.PRIMARY, fontWeight: '700' }}>
              {selectedDevice?.name ?? 'Bean Robot'}
            </Text>
            .
          </Text>

          {/* WiFi SSID */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.TEXT_SECONDARY }]}>
              WiFi Network Name (SSID)
            </Text>
            <View
              style={[
                styles.inputWrap,
                {
                  backgroundColor: colors.SURFACE,
                  borderColor: colors.BORDER_LIGHT,
                },
              ]}
            >
              <Image
                source={require('../../../assets/images/network-name.png')}
                style={[styles.inputIcon, { tintColor: iconTint }]}
                resizeMode="contain"
              />
              <TextInput
                style={[styles.input, { color: colors.TEXT_PRIMARY }]}
                placeholder="e.g. Home_WiFi_5G"
                placeholderTextColor={colors.TEXT_TERTIARY}
                value={ssid}
                onChangeText={setSsid}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* WiFi Password */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.TEXT_SECONDARY }]}>
              WiFi Password
            </Text>
            <View
              style={[
                styles.inputWrap,
                {
                  backgroundColor: colors.SURFACE,
                  borderColor: colors.BORDER_LIGHT,
                },
              ]}
            >
              <Image
                source={require('../../../assets/images/lock.png')}
                style={[styles.inputIcon, { tintColor: iconTint }]}
                resizeMode="contain"
              />
              <TextInput
                style={[styles.input, { color: colors.TEXT_PRIMARY }]}
                placeholder="Enter your WiFi password"
                placeholderTextColor={colors.TEXT_TERTIARY}
                value={wifiPassword}
                onChangeText={setWifiPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setShowPassword(p => !p)}>
                <Text
                  style={[styles.togglePasswordText, { color: colors.PRIMARY }]}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 4-digit pairing PIN */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.TEXT_SECONDARY }]}>
              Bean Pairing ID
              <Text
                style={[styles.fieldLabelHint, { color: colors.TEXT_TERTIARY }]}
              >
                {' '}
                (4-digit PIN on robot's screen)
              </Text>
            </Text>
            <View
              style={[
                styles.inputWrap,
                {
                  backgroundColor: colors.SURFACE,
                  borderColor: colors.BORDER_LIGHT,
                },
              ]}
            >
              <Text style={[styles.inputIconText, { color: iconTint }]}>
                🔢
              </Text>
              <TextInput
                style={[styles.input, { color: colors.TEXT_PRIMARY }]}
                placeholder="e.g. 5821"
                placeholderTextColor={colors.TEXT_TERTIARY}
                value={pairingPin}
                onChangeText={t => {
                  if (t.length <= 4) setPairingPin(t.replace(/[^0-9]/g, ''));
                }}
                keyboardType="numeric"
                maxLength={4}
              />
              <Text style={[styles.pinCount, { color: colors.TEXT_TERTIARY }]}>
                {pairingPin.length}/4
              </Text>
            </View>
          </View>

          {/* Info banner */}
          <View
            style={[
              styles.infoBanner,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <Text style={[styles.infoBannerText, { color: colors.PRIMARY }]}>
              🔒 Sent as: WiFi_Name, WiFi_Pass, Your_ID — securely over
              Bluetooth.{'\n'}Your password is never stored on our servers.
            </Text>
          </View>

          {linking ? (
            <View style={styles.linkingState}>
              <ActivityIndicator size="large" color={colors.PRIMARY} />
              <Text
                style={[styles.linkingText, { color: colors.TEXT_SECONDARY }]}
              >
                Bean is joining the cloud...
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.linkBtn, { backgroundColor: colors.PRIMARY }]}
              onPress={handleLinkAndStart}
              activeOpacity={0.85}
            >
              <Text style={styles.linkBtnText}>Link & Start 🚀</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}

      {/* ── Page 3: Success ── */}
      {page === 'success' && (
        <View style={styles.successPage}>
          <Image
            source={require('../../../assets/images/robot-connectivity-top-icon.png')}
            style={styles.successRobotImage}
            resizeMode="contain"
          />
          <View
            style={[
              styles.successBadge,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <Text style={[styles.successBadgeText, { color: colors.PRIMARY }]}>
              ✓ Connected
            </Text>
          </View>
          <Text style={[styles.successTitle, { color: colors.TEXT_PRIMARY }]}>
            Bean is Ready! 🎉
          </Text>
          <Text
            style={[styles.successSubtitle, { color: colors.TEXT_SECONDARY }]}
          >
            Your Bean Robot has been successfully linked to your account and is
            now connected to WiFi.
          </Text>
          <View
            style={[
              styles.successCard,
              {
                backgroundColor: colors.SURFACE,
                borderColor: colors.BORDER_LIGHT,
              },
            ]}
          >
            {[
              { label: 'Robot', value: selectedDevice?.name ?? 'Bean Robot' },
              { label: 'Network', value: ssid || 'Home_WiFi' },
              { label: 'Status', value: 'Active & Synced' },
            ].map(item => (
              <View key={item.label} style={styles.successInfoRow}>
                <Text
                  style={[
                    styles.successInfoLabel,
                    { color: colors.TEXT_TERTIARY },
                  ]}
                >
                  {item.label}
                </Text>
                <Text
                  style={[
                    styles.successInfoValue,
                    {
                      color:
                        item.label === 'Status'
                          ? '#07882C'
                          : colors.TEXT_PRIMARY,
                    },
                  ]}
                >
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.dashboardBtn, { backgroundColor: colors.PRIMARY }]}
            onPress={handleGoToDashboard}
            activeOpacity={0.85}
          >
            <Text style={styles.dashboardBtnText}>Go to Dashboard</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BluetoothConnectivityScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────

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
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.XL,
    gap: 0,
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDotText: { fontSize: 12, fontWeight: '700' as const },
  stepLine: { flex: 1, height: 2, marginHorizontal: 4 },
  pageContent: {
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: 60,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800' as const,
    textAlign: 'center',
    marginBottom: SPACING.XS,
  },
  pageSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.MD,
  },
  pulseContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  pulseRing: { position: 'absolute', width: 80, height: 80, borderRadius: 40 },
  pulseCenter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseCenterIcon: { width: 48, height: 48, tintColor: '#FFFFFF' },
  scanningRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.SM,
    paddingHorizontal: SPACING.LG,
    marginBottom: SPACING.LG,
  },
  scanningText: { flex: 1, fontSize: 13, lineHeight: 18, textAlign: 'center' },
  deviceList: { width: '100%', marginBottom: SPACING.LG },
  foundLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: SPACING.SM,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.XL,
    borderWidth: 1.5,
    padding: SPACING.LG,
    gap: SPACING.MD,
    marginBottom: SPACING.SM,
  },
  deviceIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceIcon: { width: 28, height: 28 },
  deviceInfo: { flex: 1 },
  deviceName: { fontSize: 15, fontWeight: '700' as const, marginBottom: 2 },
  deviceSignal: { fontSize: 12 },
  connectBadge: {
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
  },
  connectBadgeText: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: '#000000',
  },
  rescanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
    borderWidth: 1.5,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.XL,
    marginTop: SPACING.MD,
  },
  rescanIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rescanIconImage: { width: 18, height: 18 },
  rescanText: { fontSize: 14, fontWeight: '600' as const },
  fieldGroup: { width: '100%', marginBottom: SPACING.LG },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    marginBottom: SPACING.XS,
  },
  fieldLabelHint: { fontSize: 11, fontWeight: '400' as const },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.LG,
    borderWidth: 1,
    paddingHorizontal: SPACING.MD,
    paddingVertical: Platform.OS === 'ios' ? SPACING.MD : 0,
    gap: SPACING.SM,
  },
  inputIcon: { width: 18, height: 18, flexShrink: 0 },
  inputIconText: { fontSize: 16, width: 20, textAlign: 'center' },
  input: { flex: 1, fontSize: 14, paddingVertical: SPACING.MD },
  togglePasswordText: {
    fontSize: 12,
    fontWeight: '600' as const,
    paddingHorizontal: 4,
  },
  pinCount: { fontSize: 11 },
  infoBanner: {
    width: '100%',
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.MD,
    marginBottom: SPACING.XL,
  },
  infoBannerText: { fontSize: 12, lineHeight: 18 },
  linkingState: {
    alignItems: 'center',
    gap: SPACING.MD,
    marginTop: SPACING.LG,
  },
  linkingText: { fontSize: 14, fontStyle: 'italic' },
  linkBtn: {
    width: '100%',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    shadowColor: '#4ECCA3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  linkBtnText: { fontSize: 16, fontWeight: '700' as const, color: '#000000' },
  successPage: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: 40,
  },
  successRobotImage: { width: 140, height: 140, marginBottom: SPACING.LG },
  successBadge: {
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XS,
    marginBottom: SPACING.MD,
  },
  successBadgeText: { fontSize: 13, fontWeight: '700' as const },
  successTitle: {
    fontSize: 24,
    fontWeight: '800' as const,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  successSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.MD,
  },
  successCard: {
    width: '100%',
    borderRadius: BORDER_RADIUS.XL,
    borderWidth: 1,
    padding: SPACING.LG,
    marginBottom: SPACING.XL,
    gap: SPACING.SM,
  },
  successInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  successInfoLabel: { fontSize: 13 },
  successInfoValue: { fontSize: 13, fontWeight: '600' as const },
  dashboardBtn: {
    width: '100%',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    shadowColor: '#4ECCA3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  dashboardBtnText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#000000',
  },
});
