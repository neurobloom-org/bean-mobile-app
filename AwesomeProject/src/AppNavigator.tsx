import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/onboarding/SplashScreen';
import WelcomeScreen from './screens/onboarding/WelcomeScreen';
import FeaturesScreen from './screens/onboarding/FeaturesScreen';
import PrivacyScreen from './screens/onboarding/PrivacyScreen';
import RoleSelectionScreen from './screens/auth/RoleSelectionScreen';
import CreateAccountScreen from './screens/auth/CreateAccountScreen';
import LoginUserScreen from './screens/auth/LoginUserScreen';
import LoginGuardianScreen from './screens/auth/LoginGuardianScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
import VerifyCodeScreen from './screens/auth/VerifyCodeScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import FocusModeScreen from './screens/FocusModeScreen';
import TasksScreen from './screens/TasksScreen';
import CaregiverDashboard from './screens/CaregiverDashboard';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
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
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="FocusMode" component={FocusModeScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen
          name="CaregiverDashboard"
          component={CaregiverDashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
