// src/components/common/DropdownMenu.tsx
// ✅ Full right-side panel · Blurred backdrop · Real asset icons · Touches right edge

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

const { width, height } = Dimensions.get('window');
const PANEL_WIDTH = width * 0.72; // 72% of screen width — nice and big ✅

// ─── Menu Items ──────────────────────────────────────────────────────────────
// Only using images that EXIST in your assets folder
// account-info ✅ | login-page ✅ | display-and-brightness ✅ | help ✅
// notification ❌ → emoji | privacy ❌ → emoji

interface MenuItem {
  id: string;
  label: string;
  type: 'image' | 'emoji';
  iconSource?: any;
  emoji?: string;
  route: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'account',
    label: 'Account Info',
    type: 'image',
    iconSource: require('../../../assets/images/account-info.png'), // ✅
    route: 'AccountInfo',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    type: 'image',
    iconSource: require('../../../assets/images/notifications.png'), // ✅ now exists!
    route: 'Notifications',
  },
  {
    id: 'privacy',
    label: 'Privacy',
    type: 'image',
    iconSource: require('../../../assets/images/privacy.png'), // ✅ now exists!
    route: 'Privacy',
  },
  {
    id: 'help',
    label: 'Help',
    type: 'image',
    iconSource: require('../../../assets/images/help.png'), // ✅
    route: 'Help',
  },
  {
    id: 'bean',
    label: 'Bean',
    type: 'image',
    iconSource: require('../../../assets/images/login-page.png'), // ✅
    route: 'Bean',
  },
  {
    id: 'display',
    label: 'Display & Brightness',
    type: 'image',
    iconSource: require('../../../assets/images/display-and-brightness.png'), // ✅
    route: 'Display',
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface DropdownMenuProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
  appVersion?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
const DropdownMenu = ({
  visible,
  onClose,
  navigation,
  appVersion = '2.4.8',
}: DropdownMenuProps) => {
  const handleMenuPress = (route: string) => {
    onClose();
    try {
      navigation.navigate(route);
    } catch {
      Alert.alert('Coming Soon', 'This feature will be available soon!');
    }
  };

  const handleLogOut = () => {
    onClose();
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
    <Modal
      visible={visible}
      transparent
      animationType="slide" // slides in from right ✅
      onRequestClose={onClose}
    >
      {/* ── Blurred / dimmed backdrop — tap to close ── */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* ── Right-side panel — full height, touches right edge ── */}
      <View style={styles.panel}>
        {/* Close button — top right */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>

        {/* Menu items */}
        <View style={styles.menuList}>
          {MENU_ITEMS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.route)}
              activeOpacity={0.65}
            >
              {/* Icon — image or emoji */}
              <View style={styles.iconBox}>
                {item.type === 'image' ? (
                  <Image
                    source={item.iconSource}
                    style={styles.menuIconImage}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={styles.menuIconEmoji}>{item.emoji}</Text>
                )}
              </View>

              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Spacer pushes logout to bottom */}
        <View style={{ flex: 1 }} />

        {/* Divider */}
        <View style={styles.divider} />

        {/* Log Out button */}
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={handleLogOut}
          activeOpacity={0.85}
        >
          <Text style={styles.logOutText}>→ Log Out</Text>
        </TouchableOpacity>

        {/* App version */}
        <Text style={styles.versionText}>App Version {appVersion}</Text>
      </View>
    </Modal>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Semi-transparent blurred backdrop
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // dark blur effect ✅
  },

  // Right-side sliding panel — full height, touches right edge
  panel: {
    position: 'absolute',
    top: 0, // starts from very top ✅
    right: 0, // touches right edge ✅
    bottom: 0, // full height ✅
    width: PANEL_WIDTH, // 72% of screen
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: BORDER_RADIUS.XXL, // 20 — rounded only on left side
    borderBottomLeftRadius: BORDER_RADIUS.XXL,
    paddingTop: 56, // below status bar
    paddingHorizontal: SPACING.XL, // 20
    paddingBottom: SPACING.XXXL, // 30
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 20,
  },

  // Close ✕ button — top right of panel
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.GRAY_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },

  // Menu list
  menuList: {
    gap: SPACING.XS, // 4 between items
  },

  // Each row
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.MD, // 12 — tall rows like Figma ✅
    gap: SPACING.LG, // 16
    borderRadius: BORDER_RADIUS.LG, // 12
  },

  // Icon container — bigger with soft green tint background ✅
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.SECONDARY_LIGHT, // '#E0F7F1' soft green pill
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconImage: {
    width: 26,
    height: 26,
  },
  menuIconEmoji: {
    fontSize: 22,
  },

  // Menu label
  menuLabel: {
    fontSize: 16, // larger text ✅
    fontWeight: '500',
    color: COLORS.TEXT_PRIMARY,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: COLORS.BORDER_LIGHT,
    marginVertical: SPACING.LG,
  },

  // Log Out — red pill
  logOutButton: {
    backgroundColor: '#FF4D6D',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.MD, // 12
    paddingHorizontal: SPACING.XL, // 20
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  logOutText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.WHITE,
    letterSpacing: 0.3,
  },

  // Version
  versionText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
  },
});

export default DropdownMenu;
