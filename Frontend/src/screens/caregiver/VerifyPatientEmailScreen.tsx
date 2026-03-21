// src/screens/caregiver/VerifyPatientEmailScreen.tsx

import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { PrimaryButton } from '../../components';
import { COLORS, SPACING } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 59;

const VerifyPatientEmailScreen = ({ navigation, route }: any) => {
  const { maskedEmail = 'p****t@healthcare.com' } = route.params || {};

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);

  // ✅ Fix: correct ref type for React Native TextInput
  const inputRefs = useRef<Array<TextInput | null>>(
    Array(OTP_LENGTH).fill(null),
  );

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const id = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const updated = [...otp];
    updated[index] = digit;
    setOtp(updated);
    // Auto-advance to next box
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(RESEND_SECONDS);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(''));
    Alert.alert('Code Resent', 'A new verification code has been sent.');
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) {
      Alert.alert('Error', 'Please enter all 6 digits.');
      return;
    }
    navigation.navigate('VerificationSuccessful');
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top icon */}
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../assets/images/verify-patient-email-top-icon.png')}
              style={styles.topIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Verify Patient Email</Text>

          <Text style={styles.subtitle}>
            We've sent a 6-digit verification code to{' '}
            <Text style={styles.emailBold}>{maskedEmail}</Text>. Please enter it
            below.
          </Text>

          {/* OTP boxes */}
          <View style={styles.otpRow}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                // ✅ Fix: cast ref callback to satisfy TypeScript
                ref={(ref: TextInput | null) => {
                  inputRefs.current[i] = ref;
                }}
                style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                value={digit}
                onChangeText={text => handleChange(text, i)}
                onKeyPress={e => handleKeyPress(e, i)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectionColor={COLORS.PRIMARY}
              />
            ))}
          </View>

          {/* Resend row */}
          <View style={styles.resendRow}>
            <Text style={styles.resendLabel}>Resend code available in </Text>
            <View style={styles.timerBadge}>
              <Text style={styles.timerText}>00:{pad(timer)}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleResend} disabled={!canResend}>
            <Text
              style={[
                styles.resendLink,
                !canResend && styles.resendLinkDisabled,
              ]}
            >
              Resend Code
            </Text>
          </TouchableOpacity>

          <View style={styles.spacer} />

          <PrimaryButton
            title="Verify & Proceed"
            onPress={handleVerify}
            variant="primary"
            size="large"
            fullWidth
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.WHITE },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.XL,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#07882C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  topIcon: { width: 44, height: 44, tintColor: COLORS.WHITE },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.SM,
  },
  emailBold: {
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  otpRow: {
    flexDirection: 'row',
    gap: SPACING.SM,
    marginBottom: SPACING.LG,
  },
  otpBox: {
    width: 46,
    height: 52,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    backgroundColor: COLORS.WHITE,
  },
  otpBoxFilled: {
    borderColor: '#07882C',
    backgroundColor: '#F0FFF4',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XS,
  },
  resendLabel: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
  },
  timerBadge: {
    backgroundColor: '#EEF2FF',
    borderRadius: BORDER_RADIUS.SM,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  timerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4169E1',
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#07882C',
    marginBottom: SPACING.XL,
  },
  resendLinkDisabled: {
    color: COLORS.TEXT_TERTIARY,
  },
  spacer: { flex: 1, minHeight: SPACING.XL },
});

export default VerifyPatientEmailScreen;
