import { GestureResponderEvent, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { ReactNode, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthContext } from '../store/auth-context';
import IconButton from '../components/ui/IconButton';
import HomeScreen from '../screens/main/HomeScreen';
import SearchScreen from '../screens/main/SearchScreen';
import CreateQuizScreen from '../screens/main/CreateQuizScreen';
import AchievementsBoardScreen from '../screens/main/AchievementsBoardScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { MainStackParamList } from './types';
import { Colors } from '../constants/styles';
import TabBarIcon from '../components/ui/TabBarIcon';

const MainTab = createBottomTabNavigator<MainStackParamList>();

interface CustomTabBarButtonProps {
  children: ReactNode,
  onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void
}

function CustomTabBarButton({ children, onPress }: CustomTabBarButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.customTabBarButtonContainer, styles.shadow]}
      onPress={onPress}
    >
      <View style={styles.customTabBarButtonInnerContainer}>
        {children}
      </View>
    </TouchableOpacity>
  )
}

export default function MainTabs() {

  const authCtx = useContext(AuthContext);

  return (
    <MainTab.Navigator
      screenOptions={{
        headerRight: ({ tintColor }) => (
          <IconButton
            icon={'exit'}
            size={24}
            color={tintColor!}
            onPress={authCtx.logout}
          />
        ),
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          ...styles.shadow
        },
        tabBarItemStyle: {
          bottom: 15
        },
        tabBarBackground: () => (
          <Image
            source={require('../assets/Bottom-tabs.png')}
            resizeMode='cover'
            style={styles.tabBarImageBackground}
          />
        ),
      }}
    >
      <MainTab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} source={require('../assets/Home.png')} />
        )
      }} />
      <MainTab.Screen name="Search" component={SearchScreen} options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} source={require('../assets/Search.png')} />
        )
      }} />
      <MainTab.Screen name="CreateQuiz" component={CreateQuizScreen} options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon isCustom style={styles.customImage} source={require('../assets/Plus.png')} />
        ),
        tabBarButton: (props) => (
          <CustomTabBarButton {...props} />
        )
      }} />
      <MainTab.Screen name="Achievements" component={AchievementsBoardScreen} options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} source={require('../assets/Achievements.png')} />
        )
      }} />
      <MainTab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} source={require('../assets/Profile.png')} />
        )
      }} />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  customTabBarButtonContainer: {
    bottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customTabBarButtonInnerContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.royalBlue
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3
  },
  customImage: {
    width: 125,
    height: 125,
  },
  tabBarImageBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
})
