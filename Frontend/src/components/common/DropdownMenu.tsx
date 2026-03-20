// src/components/common/DropdownMenu.tsx
// ✅ Reusable hamburger dropdown — sits under components/common/ like BackButton

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
const MENU_ITEMS = [
  {
    id: 'account',
    label: 'Account Info',
    iconSource: require('../../../assets/images/account-info.png'),
    route: 'AccountInfo',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    iconSource: require('../../../assets/images/notification.png'),
    route: 'Notifications',
  },
  {
    id: 'privacy',
    label: 'Privacy',
    iconSource: require('../../../assets/images/privacy.png'),
    route: 'Privacy',
  },
  {
    id: 'help',
    label: 'Help',
    iconSource: require('../../../assets/images/help.png'),
    route: 'Help',
  },
  {
    id: 'bean',
    label: 'Bean',
    iconSource: require('../../../assets/images/login-page.png'),
    route: 'Bean',
  },
  {
    id: 'display',
    label: 'Display & Brightness',
    iconSource: require('../../../assets/images/display-and-brightness.png'),
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
            <Image
              source={item.iconSource}
              style={styles.menuIcon}
              resizeMode="contain"
            />
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
    right: SPACING.LG, // 16
    width: 210,
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.XL, // 16
    paddingVertical: SPACING.MD, // 12
    paddingHorizontal: SPACING.LG, // 16
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
    paddingVertical: SPACING.SM, // 8
    gap: SPACING.MD, // 12
  },
  menuIcon: {
    width: 22,
    height: 22,
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
    borderRadius: BORDER_RADIUS.ROUND, // 30
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
