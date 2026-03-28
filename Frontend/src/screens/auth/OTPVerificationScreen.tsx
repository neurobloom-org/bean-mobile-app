// src/screens/auth/OTPVerificationScreen.tsx
// ✅ Dark theme aware

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Alert,
} from 'react-native';
import { SPACING } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 59;

const OTPVerificationScreen = ({ navigation, route }: any) => {
  const { colors } = useTheme(); // ✅
  const { maskedContact = '+1 (555) **** 5678', userType } = route.params || {};

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const spinValue = useRef(new Animated.Value(0)).current;
  const spinAnimation = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const id = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const startSpin = () => {
    spinValue.setValue(0);
    spinAnimation.current = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    );
    spinAnimation.current.start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleNumpad = (val: string) => {
    if (isVerifying) return;
    if (val === 'del') {
      const lastFilled = [...otp].reverse().findIndex(d => d !== '');
      if (lastFilled === -1) return;
      const idx = OTP_LENGTH - 1 - lastFilled;
      const updated = [...otp];
      updated[idx] = '';
      setOtp(updated);
    } else {
      const firstEmpty = otp.findIndex(d => d === '');
      if (firstEmpty === -1) return;
      const updated = [...otp];
      updated[firstEmpty] = val;
      setOtp(updated);
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
    setIsVerifying(true);
    startSpin();
    setTimeout(() => {
      spinAnimation.current?.stop();
      navigation.navigate('CreateNewPassword', { userType });
    }, 1500);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  const numpadKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'del'],
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.SURFACE }]}
    >
      <View style={styles.inner}>
        {/* Title */}
        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Verify Account
        </Text>
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Enter the 6-digit code we sent to:{'\n'}
          <Text style={[styles.contactBold, { color: colors.TEXT_PRIMARY }]}>
            {maskedContact}
          </Text>
        </Text>

        {/* OTP display boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <View
              key={i}
              style={[
                styles.otpBox,
                { borderColor: colors.BORDER, backgroundColor: colors.SURFACE },
                digit
                  ? {
                      borderColor: '#07882C',
                      backgroundColor: colors.SECONDARY_LIGHT,
                    }
                  : null,
              ]}
            >
              <Text style={[styles.otpDigit, { color: colors.TEXT_PRIMARY }]}>
                {digit}
              </Text>
            </View>
          ))}
        </View>

        {/* Resend */}
        <Text style={[styles.resendText, { color: colors.TEXT_SECONDARY }]}>
          Didn't receive a code?{' '}
          <Text
            style={[
              styles.resendTimer,
              { color: colors.TEXT_TERTIARY },
              canResend && { color: '#07882C' },
            ]}
            onPress={handleResend}
          >
            {canResend ? 'Resend now' : `Resend in ${pad(0)}:${pad(timer)}`}
          </Text>
        </Text>

        {/* Verify button OR loading spinner */}
        {isVerifying ? (
          <View style={styles.spinnerContainer}>
            <Animated.View
              style={[styles.spinner, { transform: [{ rotate: spin }] }]}
            />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.verifyBtn}
            onPress={handleVerify}
            activeOpacity={0.85}
          >
            <Text style={styles.verifyBtnText}>Verify & Continue</Text>
          </TouchableOpacity>
        )}

        {/* Custom numpad */}
        <View style={styles.numpad}>
          {numpadKeys.map((row, ri) => (
            <View key={ri} style={styles.numpadRow}>
              {row.map((key, ki) => {
                if (key === '')
                  return <View key={ki} style={styles.numpadKey} />;
                return (
                  <TouchableOpacity
                    key={ki}
                    style={styles.numpadKey}
                    onPress={() => handleNumpad(key)}
                    activeOpacity={0.6}
                  >
                    <Text
                      style={[
                        key === 'del' ? styles.delText : styles.numpadText,
                        { color: colors.TEXT_PRIMARY },
                      ]}
                    >
                      {key === 'del' ? '⌫' : key}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: SPACING.XL,
  },
  contactBold: { fontWeight: '800' },
  otpRow: { flexDirection: 'row', gap: SPACING.SM, marginBottom: SPACING.MD },
  otpBox: {
    width: 46,
    height: 52,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpDigit: { fontSize: 22, fontWeight: '700' },
  resendText: { fontSize: 13, marginBottom: SPACING.LG },
  resendTimer: { fontWeight: '600' },
  verifyBtn: {
    width: '100%',
    backgroundColor: '#07882C',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  verifyBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  spinnerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    marginBottom: SPACING.LG,
  },
  spinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: 'rgba(7,136,44,0.2)',
    borderTopColor: '#07882C',
  },
  numpad: { width: '100%', marginTop: SPACING.SM },
  numpadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.XS,
  },
  numpadKey: {
    flex: 1,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.MD,
  },
  numpadText: { fontSize: 24, fontWeight: '500' },
  delText: { fontSize: 22 },
});

export default OTPVerificationScreen;
