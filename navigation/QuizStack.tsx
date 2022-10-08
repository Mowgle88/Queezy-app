import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuizStackParamList } from './types';
import QuizDetailsScreen from '../screens/game/QuizDetailsScreen';
import QuizGameScreen from '../screens/game/QuizGameScreen';
import QuizCompletedScreen from '../screens/game/QuizCompletedScreen';
import ReviewQuizScreen from '../screens/game/ReviewQuizScreen';

const Stack = createNativeStackNavigator<QuizStackParamList>();

export default function QuizStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="QuizDetails" component={QuizDetailsScreen} />
      <Stack.Screen name="QuizGame" component={QuizGameScreen} />
      <Stack.Screen name="QuizCompleted" component={QuizCompletedScreen} />
      <Stack.Screen name="ReviewQuiz" component={ReviewQuizScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})