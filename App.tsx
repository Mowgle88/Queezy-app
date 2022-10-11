import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import AuthContextProvider from './store/auth-context';

import Root from './navigation/Root';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import UserContextProvider from './store/user-context';

const App = () => {
  return (
    <>
      <StatusBar />
      <AuthContextProvider>
        <UserContextProvider>
          <GestureHandlerRootView style={{ flex: 1 }} >
            <Root />
          </GestureHandlerRootView>
        </UserContextProvider>
      </AuthContextProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;

