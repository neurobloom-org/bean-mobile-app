// src/screens/auth/BeanConnectedScreen.tsx
// ✅ Bean Connected Success Screen - Real icon images

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { PrimaryButton } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

const BeanConnectedScreen = ({ navigation }: any) => {
  const handleNext = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.middleCircle}>
              <View style={styles.innerCircle}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Bean Connected!</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Your robot is now synced and ready to go.
        </Text>

        {/* Status Cards */}
        <View style={styles.statusContainer}>
          {/* Connection Status Card */}
          <View style={styles.statusCard}>
            <View style={styles.statusIconContainer}>
              {/* ✅ Real image instead of 📶 emoji */}
              <Image
                source={require('../../../assets/images/connection-status.png')}
                style={styles.statusIconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.statusLabel}>Connection Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Secured</Text>
            </View>
          </View>

          {/* Battery Level Card */}
          <View style={styles.statusCard}>
            <View style={styles.statusIconContainer}>
              {/* ✅ Real image instead of 🔋 emoji */}
              <Image
                source={require('../../../assets/images/battery-level.png')}
                style={styles.statusIconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.statusLabel}>Battery Level</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>0%</Text>
            </View>
          </View>
        </View>

        {/* Next Button */}
        <PrimaryButton
          title="Next"
          onPress={handleNext}
          variant="primary"
          size="large"
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.HUGE,
    paddingBottom: SPACING.XXL,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: SPACING.XXL,
  },
  outerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E0F7F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#7FE4C4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 40,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  title: {
    ...TYPOGRAPHY.H1,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.SM,
    fontWeight: 'bold',
  },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.HUGE,
    lineHeight: 20,
    paddingHorizontal: SPACING.LG,
  },
  statusContainer: {
    width: '100%',
    gap: SPACING.MD,
    marginBottom: SPACING.XXL,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY_LIGHT,
    borderRadius: SPACING.LG,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
  },
  statusIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
    overflow: 'hidden',
  },
  // ✅ New style for real images
  statusIconImage: {
    width: 28,
    height: 28,
  },
  statusLabel: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XS,
    borderRadius: SPACING.MD,
  },
  statusBadgeText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.WHITE,
    fontWeight: '600',
  },
});

export default BeanConnectedScreen;
