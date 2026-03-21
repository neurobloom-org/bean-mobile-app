// src/screens/auth/LoginUserScreen.tsx
// ✅ Dark theme aware

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
} from 'react-native';
import { BackButton, PrimaryButton, Input } from '../../components';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

const LoginUserScreen = ({ navigation }: any) => {
  const { colors } = useTheme(); // ✅
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

          {/* Social */}
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

          <PrimaryButton
            title="Sign In"
            onPress={() => navigation.navigate('UserApp')}
            variant="primary"
            size="large"
            fullWidth
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
    marginBottom: SPACING.XXL,
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
