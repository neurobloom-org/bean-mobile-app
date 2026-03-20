// src/components/common/DropdownMenu.tsx
// ✅ Only requires images that EXIST in assets/images/

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
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

// ─── Menu Items ───────────────────────────────────────────────────────────────
// ✅ account-info.png     → EXISTS in your assets
// ✅ login-page.png       → EXISTS in your assets
// ✅ display-and-brightness.png → EXISTS in your assets
// ✅ help.png             → EXISTS in your assets
// ❌ notification.png     → DOES NOT EXIST → using emoji
// ❌ privacy.png          → DOES NOT EXIST → using emoji

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
    iconSource: require('../../../assets/images/account-info.png'), // ✅ exists
    route: 'AccountInfo',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    type: 'emoji',
    emoji: '🔔', // ❌ notification.png missing
    route: 'Notifications',
  },
  {
    id: 'privacy',
    label: 'Privacy',
    type: 'emoji',
    emoji: '🔒', // ❌ privacy.png missing
    route: 'Privacy',
  },
  {
    id: 'help',
    label: 'Help',
    type: 'image',
    iconSource: require('../../../assets/images/help.png'), // ✅ exists
    route: 'Help',
  },
  {
    id: 'bean',
    label: 'Bean',
    type: 'image',
    iconSource: require('../../../assets/images/login-page.png'), // ✅ exists
    route: 'Bean',
  },
  {
    id: 'display',
    label: 'Display & Brightness',
    type: 'image',
    iconSource: require('../../../assets/images/display-and-brightness.png'), // ✅ exists
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
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Tap outside to close */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Dropdown panel */}
      <View style={styles.dropdown}>
        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>

        {/* Menu items */}
        {MENU_ITEMS.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item.route)}
            activeOpacity={0.7}
          >
            {/* ✅ Render image OR emoji based on what exists */}
            {item.type === 'image' ? (
              <Image
                source={item.iconSource}
                style={styles.menuIconImage}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.menuIconEmoji}>{item.emoji}</Text>
            )}
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Log Out */}
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={handleLogOut}
          activeOpacity={0.8}
        >
          <Text style={styles.logOutText}>⇥ Log Out</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.versionText}>App Version {appVersion}</Text>
      </View>
    </Modal>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: SPACING.LG,
    width: 210,
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: SPACING.XS,
    marginBottom: SPACING.XS,
  },
  closeIcon: {
    fontSize: 16,
    color: COLORS.TEXT_TERTIARY,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.SM,
    gap: SPACING.MD,
  },
  menuIconImage: {
    width: 22,
    height: 22,
  },
  menuIconEmoji: {
    fontSize: 18,
    width: 22,
    textAlign: 'center',
  },
  menuLabel: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.BORDER_LIGHT,
    marginVertical: SPACING.SM,
  },
  logOutButton: {
    backgroundColor: '#FF4D6D',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.LG,
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  logOutText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  versionText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
    marginTop: SPACING.XS,
  },
});

export default DropdownMenu;
