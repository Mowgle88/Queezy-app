import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Root } from "#navigation";
import {
  AuthContextProvider,
  QuizContextProvider,
  UserContextProvider,
} from "../store";

const App: React.FC = () => {
  return (
    <>
      <StatusBar />
      <AuthContextProvider>
        <UserContextProvider>
          <QuizContextProvider>
            <GestureHandlerRootView style={styles.container}>
              <Root />
            </GestureHandlerRootView>
          </QuizContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
