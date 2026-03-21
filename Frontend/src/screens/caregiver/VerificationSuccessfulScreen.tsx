// src/screens/caregiver/VerificationSuccessfulScreen.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { PrimaryButton } from '../../components';
import { COLORS, SPACING } from '../../constants';

const VerificationSuccessfulScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Glowing success icon */}
        <View style={styles.glowOuter}>
          <View style={styles.glowInner}>
            <Image
              source={require('../../../assets/images/verification-successful.png')}
              style={styles.successIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.title}>Verification{'\n'}Successful!</Text>

        <Text style={styles.body}>
          The patient profile for{' '}
          <Text style={styles.nameHighlight}>Alex Johnson</Text> is now linked
          and verified. You can now manage their appointments.
        </Text>

        <View style={styles.btnWrapper}>
          <PrimaryButton
            title="Go to Dashboard"
            onPress={() => navigation.navigate('CaregiverDashboard')}
            variant="primary"
            size="large"
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.XL,
    paddingBottom: SPACING.XL,
  },
  // Layered glow rings matching Figma
  glowOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(7, 136, 44, 0.07)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  glowInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(7, 136, 44, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.MD,
    lineHeight: 34,
  },
  body: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.MD,
    marginBottom: SPACING.MASSIVE,
  },
  nameHighlight: {
    fontWeight: '800',
    color: COLORS.TEXT_PRIMARY,
  },
  btnWrapper: {
    width: '100%',
  },
});

export default VerificationSuccessfulScreen;
