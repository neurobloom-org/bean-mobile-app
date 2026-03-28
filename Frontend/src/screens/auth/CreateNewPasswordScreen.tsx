// Final step of the forgot-password flow. The user enters and confirms a new
// password that must satisfy all four security rules before submission.
// Each rule is evaluated live and displayed with a pass/fail indicator.

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
import { SPACING } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

interface Rule {
  label: string;
  // Returns true when the password satisfies this requirement.
  check: (pw: string, confirm: string) => boolean;
}

// Validation rules evaluated in real time as the user types.
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
  const { colors } = useTheme();

  // userType is forwarded to the success screen so it can route correctly.
  const { userType } = route.params || { userType: 'user' };

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  // True only when every rule passes; gates the submit button logic.
  const allPassed = rules.every(r => r.check(password, confirm));

  const handleReset = () => {
    if (!allPassed) {
      Alert.alert('Error', 'Please meet all security requirements.');
      return;
    }
    navigation.navigate('PasswordResetSuccess', { userType });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.SURFACE }]}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen illustration */}
        <View style={styles.iconContainer}>
          <Image
            source={require('../../../assets/images/create-new-password-top-icon.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Create New Password
        </Text>
        <Text style={[styles.subtitle, { color: colors.TEXT_SECONDARY }]}>
          Your new password must be unique and satisfy the security requirements
          below.
        </Text>

        <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>
          New Password
        </Text>
        <Input
          placeholder="SecureP@ss123"
          value={password}
          onChangeText={setPassword}
          isPassword
          showPasswordToggle
          autoCapitalize="none"
        />

        <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>
          Confirm New Password
        </Text>
        <Input
          placeholder="••••••••••••"
          value={confirm}
          onChangeText={setConfirm}
          isPassword
          showPasswordToggle
          autoCapitalize="none"
        />

        {/* Live security checklist; each row turns green when its rule passes */}
        <View
          style={[
            styles.requirementsCard,
            {
              backgroundColor: colors.SECONDARY_LIGHT,
              borderColor: 'rgba(7,136,44,0.15)',
            },
          ]}
        >
          <Text
            style={[styles.requirementsTitle, { color: colors.TEXT_PRIMARY }]}
          >
            Security Requirements
          </Text>

          {rules.map((rule, i) => {
            const passed = rule.check(password, confirm);
            return (
              <View key={i} style={styles.ruleRow}>
                {/* Circle indicator: grey when pending, green when passed */}
                <View
                  style={[
                    styles.ruleIcon,
                    { backgroundColor: colors.BORDER },
                    passed && styles.ruleIconPass,
                  ]}
                >
                  <Text style={styles.ruleIconText}>{passed ? '✓' : '○'}</Text>
                </View>
                <Text
                  style={[
                    styles.ruleLabel,
                    { color: colors.TEXT_SECONDARY },
                    passed && styles.ruleLabelPass,
                  ]}
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
  container: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.XXL,
  },
  iconContainer: { alignItems: 'center', marginBottom: SPACING.LG },
  icon: { width: 72, height: 72 },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: SPACING.XL,
    paddingHorizontal: SPACING.SM,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: SPACING.XS,
    marginTop: SPACING.SM,
  },
  requirementsCard: {
    borderRadius: BORDER_RADIUS.XL,
    padding: SPACING.LG,
    marginVertical: SPACING.LG,
    borderWidth: 1,
  },
  requirementsTitle: {
    fontSize: 13,
    fontWeight: '700',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleIconPass: { backgroundColor: '#07882C' },
  ruleIconText: { fontSize: 11, color: '#FFFFFF', fontWeight: '700' },
  ruleLabel: { fontSize: 13 },
  ruleLabelPass: { color: '#07882C', fontWeight: '600' },
});

export default CreateNewPasswordScreen;
