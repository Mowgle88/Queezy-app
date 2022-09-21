import React, { useContext, useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'

import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import { Colors } from './constants/styles';
import IconButton from './components/ui/IconButton';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import LinearGradient from 'react-native-linear-gradient';

export type RootStackParamList = {
  StartScreen: undefined,
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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

function AuthenticatedStack() {

  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: ({ tintColor }) => <IconButton icon={'exit'} size={24} color={tintColor!} onPress={authCtx.logout} />
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
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

