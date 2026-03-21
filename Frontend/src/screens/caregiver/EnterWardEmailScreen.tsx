// src/screens/caregiver/EnterWardEmailScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { BackButton, Input, PrimaryButton } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

const EnterWardEmailScreen = ({ navigation }: any) => {
  const [wardEmail, setWardEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const isValidEmail = wardEmail.trim().length > 0 && wardEmail.includes('@');

  const handleSend = () => {
    setTouched(true);
    if (!isValidEmail) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    // Pass masked email to next screen
    const masked =
      wardEmail[0] + '****' + wardEmail.slice(wardEmail.indexOf('@'));
    navigation.navigate('VerifyPatientEmail', { maskedEmail: masked });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <BackButton />

          <Text style={styles.title}>Ward's Email Address</Text>
          <Text style={styles.subtitle}>
            Enter the email address of the person you are caring for. We will
            send them a secure verification code to link your accounts.
          </Text>

          <Text style={styles.label}>Ward's Email</Text>
          <Input
            placeholder="ward@example.com"
            value={wardEmail}
            onChangeText={setWardEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Hint text — always visible */}
          <View style={styles.hintRow}>
            <Text style={styles.hintDot}>●</Text>
            <Text style={styles.hintText}>
              This must be the email they used to register their profile.
            </Text>
          </View>

          <View style={{ flex: 1 }} />

          <PrimaryButton
            title="Send Verification Code ➤"
            onPress={handleSend}
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
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND_LIGHT },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XS,
    paddingBottom: SPACING.XL,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
    marginTop: SPACING.MD,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
    marginBottom: SPACING.XL,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: SPACING.XS,
    marginBottom: SPACING.XL,
  },
  hintDot: {
    fontSize: 8,
    color: '#E53935',
    marginTop: 3,
  },
  hintText: {
    fontSize: 12,
    color: '#E53935',
    flex: 1,
    lineHeight: 17,
  },
});

export default EnterWardEmailScreen;
