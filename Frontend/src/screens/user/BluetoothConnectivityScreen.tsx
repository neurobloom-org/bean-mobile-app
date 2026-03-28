// src/screens/user/BluetoothConnectivityScreen.tsx
// ✅ 3-page Bluetooth flow: Radar → Link → Success
// ✅ Full dark/light theme · BLE logic stubs with TODO markers

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
import { useTheme } from '../../context/ThemeContext';
import { SPACING } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScannedDevice {
  id: string;
  name: string;
  rssi: number;
}

type FlowPage = 'radar' | 'link' | 'success';

// ─── Pulse Animation Component ───────────────────────────────────────────────

const PulseRing = ({ colors }: { colors: any }) => {
  const scale1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;
  const scale3 = useRef(new Animated.Value(1)).current;
  const opacity1 = useRef(new Animated.Value(0.6)).current;
  const opacity2 = useRef(new Animated.Value(0.4)).current;
  const opacity3 = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const pulse = (
      scaleAnim: Animated.Value,
      opacityAnim: Animated.Value,
      delay: number,
    ) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 2.4,
              duration: 1600,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0,
              duration: 1600,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
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
      {/* Center circle */}
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

// ─── Device Card ─────────────────────────────────────────────────────────────

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
}) => {
  const iconTint = isDark ? '#F1F5F9' : '#000000';
  return (
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
};

// ─── Main Screen ─────────────────────────────────────────────────────────────

const BluetoothConnectivityScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme();
  const iconTint = isDark ? '#F1F5F9' : '#000000';

  // Flow state
  const [page, setPage] = useState<FlowPage>('radar');

  // Page 1 — Radar
  const [devices, setDevices] = useState<ScannedDevice[]>([]);
  const [scanning, setScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<ScannedDevice | null>(
    null,
  );

  // Page 2 — Link
  const [ssid, setSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [pairingPin, setPairingPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [linking, setLinking] = useState(false);

  // ── BLE Scanning ─────────────────────────────────────────────────────────
  const startScan = () => {
    setScanning(true);
    setDevices([]);

    // TODO: replace with real BLE scan
    // manager.startDeviceScan(null, null, (error, device) => {
    //   if (error) { console.log('Scan Error:', error); return; }
    //   if (device.name && device.name.includes('Bean')) {
    //     setDevices(prev => {
    //       const exists = prev.find(d => d.id === device.id);
    //       if (!exists) return [...prev, device];
    //       return prev;
    //     });
    //   }
    // });

    // ── MOCK: simulate finding a Bean robot after 2s ──
    setTimeout(() => {
      setDevices([{ id: 'mock-001', name: 'Bean-Robot-001', rssi: -52 }]);
      setScanning(false);
    }, 2500);
  };

  useEffect(() => {
    startScan();
    return () => {
      // TODO: manager.stopDeviceScan();
    };
  }, []);

  // ── Connect to device → go to Link page ──────────────────────────────────
  const connectToDevice = (device: ScannedDevice) => {
    setSelectedDevice(device);
    // TODO: await device.connect() before navigating
    setPage('link');
  };

  // ── Send provisioning data over BLE → go to Success page ─────────────────
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

    // TODO: send over BLE using selectedDevice
    // const payload = JSON.stringify({
    //   ssid,
    //   pass: wifiPassword,
    //   pin: pairingPin,
    //   uid: 'USER_UUID_FROM_SUPABASE',
    //   flask_ip: '192.168.1.XX',
    // });
    // await selectedDevice.writeCharacteristicWithResponseForService(SERVICE_UUID, CHAR_UUID, btoa(payload));
    // Then start Supabase Realtime Listener for owner_id update...

    // ── MOCK: simulate "Bean is joining the cloud..." ──
    setTimeout(() => {
      setLinking(false);
      setPage('success');
    }, 3000);
  };

  // ── Navigate to Dashboard on success ─────────────────────────────────────
  const handleGoToDashboard = () => {
    navigation.navigate('Home');
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND }]}
    >
      {/* ── Header ── */}
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

      {/* ── Step indicator ── */}
      <View style={[styles.stepRow, { backgroundColor: colors.SURFACE }]}>
        {(['radar', 'link', 'success'] as FlowPage[]).map((step, i) => (
          <React.Fragment key={step}>
            <View
              style={[
                styles.stepDot,
                {
                  backgroundColor:
                    page === step
                      ? colors.PRIMARY
                      : ['radar', 'link', 'success'].indexOf(page) > i
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
                      page === step ||
                      ['radar', 'link', 'success'].indexOf(page) > i
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
                    backgroundColor:
                      ['radar', 'link', 'success'].indexOf(page) > i
                        ? colors.PRIMARY
                        : colors.BORDER_LIGHT,
                  },
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* ══════════════════════════════════════════════════════════════
          PAGE 1 — RADAR (Discovery)
      ══════════════════════════════════════════════════════════════ */}
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

          {/* Pulse animation */}
          <PulseRing colors={colors} />

          {/* Scanning status */}
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

          {/* Device list */}
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

          {/* Rescan button */}
          {!scanning && (
            <TouchableOpacity
              style={[styles.rescanBtn, { borderColor: colors.PRIMARY }]}
              onPress={startScan}
              activeOpacity={0.8}
            >
              {/* ✅ scan-again.png in tinted circle — white in dark, primary in light */}
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

      {/* ══════════════════════════════════════════════════════════════
          PAGE 2 — LINK (Provisioning)
      ══════════════════════════════════════════════════════════════ */}
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

          {/* Bean Pairing ID */}
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
              🔒 This data is sent securely over Bluetooth. Your password is
              never stored on our servers.
            </Text>
          </View>

          {/* Link & Start button */}
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

      {/* ══════════════════════════════════════════════════════════════
          PAGE 3 — SUCCESS (Dashboard)
      ══════════════════════════════════════════════════════════════ */}
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
  headerTitle: { fontSize: 17, fontWeight: '700' as const },

  // Step indicator
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

  // Page content
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

  // Pulse
  pulseContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  pulseRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  pulseCenter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseCenterIcon: { width: 48, height: 48, tintColor: '#FFFFFF' },

  // Scanning
  scanningRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.SM,
    paddingHorizontal: SPACING.LG,
    marginBottom: SPACING.LG,
  },
  scanningText: { flex: 1, fontSize: 13, lineHeight: 18, textAlign: 'center' },

  // Device list
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

  // Rescan
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
  // ✅ Circle container for scan-again.png
  rescanIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rescanIconImage: {
    width: 18,
    height: 18,
  },
  rescanText: { fontSize: 14, fontWeight: '600' as const },

  // Form fields
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

  // Info banner
  infoBanner: {
    width: '100%',
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.MD,
    marginBottom: SPACING.XL,
  },
  infoBannerText: { fontSize: 12, lineHeight: 18 },

  // Linking state
  linkingState: {
    alignItems: 'center',
    gap: SPACING.MD,
    marginTop: SPACING.LG,
  },
  linkingText: { fontSize: 14, fontStyle: 'italic' },

  // Link button
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

  // Success page
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
