import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthenticatedStackParamList } from './types';
import MainTabs from './MainTabs';
import SettingsScreen from '../screens/settings/SettingsScreen';
import EditProfileScreen from '../screens/settings/EditProfileScreen';
import QuizDetailsScreen from '../screens/game/QuizDetailsScreen';
import QuizGameScreen from '../screens/game/QuizGameScreen';
import QuizCompletedScreen from '../screens/game/QuizCompletedScreen';
import ReviewQuizScreen from '../screens/game/ReviewQuizScreen';
import { Colors } from '../constants/styles';

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

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
      <Stack.Screen name="QuizDetails" component={QuizDetailsScreen} options={{
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="QuizGame" component={QuizGameScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="QuizCompleted" component={QuizCompletedScreen} options={{
        headerBackVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 24
        },
        headerShadowVisible: false,
      }} />
      <Stack.Screen name="ReviewQuiz" component={ReviewQuizScreen} options={{
        title: 'Review Answers',
        headerBackVisible: false,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({})