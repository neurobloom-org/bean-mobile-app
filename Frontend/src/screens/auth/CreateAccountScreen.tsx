// src/screens/auth/CreateAccountScreen.tsx
// ✅ REFACTORED VERSION

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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    if (userType === 'user') {
      console.log('User account created - navigating to HomeScreen');
      navigation.navigate('Home');
      return;
    }

    // Validation for guardians
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length < 9) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    console.log('Guardian account created - navigating to CaregiverDashboard');
    navigation.navigate('CaregiverDashboard');
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
          <Text style={styles.title}>Create Account!</Text>
          <Text style={styles.subtitle}>
            Join Bean today as{' '}
            {userType === 'guardian' ? 'a Guardian' : 'a User'}!
          </Text>

          {/* Full Name Input */}
          <Input
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          {/* Email Input */}
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Phone Number Input */}
          <View style={styles.phoneInputContainer}>
            <Text style={styles.phoneIcon}>📱</Text>
            <Input
              placeholder="Phone Number (+94......)"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          {/* Password Input */}
          <Input
            placeholder={`Password (${
              userType === 'guardian' ? 'Guardian / Therapist' : 'User'
            })`}
            value={password}
            onChangeText={setPassword}
            isPassword
            showPasswordToggle
            autoCapitalize="none"
          />

          {/* Create Account Button */}
          <PrimaryButton
            title="Create Account"
            onPress={handleCreateAccount}
            variant="primary"
            size="large"
            fullWidth
          />

          {/* Already have account link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.divider} />
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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  phoneIcon: {
    fontSize: 20,
    marginRight: SPACING.SM,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.LG,
    marginBottom: SPACING.XL,
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.BORDER,
  },
  dividerText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    marginHorizontal: SPACING.LG,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.XL,
    marginBottom: SPACING.XL,
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
});

export default CreateAccountScreen;
