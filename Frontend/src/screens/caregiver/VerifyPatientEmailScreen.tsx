// src/screens/caregiver/VerifyPatientEmailScreen.tsx
// ✅ Dark theme aware

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
import { SPACING } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 59;

const VerifyPatientEmailScreen = ({ navigation, route }: any) => {
  const { colors } = useTheme(); // ✅
  const { maskedEmail = 'p****t@healthcare.com' } = route.params || {};

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>(
    Array(OTP_LENGTH).fill(null),
  );

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
    if (digit && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.SURFACE }]}
    >
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

          <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
            Verify Patient Email
          </Text>

          <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
            We've sent a 6-digit verification code to{' '}
            <Text style={[styles.emailBold, { color: colors.TEXT_PRIMARY }]}>
              {maskedEmail}
            </Text>
            . Please enter it below.
          </Text>

          {/* OTP boxes */}
          <View style={styles.otpRow}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(ref: TextInput | null) => {
                  inputRefs.current[i] = ref;
                }}
                style={[
                  styles.otpBox,
                  {
                    borderColor: colors.BORDER,
                    color: colors.TEXT_PRIMARY,
                    backgroundColor: colors.SURFACE,
                  },
                  digit
                    ? {
                        borderColor: '#07882C',
                        backgroundColor: colors.SECONDARY_LIGHT,
                      }
                    : null,
                ]}
                value={digit}
                onChangeText={text => handleChange(text, i)}
                onKeyPress={e => handleKeyPress(e, i)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectionColor="#07882C"
              />
            ))}
          </View>

          {/* Resend row */}
          <View style={styles.resendRow}>
            <Text
              style={[styles.resendLabel, { color: colors.TEXT_SECONDARY }]}
            >
              Resend code available in{' '}
            </Text>
            <View
              style={[
                styles.timerBadge,
                { backgroundColor: colors.SECONDARY_LIGHT },
              ]}
            >
              <Text style={styles.timerText}>00:{pad(timer)}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleResend} disabled={!canResend}>
            <Text
              style={[
                styles.resendLink,
                !canResend && { color: colors.TEXT_TERTIARY },
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
  container: { flex: 1 },
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
  topIcon: { width: 44, height: 44, tintColor: '#FFFFFF' },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.SM,
  },
  emailBold: { fontWeight: '700' },
  otpRow: { flexDirection: 'row', gap: SPACING.SM, marginBottom: SPACING.LG },
  otpBox: {
    width: 46,
    height: 52,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1.5,
    fontSize: 20,
    fontWeight: '700',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XS,
  },
  resendLabel: { fontSize: 13 },
  timerBadge: {
    borderRadius: BORDER_RADIUS.SM,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  timerText: { fontSize: 13, fontWeight: '700', color: '#4169E1' },
  resendLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#07882C',
    marginBottom: SPACING.XL,
  },
  spacer: { flex: 1, minHeight: SPACING.XL },
});

export default VerifyPatientEmailScreen;
