import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

const ForgotPasswordScreen = ({ navigation, route }: any) => {
  const { userType } = route.params || { userType: 'user' };
  const [email, setEmail] = useState('');

  const handleSetResetLink = () => {
    // Validation
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Navigate to VerifyCode screen
    navigation.navigate('VerifyCode', { 
      email: email,
      userType: userType 
    });
  };

  const handleBackToSignIn = () => {
    // Go back to appropriate login screen
    if (userType === 'user') {
      navigation.navigate('LoginUser');
    } else {
      navigation.navigate('LoginGuardian');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>✉️</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Reset Password!</Text>
        <Text style={styles.subtitle}>We'll send you a reset link</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Set Reset Link Button */}
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={handleSetResetLink}
          activeOpacity={0.8}
        >
          <Text style={styles.resetButtonText}>Set Reset Link</Text>
        </TouchableOpacity>

        {/* Back to Sign In Link */}
        <TouchableOpacity onPress={handleBackToSignIn}>
          <Text style={styles.backToSignIn}>Back to Sign In</Text>
        </TouchableOpacity>
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
    paddingTop: 80,
    paddingBottom: 40,
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000000',
  },
  resetButton: {
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
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  backToSignIn: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;