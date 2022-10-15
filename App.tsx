import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Root from './navigation/Root';
import AuthContextProvider from './store/auth-context';
import UserContextProvider from './store/user-context';
import QuizContextProvider from './store/quiz-context';

const App = () => {
  return (
    <>
      <StatusBar />
      <AuthContextProvider>
        <UserContextProvider>
          <QuizContextProvider>
            <GestureHandlerRootView style={styles.container} >
              <Root />
            </GestureHandlerRootView>
          </QuizContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default App;

