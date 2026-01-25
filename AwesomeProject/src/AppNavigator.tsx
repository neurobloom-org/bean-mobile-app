import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import FeaturesScreen from './screens/FeaturesScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import LoginUserScreen from './screens/LoginUserScreen';
import LoginGuardianScreen from './screens/LoginGuardianScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import VerifyCodeScreen from './screens/VerifyCodeScreen';
import HomeScreen from './screens/HomeScreen';
import FocusModeScreen from './screens/FocusModeScreen';
import TasksScreen from './screens/TasksScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Features" component={FeaturesScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="LoginUser" component={LoginUserScreen} />
        <Stack.Screen name="LoginGuardian" component={LoginGuardianScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FocusMode" component={FocusModeScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
