// src/screens/auth/CreateNewPasswordScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { PrimaryButton, Input } from '../../components';
import { COLORS, SPACING } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';

interface Rule {
  label: string;
  check: (pw: string, confirm: string) => boolean;
}

const rules: Rule[] = [
  { label: 'At least 8 characters', check: pw => pw.length >= 8 },
  { label: 'Includes a number', check: pw => /\d/.test(pw) },
  {
    label: 'Includes a special character',
    check: pw => /[^a-zA-Z0-9]/.test(pw),
  },
  { label: 'Passwords match', check: (pw, c) => pw.length > 0 && pw === c },
];

const CreateNewPasswordScreen = ({ navigation, route }: any) => {
  const { userType } = route.params || { userType: 'user' };
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const allPassed = rules.every(r => r.check(password, confirm));

  const handleReset = () => {
    if (!allPassed) {
      Alert.alert('Error', 'Please meet all security requirements.');
      return;
    }
    navigation.navigate('PasswordResetSuccess', { userType });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require('../../../assets/images/create-new-password-top-icon.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>
          Your new password must be unique and satisfy the security requirements
          below.
        </Text>

        <Text style={styles.label}>New Password</Text>
        <Input
          placeholder="SecureP@ss123"
          value={password}
          onChangeText={setPassword}
          isPassword
          showPasswordToggle
          autoCapitalize="none"
        />

        <Text style={styles.label}>Confirm New Password</Text>
        <Input
          placeholder="••••••••••••"
          value={confirm}
          onChangeText={setConfirm}
          isPassword
          showPasswordToggle
          autoCapitalize="none"
        />

        {/* Security requirements */}
        <View style={styles.requirementsCard}>
          <Text style={styles.requirementsTitle}>Security Requirements</Text>
          {rules.map((rule, i) => {
            const passed = rule.check(password, confirm);
            return (
              <View key={i} style={styles.ruleRow}>
                <View style={[styles.ruleIcon, passed && styles.ruleIconPass]}>
                  <Text style={styles.ruleIconText}>{passed ? '✓' : '○'}</Text>
                </View>
                <Text
                  style={[styles.ruleLabel, passed && styles.ruleLabelPass]}
                >
                  {rule.label}
                </Text>
              </View>
            );
          })}
        </View>

        <PrimaryButton
          title="Reset Password →"
          onPress={handleReset}
          variant="primary"
          size="large"
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.WHITE },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.XXL,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  icon: { width: 72, height: 72 },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.SM,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
    marginTop: SPACING.SM,
  },
  requirementsCard: {
    backgroundColor: '#F8FFF9',
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    marginVertical: SPACING.LG,
    borderWidth: 1,
    borderColor: 'rgba(7,136,44,0.15)',
  },
  requirementsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
    marginBottom: 6,
  },
  ruleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleIconPass: { backgroundColor: '#07882C' },
  ruleIconText: { fontSize: 11, color: COLORS.WHITE, fontWeight: '700' },
  ruleLabel: { fontSize: 13, color: COLORS.TEXT_SECONDARY },
  ruleLabelPass: { color: '#07882C', fontWeight: '600' },
});

export default CreateNewPasswordScreen;
