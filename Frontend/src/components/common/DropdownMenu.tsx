// src/components/common/DropdownMenu.tsx
// ✅ Full right-side panel · Dark theme aware · Real asset icons

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
    iconSource: require('../../../assets/images/account-info.png'),
    route: 'AccountInfo',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    type: 'image',
    iconSource: require('../../../assets/images/notification-preferences.png'),
    route: 'Notifications',
  },
  {
    id: 'privacy',
    label: 'Privacy',
    type: 'image',
    iconSource: require('../../../assets/images/privacy-settings.png'),
    route: 'Privacy',
  },
  {
    id: 'help',
    label: 'Help',
    type: 'image',
    iconSource: require('../../../assets/images/help-centre.png'),
    route: 'Help',
  },
  {
    id: 'bean',
    label: 'Bean',
    type: 'image',
    iconSource: require('../../../assets/images/login-page.png'),
    route: 'Bean',
  },
  {
    id: 'display',
    label: 'Display & Brightness',
    type: 'image',
    iconSource: require('../../../assets/images/display-and-brightness.png'),
    route: 'Display',
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
  // ✅ Theme hook
  const { colors } = useTheme();

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
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Dimmed backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* ✅ Panel — background from theme */}
      <View style={[styles.panel, { backgroundColor: colors.SURFACE }]}>
        {/* ✅ Close button */}
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
              {/* ✅ Icon box — background from theme */}
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: colors.SECONDARY_LIGHT },
                ]}
              >
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

              {/* ✅ Label — color from theme */}
              <Text style={[styles.menuLabel, { color: colors.TEXT_PRIMARY }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flex: 1 }} />

        {/* ✅ Divider — color from theme */}
        <View
          style={[styles.divider, { backgroundColor: colors.BORDER_LIGHT }]}
        />

        {/* Log Out button — always red, no theme change needed */}
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={handleLogOut}
          activeOpacity={0.85}
        >
          <Text style={styles.logOutText}>→ Log Out</Text>
        </TouchableOpacity>

        {/* ✅ Version text — color from theme */}
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
  menuIconEmoji: {
    fontSize: 22,
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
