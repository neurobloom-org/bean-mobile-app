// Notification Preferences screen — lets the user toggle push notifications,
// email alerts, robot status updates, and marketing offers. Changes are saved
// via an Alert confirmation. Fully dark/light theme aware via useTheme.

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ToggleRowProps {
  iconSource: any;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  iconTint: string;
  colors: any;
}

// ─── Sub-component ────────────────────────────────────────────────────────────

// Reusable row with an icon, label, subtitle, and a toggle switch
const ToggleRow: React.FC<ToggleRowProps> = ({
  iconSource,
  title,
  subtitle,
  value,
  onValueChange,
  iconTint,
  colors,
}) => (
  <View style={[styles.toggleRow, { backgroundColor: colors.SURFACE }]}>
    <View
      style={[
        styles.toggleIconWrap,
        { backgroundColor: colors.SECONDARY_LIGHT },
      ]}
    >
      {/* iconTint is a pre-resolved hex string ('#000000' / '#F1F5F9') so
          Android tinting never silently falls back to an unresolved token */}
      <Image
        source={iconSource}
        style={[styles.toggleIconImage, { tintColor: iconTint }]}
        resizeMode="contain"
      />
    </View>
    <View style={styles.toggleTextWrap}>
      <Text style={[styles.toggleTitle, { color: colors.TEXT_PRIMARY }]}>
        {title}
      </Text>
      <Text style={[styles.toggleSubtitle, { color: colors.TEXT_SECONDARY }]}>
        {subtitle}
      </Text>
    </View>
    {/* Green track when on; platform-aware thumb colour for Android */}
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.BORDER_LIGHT, true: '#4ADE80' }}
      thumbColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
      ios_backgroundColor={colors.BORDER_LIGHT}
    />
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const NotificationPreferencesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();

  // Resolve tint to exact hex so Android image tinting works reliably:
  // LIGHT_COLORS.TEXT_PRIMARY = '#000000' | DARK_COLORS.TEXT_PRIMARY = '#F1F5F9'
  const iconTint = isDark ? '#F1F5F9' : '#000000';

  // Individual toggle states — all persist locally until Save is pressed
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [emailAlerts, setEmailAlerts] = useState<boolean>(false);
  const [robotStatusUpdates, setRobotStatusUpdates] = useState<boolean>(true);
  const [marketingOffers, setMarketingOffers] = useState<boolean>(false);

  // Shows a confirmation alert when the user taps Save Preferences
  const handleSave = () => {
    Alert.alert(
      'Preferences Saved',
      'Your notification preferences have been updated.',
      [{ text: 'OK' }],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      {/* ── Header ── */}
      <View style={[styles.header, { backgroundColor: colors.BACKGROUND }]}>
        {/* Back arrow — pops the screen from the navigation stack */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backArrow, { color: colors.TEXT_PRIMARY }]}>
            ←
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
          Notification Preferences
        </Text>
        {/* Spacer keeps the title centred against the back button */}
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Alert Channels ── */}
        <Text style={[styles.sectionLabel, { color: colors.TEXT_SECONDARY }]}>
          Alert Channels
        </Text>

        {/* Card groups related toggles with a hairline divider between them */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.SURFACE,
              shadowColor: isDark ? '#000000' : '#000000',
            },
          ]}
        >
          <ToggleRow
            iconSource={require('../../../assets/images/notifications_active.png')}
            title="Push Notifications"
            subtitle="Instant updates on your device"
            value={pushNotifications}
            onValueChange={setPushNotifications}
            iconTint={iconTint}
            colors={colors}
          />
          <View
            style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
          />
          <ToggleRow
            iconSource={require('../../../assets/images/mail.png')}
            title="Email Alerts"
            subtitle="Weekly reports and activity logs"
            value={emailAlerts}
            onValueChange={setEmailAlerts}
            iconTint={iconTint}
            colors={colors}
          />
        </View>

        {/* ── Robot Content ── */}
        <Text style={[styles.sectionLabel, { color: colors.TEXT_SECONDARY }]}>
          Robot Content
        </Text>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.SURFACE,
              shadowColor: isDark ? '#000000' : '#000000',
            },
          ]}
        >
          <ToggleRow
            iconSource={require('../../../assets/images/select-user.png')}
            title="Robot Status Updates"
            subtitle="Battery levels and task completion"
            value={robotStatusUpdates}
            onValueChange={setRobotStatusUpdates}
            iconTint={iconTint}
            colors={colors}
          />
          <View
            style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
          />
          <ToggleRow
            iconSource={require('../../../assets/images/celebration.png')}
            title="Marketing Offers"
            subtitle="New features and exclusive deals"
            value={marketingOffers}
            onValueChange={setMarketingOffers}
            iconTint={iconTint}
            colors={colors}
          />
        </View>

        {/* Fine-print note — security alerts are always sent regardless of toggles */}
        <Text style={[styles.disclaimer, { color: colors.TEXT_TERTIARY }]}>
          You can change these settings at any time. System-critical updates
          regarding your account security will always be sent regardless of
          these preferences.
        </Text>
      </ScrollView>

      {/* ── Save Button ── */}
      <View style={[styles.footer, { backgroundColor: colors.BACKGROUND }]}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationPreferencesScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: { fontSize: 22 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  headerSpacer: { width: 36 },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  // Section label — ALL CAPS category heading above each card group
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 24,
    marginBottom: 10,
  },

  // Card — rounded container that groups related toggle rows
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  // Toggle Row
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  toggleIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  toggleIconImage: {
    width: 22,
    height: 22,
    // tintColor applied dynamically as resolved hex — see iconTint above
  },
  toggleTextWrap: {
    flex: 1,
    marginRight: 12,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
  },
  toggleSubtitle: {
    fontSize: 12,
    lineHeight: 17,
  },

  // Hairline divider between rows inside a card
  divider: {
    height: 1,
    marginLeft: 70,
  },

  // Disclaimer
  disclaimer: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 8,
  },

  // Footer — sticks to the bottom, houses the Save button
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 36,
    paddingTop: 12,
  },
  saveButton: {
    backgroundColor: '#4ADE80',
    borderRadius: 50,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: '#4ADE80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
