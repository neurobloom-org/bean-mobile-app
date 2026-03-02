// src/screens/auth/LoginGuardianScreen.tsx
// ✅ REFACTORED VERSION

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BackButton, PrimaryButton, Input } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginGuardianScreen = ({ navigation }: any) => {
  const [emailWard, setEmailWard] = useState('');
  const [emailGuardian, setEmailGuardian] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Sign in as Guardian - navigating to CaregiverDashboard');
    navigation.navigate('CaregiverDashboard');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  const handleAddWard = () => {
    console.log('Add ward');
  };

  const handleSignUp = () => {
    navigation.navigate('CreateAccount', { userType: 'guardian' });
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
          {/* Back Button */}
          <BackButton />

          {/* Robot Icon */}
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../assets/images/robot-first-page.png')}
              style={styles.robotIcon}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>
            Sign in to continue as a{' '}
            <Text style={styles.boldText}>Guardian</Text>
          </Text>

          {/* Email (Ward) Input with Add Button */}
          <View style={styles.inputWithButtonContainer}>
            <View style={{ flex: 1 }}>
              <Input
                placeholder="Email (Ward)"
                value={emailWard}
                onChangeText={setEmailWard}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity onPress={handleAddWard} style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Email (Guardian) Input */}
          <Input
            placeholder="Email (Guardian)"
            value={emailGuardian}
            onChangeText={setEmailGuardian}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Input */}
          <Input
            placeholder="Password (Guardian)"
            value={password}
            onChangeText={setPassword}
            isPassword
            showPasswordToggle
          />

          {/* Forgot Password */}
          <TouchableOpacity onPress={() => console.log('Forgot password')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Google')}
            >
              <Image
                source={require('../../../assets/images/google.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Facebook')}
            >
              <Image
                source={require('../../../assets/images/fb.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Apple')}
            >
              <Image
                source={require('../../../assets/images/apple.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <PrimaryButton
            title="Sign In"
            onPress={handleSignIn}
            variant="primary"
            size="large"
            fullWidth
          />

          {/* Sign Up Link */}
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
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.XXL,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  robotIcon: {
    width: 100,
    height: 100,
  },
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
  boldText: {
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  inputWithButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.SM,
    marginBottom: SPACING.LG,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  addButtonText: {
    fontSize: 28,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
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
  socialIcon: {
    width: 30,
    height: 30,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.LG,
  },
  signUpText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
  },
  signUpLink: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.LINK,
    fontWeight: '600',
  },
});

export default LoginGuardianScreen;
