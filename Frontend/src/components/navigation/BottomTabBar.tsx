// src/components/navigation/BottomTabBar.tsx
// ✅ Dark theme aware

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SPACING } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

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

interface BottomTabBarProps {
  navigation: any;
  activeTab: 'Home' | 'Tasks' | 'Profile';
}

const BottomTabBar = ({ navigation, activeTab }: BottomTabBarProps) => {
  const { colors } = useTheme(); // ✅ theme hook

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.SURFACE, // ✅ white in light, dark navy in dark
          borderTopColor: colors.BORDER_LIGHT, // ✅ themed border
        },
      ]}
    >
      {TABS.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.route)}
            activeOpacity={0.7}
          >
            <Image
              source={tab.iconSource}
              style={[
                styles.icon,
                {
                  tintColor: isActive
                    ? colors.PRIMARY // ✅ green when active
                    : colors.TEXT_TERTIARY, // ✅ themed inactive color
                  opacity: isActive ? 1 : 0.55,
                },
              ]}
              resizeMode="contain"
            />

            <Text
              style={[
                styles.label,
                {
                  color: isActive
                    ? colors.PRIMARY // ✅ green when active
                    : colors.TEXT_TERTIARY, // ✅ themed inactive color
                  fontWeight: isActive ? '700' : '500',
                },
              ]}
            >
              {tab.label}
            </Text>

            {isActive && (
              <View
                style={[
                  styles.activeDot,
                  { backgroundColor: colors.PRIMARY }, // ✅ themed dot
                ]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: SPACING.SM,
    paddingBottom: SPACING.LG,
    paddingHorizontal: SPACING.XL,
    shadowColor: '#000000',
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
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: 10,
  },
  activeDot: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});

export default BottomTabBar;
