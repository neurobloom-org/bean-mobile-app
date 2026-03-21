// src/screens/auth/OTPVerificationScreen.tsx
// ✅ Custom numpad + inline loading animation → CreateNewPassword

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
import { COLORS, SPACING } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 59;

const OTPVerificationScreen = ({ navigation, route }: any) => {
  const { maskedContact = '+1 (555) **** 5678', userType } = route.params || {};

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Spinning animation for loading state
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
      // Find last filled index and clear it
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

    // Start loading animation
    setIsVerifying(true);
    startSpin();

    // Simulate API verification — navigate after 1.5s
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
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* Title */}
        <Text style={styles.title}>Verify Account</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code we sent to:{'\n'}
          <Text style={styles.contactBold}>{maskedContact}</Text>
        </Text>

        {/* OTP display boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <View
              key={i}
              style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
            >
              <Text style={styles.otpDigit}>{digit}</Text>
            </View>
          ))}
        </View>

        {/* Resend */}
        <Text style={styles.resendText}>
          Didn't receive a code?{' '}
          <Text
            style={[styles.resendTimer, canResend && styles.resendActive]}
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
                      style={key === 'del' ? styles.delText : styles.numpadText}
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
  container: { flex: 1, backgroundColor: COLORS.WHITE },
  inner: {
    flex: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: SPACING.XL,
  },
  contactBold: {
    fontWeight: '800',
    color: COLORS.TEXT_PRIMARY,
  },
  otpRow: {
    flexDirection: 'row',
    gap: SPACING.SM,
    marginBottom: SPACING.MD,
  },
  otpBox: {
    width: 46,
    height: 52,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  otpBoxFilled: {
    borderColor: '#07882C',
    backgroundColor: '#F0FFF4',
  },
  otpDigit: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  resendText: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.LG,
  },
  resendTimer: {
    fontWeight: '600',
    color: COLORS.TEXT_TERTIARY,
  },
  resendActive: {
    color: '#07882C',
  },
  // Verify button
  verifyBtn: {
    width: '100%',
    backgroundColor: '#07882C',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  verifyBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  // Loading spinner
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
  // Numpad
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
  numpadText: {
    fontSize: 24,
    fontWeight: '500',
    color: COLORS.TEXT_PRIMARY,
  },
  delText: {
    fontSize: 22,
    color: COLORS.TEXT_PRIMARY,
  },
});

export default OTPVerificationScreen;
