// src/screens/caregiver/EnterWardEmailScreen.tsx
// ✅ Dark theme aware

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
import { SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

const EnterWardEmailScreen = ({ navigation }: any) => {
  const { colors } = useTheme(); // ✅
  const [wardEmail, setWardEmail] = useState('');

  const isValidEmail = wardEmail.trim().length > 0 && wardEmail.includes('@');

  const handleSend = () => {
    if (!isValidEmail) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    const masked =
      wardEmail[0] + '****' + wardEmail.slice(wardEmail.indexOf('@'));
    navigation.navigate('VerifyPatientEmail', { maskedEmail: masked });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND_LIGHT }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <BackButton />

          <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
            Ward's Email Address
          </Text>
          <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
            Enter the email address of the person you are caring for. We will
            send them a secure verification code to link your accounts.
          </Text>

          <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>
            Ward's Email
          </Text>
          <Input
            placeholder="ward@example.com"
            value={wardEmail}
            onChangeText={setWardEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Hint text */}
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
  container: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XS,
    paddingBottom: SPACING.XL,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: SPACING.SM,
    marginTop: SPACING.MD,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY_SMALL,
    lineHeight: 20,
    marginBottom: SPACING.XL,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: SPACING.XS,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: SPACING.XS,
    marginBottom: SPACING.XL,
  },
  hintDot: { fontSize: 8, color: '#E53935', marginTop: 3 },
  hintText: { fontSize: 12, color: '#E53935', flex: 1, lineHeight: 17 },
});

export default EnterWardEmailScreen;
