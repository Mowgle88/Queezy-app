import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import AuthContextProvider from './store/auth-context';

import Root from './navigation/Root';

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

const styles = StyleSheet.create({});

export default App;

