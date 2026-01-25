import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

const VerifyCodeScreen = ({ navigation, route }: any) => {
  const { email, userType } = route.params || { email: '', userType: 'user' };

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto focus next input
    if (text && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    // Handle backspace to go to previous input
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const verificationCode = code.join('');

    if (verificationCode.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit code');
      return;
    }

    // Here you would verify the code with your backend
    console.log('Verifying code:', verificationCode);

    Alert.alert('Success', 'Your password has been reset successfully!', [
      {
        text: 'OK',
        onPress: () => {
          // Navigate to appropriate login screen
          if (userType === 'user') {
            navigation.navigate('LoginUser');
          } else {
            navigation.navigate('LoginGuardian');
          }
        },
      },
    ]);
  };

  const handleResend = () => {
    Alert.alert('Success', 'Verification code has been resent to your email!');
    setCode(['', '', '', '', '', '']);
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>🔒</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Verify Code</Text>

        {/* Description */}
        <Text style={styles.description}>
          We have sent a 6-digit verification code to{' '}
          {userType === 'guardian' ? "the Ward's email" : 'your email'}. Please
          enter the code below to confirm{' '}
          {userType === 'guardian' ? "the Ward's email" : 'your email'}.
        </Text>

        {/* Code Input Boxes */}
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              style={styles.codeInput}
              value={digit}
              onChangeText={text => handleCodeChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerify}
          activeOpacity={0.8}
        >
          <Text style={styles.verifyButtonText}>Verify!</Text>
        </TouchableOpacity>

        {/* Resend Link */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Don't receive a code? </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 28,
    color: '#000000',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0F7F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  codeInput: {
    width: 45,
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  verifyButton: {
    backgroundColor: '#4ECCA3',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#4ECCA3',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#666666',
  },
  resendLink: {
    fontSize: 14,
    color: '#4169E1',
    fontWeight: '600',
  },
});

export default VerifyCodeScreen;
