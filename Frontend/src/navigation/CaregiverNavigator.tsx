// src/navigation/CaregiverNavigator.tsx
// ✅ All caregiver screens — onboarding flow + dashboard + account

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EnterWardEmailScreen from '../screens/caregiver/EnterWardEmailScreen';
import VerifyPatientEmailScreen from '../screens/caregiver/VerifyPatientEmailScreen';
import VerificationSuccessfulScreen from '../screens/caregiver/VerificationSuccessfulScreen';
import CaregiverDashboard from '../screens/caregiver/CaregiverDashboard';
import CaregiverAccountScreen from '../screens/caregiver/CaregiverAccountScreen';

const Stack = createNativeStackNavigator();

const CaregiverNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* ── Guardian onboarding flow ── */}
      <Stack.Screen name="EnterWardEmail" component={EnterWardEmailScreen} />
      <Stack.Screen
        name="VerifyPatientEmail"
        component={VerifyPatientEmailScreen}
      />
      <Stack.Screen
        name="VerificationSuccessful"
        component={VerificationSuccessfulScreen}
      />

      {/* ── Caregiver Dashboard ── */}
      <Stack.Screen name="CaregiverDashboard" component={CaregiverDashboard} />

      {/* ── Account & Profile ── */}
      <Stack.Screen
        name="CaregiverAccount"
        component={CaregiverAccountScreen}
      />
    </Stack.Navigator>
  );
};

export default CaregiverNavigator;
