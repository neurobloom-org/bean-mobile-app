// src/components/common/DropdownMenu.tsx
// ✅ Updated icons + tintColor white in dark mode, black in light mode
// ✅ Routes correct + 320ms delay fix

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
} from 'react-native';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');
const PANEL_WIDTH = width * 0.72;
const MODAL_CLOSE_DELAY = 320;

interface MenuItem {
  id: string;
  label: string;
  iconSource: any;
  route: string;
  // whether to apply tintColor (false for display icon which may be colored)
  tintable: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'account',
    label: 'Account Info',
    iconSource: require('../../../assets/images/person.png'), // ✅ new
    route: 'AccountInfo',
    tintable: true,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    iconSource: require('../../../assets/images/notifications.png'), // ✅ new
    route: 'NotificationPreferences',
    tintable: true,
  },
  {
    id: 'privacy',
    label: 'Privacy',
    iconSource: require('../../../assets/images/Frame 2121452668.png'), // ✅ new lock icon
    route: 'PrivacySettings',
    tintable: true,
  },
  {
    id: 'help',
    label: 'Help',
    iconSource: require('../../../assets/images/help_center.png'), // ✅ new
    route: 'HelpCenter',
    tintable: true,
  },
  {
    id: 'display',
    label: 'Display & Brightness',
    iconSource: require('../../../assets/images/emergency-contact-top-icon.png'), // unchanged
    route: 'Display',
    tintable: true, // also tinted so it stays consistent in dark mode
  },
  {
    id: 'robotConnectivity',
    label: 'Robot Connectivity',
    iconSource: require('../../../assets/images/login-page.png'), // unchanged
    route: 'RobotConnectivity',
    tintable: true,
  },
];

interface DropdownMenuProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
  appVersion?: string;
}

const DropdownMenu = ({
  visible,
  onClose,
  navigation,
  appVersion = '2.4.8',
}: DropdownMenuProps) => {
  const { colors, isDark } = useTheme();

  // ✅ Resolved hex strings from colors.ts:
  //    LIGHT: TEXT_PRIMARY = '#000000'
  //    DARK:  TEXT_PRIMARY = '#F1F5F9'
  // Pre-resolved so Android tinting never silently fails.
  const iconTint = isDark ? '#F1F5F9' : '#000000';

  const handleMenuPress = (route: string) => {
    onClose();
    setTimeout(() => {
      try {
        navigation.navigate(route);
      } catch {
        Alert.alert('Coming Soon', 'This feature will be available soon!');
      }
    }, MODAL_CLOSE_DELAY);
  };

  const handleLogOut = () => {
    onClose();
    setTimeout(() => {
      Alert.alert('Log Out', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => navigation.navigate('Welcome'),
        },
      ]);
    }, MODAL_CLOSE_DELAY);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Dimmed backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Side panel */}
      <View style={[styles.panel, { backgroundColor: colors.SURFACE }]}>
        {/* Close button */}
        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: colors.GRAY_100 }]}
          onPress={onClose}
        >
          <Text style={[styles.closeIcon, { color: colors.TEXT_PRIMARY }]}>
            ✕
          </Text>
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
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: colors.SECONDARY_LIGHT },
                ]}
              >
                {/*
                 * ✅ tintColor = iconTint (resolved hex string).
                 * Light mode → '#000000' (black icons)
                 * Dark mode  → '#F1F5F9' (white icons)
                 * Using pre-resolved hex instead of colors.TEXT_PRIMARY token
                 * to guarantee Android renders the tint correctly.
                 */}
                <Image
                  source={item.iconSource}
                  style={[
                    styles.menuIconImage,
                    item.tintable && { tintColor: iconTint },
                  ]}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.menuLabel, { color: colors.TEXT_PRIMARY }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flex: 1 }} />

        <View
          style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
        />

        {/* Log Out */}
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={handleLogOut}
          activeOpacity={0.85}
        >
          <Text style={styles.logOutText}>→ Log Out</Text>
        </TouchableOpacity>

        <Text style={[styles.versionText, { color: colors.TEXT_TERTIARY }]}>
          App Version {appVersion}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  panel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: PANEL_WIDTH,
    borderTopLeftRadius: BORDER_RADIUS.XXL,
    borderBottomLeftRadius: BORDER_RADIUS.XXL,
    paddingTop: 56,
    paddingHorizontal: SPACING.XL,
    paddingBottom: SPACING.XXXL,
    shadowColor: '#000000',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 14,
    fontWeight: '600',
  },
  menuList: {
    gap: SPACING.XS,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.MD,
    gap: SPACING.LG,
    borderRadius: BORDER_RADIUS.LG,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconImage: {
    width: 26,
    height: 26,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: SPACING.LG,
  },
  logOutButton: {
    backgroundColor: '#FF4D6D',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.XL,
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  logOutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  versionText: {
    ...TYPOGRAPHY.CAPTION,
    textAlign: 'center',
  },
});

export default DropdownMenu;
