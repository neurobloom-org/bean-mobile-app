// Second step of the forgot-password flow. Displays a custom numeric keypad
// and six OTP digit boxes. A countdown timer gates the resend action, and a
// spinner replaces the verify button while the code is being checked.

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
  const { colors } = useTheme();

  // maskedContact is built in ForgotPasswordScreen and forwarded here for display.
  const { maskedContact = '+1 (555) **** 5678', userType } = route.params || {};

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Animated value and reference used to drive the loading spinner rotation.
  const spinValue = useRef(new Animated.Value(0)).current;
  const spinAnimation = useRef<Animated.CompositeAnimation | null>(null);

  // Counts down one second at a time; enables the resend button when it reaches zero.
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const id = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  // Begins an infinite rotation animation used as a verification spinner.
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

  // Handles both digit entry and delete actions from the custom keypad.
  // Entry fills the first empty box; delete clears the last filled box.
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

  // Resets the countdown and clears the OTP input when the user requests a new code.
  const handleResend = () => {
    if (!canResend) return;
    setTimer(RESEND_SECONDS);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(''));
    Alert.alert('Code Resent', 'A new verification code has been sent.');
  };

  // Validates that all six digits are entered, starts the spinner,
  // then navigates to the password creation screen after a brief delay.
  // TODO: replace the setTimeout with a real OTP verification API call.
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

  // Left-pads a number to two digits for the countdown display (e.g. 9 → "09").
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
        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Verify Account
        </Text>
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Enter the 6-digit code we sent to:{'\n'}
          <Text style={[styles.contactBold, { color: colors.TEXT_PRIMARY }]}>
            {maskedContact}
          </Text>
        </Text>

        {/* Six digit boxes; filled boxes are highlighted with a green border */}
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

        {/* Resend row; the link is inactive until the countdown reaches zero */}
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

        {/* Verify button is replaced by a spinner while verification is in progress */}
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

        {/* Custom numeric keypad with a backspace key in the bottom-right cell */}
        <View style={styles.numpad}>
          {numpadKeys.map((row, ri) => (
            <View key={ri} style={styles.numpadRow}>
              {row.map((key, ki) => {
                // Empty string acts as a blank spacer cell for layout alignment.
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

  // OTP input row
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

  // Resend row
  resendText: { fontSize: 13, marginBottom: SPACING.LG },
  resendTimer: { fontWeight: '600' },

  // Verify button
  verifyBtn: {
    width: '100%',
    backgroundColor: '#07882C',
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  verifyBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },

  // Loading spinner: arc border rotated continuously via Animated
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

  // Custom numpad grid
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
