// src/screens/auth/RoleSelectionScreen.tsx
// ✅ REFACTORED VERSION

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
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

type RoleType = 'user' | 'guardian' | null;

const RoleSelectionScreen = ({ navigation }: any) => {
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

  const handleSelectRole = (role: RoleType) => {
    setSelectedRole(role);
  };

  const handleSignIn = () => {
    if (selectedRole === 'user') {
      navigation.navigate('LoginUser');
    } else if (selectedRole === 'guardian') {
      navigation.navigate('LoginGuardian');
    } else {
      Alert.alert('Select Your Role', 'Please select your role to sign in.', [
        { text: 'OK' },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <BackButton />

        {/* Title */}
        <Text style={styles.title}>Welcome to Bean</Text>
        <Text style={styles.subtitle}>Who are you?</Text>
        <Text style={styles.description}>
          Select your role to personalize your experience with Bean.
        </Text>

        {/* Role Selection Boxes */}
        <View style={styles.rolesContainer}>
          {/* I am a User */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === 'user' && styles.roleCardSelected,
            ]}
            onPress={() => handleSelectRole('user')}
            activeOpacity={0.8}
          >
            <View style={styles.roleContent}>
              <View style={styles.roleTextContainer}>
                <Text style={styles.roleTitle}>I am a User</Text>
                <Text style={styles.roleSubtitle}>
                  I want to manage my wellness with Bean.
                </Text>
              </View>

              <View style={styles.roleIconContainer}>
                <Image
                  source={
                    selectedRole === 'user'
                      ? require('../../assets/images/select-user-green.png')
                      : require('../../assets/images/select-user.png')
                  }
                  style={styles.roleIcon}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Select Button */}
            <View
              style={[
                styles.selectButton,
                selectedRole === 'user' && styles.selectButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.selectButtonText,
                  selectedRole === 'user' && styles.selectButtonTextActive,
                ]}
              >
                {selectedRole === 'user' ? 'Selected ✓' : 'Select'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* I am a Guardian */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === 'guardian' && styles.roleCardSelected,
            ]}
            onPress={() => handleSelectRole('guardian')}
            activeOpacity={0.8}
          >
            <View style={styles.roleContent}>
              <View style={styles.roleTextContainer}>
                <Text style={styles.roleTitle}>I am a Guardian</Text>
                <Text style={styles.roleSubtitle}>
                  I want to support someone's journey.
                </Text>
              </View>

              <View style={styles.roleIconContainer}>
                <Image
                  source={
                    selectedRole === 'guardian'
                      ? require('../../assets/images/select-guardian-green.png')
                      : require('../../assets/images/select-guardian.png')
                  }
                  style={styles.roleIcon}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Select Button */}
            <View
              style={[
                styles.selectButton,
                selectedRole === 'guardian' && styles.selectButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.selectButtonText,
                  selectedRole === 'guardian' && styles.selectButtonTextActive,
                ]}
              >
                {selectedRole === 'guardian' ? 'Selected ✓' : 'Select'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <PrimaryButton
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
          disabled={!selectedRole}
        />

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signInLink}>Sign in</Text>
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
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.XXL,
  },
  title: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.XL,
  },
  subtitle: {
    ...TYPOGRAPHY.H1,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  description: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XXL,
    lineHeight: 20,
  },
  rolesContainer: {
    gap: SPACING.LG,
    marginBottom: SPACING.XL,
  },
  roleCard: {
    borderWidth: 2,
    borderColor: COLORS.BLACK,
    borderRadius: SPACING.XL,
    padding: SPACING.XL,
    backgroundColor: COLORS.WHITE,
  },
  roleCardSelected: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  roleContent: {
    flexDirection: 'row',
    marginBottom: SPACING.LG,
    alignItems: 'center',
  },
  roleTextContainer: {
    flex: 1,
    marginRight: SPACING.LG,
  },
  roleTitle: {
    ...TYPOGRAPHY.H4,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  roleSubtitle: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 18,
  },
  roleIconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleIcon: {
    width: 70,
    height: 70,
  },
  selectButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.XL,
    borderRadius: SPACING.XL,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectButtonActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  selectButtonText: {
    color: COLORS.WHITE,
    ...TYPOGRAPHY.BODY,
    fontWeight: '600',
  },
  selectButtonTextActive: {
    color: COLORS.WHITE,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.LG,
  },
  signInText: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
  },
  signInLink: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.LINK,
    fontWeight: '600',
  },
});

export default RoleSelectionScreen;
