// src/screens/auth/RoleSelectionScreen.tsx
// ✅ Dark theme aware + white user icon in dark mode only

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { BackButton, PrimaryButton } from '../../components';
import { SPACING, TYPOGRAPHY } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

type RoleType = 'user' | 'guardian' | null;

const RoleSelectionScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme(); // ✅ added isDark
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);

  const handleContinue = () => {
    if (!selectedRole) {
      Alert.alert(
        'Select Your Role',
        'Please select either User or Guardian to continue.',
        [{ text: 'OK' }],
      );
      return;
    }
    navigation.navigate('CreateAccount', { userType: selectedRole });
  };

  const handleSignIn = () => {
    if (selectedRole === 'user') navigation.navigate('LoginUser');
    else if (selectedRole === 'guardian') navigation.navigate('LoginGuardian');
    else
      Alert.alert('Select Your Role', 'Please select your role to sign in.', [
        { text: 'OK' },
      ]);
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

        <Text style={[styles.title, { color: colors.TEXT_PRIMARY }]}>
          Welcome to Bean
        </Text>
        <Text style={[styles.subtitle, { color: colors.TEXT_PRIMARY }]}>
          Who are you?
        </Text>
        <Text style={[styles.description, { color: colors.TEXT_SECONDARY }]}>
          Select your role to personalize your experience with Bean.
        </Text>

        <View style={styles.rolesContainer}>
          {/* I am a User */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              { borderColor: colors.BLACK, backgroundColor: colors.SURFACE },
              selectedRole === 'user' && {
                borderColor: colors.PRIMARY,
                backgroundColor: colors.SECONDARY_LIGHT,
              },
            ]}
            onPress={() => setSelectedRole('user')}
            activeOpacity={0.8}
          >
            <View style={styles.roleContent}>
              <View style={styles.roleTextContainer}>
                <Text
                  style={[styles.roleTitle, { color: colors.TEXT_PRIMARY }]}
                >
                  I am a User
                </Text>
                <Text
                  style={[
                    styles.roleSubtitle,
                    { color: colors.TEXT_SECONDARY },
                  ]}
                >
                  I want to manage my wellness with Bean.
                </Text>
              </View>
              <View style={styles.roleIconContainer}>
                <Image
                  source={
                    selectedRole === 'user'
                      ? require('../../../assets/images/select-user-green.png')
                      : require('../../../assets/images/select-user.png')
                  }
                  // ✅ white tint when unselected in dark mode
                  style={[
                    styles.roleIcon,
                    isDark &&
                      selectedRole !== 'user' && { tintColor: '#FFFFFF' },
                  ]}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View
              style={[
                styles.selectButton,
                { backgroundColor: colors.BLACK },
                selectedRole === 'user' && { backgroundColor: colors.PRIMARY },
              ]}
            >
              <Text style={[styles.selectButtonText, { color: colors.WHITE }]}>
                {selectedRole === 'user' ? 'Selected ✓' : 'Select'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* I am a Guardian — unchanged */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              { borderColor: colors.BLACK, backgroundColor: colors.SURFACE },
              selectedRole === 'guardian' && {
                borderColor: colors.PRIMARY,
                backgroundColor: colors.SECONDARY_LIGHT,
              },
            ]}
            onPress={() => setSelectedRole('guardian')}
            activeOpacity={0.8}
          >
            <View style={styles.roleContent}>
              <View style={styles.roleTextContainer}>
                <Text
                  style={[styles.roleTitle, { color: colors.TEXT_PRIMARY }]}
                >
                  I am a Guardian
                </Text>
                <Text
                  style={[
                    styles.roleSubtitle,
                    { color: colors.TEXT_SECONDARY },
                  ]}
                >
                  I want to support someone's journey.
                </Text>
              </View>
              <View style={styles.roleIconContainer}>
                <Image
                  source={
                    selectedRole === 'guardian'
                      ? require('../../../assets/images/select-guardian-green.png')
                      : require('../../../assets/images/select-guardian.png')
                  }
                  style={styles.roleIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View
              style={[
                styles.selectButton,
                { backgroundColor: colors.BLACK },
                selectedRole === 'guardian' && {
                  backgroundColor: colors.PRIMARY,
                },
              ]}
            >
              <Text style={[styles.selectButtonText, { color: colors.WHITE }]}>
                {selectedRole === 'guardian' ? 'Selected ✓' : 'Select'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
          disabled={!selectedRole}
        />

        <View style={styles.signInContainer}>
          <Text style={[styles.signInText, { color: colors.TEXT_SECONDARY }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={[styles.signInLink, { color: colors.LINK }]}>
              Sign in
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
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.XXL,
  },
  title: { ...TYPOGRAPHY.H2, textAlign: 'center', marginBottom: SPACING.XL },
  subtitle: { ...TYPOGRAPHY.H1, marginBottom: SPACING.MD },
  description: {
    ...TYPOGRAPHY.BODY,
    marginBottom: SPACING.XXL,
    lineHeight: 20,
  },
  rolesContainer: { gap: SPACING.LG, marginBottom: SPACING.XL },
  roleCard: {
    borderWidth: 2,
    borderRadius: SPACING.XL,
    padding: SPACING.XL,
  },
  roleContent: {
    flexDirection: 'row',
    marginBottom: SPACING.LG,
    alignItems: 'center',
  },
  roleTextContainer: { flex: 1, marginRight: SPACING.LG },
  roleTitle: { ...TYPOGRAPHY.H4, marginBottom: SPACING.XS },
  roleSubtitle: { ...TYPOGRAPHY.CAPTION, lineHeight: 18 },
  roleIconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleIcon: { width: 70, height: 70 },
  selectButton: {
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.XL,
    borderRadius: SPACING.XL,
    alignSelf: 'flex-start',
  },
  selectButtonText: { ...TYPOGRAPHY.BODY, fontWeight: '600' },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.LG,
  },
  signInText: { ...TYPOGRAPHY.BODY },
  signInLink: { ...TYPOGRAPHY.BODY, fontWeight: '600' },
});

export default RoleSelectionScreen;
