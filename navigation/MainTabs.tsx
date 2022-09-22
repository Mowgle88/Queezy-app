import { StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthContext } from '../store/auth-context';
import IconButton from '../components/ui/IconButton';
import HomeScreen from '../screens/main/HomeScreen';
import SearchScreen from '../screens/main/SearchScreen';
import CreateQuizScreen from '../screens/main/CreateQuizScreen';
import AchievementsBoardScreen from '../screens/main/AchievementsBoardScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { MainStackParamList } from './types';

const MainTab = createBottomTabNavigator<MainStackParamList>();

export default function MainTabs() {

  const authCtx = useContext(AuthContext);

  return (
    <MainTab.Navigator
      screenOptions={{
        headerRight: ({ tintColor }) => <IconButton icon={'exit'} size={24} color={tintColor!} onPress={authCtx.logout} />
      }}
    >
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Search" component={SearchScreen} />
      <MainTab.Screen name="CreateQuiz" component={CreateQuizScreen} />
      <MainTab.Screen name="Achievements" component={AchievementsBoardScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({})
