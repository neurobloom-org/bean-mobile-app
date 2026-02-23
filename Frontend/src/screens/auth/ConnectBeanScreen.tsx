// src/screens/auth/ConnectBeanScreen.tsx
// ✅ UPDATED - No validation, navigates to BeanConnected

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
import { PrimaryButton } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

const ConnectBeanScreen = ({ navigation }: any) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleCodeChange = (text: string, index: number) => {
    // Only allow single digit
    if (text.length > 1) {
      text = text.charAt(0);
    }

    // Update code array
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Handle backspace
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    // NO VALIDATION - Just navigate to BeanConnected screen
    const fullCode = code.join('');
    console.log('Robot code entered:', fullCode);

    // Navigate to Bean Connected success screen
    navigation.navigate('BeanConnected');
  };

  const handleCheckPaperWorks = () => {
    Alert.alert(
      'Find Your Code',
      'The 6-digit robot code can be found on the paper works included with your Bean robot.',
      [{ text: 'OK' }],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bluetooth Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.bluetoothIcon}>📶</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Connect Bean</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>How to Connect to the Robot:</Text>

        {/* Steps */}
        <View style={styles.stepsContainer}>
          {/* Step 1 */}
          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>01</Text>
            </View>
            <Text style={styles.stepText}>Turn on your robot</Text>
          </View>

          {/* Step 2 */}
          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>02</Text>
            </View>
            <Text style={styles.stepText}>Turn on your device's Bluetooth</Text>
          </View>

          {/* Step 3 */}
          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>03</Text>
            </View>
            <Text style={styles.stepText}>Pair the Bean</Text>
          </View>

          {/* Step 4 */}
          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>04</Text>
            </View>
            <Text style={styles.stepText}>Enter the robot code</Text>
          </View>
        </View>

        {/* Code Input */}
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
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, index)
              }
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Confirm Button - No validation! */}
        <PrimaryButton
          title="Confirm"
          onPress={handleConfirm}
          variant="primary"
          size="large"
          fullWidth
        />

        {/* Help Link */}
        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>Where is the code? </Text>
          <TouchableOpacity onPress={handleCheckPaperWorks}>
            <Text style={styles.helpLink}>Check the Paper Works</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: SPACING.XXL,
    paddingBottom: SPACING.XXL,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  bluetoothIcon: {
    fontSize: 48,
  },
  title: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.SM,
    fontWeight: 'bold',
  },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.XL,
  },
  stepsContainer: {
    gap: SPACING.SM,
    marginBottom: SPACING.XXL,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY_LIGHT,
    borderRadius: SPACING.MD,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  stepNumberText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  stepText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.XXL,
    gap: SPACING.SM,
  },
  codeInput: {
    flex: 1,
    height: 56,
    backgroundColor: COLORS.GRAY_50,
    borderWidth: 2,
    borderColor: COLORS.BORDER,
    borderRadius: SPACING.MD,
    ...TYPOGRAPHY.H2,
    textAlign: 'center',
    color: COLORS.TEXT_PRIMARY,
    fontWeight: 'bold',
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.LG,
  },
  helpText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
  },
  helpLink: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.LINK,
    fontWeight: '600',
  },
});

export default ConnectBeanScreen;
