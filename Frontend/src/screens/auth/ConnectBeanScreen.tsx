// src/screens/auth/ConnectBeanScreen.tsx
// ✅ Dark theme aware

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { PrimaryButton } from '../../components';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

const ConnectBeanScreen = ({ navigation }: any) => {
  const { colors } = useTheme(); // ✅
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) text = text.charAt(0);
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = () => {
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.SURFACE }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require('../../../assets/images/connect-bean-final.png')}
            style={styles.connectIcon}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Connect Bean
        </Text>
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          How to Connect to the Robot:
        </Text>

        {/* Steps */}
        <View style={styles.stepsContainer}>
          {[
            'Turn on your robot',
            "Turn on your device's Bluetooth",
            'Pair the Bean',
            'Enter the robot code',
          ].map((step, i) => (
            <View
              key={i}
              style={[
                styles.stepCard,
                { backgroundColor: colors.SECONDARY_LIGHT },
              ]}
            >
              <View
                style={[styles.stepNumber, { backgroundColor: colors.PRIMARY }]}
              >
                <Text style={styles.stepNumberText}>
                  {String(i + 1).padStart(2, '0')}
                </Text>
              </View>
              <Text style={[styles.stepText, { color: colors.TEXT_PRIMARY }]}>
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* Code Input */}
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
                  backgroundColor: colors.BACKGROUND_LIGHT,
                  borderColor: colors.BORDER,
                  color: colors.TEXT_PRIMARY,
                },
              ]}
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

        <PrimaryButton
          title="Confirm"
          onPress={handleConfirm}
          variant="primary"
          size="large"
          fullWidth
        />

        {/* Help Link */}
        <View style={styles.helpContainer}>
          <Text style={[styles.helpText, { color: colors.TEXT_SECONDARY }]}>
            Where is the code?{' '}
          </Text>
          <TouchableOpacity onPress={handleCheckPaperWorks}>
            <Text style={[styles.helpLink, { color: colors.LINK }]}>
              Check the Paper Works
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XXL,
    paddingBottom: SPACING.XXL,
  },
  iconContainer: { alignItems: 'center', marginBottom: SPACING.LG },
  connectIcon: { width: 80, height: 80 },
  title: {
    ...TYPOGRAPHY.H2,
    textAlign: 'center',
    marginBottom: SPACING.SM,
    fontWeight: 'bold',
  },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    textAlign: 'center',
    marginBottom: SPACING.XL,
  },
  stepsContainer: { gap: SPACING.SM, marginBottom: SPACING.XXL },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SPACING.MD,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.LG,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  stepNumberText: { ...TYPOGRAPHY.BODY, color: '#FFFFFF', fontWeight: 'bold' },
  stepText: { ...TYPOGRAPHY.BODY, flex: 1, fontWeight: 'bold' },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.XXL,
    gap: SPACING.SM,
  },
  codeInput: {
    flex: 1,
    height: 56,
    borderWidth: 2,
    borderRadius: SPACING.MD,
    ...TYPOGRAPHY.H2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.LG,
  },
  helpText: { ...TYPOGRAPHY.BODY },
  helpLink: { ...TYPOGRAPHY.BODY, fontWeight: '600' },
});

export default ConnectBeanScreen;
