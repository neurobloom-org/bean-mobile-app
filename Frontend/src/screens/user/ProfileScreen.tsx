// Profile screen — shows the user's avatar (with gallery picker), a connected
// Bean Robot card, General Settings and Support menu rows, a Log Out button,
// and a version footer. Menu rows navigate to real screens. Dark theme aware.

import React, { useState } from 'react';
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
import { launchImageLibrary } from 'react-native-image-picker';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';
import BottomTabBar from '../../components/navigation/BottomTabBar';

// ─── Menu Row ─────────────────────────────────────────────────────────────────

interface MenuRowProps {
  icon: any;
  label: string;
  onPress: () => void;
  colors: any;
  isDark: boolean;
}

// Reusable settings row with an icon, label, and a right-pointing chevron
const MenuRow = ({ icon, label, onPress, colors, isDark }: MenuRowProps) => {
  // Resolve icon tint to exact hex so Android tinting works reliably
  const iconTint = isDark ? '#F1F5F9' : '#000000';
  return (
    <TouchableOpacity
      style={styles.menuRow}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={icon}
        style={[styles.menuIcon, { tintColor: iconTint }]}
        resizeMode="contain"
      />
      <Text style={[styles.menuLabel, { color: colors.TEXT_PRIMARY }]}>
        {label}
      </Text>
      <Text style={[styles.menuChevron, { color: colors.TEXT_TERTIARY }]}>
        ›
      </Text>
    </TouchableOpacity>
  );
};

// ─── Screen ───────────────────────────────────────────────────────────────────

const ProfileScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme();

  // Stores the URI of a user-selected photo; falls back to the default asset
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // Opens the device gallery and updates the avatar on selection
  const handlePickPhoto = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8, selectionLimit: 1 },
      response => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', 'Could not open gallery.');
          return;
        }
        const uri = response.assets?.[0]?.uri;
        if (uri) setProfilePhoto(uri);
      },
    );
  };

  // Two-step confirmation before navigating back to the Welcome screen
  const handleLogOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => navigation.navigate('Welcome'),
      },
    ]);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND_LIGHT }]}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
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
          >
            <Text style={[styles.backIcon, { color: colors.TEXT_PRIMARY }]}>
              ‹
            </Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
            Profile
          </Text>
          {/* Spacer keeps the title centred */}
          <View style={{ width: 40 }} />
        </View>

        {/* ── Avatar ── */}
        {/* Tapping the avatar opens the gallery to change the profile photo */}
        <View
          style={[styles.avatarSection, { backgroundColor: colors.SURFACE }]}
        >
          <TouchableOpacity
            onPress={handlePickPhoto}
            activeOpacity={0.85}
            style={styles.avatarWrap}
          >
            {/* Shows picked photo URI or falls back to the default asset */}
            <Image
              source={
                profilePhoto
                  ? { uri: profilePhoto }
                  : require('../../../assets/images/profile picture.png')
              }
              style={[
                styles.avatarImage,
                { backgroundColor: colors.SECONDARY_LIGHT },
              ]}
              resizeMode="cover"
            />
            {/* Semi-transparent overlay with a camera icon at the bottom of the avatar */}
            <View style={styles.cameraOverlay}>
              <Text style={styles.cameraIcon}>📷</Text>
            </View>
            {/* Gold star badge in the bottom-right corner of the avatar */}
            <View style={[styles.badge, { borderColor: colors.SURFACE }]}>
              <Text style={styles.badgeEmoji}>⭐</Text>
            </View>
          </TouchableOpacity>
          <Text style={[styles.userName, { color: colors.TEXT_PRIMARY }]}>
            Alex Johnson
          </Text>
          <Text style={[styles.tapHint, { color: colors.TEXT_TERTIARY }]}>
            Tap photo to change
          </Text>
        </View>

        {/* ── Connected Bean Robot card ── */}
        {/* Tapping navigates to the Robot Connectivity screen */}
        <TouchableOpacity
          style={[styles.beanCard, { backgroundColor: colors.SURFACE }]}
          onPress={() => navigation.navigate('RobotConnectivity')}
          activeOpacity={0.8}
        >
          <View style={styles.beanCardLeft}>
            <Image
              source={require('../../../assets/images/select-user.png')}
              style={[
                styles.beanCardIcon,
                { tintColor: isDark ? '#F1F5F9' : '#000000' },
              ]}
              resizeMode="contain"
            />
            <View>
              <Text
                style={[styles.beanCardTitle, { color: colors.TEXT_PRIMARY }]}
              >
                Connected Bean Robot
              </Text>
              {/* Red dot + label — updates to green once a robot is paired */}
              <View style={styles.beanStatusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.beanStatusText}>Not Connected</Text>
              </View>
            </View>
          </View>
          <Text style={[styles.chevron, { color: colors.TEXT_TERTIARY }]}>
            ›
          </Text>
        </TouchableOpacity>

        {/* ── General Settings ── */}
        <Text style={styles.sectionGreen}>General Settings</Text>
        <View style={[styles.menuCard, { backgroundColor: colors.SURFACE }]}>
          {/* Navigates to AccountInformationScreen */}
          <MenuRow
            icon={require('../../../assets/images/account-info.png')}
            label="Account Info"
            onPress={() => navigation.navigate('AccountInfo')}
            colors={colors}
            isDark={isDark}
          />
          <View
            style={[
              styles.menuDivider,
              { backgroundColor: colors.BORDER_LIGHT },
            ]}
          />
          {/* Navigates to NotificationPreferencesScreen */}
          <MenuRow
            icon={require('../../../assets/images/notification-preferences.png')}
            label="Notification Preferences"
            onPress={() => navigation.navigate('NotificationPreferences')}
            colors={colors}
            isDark={isDark}
          />
          <View
            style={[
              styles.menuDivider,
              { backgroundColor: colors.BORDER_LIGHT },
            ]}
          />
          {/* Navigates to PrivacySettingsScreen */}
          <MenuRow
            icon={require('../../../assets/images/privacy-settings.png')}
            label="Privacy Settings"
            onPress={() => navigation.navigate('PrivacySettings')}
            colors={colors}
            isDark={isDark}
          />
        </View>

        {/* ── Support ── */}
        <Text style={styles.sectionGreen}>Support</Text>
        <View style={[styles.menuCard, { backgroundColor: colors.SURFACE }]}>
          {/* Navigates to HelpCenterScreen */}
          <MenuRow
            icon={require('../../../assets/images/help-centre.png')}
            label="Help Center"
            onPress={() => navigation.navigate('HelpCenter')}
            colors={colors}
            isDark={isDark}
          />
        </View>

        {/* Outlined danger button — triggers a two-step logout confirmation */}
        <TouchableOpacity
          style={[
            styles.logOutBtn,
            { backgroundColor: colors.SURFACE, borderColor: colors.ERROR },
          ]}
          onPress={handleLogOut}
          activeOpacity={0.85}
        >
          {/* Logout icon tinted with the theme's error colour */}
          <Image
            source={require('../../../assets/images/logout.png')}
            style={[styles.logoutIcon, { tintColor: colors.ERROR }]}
            resizeMode="contain"
          />
          <Text style={[styles.logOutText, { color: colors.ERROR }]}>
            Log Out
          </Text>
        </TouchableOpacity>

        {/* App version footer */}
        <Text style={[styles.footer, { color: colors.TEXT_TERTIARY }]}>
          Bean App Version 2.4.1
        </Text>
        <Text style={[styles.footerSub, { color: colors.TEXT_TERTIARY }]}>
          Carefully crafted
        </Text>
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Profile" />
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: SPACING.MASSIVE },

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

  // Avatar section
  avatarSection: {
    alignItems: 'center',
    paddingTop: SPACING.XXL,
    paddingBottom: SPACING.XL,
  },
  avatarWrap: { position: 'relative', marginBottom: SPACING.MD },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },

  // Semi-transparent bottom-half overlay showing the camera icon
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: { fontSize: 14 },

  // Gold star badge overlaid on the bottom-right of the avatar
  badge: {
    position: 'absolute',
    bottom: 2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  badgeEmoji: { fontSize: 13 },
  userName: { fontSize: 22, fontWeight: '700' as const, marginBottom: 4 },
  tapHint: { fontSize: 12 },

  // Connected Bean Robot card
  beanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SPACING.XL,
    marginTop: SPACING.LG,
    marginBottom: SPACING.LG,
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
    elevation: 2,
  },
  beanCardLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.MD },
  beanCardIcon: { width: 44, height: 44 },
  beanCardTitle: { fontSize: 15, fontWeight: '600' as const, marginBottom: 3 },
  beanStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
  },
  // Red dot indicating the robot is not yet paired
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E74C3C',
  },
  beanStatusText: { fontSize: 13, color: '#E74C3C' },
  chevron: { fontSize: 22, lineHeight: 26 },

  // Green section heading above each menu card
  sectionGreen: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#07882C',
    marginLeft: SPACING.XL,
    marginBottom: SPACING.SM,
  },

  // Rounded card wrapping a group of MenuRows
  menuCard: {
    marginHorizontal: SPACING.XL,
    marginBottom: SPACING.XL,
    borderRadius: BORDER_RADIUS.XL,
    overflow: 'hidden',
    elevation: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: SPACING.LG,
    gap: SPACING.MD,
  },
  menuIcon: { width: 36, height: 36 },
  menuLabel: { flex: 1, fontSize: 17, fontWeight: '500' as const },
  menuChevron: { fontSize: 22, lineHeight: 26 },

  // Hairline divider between rows inside a menu card
  menuDivider: { height: 1, marginLeft: SPACING.LG + 36 + SPACING.MD },

  // Outlined Log Out button — uses the theme's error colour for border and text
  logOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.SM,
    marginHorizontal: SPACING.XL,
    marginBottom: SPACING.LG,
    borderWidth: 1.5,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: 20,
  },
  logoutIcon: { width: 22, height: 22 },
  logOutText: { fontSize: 18, fontWeight: '700' as const },

  // Version footer at the bottom of the scroll area
  footer: { fontSize: 12, textAlign: 'center' },
  footerSub: { fontSize: 11, textAlign: 'center', marginTop: 2 },
});

export default ProfileScreen;
