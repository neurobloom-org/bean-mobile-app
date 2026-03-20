// src/navigation/UserNavigator.tsx
// ✅ All user screens including CasualConvoScreen + PlayGamesScreen

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/user/HomeScreen';
import CasualConvoScreen from '../screens/user/CasualConvoScreen';
import ChatScreen from '../screens/user/ChatScreen';
import FocusModeScreen from '../screens/user/FocusModeScreen';
import TasksScreen from '../screens/user/TasksScreen';
import PlayGamesScreen from '../screens/user/PlayGamesScreen';

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
    </Stack.Navigator>
  );
};

export default UserNavigator;
