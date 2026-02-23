// src/screens/auth/CreateAccountScreen.tsx
// ✅ UPDATED VERSION - Matches new design

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
  Alert,
} from 'react-native';
import { BackButton, PrimaryButton, Input } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

const CreateAccountScreen = ({ navigation, route }: any) => {
  const { userType } = route.params || { userType: 'user' };

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Navigate based on user type
    if (userType === 'user') {
      console.log('User account created - navigating to HomeScreen');
      navigation.navigate('Home');
    } else {
      console.log(
        'Guardian account created - navigating to CaregiverDashboard',
      );
      navigation.navigate('CaregiverDashboard');
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login`);
    Alert.alert(
      'Coming Soon',
      `${provider} authentication will be available soon!`,
    );
  };

  const handleSignIn = () => {
    if (userType === 'user') {
      navigation.navigate('LoginUser');
    } else {
      navigation.navigate('LoginGuardian');
    }
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

          {/* Title */}
          <Text style={styles.screenTitle}>Create Account</Text>

          {/* Sign Up Type Title */}
          <Text style={styles.title}>
            {userType === 'guardian' ? 'Guardian Sign Up' : 'User Sign Up'}
          </Text>

          {/* Robot Icon */}
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../assets/images/select-user.png')}
              style={styles.robotIcon}
              resizeMode="contain"
            />
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            {userType === 'guardian'
              ? 'Create an account to support your loved one'
              : 'Sign up to start your journey with Bean, your mental health companion.'}
          </Text>

          {/* Full Name Input */}
          <Text style={styles.label}>FULL NAME</Text>
          <Input
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          {/* Email Input */}
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <Input
            placeholder="bean@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Input */}
          <Text style={styles.label}>PASSWORD</Text>
          <Input
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            isPassword
            showPasswordToggle
            autoCapitalize="none"
          />

          {/* Confirm Password Input */}
          <Text style={styles.label}>CONFIRM PASSWORD</Text>
          <Input
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            isPassword
            showPasswordToggle
            autoCapitalize="none"
          />

          {/* Sign Up Button */}
          <PrimaryButton
            title="Sign Up"
            onPress={handleCreateAccount}
            variant="primary"
            size="large"
            fullWidth
          />

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          </View>

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

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInLink}>Sign In</Text>
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
    paddingTop: SPACING.MD,
    paddingBottom: SPACING.XXL,
  },
  screenTitle: {
    ...TYPOGRAPHY.H3,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.LG,
    fontWeight: '600',
  },
  title: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.LG,
    fontWeight: 'bold',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  robotIcon: {
    width: 80,
    height: 80,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.XXL,
    lineHeight: 20,
    paddingHorizontal: SPACING.LG,
  },
  label: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    marginBottom: SPACING.XS,
    marginTop: SPACING.SM,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  dividerContainer: {
    alignItems: 'center',
    marginVertical: SPACING.XL,
  },
  dividerText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    letterSpacing: 1,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.XL,
    marginBottom: SPACING.XL,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.BORDER,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialIcon: {
    width: 28,
    height: 28,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.MD,
  },
  signInText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
  },
  signInLink: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.LINK,
    fontWeight: '600',
  },
});

export default CreateAccountScreen;
