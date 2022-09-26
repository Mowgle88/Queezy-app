import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import AuthContextProvider from './store/auth-context';

import Root from './navigation/Root';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <>
      <StatusBar />
      <AuthContextProvider>
        <GestureHandlerRootView style={{ flex: 1 }} >
          <Root />
        </GestureHandlerRootView>
      </AuthContextProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;

