// src/screens/auth/CreateAccountScreen.tsx
// Registration screen shared by both the user and guardian roles.
// On successful validation, the full name is persisted to AsyncStorage
// so that the dashboard and profile screens can display it.

import { supabase } from '../../lib/supabase';
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
import { useAuth } from '../../context/AuthContext';
import { BackButton, PrimaryButton, Input } from '../../components';
import { SPACING } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

// AsyncStorage keys used to persist the signed-in user's display name.
const USER_NAME_KEY = 'bean_user_name';
const GUARDIAN_NAME_KEY = 'bean_guardian_name';

const CreateAccountScreen = ({ navigation, route }: any) => {
  const { colors, isDark } = useTheme();
  const { userType } = route.params || { userType: 'user' };

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Validates all fields before calling Supabase Auth to register the user.
  // Users proceed to the login flow after successful registration.
  const handleCreateAccount = async () => {
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

    setIsLoading(true);

    try {
      // Call Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType, // 'user' or 'guardian'
          },
        },
      });

      if (error) throw error;

      // Instead of AsyncStorage, place it safely in the global context
      if (data?.user) {
         login(data.user.id, fullName.trim());
      }

      // Success Feedback
      Alert.alert(
        'Registration Successful',
        'Please check your email to verify your account before signing in.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              if (userType === 'user') {
                navigation.navigate('ConnectBean');
              } else {
                navigation.navigate('CaregiverApp', { screen: 'EnterWardEmail' });
              }
            } 
          }
        ]
      );

    } catch (error: any) {
      Alert.alert('Registration Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert(
      'Coming Soon',
      `${provider} authentication will be available soon!`,
    );
  };

  const handleSignIn = () => {
    if (userType === 'user') navigation.navigate('LoginUser');
    else navigation.navigate('LoginGuardian');
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

          <Text style={styles.title}>
            {userType === 'guardian' ? (
              <>
                <Text style={styles.titleHighlight}>Guardian/Therapist </Text>
                <Text
                  style={[styles.titleNormal, { color: colors.TEXT_PRIMARY }]}
                >
                  Sign Up
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.titleHighlight}>User </Text>
                <Text
                  style={[styles.titleNormal, { color: colors.TEXT_PRIMARY }]}
                >
                  Sign Up
                </Text>
              </>
            )}
          </Text>

          <View style={styles.iconContainer}>
            <Image
              source={require('../../../assets/images/select-user.png')}
              style={[styles.robotIcon, isDark && { tintColor: '#FFFFFF' }]}
              resizeMode="contain"
            />
          </View>

          <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
            {userType === 'guardian'
              ? 'Create an account to support your loved one'
              : 'Sign up to start your journey with Bean, your mental health companion.'}
          </Text>

          <Text style={[styles.label, { color: colors.TEXT_TERTIARY }]}>
            FULL NAME
          </Text>
          <Input
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <Text style={[styles.label, { color: colors.TEXT_TERTIARY }]}>
            EMAIL ADDRESS
          </Text>
          <Input
            placeholder="bean@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.label, { color: colors.TEXT_TERTIARY }]}>
            PASSWORD
          </Text>
          <Input
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            isPassword
            showPasswordToggle
            autoCapitalize="none"
          />

          <Text style={[styles.label, { color: colors.TEXT_TERTIARY }]}>
            CONFIRM PASSWORD
          </Text>
          <Input
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            isPassword
            showPasswordToggle
            autoCapitalize="none"
          />

          <PrimaryButton
            title={isLoading ? "Creating Account..." : "Sign Up"}
            onPress={handleCreateAccount}
            disabled={isLoading}
            variant="primary"
            size="large"
            fullWidth
          />

          <View style={styles.dividerContainer}>
            <Text style={[styles.dividerText, { color: colors.TEXT_TERTIARY }]}>
              OR CONTINUE WITH
            </Text>
          </View>

          <View style={styles.socialContainer}>
            {[
              {
                src: require('../../../assets/images/fb.png'),
                name: 'Facebook',
              },
              {
                src: require('../../../assets/images/apple.png'),
                name: 'Apple',
              },
              {
                src: require('../../../assets/images/google.png'),
                name: 'Google',
              },
            ].map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.socialButton,
                  {
                    backgroundColor: colors.SURFACE,
                    borderColor: isDark ? '#FFFFFF' : colors.BORDER,
                  },
                ]}
                onPress={() => handleSocialLogin(item.name)}
              >
                <Image
                  source={item.src}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.signInContainer}>
            <Text style={[styles.signInText, { color: colors.TEXT_SECONDARY }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={[styles.signInLink, { color: colors.LINK }]}>
                Sign In
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
    paddingTop: SPACING.XS,
    paddingBottom: SPACING.XL,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.MD,
  },
  titleHighlight: { fontSize: 26, fontWeight: 'bold', color: '#07882C' },
  titleNormal: { fontSize: 26, fontWeight: 'bold' },
  iconContainer: { alignItems: 'center', marginBottom: SPACING.SM },
  robotIcon: { width: 60, height: 60 },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: SPACING.LG,
    lineHeight: 18,
    paddingHorizontal: SPACING.MD,
  },
  label: {
    fontSize: 11,
    marginBottom: 6,
    marginTop: 6,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  dividerContainer: { alignItems: 'center', marginVertical: SPACING.MD },
  dividerText: { fontSize: 11, letterSpacing: 1 },
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    elevation: 2,
  },
  socialIcon: { width: 24, height: 24 },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.XS,
    marginBottom: SPACING.SM,
  },
  signInText: { fontSize: 13 },
  signInLink: { fontSize: 13, fontWeight: '600' },
});

export default CreateAccountScreen;
