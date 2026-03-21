// src/screens/auth/CreateAccountScreen.tsx
// ✅ UPDATED - Green title highlight + correct social icon order

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

    if (userType === 'user') {
      navigation.navigate('ConnectBean');
    } else {
      navigation.navigate('CaregiverApp');
    }
  };

  const handleSocialLogin = (provider: string) => {
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

          {/* ✅ Title — green highlight on user type word */}
          <Text style={styles.title}>
            {userType === 'guardian' ? (
              <>
                <Text style={styles.titleHighlight}>Guardian/Therapist </Text>
                <Text style={styles.titleNormal}>Sign Up</Text>
              </>
            ) : (
              <>
                <Text style={styles.titleHighlight}>User </Text>
                <Text style={styles.titleNormal}>Sign Up</Text>
              </>
            )}
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

          {/* Full Name */}
          <Text style={styles.label}>FULL NAME</Text>
          <Input
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          {/* Email */}
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <Input
            placeholder="bean@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password */}
          <Text style={styles.label}>PASSWORD</Text>
          <Input
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            isPassword
            showPasswordToggle
            autoCapitalize="none"
          />

          {/* Confirm Password */}
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

          {/* ✅ Social Login — Facebook · Apple · Google (matches Figma order) */}
          <View style={styles.socialContainer}>
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
    paddingTop: SPACING.XS,
    paddingBottom: SPACING.XL,
  },

  // ✅ Title — split into green + black parts
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.MD,
  },
  titleHighlight: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#07882C', // '#4ECCA3' Bean green ✅
  },
  titleNormal: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY, // '#000000'
  },

  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  robotIcon: {
    width: 60,
    height: 60,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.LG,
    lineHeight: 18,
    paddingHorizontal: SPACING.MD,
  },
  label: {
    fontSize: 11,
    color: COLORS.TEXT_TERTIARY,
    marginBottom: 6,
    marginTop: 6,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  dividerContainer: {
    alignItems: 'center',
    marginVertical: SPACING.MD,
  },
  dividerText: {
    fontSize: 11,
    color: COLORS.TEXT_TERTIARY,
    letterSpacing: 1,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.LG,
    marginBottom: SPACING.MD,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.BORDER,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.XS,
    marginBottom: SPACING.SM,
  },
  signInText: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
  },
  signInLink: {
    fontSize: 13,
    color: COLORS.LINK, // '#4169E1' blue
    fontWeight: '600',
  },
});

export default CreateAccountScreen;
