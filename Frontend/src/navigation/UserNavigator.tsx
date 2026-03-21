// src/navigation/UserNavigator.tsx
// ✅ All user screens + RobotConnectivityScreen + DisplayBrightnessScreen

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/user/HomeScreen';
import CasualConvoScreen from '../screens/user/CasualConvoScreen';
import ChatScreen from '../screens/user/ChatScreen';
import FocusModeScreen from '../screens/user/FocusModeScreen';
import TasksScreen from '../screens/user/TasksScreen';
import PlayGamesScreen from '../screens/user/PlayGamesScreen';
import PlayCalmMusicScreen from '../screens/user/PlayCalmMusicScreen';
import CalmingExercisesScreen from '../screens/user/CalmingExercisesScreen';
import SOSDetectionScreen from '../screens/user/SOSDetectionScreen';
import EmergencyContactsScreen from '../screens/user/EmergencyContactsScreen';
import AddNewContactScreen from '../screens/user/AddNewContactScreen';
import TherapeuticConversationsScreen from '../screens/user/TherapeuticConversationsScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import RobotConnectivityScreen from '../screens/user/RobotConnectivityScreen';
import DisplayBrightnessScreen from '../screens/user/DisplayBrightnessScreen'; // ✅ NEW

const Stack = createNativeStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CasualConvo" component={CasualConvoScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="FocusMode" component={FocusModeScreen} />
      <Stack.Screen name="Tasks" component={TasksScreen} />
      <Stack.Screen name="PlayGames" component={PlayGamesScreen} />
      <Stack.Screen name="PlayCalmMusic" component={PlayCalmMusicScreen} />
      <Stack.Screen
        name="CalmingExercises"
        component={CalmingExercisesScreen}
      />
      <Stack.Screen name="SOSDetection" component={SOSDetectionScreen} />
      <Stack.Screen
        name="EmergencyContacts"
        component={EmergencyContactsScreen}
      />
      <Stack.Screen name="AddNewContact" component={AddNewContactScreen} />
      <Stack.Screen
        name="TherapeuticConversations"
        component={TherapeuticConversationsScreen}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="RobotConnectivity"
        component={RobotConnectivityScreen}
      />
      {/* ✅ Display & Brightness screen */}
      <Stack.Screen name="Display" component={DisplayBrightnessScreen} />
    </Stack.Navigator>
  );
};

export default UserNavigator;
