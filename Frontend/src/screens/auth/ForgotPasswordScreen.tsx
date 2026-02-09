// src/screens/auth/ForgotPasswordScreen.tsx
// ✅ REFACTORED VERSION

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { BackButton, PrimaryButton, Input } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

const ForgotPasswordScreen = ({ navigation, route }: any) => {
  const { userType } = route.params || { userType: 'user' };
  const [email, setEmail] = useState('');

  const handleSetResetLink = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    navigation.navigate('VerifyCode', {
      email: email,
      userType: userType,
    });
  };

  const handleBackToSignIn = () => {
    if (userType === 'user') {
      navigation.navigate('LoginUser');
    } else {
      navigation.navigate('LoginGuardian');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <BackButton />

        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>✉️</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Reset Password!</Text>
        <Text style={styles.subtitle}>We'll send you a reset link</Text>

        {/* Email Input */}
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Set Reset Link Button */}
        <PrimaryButton
          title="Set Reset Link"
          onPress={handleSetResetLink}
          variant="primary"
          size="large"
          fullWidth
        />

        {/* Back to Sign In Button */}
        <PrimaryButton
          title="Back to Sign In"
          onPress={handleBackToSignIn}
          variant="outline"
          size="medium"
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
    paddingTop: SPACING.MASSIVE,
    paddingBottom: SPACING.XXL,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.XXL,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.SECONDARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 36,
  },
  title: {
    ...TYPOGRAPHY.H1,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY_LARGE,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.XXL,
  },
});

export default ForgotPasswordScreen;
