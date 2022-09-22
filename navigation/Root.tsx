import { StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AuthenticatedStack from './AuthenticatedStack';

export default function Root() {
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

const styles = StyleSheet.create({})