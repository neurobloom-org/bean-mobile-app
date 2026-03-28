// Slide-in settings panel rendered as a right-side modal overlay.
// Navigation calls are delayed by MODAL_CLOSE_DELAY to allow the slide-out
// animation to complete before the new screen mounts.

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

// Panel occupies 72% of screen width so the backdrop remains visible
const PANEL_WIDTH = width * 0.72;

// Delay in ms to let the modal slide-out animation finish before navigating.
// Without this, navigation.navigate() is silently dropped while the modal unmounts.
const MODAL_CLOSE_DELAY = 320;

interface MenuItem {
  id: string;
  label: string;
  iconSource: any;
  route: string;
  // When true, the icon tint is inverted per the active colour theme.
  tintable: boolean;
}

// Static menu item definitions. Route names must match UserNavigator screen names exactly.
const MENU_ITEMS: MenuItem[] = [
  {
    id: 'account',
    label: 'Account Info',
    iconSource: require('../../../assets/images/person.png'),
    route: 'AccountInfo',
    tintable: true,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    iconSource: require('../../../assets/images/notifications.png'),
    route: 'NotificationPreferences',
    tintable: true,
  },
  {
    id: 'privacy',
    label: 'Privacy',
    iconSource: require('../../../assets/images/Frame 2121452668.png'),
    route: 'PrivacySettings',
    tintable: true,
  },
  {
    id: 'help',
    label: 'Help',
    iconSource: require('../../../assets/images/help_center.png'),
    route: 'HelpCenter',
    tintable: true,
  },
  {
    id: 'display',
    label: 'Display & Brightness',
    iconSource: require('../../../assets/images/emergency-contact-top-icon.png'),
    route: 'Display',
    tintable: true,
  },
  {
    // Navigates directly to the Bluetooth connection flow,
    // bypassing the intermediate RobotConnectivity screen.
    id: 'connectBean',
    label: 'Connect Your Bean',
    iconSource: require('../../../assets/images/login-page.png'),
    route: 'BluetoothConnectivity',
    tintable: true,
  },
];

interface DropdownMenuProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
  // Displayed at the bottom of the panel. Defaults to '2.4.8'.
  appVersion?: string;
}

const DropdownMenu = ({
  visible,
  onClose,
  navigation,
  appVersion = '2.4.8',
}: DropdownMenuProps) => {
  const { colors, isDark } = useTheme();

  // Pre-resolved hex strings are used instead of theme token references
  // because Android's native image tinting requires a concrete colour value.
  const iconTint = isDark ? '#F1F5F9' : '#000000';

  // Close the modal first, then navigate after the animation completes.
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

  // Confirm before clearing the session and returning to the Welcome screen.
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
      {/* Tappable backdrop dismisses the panel */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={[styles.panel, { backgroundColor: colors.SURFACE }]}>
        {/* Dismiss button in the top-right corner of the panel */}
        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: colors.GRAY_100 }]}
          onPress={onClose}
        >
          <Text style={[styles.closeIcon, { color: colors.TEXT_PRIMARY }]}>
            ✕
          </Text>
        </TouchableOpacity>

        {/* Rendered menu items */}
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

        {/* Spacer pushes the log-out section to the bottom of the panel */}
        <View style={{ flex: 1 }} />

        <View
          style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
        />

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
  // Full-screen transparent layer that captures taps outside the panel
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  // Right-anchored panel with rounded left corners
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
  closeIcon: { fontSize: 14, fontWeight: '600' },
  menuList: { gap: SPACING.XS },
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
  menuIconImage: { width: 26, height: 26 },
  menuLabel: { fontSize: 16, fontWeight: '500' },
  divider: { height: 1, marginVertical: SPACING.LG },
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
  versionText: { ...TYPOGRAPHY.CAPTION, textAlign: 'center' },
});

export default DropdownMenu;
