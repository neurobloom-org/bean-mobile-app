import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
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
import ChatScreen from './screens/ChatScreen'; // NEW IMPORT
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
        {/* Onboarding Screens */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Features" component={FeaturesScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        {/* Authentication Screens */}
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="LoginUser" component={LoginUserScreen} />
        <Stack.Screen name="LoginGuardian" component={LoginGuardianScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
        {/* Main App Screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            animation: 'slide_from_right', // Smooth transition
          }}
        />{' '}
        {/* NEW SCREEN */}
        <Stack.Screen name="FocusMode" component={FocusModeScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        {/* Caregiver Screens */}
        <Stack.Screen
          name="CaregiverDashboard"
          component={CaregiverDashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
