import React, { useContext, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider, { AuthContext } from './store/auth-context';

import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import LoginOrSignupScreen from './screens/auth/LoginOrSignupScreen';
import HomeScreen from './screens/HomeScreen';
import { Colors } from './constants/styles';

export type RootStackParamList = {
  StartScreen: undefined,
  LoginOrSignupScreen: undefined,
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.grey5 },
        headerTintColor: Colors.black,
        contentStyle: { backgroundColor: Colors.grey5 },
      }}
    >
      <Stack.Screen name="StartScreen" component={StartScreen} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="LoginOrSignupScreen" component={LoginOrSignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(false);

  const authCtx = useContext(AuthContext);

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
