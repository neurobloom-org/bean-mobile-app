// src/screens/auth/VerifyCodeScreen.tsx
// ✅ Dark theme aware

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
  const { colors } = useTheme(); // ✅
  const { email, userType } = route.params || { email: '', userType: 'user' };

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) text = text.charAt(text.length - 1);
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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

        {/* Icon */}
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

        {/* Title */}
        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Verification Code
        </Text>
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Please enter the code we sent to{'\n'}
          <Text style={[styles.emailText, { color: colors.PRIMARY }]}>
            {email}
          </Text>
        </Text>

        {/* Code Input Boxes */}
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

        {/* Resend Code */}
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

        {/* Verify Button */}
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
