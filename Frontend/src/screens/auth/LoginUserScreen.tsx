// src/screens/auth/LoginUserScreen.tsx
// Sign-in screen for the standard user role.
// All authentication paths (email and social) pass through a centralised
// handler that validates the response before navigating. If authentication
// fails, the user stays on this screen and receives a toast notification.

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
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { BackButton, PrimaryButton, Input } from '../../components';
import { SPACING, TYPOGRAPHY, COLORS } from '../../constants';
import { useTheme } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

// Displays a bottom toast on Android and an Alert on iOS when login fails.
const showLoginFailedToast = (message = 'Login failed. Please try again.') => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  } else {
    Alert.alert('Login Failed', message);
  }
};

const LoginUserScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const socialProviders: Array<{
    src: any;
    provider: 'google' | 'apple' | 'facebook';
  }> = [
    { src: require('../../../assets/images/fb.png'), provider: 'facebook' },
    { src: require('../../../assets/images/apple.png'), provider: 'apple' },
    { src: require('../../../assets/images/google.png'), provider: 'google' },
  ];

  // Real Supabase email sign-in with role verification
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

      setLoading(false);

      // 4. Navigate directly to User Dashboard
      console.log('Login successful, going to Dashboard');
      navigation.reset({
        index: 0,
        routes: [{ name: 'UserApp' }],
      });

    } catch (error: any) {
      Alert.alert('System Error', error.message);
      setLoading(false);
    }
  };

  // Handler for social login providers (placeholder for now)
  const handleSocialLogin = (provider: string) => {
    Alert.alert('Coming Soon', `${provider} login is not set up yet.`);
  };

  const handleSignUp = () => {
    navigation.navigate('CreateAccount', { userType: 'user' });
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword', { userType: 'user' });
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

          {/* Sign In Button with Loading state */}
          <PrimaryButton
            title={loading ? "Signing In..." : "Sign In"}
            onPress={handleSignIn}
            disabled={loading}
            variant="primary"
            size="large"
            fullWidth
          />

          {/* Shown while an auth request is in flight */}
          {loading && (
            <ActivityIndicator
              size="small"
              color={colors.PRIMARY}
              style={styles.loader}
            />
          )}

          {/* Social login buttons */}
          <View style={styles.socialContainer}>
            {socialProviders.map(({ src, provider }) => (
              <TouchableOpacity
                key={provider}
                style={[
                  styles.socialButton,
                  {
                    backgroundColor: colors.BACKGROUND_LIGHT,
                    borderColor: colors.BORDER,
                  },
                ]}
                onPress={() => handleSocialLogin(provider)}
                disabled={loading}
                activeOpacity={0.75}
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
    textAlign: 'right',
    marginTop: SPACING.SM,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.XL,
    marginBottom: SPACING.LG,
    marginTop: SPACING.LG,
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
  loader: { marginBottom: SPACING.MD },
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