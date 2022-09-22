import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QuizDetailsScreen from '../screens/QuizDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MainTabs from './MainTabs';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthenticatedStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainTabs} options={{
        headerShown: false
      }}
      />
      <Stack.Screen name="QuizDetails" component={QuizDetailsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({})