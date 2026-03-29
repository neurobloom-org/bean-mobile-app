// Privacy Settings screen — lets the user toggle data analytics, manage
// location and cloud permissions, control profile visibility, and permanently
// delete all activity data. Fully dark/light theme aware via useTheme.

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
  colors: any;
}

interface NavRowProps {
  iconSource: any;
  title: string;
  subtitle: string;
  onPress: () => void;
  colors: any;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

// Row with an icon, label, subtitle, and a toggle switch
const ToggleRow: React.FC<ToggleRowProps> = ({
  iconSource,
  title,
  subtitle,
  value,
  onValueChange,
  colors,
}) => (
  <View style={[styles.rowWrap, { backgroundColor: colors.SURFACE }]}>
    <View
      style={[styles.iconCircle, { backgroundColor: colors.SECONDARY_LIGHT }]}
    >
      {/* Icon tinted with the primary brand colour */}
      <Image
        source={iconSource}
        style={[styles.rowIconImage, { tintColor: colors.PRIMARY }]}
        resizeMode="contain"
      />
    </View>
    <View style={styles.rowTextWrap}>
      <Text style={[styles.rowTitle, { color: colors.TEXT_PRIMARY }]}>
        {title}
      </Text>
      <Text style={[styles.rowSubtitle, { color: colors.TEXT_SECONDARY }]}>
        {subtitle}
      </Text>
    </View>
    {/* Green track when on; white thumb on Android for platform consistency */}
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.BORDER_LIGHT, true: '#4ADE80' }}
      thumbColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
      ios_backgroundColor={colors.BORDER_LIGHT}
    />
  </View>
);

// Row that navigates to a sub-screen when tapped; shows a chevron on the right
const NavRow: React.FC<NavRowProps> = ({
  iconSource,
  title,
  subtitle,
  onPress,
  colors,
}) => (
  <TouchableOpacity
    style={[styles.rowWrap, { backgroundColor: colors.SURFACE }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      style={[styles.iconCircle, { backgroundColor: colors.SECONDARY_LIGHT }]}
    >
      <Image
        source={iconSource}
        style={[styles.rowIconImage, { tintColor: colors.PRIMARY }]}
        resizeMode="contain"
      />
    </View>
    <View style={styles.rowTextWrap}>
      <Text style={[styles.rowTitle, { color: colors.TEXT_PRIMARY }]}>
        {title}
      </Text>
      <Text style={[styles.rowSubtitle, { color: colors.TEXT_SECONDARY }]}>
        {subtitle}
      </Text>
    </View>
    <Text style={[styles.chevron, { color: colors.TEXT_SECONDARY }]}>›</Text>
  </TouchableOpacity>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const PrivacySettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  // Controls the Data Analytics toggle — on by default
  const [dataAnalytics, setDataAnalytics] = useState<boolean>(true);

  // Two-step confirmation Alert before permanently deleting activity data
  const handleDeleteData = () => {
    Alert.alert(
      'Delete All Activity Data',
      "This will permanently remove your robot's interaction logs and floor mapping history. This action cannot be undone.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Deleted', 'All activity data has been removed.');
          },
        },
      ],
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
          Privacy Settings
        </Text>
        {/* Spacer keeps the title centred against the back button */}
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro subtitle — "Your privacy is our priority." highlighted in green */}
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Manage how your data is collected and used to improve your Bean Robot
          experience.{'\n'}
          <Text style={styles.subtitleBold}>Your privacy is our priority.</Text>
        </Text>

        {/* ── Data Analytics Toggle ── */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.SURFACE,
              shadowColor: colors.TEXT_PRIMARY,
            },
          ]}
        >
          <ToggleRow
            iconSource={require('../../../assets/images/analytics.png')}
            title="Data Analytics"
            subtitle="Help improve robot navigation with anonymous usage data."
            value={dataAnalytics}
            onValueChange={setDataAnalytics}
            colors={colors}
          />
        </View>

        {/* ── Permissions ── */}
        <Text style={[styles.sectionLabel, { color: colors.TEXT_SECONDARY }]}>
          Permissions
        </Text>
        {/* Card groups Location Services and Cloud Storage nav rows */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.SURFACE,
              shadowColor: colors.TEXT_PRIMARY,
            },
          ]}
        >
          <NavRow
            iconSource={require('../../../assets/images/location_on.png')}
            title="Location Services"
            subtitle="Enabled while using"
            onPress={() => {
              /* TODO */
            }}
            colors={colors}
          />
          <View
            style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
          />
          <NavRow
            iconSource={require('../../../assets/images/Group 1000003711.png')}
            title="Cloud Storage"
            subtitle="Manage cloud storage"
            onPress={() => {
              /* TODO */
            }}
            colors={colors}
          />
        </View>

        {/* ── Visibility ── */}
        <Text style={[styles.sectionLabel, { color: colors.TEXT_SECONDARY }]}>
          Visibility
        </Text>
        {/* Card groups Profile Visibility and Local Discovery nav rows */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.SURFACE,
              shadowColor: colors.TEXT_PRIMARY,
            },
          ]}
        >
          <NavRow
            iconSource={require('../../../assets/images/account_circle.png')}
            title="Profile Visibility"
            subtitle="Only contacts can see you"
            onPress={() => {
              /* TODO */
            }}
            colors={colors}
          />
          <View
            style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
          />
          <NavRow
            iconSource={require('../../../assets/images/radar.png')}
            title="Local Discovery"
            subtitle="Allow other robots to connect"
            onPress={() => {
              /* TODO */
            }}
            colors={colors}
          />
        </View>

        {/* Danger action — triggers a two-step confirmation before deleting */}
        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: colors.SURFACE }]}
          onPress={handleDeleteData}
          activeOpacity={0.85}
        >
          {/* delete_forever.png tinted red — fixed colour, never inherits theme */}
          <Image
            source={require('../../../assets/images/delete_forever.png')}
            style={styles.deleteIconImage}
            resizeMode="contain"
          />
          <Text style={styles.deleteButtonText}>Delete All Activity Data</Text>
        </TouchableOpacity>

        {/* Fine-print warning below the delete button */}
        <Text
          style={[styles.deleteDisclaimer, { color: colors.TEXT_TERTIARY }]}
        >
          This will permanently remove your robot's interaction logs and floor
          mapping history.
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacySettingsScreen;

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
    paddingBottom: 36,
  },

  // Intro subtitle with inline bold green emphasis
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  subtitleBold: {
    color: '#4ADE80',
    fontWeight: '700',
  },

  // ALL-CAPS section heading above each card group
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 24,
    marginBottom: 10,
  },

  // Rounded card that groups related rows
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  // ── Row shared by ToggleRow and NavRow
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  rowIconImage: {
    width: 22,
    height: 22,
  },
  rowTextWrap: { flex: 1, marginRight: 10 },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
  },
  rowSubtitle: {
    fontSize: 12,
    lineHeight: 17,
  },
  chevron: {
    fontSize: 22,
    marginTop: -2,
  },

  // Hairline divider between rows inside a card
  divider: {
    height: 1,
    marginLeft: 72,
  },

  // Delete button — outlined in red to signal a destructive action
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    borderWidth: 2,
    borderColor: '#EF4444',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  // Fixed red tint — danger colour is always red regardless of theme
  deleteIconImage: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#EF4444',
  },
  deleteButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
  },

  // Fine-print disclaimer below the delete button
  deleteDisclaimer: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 12,
    paddingHorizontal: 8,
  },
});
