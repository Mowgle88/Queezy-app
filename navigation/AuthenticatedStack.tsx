import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QuizDetailsScreen from '../screens/game/QuizDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MainTabs from './MainTabs';
import { RootStackParamList } from './types';
import EditProfileScreen from '../screens/EditProfileScreen';
import { Colors } from '../constants/styles';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthenticatedStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainTabs} options={{
        headerShown: false
      }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{
        // headerShadowVisible: true,
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 24
        }
      }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{
        headerStyle: {
          backgroundColor: Colors.grey5
        },
        headerTitle: '',
        headerShadowVisible: false,
      }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({})