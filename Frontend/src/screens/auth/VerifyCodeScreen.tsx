// Email verification screen using a 6-digit code input.
// Focus advances automatically on entry and retreats on Backspace.
// On success, navigates to the login screen matching the user's role.

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BackButton, PrimaryButton } from '../../components';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

const VerifyCodeScreen = ({ navigation, route }: any) => {
  const { colors } = useTheme();

  // email is displayed in the subtitle so the user knows where the code was sent.
  const { email, userType } = route.params || { email: '', userType: 'user' };

  const [code, setCode] = useState(['', '', '', '', '', '']);

  // Refs allow programmatic focus movement between the six input cells.
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Keeps only the most recent character and advances focus to the next cell.
  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) text = text.charAt(text.length - 1);
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 5) inputRefs.current[index + 1]?.focus();
  };

  // Moves focus back to the previous cell when Backspace is pressed on an empty cell.
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Validates the full six-digit code and routes to the correct login screen on success.
  const handleVerify = () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit code');
      return;
    }
    Alert.alert('Success', 'Password reset link has been sent to your email!', [
      {
        text: 'OK',
        onPress: () => {
          if (userType === 'user') navigation.navigate('LoginUser');
          else navigation.navigate('LoginGuardian');
        },
      },
    ]);
  };

  // Clears the input and refocuses the first cell after requesting a new code.
  const handleResendCode = () => {
    Alert.alert(
      'Code Sent',
      'A new verification code has been sent to your email',
    );
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
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

        {/* Lock icon centred in a tinted circle */}
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: colors.SECONDARY_LIGHT },
            ]}
          >
            <Text style={styles.iconText}>🔐</Text>
          </View>
        </View>

        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Verification Code
        </Text>
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Please enter the code we sent to{'\n'}
          <Text style={[styles.emailText, { color: colors.PRIMARY }]}>
            {email}
          </Text>
        </Text>

        {/* Six digit cells; filled cells are highlighted with a primary-colour border */}
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              style={[
                styles.codeInput,
                {
                  borderColor: colors.BORDER,
                  color: colors.TEXT_PRIMARY,
                  backgroundColor: colors.BACKGROUND_LIGHT,
                },
                digit
                  ? {
                      borderColor: colors.PRIMARY,
                      backgroundColor: colors.SECONDARY_LIGHT,
                    }
                  : null,
              ]}
              value={digit}
              onChangeText={text => handleCodeChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Resend row */}
        <View style={styles.resendContainer}>
          <Text style={[styles.resendText, { color: colors.TEXT_SECONDARY }]}>
            Didn't receive the code?{' '}
          </Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={[styles.resendLink, { color: colors.PRIMARY }]}>
              Resend
            </Text>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          title="Verify!"
          onPress={handleVerify}
          variant="primary"
          size="large"
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.MASSIVE,
    paddingBottom: SPACING.XXL,
  },
  iconContainer: { alignItems: 'center', marginBottom: SPACING.XXL },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: { fontSize: 36 },
  title: { ...TYPOGRAPHY.H1, textAlign: 'center', marginBottom: SPACING.SM },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    textAlign: 'center',
    marginBottom: SPACING.XXL,
    lineHeight: 22,
  },
  emailText: { fontWeight: '600' },

  // Six equal-width cells laid out in a row.
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.XXL,
    gap: SPACING.SM,
  },
  codeInput: {
    flex: 1,
    height: 60,
    borderWidth: 2,
    borderRadius: SPACING.MD,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },

  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XXL,
  },
  resendText: { ...TYPOGRAPHY.BODY },
  resendLink: { ...TYPOGRAPHY.BODY, fontWeight: '600' },
});

export default VerifyCodeScreen;
