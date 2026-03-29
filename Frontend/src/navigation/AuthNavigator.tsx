// Stack navigator covering all authentication screens.
// Sits inside AppNavigator — not used directly but kept as a named
// export so it can be swapped in if the auth flow is ever split out.

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import LoginUserScreen from '../screens/auth/LoginUserScreen';
import LoginGuardianScreen from '../screens/auth/LoginGuardianScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';
import CreateNewPasswordScreen from '../screens/auth/CreateNewPasswordScreen';
import PasswordResetSuccessScreen from '../screens/auth/PasswordResetSuccessScreen';
import VerifyCodeScreen from '../screens/auth/VerifyCodeScreen';
import ConnectBeanScreen from '../screens/auth/ConnectBeanScreen';
import BeanConnectedScreen from '../screens/auth/BeanConnectedScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
    <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
    <Stack.Screen name="LoginUser" component={LoginUserScreen} />
    <Stack.Screen name="LoginGuardian" component={LoginGuardianScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
    <Stack.Screen
      name="CreateNewPassword"
      component={CreateNewPasswordScreen}
    />
    <Stack.Screen
      name="PasswordResetSuccess"
      component={PasswordResetSuccessScreen}
    />
    <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
    <Stack.Screen name="ConnectBean" component={ConnectBeanScreen} />
    <Stack.Screen name="BeanConnected" component={BeanConnectedScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
