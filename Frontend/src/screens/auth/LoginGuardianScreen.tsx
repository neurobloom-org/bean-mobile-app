// src/screens/auth/LoginGuardianScreen.tsx
// ✅ Same structure/style as LoginUserScreen

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BackButton, PrimaryButton, Input } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

const LoginGuardianScreen = ({ navigation }: any) => {
  const [emailGuardian, setEmailGuardian] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Goes directly to dashboard, skipping ward linking flow
  const handleSignIn = () => {
    navigation.navigate('CaregiverApp', { screen: 'CaregiverDashboard' });
  };

  // ✅ Same as sign in — direct to dashboard
  const handleSocialLogin = () => {
    navigation.navigate('CaregiverApp', { screen: 'CaregiverDashboard' });
  };

  const handleSignUp = () => {
    navigation.navigate('CreateAccount', { userType: 'guardian' });
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword', { userType: 'guardian' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <BackButton />

          {/* ✅ Same robot image as LoginUserScreen */}
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../assets/images/login-page.png')}
              style={styles.robotIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>
            Sign in to continue as a{' '}
            <Text style={styles.boldText}>Guardian</Text>
          </Text>

          {/* Email (Guardian) */}
          <Input
            placeholder="Email (Guardian)"
            value={emailGuardian}
            onChangeText={setEmailGuardian}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password */}
          <Input
            placeholder="Password (Guardian)"
            value={password}
            onChangeText={setPassword}
            isPassword
            showPasswordToggle
          />

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          {/* ✅ Same social order: fb · apple · google */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleSocialLogin}
            >
              <Image
                source={require('../../../assets/images/fb.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleSocialLogin}
            >
              <Image
                source={require('../../../assets/images/apple.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleSocialLogin}
            >
              <Image
                source={require('../../../assets/images/google.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <PrimaryButton
            title="Sign In"
            onPress={handleSignIn}
            variant="primary"
            size="large"
            fullWidth
          />

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.WHITE },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.XXL,
  },
  iconContainer: { alignItems: 'center', marginBottom: SPACING.XL },
  robotIcon: { width: 100, height: 100 },
  title: {
    ...TYPOGRAPHY.H1,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.MD,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY_LARGE,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.XXL,
  },
  boldText: { fontWeight: 'bold', color: '#07882C' },
  forgotPassword: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.PRIMARY,
    marginBottom: SPACING.XL,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.XL,
    marginBottom: SPACING.XXL,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.GRAY_50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.BORDER,
  },
  socialIcon: { width: 30, height: 30 },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.LG,
  },
  signUpText: { ...TYPOGRAPHY.BODY, color: COLORS.TEXT_SECONDARY },
  signUpLink: { ...TYPOGRAPHY.BODY, color: COLORS.LINK, fontWeight: '600' },
});

export default LoginGuardianScreen;
