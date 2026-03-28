// src/screens/auth/LoginUserScreen.tsx
// ✅ Dark theme aware

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
import { SPACING, TYPOGRAPHY, COLORS } from '../../constants';
import { useTheme } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginUserScreen = ({ navigation }: any) => {
  const { colors } = useTheme(); // ✅
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.SURFACE }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <BackButton />

          <View style={styles.iconContainer}>
            <Image
              source={require('../../../assets/images/login-page.png')}
              style={styles.robotIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
            Welcome back!
          </Text>
          <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
            Sign in to continue as a <Text style={styles.boldText}>User</Text>
          </Text>

          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            isPassword
            showPasswordToggle
          />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ForgotPassword', { userType: 'user' })
            }
          >
            <Text style={[styles.forgotPassword, { color: colors.PRIMARY }]}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          {/* Sign In Button (Updated with Loading state) */}
          <PrimaryButton
            title={loading ? "Signing In..." : "Sign In"}
            onPress={handleSignIn}
            disabled={loading}
            variant="primary"
            size="large"
            fullWidth
          />

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            {[
              require('../../../assets/images/fb.png'),
              require('../../../assets/images/apple.png'),
              require('../../../assets/images/google.png'),
            ].map((src, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.socialButton,
                  {
                    backgroundColor: colors.BACKGROUND_LIGHT,
                    borderColor: colors.BORDER,
                  },
                ]}
                onPress={() => navigation.navigate('UserApp')}
              >
                <Image
                  source={src}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={[styles.signUpText, { color: colors.TEXT_SECONDARY }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateAccount', { userType: 'user' })
              }
            >
              <Text style={[styles.signUpLink, { color: colors.LINK }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.XXL,
  },
  iconContainer: { alignItems: 'center', marginBottom: SPACING.XL },
  robotIcon: { width: 100, height: 100 },
  title: { ...TYPOGRAPHY.H1, textAlign: 'center', marginBottom: SPACING.MD },
  subtitle: {
    ...TYPOGRAPHY.BODY_LARGE,
    textAlign: 'center',
    marginBottom: SPACING.XXL,
  },
  boldText: { fontWeight: 'bold', color: '#07882C' },
  forgotPassword: {
    ...TYPOGRAPHY.BODY,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  socialIcon: { width: 30, height: 30 },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.LG,
  },
  signUpText: { ...TYPOGRAPHY.BODY },
  signUpLink: { ...TYPOGRAPHY.BODY, fontWeight: '600' },
});

export default LoginUserScreen;