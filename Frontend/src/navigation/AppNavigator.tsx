// src/navigation/AppNavigator.tsx
// ✅ Uses UserNavigator for all user screens

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Onboarding
import SplashScreen from '../screens/onboarding/SplashScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import FeaturesScreen from '../screens/onboarding/FeaturesScreen';
import PrivacyScreen from '../screens/onboarding/PrivacyScreen';

// Auth
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import ConnectBeanScreen from '../screens/auth/ConnectBeanScreen';
import BeanConnectedScreen from '../screens/auth/BeanConnectedScreen';
import LoginUserScreen from '../screens/auth/LoginUserScreen';
import LoginGuardianScreen from '../screens/auth/LoginGuardianScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import VerifyCodeScreen from '../screens/auth/VerifyCodeScreen';

// Navigators
import UserNavigator from './UserNavigator';
import CaregiverDashboard from '../screens/caregiver/CaregiverDashboard';

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

        {/* ── Auth ── */}
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="ConnectBean" component={ConnectBeanScreen} />
        <Stack.Screen name="BeanConnected" component={BeanConnectedScreen} />
        <Stack.Screen name="LoginUser" component={LoginUserScreen} />
        <Stack.Screen name="LoginGuardian" component={LoginGuardianScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />

        {/* ✅ User screens — all handled by UserNavigator */}
        <Stack.Screen name="UserApp" component={UserNavigator} />

        {/* ── Caregiver ── */}
        <Stack.Screen
          name="CaregiverDashboard"
          component={CaregiverDashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
