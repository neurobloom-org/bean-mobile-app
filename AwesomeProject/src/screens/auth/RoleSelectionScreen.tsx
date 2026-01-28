import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';

type RoleType = 'user' | 'guardian' | null;

const RoleSelectionScreen = ({ navigation }: any) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);

  const handleContinue = () => {
    if (!selectedRole) {
      Alert.alert(
        'Select Your Role',
        'Please select either User or Guardian to continue.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Navigate to Create Account screen with selected role
    navigation.navigate('CreateAccount', { userType: selectedRole });
  };

  const handleSelectRole = (role: RoleType) => {
    setSelectedRole(role);
  };

  const handleSignIn = () => {
    // Navigate to appropriate login screen based on selection
    // Or show a modal to select role first
    if (selectedRole === 'user') {
      navigation.navigate('LoginUser');
    } else if (selectedRole === 'guardian') {
      navigation.navigate('LoginGuardian');
    } else {
      Alert.alert(
        'Select Your Role',
        'Please select your role to sign in.',
        [{ text: 'OK' }]
      );
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
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedRole && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          activeOpacity={0.8}
          disabled={!selectedRole}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

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
    marginBottom: 10,
  },
  backArrow: {
    fontSize: 28,
    color: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 30,
    lineHeight: 20,
  },
  rolesContainer: {
    gap: 16,
    marginBottom: 24,
  },
  roleCard: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  roleCardSelected: {
    borderColor: '#4ECCA3',
    backgroundColor: '#E8FAF4',
  },
  roleContent: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  roleTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 6,
  },
  roleSubtitle: {
    fontSize: 13,
    color: '#666666',
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
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectButtonActive: {
    backgroundColor: '#4ECCA3',
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  selectButtonTextActive: {
    color: '#FFFFFF',
  },
  continueButton: {
    backgroundColor: '#4ECCA3',
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#4ECCA3',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#D3D3D3',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#666666',
  },
  signInLink: {
    fontSize: 14,
    color: '#4169E1',
    fontWeight: '600',
  },
});

export default RoleSelectionScreen;