// src/screens/auth/VerifyCodeScreen.tsx
// ✅ REFACTORED VERSION

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
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

const VerifyCodeScreen = ({ navigation, route }: any) => {
  const { email, userType } = route.params || { email: '', userType: 'user' };

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.charAt(text.length - 1);
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
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

    console.log('Verification code:', verificationCode);
    Alert.alert('Success', 'Password reset link has been sent to your email!', [
      {
        text: 'OK',
        onPress: () => {
          if (userType === 'user') {
            navigation.navigate('LoginUser');
          } else {
            navigation.navigate('LoginGuardian');
          }
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <BackButton />

        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>🔐</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.subtitle}>
          Please enter the code we sent to{'\n'}
          <Text style={styles.emailText}>{email}</Text>
        </Text>

        {/* Code Input Boxes */}
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              style={[styles.codeInput, digit ? styles.codeInputFilled : null]}
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
          <Text style={styles.resendText}>Didn't receive the code? </Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.resendLink}>Resend</Text>
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
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.MASSIVE,
    paddingBottom: SPACING.XXL,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.XXL,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.SECONDARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 36,
  },
  title: {
    ...TYPOGRAPHY.H1,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.XXL,
    lineHeight: 22,
  },
  emailText: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
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
    borderColor: COLORS.BORDER,
    borderRadius: SPACING.MD,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    backgroundColor: COLORS.GRAY_50,
  },
  codeInputFilled: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XXL,
  },
  resendText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
  },
  resendLink: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
});

export default VerifyCodeScreen;
