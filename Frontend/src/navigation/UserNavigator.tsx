// Stack navigator for the authenticated user role.
// Screens are grouped by feature area. All headers are hidden; each
// screen renders its own custom header where one is needed.

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ── Core screens shown on the main dashboard ──────────────────────────────────
import HomeScreen from '../screens/user/HomeScreen';
import CasualConvoScreen from '../screens/user/CasualConvoScreen';
import ChatScreen from '../screens/user/ChatScreen';
import FocusModeScreen from '../screens/user/FocusModeScreen';
import TasksScreen from '../screens/user/TasksScreen';

// ── Wellness and activity screens ─────────────────────────────────────────────
import PlayGamesScreen from '../screens/user/PlayGamesScreen';
import PlayCalmMusicScreen from '../screens/user/PlayCalmMusicScreen';
import CalmingExercisesScreen from '../screens/user/CalmingExercisesScreen';
import TherapeuticConversationsScreen from '../screens/user/TherapeuticConversationsScreen';

// ── SOS and emergency contact management ─────────────────────────────────────
import SOSDetectionScreen from '../screens/user/SOSDetectionScreen';
import EmergencyContactsScreen from '../screens/user/EmergencyContactsScreen';
import AddNewContactScreen from '../screens/user/AddNewContactScreen';

// ── Profile, account details, and mood tracking ───────────────────────────────
import ProfileScreen from '../screens/user/ProfileScreen';
import AccountInformationScreen from '../screens/user/AccountInformationScreen';
import MoodCalendarScreen from '../screens/user/MoodCalendarScreen';

// ── Robot hardware and connectivity settings ──────────────────────────────────
import RobotConnectivityScreen from '../screens/user/RobotConnectivityScreen';
import DisplayBrightnessScreen from '../screens/user/DisplayBrightnessScreen';
// Three-step Bluetooth provisioning flow (Radar → Link → Success).
import BluetoothConnectivityScreen from '../screens/user/BluetoothConnectivityScreen';

// ── App settings screens reached from the dropdown menu ───────────────────────
import NotificationPreferencesScreen from '../screens/user/NotificationPreferencesScreen';
import PrivacySettingsScreen from '../screens/user/PrivacySettingsScreen';
import HelpCenterScreen from '../screens/user/HelpCenterScreen';

const Stack = createNativeStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* ── Core ── */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CasualConvo" component={CasualConvoScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="FocusMode" component={FocusModeScreen} />
      <Stack.Screen name="Tasks" component={TasksScreen} />

      {/* ── Activities ── */}
      <Stack.Screen name="PlayGames" component={PlayGamesScreen} />
      <Stack.Screen name="PlayCalmMusic" component={PlayCalmMusicScreen} />
      <Stack.Screen
        name="CalmingExercises"
        component={CalmingExercisesScreen}
      />
      <Stack.Screen
        name="TherapeuticConversations"
        component={TherapeuticConversationsScreen}
      />

      {/* ── SOS & Contacts ── */}
      <Stack.Screen name="SOSDetection" component={SOSDetectionScreen} />
      <Stack.Screen
        name="EmergencyContacts"
        component={EmergencyContactsScreen}
      />
      <Stack.Screen name="AddNewContact" component={AddNewContactScreen} />

      {/* ── Profile & Account ── */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AccountInfo" component={AccountInformationScreen} />
      <Stack.Screen name="MoodCalendar" component={MoodCalendarScreen} />

      {/* ── Robot Settings ── */}
      <Stack.Screen
        name="RobotConnectivity"
        component={RobotConnectivityScreen}
      />
      <Stack.Screen name="Display" component={DisplayBrightnessScreen} />
      {/* Reached from the dropdown menu "Connect Your Bean" item. */}
      <Stack.Screen
        name="BluetoothConnectivity"
        component={BluetoothConnectivityScreen}
      />

      {/* ── App Settings — dropdown menu destinations ── */}
      <Stack.Screen
        name="NotificationPreferences"
        component={NotificationPreferencesScreen}
      />
      <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
    </Stack.Navigator>
  );
};

export default UserNavigator;
