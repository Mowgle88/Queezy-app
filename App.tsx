import React, { useContext, useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient';

import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import HomeScreen from './screens/main/HomeScreen';
import { Colors } from './constants/styles';
import IconButton from './components/ui/IconButton';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import SearchScreen from './screens/main/SearchScreen';
import CreateQuizScreen from './screens/main/CreateQuizScreen';
import AchievementsBoardScreen from './screens/main/AchievementsBoardScreen';
import ProfileScreen from './screens/main/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import QuizDetailsScreen from './screens/QuizDetailsScreen';

export type RootStackParamList = {
  StartScreen: undefined,
  Login: undefined,
  Signup: undefined,
  Main: MainStackParamList,
  QuizDetails: undefined,
  Settings: undefined,
};

export type MainStackParamList = {
  Home: undefined,
  Search: undefined,
  CreateQuiz: undefined,
  Achievements: undefined,
  Profile: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainStackParamList>();

function AuthStack() {
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
        headerBackground: () => (
          <LinearGradient
            colors={['#9087E5', '#C4D0FB']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        headerRight: () => (
          <Image style={{ width: 35, height: 35 }} source={require('./assets/queezy.png')} />
        )
      }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{
        title: 'Sign Up',
        presentation: 'card',
        headerBackground: () => (
          <LinearGradient
            colors={['#9087E5', '#C4D0FB']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        headerRight: () => (
          <Image style={{ width: 35, height: 35 }} source={require('./assets/queezy.png')} />
        )
      }} />
    </Stack.Navigator>
  );
}

function MainTabs() {
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

function AuthenticatedStack() {

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

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {

      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(true);
    }

    fetchToken();
    SplashScreen.hide();
  }, [])

  useEffect(() => {
    if (isTryingLogin) {
      SplashScreen.hide();
    } else {
      SplashScreen.show();
    }
  }, [isTryingLogin])

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <>
      <StatusBar />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;

