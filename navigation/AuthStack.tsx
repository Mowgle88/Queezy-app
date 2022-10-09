import { Image, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { Colors } from '../constants/styles';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

function HeaderBackground() {
  return (
    <LinearGradient
      colors={['#9087E5', '#C4D0FB']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />
  )
}

function HeaderRightImage() {
  return (
    <Image style={{ width: 35, height: 35 }} source={require('../assets/queezy.png')} />
  )
}

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.grey,
        headerTitleAlign: 'center',
        contentStyle: { backgroundColor: Colors.grey5 },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="StartScreen" component={StartScreen} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{
        headerBackground: () => <HeaderBackground />,
        headerRight: () => <HeaderRightImage />
      }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{
        title: 'Sign Up',
        presentation: 'card',
        headerBackground: () => <HeaderBackground />,
        headerRight: () => <HeaderRightImage />
      }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({})