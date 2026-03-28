// Root navigator for the entire application.
// Manages the top-level screen stack covering onboarding, authentication,
// the forgot-password flow, and the two role-specific sub-navigators.

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Onboarding screens shown on first launch.
import SplashScreen from '../screens/onboarding/SplashScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import FeaturesScreen from '../screens/onboarding/FeaturesScreen';
import PrivacyScreen from '../screens/onboarding/PrivacyScreen';

// Authentication screens shared by both user roles.
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import ConnectBeanScreen from '../screens/auth/ConnectBeanScreen';
import BeanConnectedScreen from '../screens/auth/BeanConnectedScreen';
import LoginUserScreen from '../screens/auth/LoginUserScreen';
import LoginGuardianScreen from '../screens/auth/LoginGuardianScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import VerifyCodeScreen from '../screens/auth/VerifyCodeScreen';

// Forgot-password flow: OTP entry → new password → success confirmation.
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';
import CreateNewPasswordScreen from '../screens/auth/CreateNewPasswordScreen';
import PasswordResetSuccessScreen from '../screens/auth/PasswordResetSuccessScreen';

// Role-specific sub-navigators. Each owns its own screen stack.
import UserNavigator from './UserNavigator';
import CaregiverNavigator from './CaregiverNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {/* ── Onboarding ── */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Features" component={FeaturesScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />

        {/* ── Authentication ── */}
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="ConnectBean" component={ConnectBeanScreen} />
        <Stack.Screen name="BeanConnected" component={BeanConnectedScreen} />
        <Stack.Screen name="LoginUser" component={LoginUserScreen} />
        <Stack.Screen name="LoginGuardian" component={LoginGuardianScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />

        {/* ── Forgot-password flow ── */}
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerificationScreen}
        />
        <Stack.Screen
          name="CreateNewPassword"
          component={CreateNewPasswordScreen}
        />
        <Stack.Screen
          name="PasswordResetSuccess"
          component={PasswordResetSuccessScreen}
        />

        {/* ── Role-specific app shells ── */}
        {/* All user screens are handled inside UserNavigator. */}
        <Stack.Screen name="UserApp" component={UserNavigator} />
        {/* All caregiver screens are handled inside CaregiverNavigator. */}
        <Stack.Screen name="CaregiverApp" component={CaregiverNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
