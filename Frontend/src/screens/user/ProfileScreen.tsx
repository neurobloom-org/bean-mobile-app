// src/screens/user/ProfileScreen.tsx
// ✅ Bigger rows + gallery photo picker

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
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import BottomTabBar from '../../components/navigation/BottomTabBar';

// ─── Menu Row ─────────────────────────────────────────────────────────────────
interface MenuRowProps {
  icon: any;
  label: string;
  onPress: () => void;
}

const MenuRow = ({ icon, label, onPress }: MenuRowProps) => (
  <TouchableOpacity
    style={styles.menuRow}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Image source={icon} style={styles.menuIcon} resizeMode="contain" />
    <Text style={styles.menuLabel}>{label}</Text>
    <Text style={styles.menuChevron}>›</Text>
  </TouchableOpacity>
);

// ─── Screen ───────────────────────────────────────────────────────────────────
const ProfileScreen = ({ navigation }: any) => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // ✅ Opens device gallery
  const handlePickPhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', 'Could not open gallery. Please try again.');
          return;
        }
        const uri = response.assets?.[0]?.uri;
        if (uri) setProfilePhoto(uri);
      },
    );
  };

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

  const handleComingSoon = (feature: string) => {
    Alert.alert('Coming Soon', `${feature} will be available soon!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* ✅ Avatar — tap to open gallery */}
        <View style={styles.avatarSection}>
          <TouchableOpacity
            onPress={handlePickPhoto}
            activeOpacity={0.85}
            style={styles.avatarWrap}
          >
            <Image
              source={
                profilePhoto
                  ? { uri: profilePhoto }
                  : require('../../../assets/images/profile picture.png')
              }
              style={styles.avatarImage}
              resizeMode="cover"
            />
            {/* Camera overlay hint */}
            <View style={styles.cameraOverlay}>
              <Text style={styles.cameraIcon}>📷</Text>
            </View>
            {/* Star badge */}
            <View style={styles.badge}>
              <Text style={styles.badgeEmoji}>⭐</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.tapHint}>Tap photo to change</Text>
        </View>

        {/* Connected Bean Robot card */}
        <TouchableOpacity
          style={styles.beanCard}
          onPress={() => navigation.navigate('RobotConnectivity')}
          activeOpacity={0.8}
        >
          <View style={styles.beanCardLeft}>
            <Image
              source={require('../../../assets/images/select-user.png')}
              style={styles.beanCardIcon}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.beanCardTitle}>Connected Bean Robot</Text>
              <View style={styles.beanStatusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.beanStatusText}>Not Connected</Text>
              </View>
            </View>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* General Settings */}
        <Text style={styles.sectionGreen}>General Settings</Text>
        <View style={styles.menuCard}>
          <MenuRow
            icon={require('../../../assets/images/account-info.png')}
            label="Account Info"
            onPress={() => handleComingSoon('Account Info')}
          />
          <View style={styles.menuDivider} />
          <MenuRow
            icon={require('../../../assets/images/notification-preferences.png')}
            label="Notification Preferences"
            onPress={() => handleComingSoon('Notification Preferences')}
          />
          <View style={styles.menuDivider} />
          <MenuRow
            icon={require('../../../assets/images/privacy-settings.png')}
            label="Privacy Settings"
            onPress={() => handleComingSoon('Privacy Settings')}
          />
        </View>

        {/* Support */}
        <Text style={styles.sectionGreen}>Support</Text>
        <View style={styles.menuCard}>
          <MenuRow
            icon={require('../../../assets/images/help-centre.png')}
            label="Help Center"
            onPress={() => handleComingSoon('Help Center')}
          />
        </View>

        {/* Log Out */}
        <TouchableOpacity
          style={styles.logOutBtn}
          onPress={handleLogOut}
          activeOpacity={0.85}
        >
          <Image
            source={require('../../../assets/images/logout.png')}
            style={styles.logoutIcon}
            resizeMode="contain"
          />
          <Text style={styles.logOutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>Bean App Version 2.4.1</Text>
        <Text style={styles.footerSub}>Carefully crafted</Text>
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Profile" />
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND_LIGHT },
  scroll: { paddingBottom: SPACING.MASSIVE },

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

  // ── Avatar ──
  avatarSection: {
    alignItems: 'center',
    paddingTop: SPACING.XXL,
    paddingBottom: SPACING.XL,
    backgroundColor: COLORS.WHITE,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: SPACING.MD,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  // Semi-transparent camera overlay at bottom of avatar
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
    borderColor: COLORS.WHITE,
  },
  badgeEmoji: { fontSize: 13 },
  userName: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  tapHint: {
    fontSize: 12,
    color: COLORS.TEXT_TERTIARY,
  },

  // ── Bean card ──
  beanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
    marginHorizontal: SPACING.XL,
    marginTop: SPACING.LG,
    marginBottom: SPACING.LG,
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  beanCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.MD,
  },
  beanCardIcon: { width: 44, height: 44 },
  beanCardTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 3,
  },
  beanStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ERROR,
  },
  beanStatusText: { fontSize: 13, color: COLORS.ERROR },
  chevron: { fontSize: 22, color: COLORS.TEXT_TERTIARY, lineHeight: 26 },

  // ── Section label ──
  sectionGreen: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#07882C',
    marginLeft: SPACING.XL,
    marginBottom: SPACING.SM,
  },

  // ── Menu card ──
  menuCard: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: SPACING.XL,
    marginBottom: SPACING.XL,
    borderRadius: BORDER_RADIUS.XL,
    overflow: 'hidden',
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  // ✅ Bigger rows — paddingVertical increased to 20
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: SPACING.LG,
    gap: SPACING.MD,
  },
  menuIcon: { width: 36, height: 36 },
  // ✅ Bigger text
  menuLabel: {
    flex: 1,
    fontSize: 17,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '500' as const,
  },
  menuChevron: { fontSize: 22, color: COLORS.TEXT_TERTIARY, lineHeight: 26 },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.BORDER_LIGHT,
    marginLeft: SPACING.LG + 26 + SPACING.MD,
  },

  // ✅ Bigger log out button
  logOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.SM,
    marginHorizontal: SPACING.XL,
    marginBottom: SPACING.LG,
    borderWidth: 1.5,
    borderColor: COLORS.ERROR,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: 20,
    backgroundColor: COLORS.WHITE,
  },
  logoutIcon: {
    width: 22,
    height: 22,
    tintColor: COLORS.ERROR,
  },
  logOutText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: COLORS.ERROR,
  },

  footer: { fontSize: 12, color: COLORS.TEXT_TERTIARY, textAlign: 'center' },
  footerSub: {
    fontSize: 11,
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default ProfileScreen;
