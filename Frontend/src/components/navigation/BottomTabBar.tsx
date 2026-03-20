// src/components/navigation/BottomTabBar.tsx
// ✅ Bottom navigation bar — Home · Tasks · Profile

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

// ─── Tab Data ─────────────────────────────────────────────────────────────────
const TABS = [
  {
    id: 'Home',
    label: 'Home',
    iconSource: require('../../../assets/images/home.png'),
    route: 'Home',
  },
  {
    id: 'Tasks',
    label: 'Tasks',
    iconSource: require('../../../assets/images/tasks.png'),
    route: 'Tasks',
  },
  {
    id: 'Profile',
    label: 'Profile',
    iconSource: require('../../../assets/images/profile.png'),
    route: 'Profile',
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface BottomTabBarProps {
  navigation: any;
  activeTab: 'Home' | 'Tasks' | 'Profile';
}

// ─── Component ────────────────────────────────────────────────────────────────
const BottomTabBar = ({ navigation, activeTab }: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.route)}
            activeOpacity={0.7}
          >
            {/* Icon */}
            <Image
              source={tab.iconSource}
              style={[
                styles.icon,
                isActive ? styles.iconActive : styles.iconInactive,
              ]}
              resizeMode="contain"
            />

            {/* Label */}
            <Text
              style={[
                styles.label,
                isActive ? styles.labelActive : styles.labelInactive,
              ]}
            >
              {tab.label}
            </Text>

            {/* Active indicator dot */}
            {isActive && <View style={styles.activeDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_LIGHT, // '#F0F0F0'
    paddingTop: SPACING.SM, // 8
    paddingBottom: SPACING.LG, // 16 — extra for home bar on newer phones
    paddingHorizontal: SPACING.XL, // 20
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.XXS, // 2
    position: 'relative',
  },

  // Icon
  icon: {
    width: 24,
    height: 24,
  },
  iconActive: {
    tintColor: COLORS.PRIMARY, // '#4ECCA3' Bean green ✅
  },
  iconInactive: {
    tintColor: COLORS.GRAY_400, // '#999999' muted
    opacity: 0.6,
  },

  // Label
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
  labelActive: {
    color: COLORS.PRIMARY, // '#4ECCA3'
    fontWeight: '700',
  },
  labelInactive: {
    color: COLORS.TEXT_TERTIARY, // '#999999'
  },

  // Small dot under active tab
  activeDot: {
    position: 'absolute',
    bottom: -SPACING.SM, // sits below label
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.PRIMARY,
  },
});

export default BottomTabBar;
