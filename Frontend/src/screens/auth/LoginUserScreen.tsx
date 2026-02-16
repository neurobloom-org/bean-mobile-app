// src/screens/auth/LoginUserScreen.tsx

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
  Alert,
} from 'react-native';
import { supabase } from '../../lib/supabase'; //Supabase import
import { BackButton, PrimaryButton, Input } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginUserScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    // 1. Basic Validation
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      // 2. Authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
        setLoading(false);
        return;
      }

      // 3. Security Check: Ensure this is a "User" (not a Guardian)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', data.user.id)
        .single();

      if (profile?.user_type === 'guardian') {
        Alert.alert(
          'Access Denied',
          'This account is registered as a Guardian. Please use the Guardian Login.'
        );
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // 4. SMART CHECK: Does this user have a robot paired?
      const { data: robot, error: robotError } = await supabase
        .from('robots')
        .select('id')
        .eq('owner_id', data.user.id)
        .maybeSingle(); // Returns null if no robot found (doesn't crash)

      setLoading(false);

      // 5. Navigate based on status
      if (robot) {
        // Robot found -> Go straight to Dashboard
        console.log('Robot found, going to Home');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        // ❌ No robot -> Must pair first
        console.log('No robot found, going to Pairing');
        navigation.reset({
          index: 0,
          routes: [{ name: 'PairingScreen' }],
        });
      }

    } catch (error: any) {
      Alert.alert('System Error', error.message);
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Coming Soon', `${provider} login is not set up yet.`);
  };

  const handleSignUp = () => {
    navigation.navigate('CreateAccount', { userType: 'user' });
  };

  const handleForgotPassword = () => {
    // navigation.navigate('ForgotPassword', { userType: 'user' });
    Alert.alert('Coming Soon', 'Forgot Password flow will be implemented here.');
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
            Sign in to continue as a <Text style={styles.boldText}>User</Text>
          </Text>

          {/* Email Input */}
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Input */}
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            isPassword
            showPasswordToggle
          />

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Sign In Button (Updated with Loading state) */}
          <PrimaryButton
            title={loading ? "Signing In..." : "Sign In"}
            onPress={handleSignIn}
            disabled={loading} // Prevent double clicks
            variant="primary"
            size="large"
            fullWidth
          />

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
  forgotPassword: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.PRIMARY,
    marginBottom: SPACING.XL,
    fontWeight: '600',
    textAlign: 'right', // Added alignment to make it look better
    marginTop: SPACING.SM,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.XL,
    marginBottom: SPACING.XXL,
    marginTop: SPACING.LG, // Added some top margin for spacing
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

export default LoginUserScreen;