// src/components/navigation/BottomTabBar.tsx
// ✅ Smaller icons — no pixelation · Clean tab bar

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../constants';
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
            {/* ✅ Smaller icon — 20x20 prevents pixelation */}
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

            {/* Active dot indicator */}
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
    borderTopColor: COLORS.BORDER_LIGHT,
    paddingTop: SPACING.SM, // 8
    paddingBottom: SPACING.LG, // 16
    paddingHorizontal: SPACING.XL,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 8,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    position: 'relative',
  },

  // ✅ 20x20 — small enough to be crisp, not pixelated
  icon: {
    width: 20,
    height: 20,
  },
  iconActive: {
    tintColor: COLORS.PRIMARY, // '#4ECCA3' green
  },
  iconInactive: {
    tintColor: COLORS.GRAY_400, // '#999999'
    opacity: 0.55,
  },

  label: {
    fontSize: 10,
    fontWeight: '500',
  },
  labelActive: {
    color: COLORS.PRIMARY,
    fontWeight: '700',
  },
  labelInactive: {
    color: COLORS.TEXT_TERTIARY,
  },

  // Small dot below active tab label
  activeDot: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.PRIMARY,
  },
});

export default BottomTabBar;
