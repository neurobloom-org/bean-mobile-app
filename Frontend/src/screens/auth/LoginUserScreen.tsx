// src/screens/auth/LoginUserScreen.tsx
// ✅ Dark theme aware
// ✅ AuthGuard: social logins + Sign In now validate auth before navigating
//    If auth fails → stays on screen + shows "Login Failed" toast

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

// ─── Auth Guard Helper ────────────────────────────────────────────────────────
// Shows a platform-appropriate "Login Failed" message
const showLoginFailedToast = (message = 'Login failed. Please try again.') => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  } else {
    // iOS fallback — Alert (swap for a custom toast if you have one)
    Alert.alert('Login Failed', message);
  }
};

// ─── Mock Auth — replace with real Supabase/backend call ─────────────────────
// TODO: replace this stub with your actual auth call from feature/backend-fix
// Expected return: { success: boolean; user_id?: string; auth_token?: string }
const authenticateUser = async (
  provider: 'email' | 'google' | 'apple' | 'facebook',
  credentials?: { email: string; password: string },
): Promise<{ success: boolean; user_id?: string }> => {
  // TODO: wire up to real backend
  // Example Supabase call:
  //   const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  //   if (error || !data.user) return { success: false }
  //   return { success: true, user_id: data.user.id }
  //
  // For social: use supabase.auth.signInWithOAuth({ provider }) + listen for session

  // ── Temporary stub: always succeeds so existing flow is not broken ──
  // Change to `return { success: false }` to test the failed path
  return { success: true, user_id: 'stub-user-id' };
};

// ─── Screen ───────────────────────────────────────────────────────────────────
const LoginUserScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ── Centralized Auth Handler ──────────────────────────────────────────────
  const handleAuth = async (
    provider: 'email' | 'google' | 'apple' | 'facebook',
  ) => {
    setLoading(true);
    try {
      const result = await authenticateUser(
        provider,
        provider === 'email' ? { email, password } : undefined,
      );

      // ✅ AuthGuard: only navigate if auth_token / user_id is valid
      if (result.success && result.user_id) {
        navigation.navigate('UserApp');
      } else {
        // ✅ Stay on screen + show "Login Failed" toast
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
            Sign in to continue as an <Text style={styles.boldText}>User</Text>
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

          {/* ── Social Login Buttons ── */}
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

          {/* ── Loading indicator ── */}
          {loading && (
            <ActivityIndicator
              size="small"
              color={colors.PRIMARY}
              style={styles.loader}
            />
          )}

          {/* ── Email Sign In Button ── */}
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

export default LoginUserScreen;
