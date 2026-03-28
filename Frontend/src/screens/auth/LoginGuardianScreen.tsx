// Sign-in screen for the guardian/caregiver role.
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
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';
import { BackButton, PrimaryButton, Input } from '../../components';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

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

// Stub authentication function.
// TODO: replace with real Supabase guardian auth from feature/backend-fix.
// Expected shape: { success: boolean; user_id?: string; auth_token?: string }
// Example implementation:
//   const { data, error } = await supabase.auth.signInWithPassword({ email, password })
//   if (error || !data.user) return { success: false }
//   const guardianRecord = await supabase.from('guardians').select().eq('user_id', data.user.id)
//   if (!guardianRecord.data?.length) return { success: false }
//   return { success: true, user_id: data.user.id }
const authenticateGuardian = async (
  provider: 'email' | 'google' | 'apple' | 'facebook',
  credentials?: { email: string; password: string },
): Promise<{ success: boolean; user_id?: string }> => {
  return { success: true, user_id: 'stub-guardian-id' };
};

const LoginGuardianScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  const [emailGuardian, setEmailGuardian] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Single handler for all auth providers.
  // Navigates only when a valid user_id is returned; otherwise shows the failure toast.
  const handleAuth = async (
    provider: 'email' | 'google' | 'apple' | 'facebook',
  ) => {
    setLoading(true);
    try {
      const result = await authenticateGuardian(
        provider,
        provider === 'email' ? { email: emailGuardian, password } : undefined,
      );

      if (result.success && result.user_id) {
        navigation.navigate('CaregiverApp', { screen: 'CaregiverDashboard' });
      } else {
        showLoginFailedToast(
          provider === 'email'
            ? 'Invalid email or password.'
            : `${provider} login failed. Please try again.`,
        );
      }
    } catch {
      showLoginFailedToast();
    } finally {
      setLoading(false);
    }
  };

  const socialProviders: Array<{
    src: any;
    provider: 'google' | 'apple' | 'facebook';
  }> = [
    { src: require('../../../assets/images/fb.png'), provider: 'facebook' },
    { src: require('../../../assets/images/apple.png'), provider: 'apple' },
    { src: require('../../../assets/images/google.png'), provider: 'google' },
  ];

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
            Sign in to continue as a{' '}
            <Text style={styles.boldText}>Guardian</Text>
          </Text>

          <Input
            placeholder="Email (Guardian)"
            value={emailGuardian}
            onChangeText={setEmailGuardian}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            placeholder="Password (Guardian)"
            value={password}
            onChangeText={setPassword}
            isPassword
            showPasswordToggle
          />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ForgotPassword', { userType: 'guardian' })
            }
          >
            <Text style={[styles.forgotPassword, { color: colors.PRIMARY }]}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          {/* Social login buttons; each triggers the centralised auth handler */}
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
                onPress={() => handleAuth(provider)}
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

          {/* Shown while an auth request is in flight */}
          {loading && (
            <ActivityIndicator
              size="small"
              color={colors.PRIMARY}
              style={styles.loader}
            />
          )}

          <PrimaryButton
            title={loading ? 'Signing In...' : 'Sign In'}
            onPress={() => handleAuth('email')}
            variant="primary"
            size="large"
            fullWidth
            disabled={loading}
          />

          <View style={styles.signUpContainer}>
            <Text style={[styles.signUpText, { color: colors.TEXT_SECONDARY }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateAccount', { userType: 'guardian' })
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
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.XL,
    marginBottom: SPACING.LG,
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

export default LoginGuardianScreen;
