// src/screens/auth/ForgotPasswordScreen.tsx
// ✅ Dark theme aware

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { BackButton, PrimaryButton, Input } from '../../components';
import { SPACING } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

const ForgotPasswordScreen = ({ navigation, route }: any) => {
  const { colors } = useTheme(); // ✅
  const { userType } = route.params || { userType: 'user' };
  const [contact, setContact] = useState('');

  const handleSendCode = () => {
    if (!contact.trim()) {
      Alert.alert('Error', 'Please enter your email or phone number');
      return;
    }
    let masked = '';
    if (contact.includes('@')) {
      const [local, domain] = contact.split('@');
      masked = local[0] + '****' + '@' + domain;
    } else {
      masked = '+1 (555) **** ' + contact.slice(-4);
    }
    navigation.navigate('OTPVerification', { maskedContact: masked, userType });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.SURFACE }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BackButton />

        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.glowOuter}>
            <View style={styles.glowInner}>
              <Image
                source={require('../../../assets/images/forgot-password-verification-top-icon.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Verification
        </Text>
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Enter your email or phone number. We'll send a verification code to
          reset your password.
        </Text>

        <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>
          Email or Phone Number
        </Text>
        <Input
          placeholder="Email or +1 (555) 000-0000"
          value={contact}
          onChangeText={setContact}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.btnWrapper}>
          <PrimaryButton
            title="Send Code"
            onPress={handleSendCode}
            variant="primary"
            size="large"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XS,
    paddingBottom: SPACING.XXL,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: SPACING.XL,
    marginBottom: SPACING.XL,
  },
  glowOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(7, 136, 44, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(7, 136, 44, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { width: 52, height: 52 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.MD,
  },
  label: { fontSize: 13, fontWeight: '600', marginBottom: SPACING.XS },
  btnWrapper: { marginTop: SPACING.XL },
});

export default ForgotPasswordScreen;
