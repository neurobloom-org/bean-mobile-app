// src/navigation/CaregiverNavigator.tsx
// Stack navigator for the caregiver/therapist role.
// All caregiver screens — onboarding flow + dashboard.
// No NavigationContainer here — that lives only in AppNavigator.

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EnterWardEmailScreen from '../screens/caregiver/EnterWardEmailScreen';
import VerifyPatientEmailScreen from '../screens/caregiver/VerifyPatientEmailScreen';
import VerificationSuccessfulScreen from '../screens/caregiver/VerificationSuccessfulScreen';
import CaregiverDashboard from '../screens/caregiver/CaregiverDashboard';
import CaregiverAccountScreen from '../screens/caregiver/CaregiverAccountScreen';

const Stack = createNativeStackNavigator();

const CaregiverNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* Guardian onboarding — links guardian to their patient */}
    <Stack.Screen name="EnterWardEmail" component={EnterWardEmailScreen} />
    <Stack.Screen
      name="VerifyPatientEmail"
      component={VerifyPatientEmailScreen}
    />
    <Stack.Screen
      name="VerificationSuccessful"
      component={VerificationSuccessfulScreen}
    />

    {/* Main caregiver dashboard */}
    <Stack.Screen name="CaregiverDashboard" component={CaregiverDashboard} />

    {/* Account & profile settings — opened from the hamburger menu */}
    <Stack.Screen name="CaregiverAccount" component={CaregiverAccountScreen} />
  </Stack.Navigator>
);

export default CaregiverNavigator;
