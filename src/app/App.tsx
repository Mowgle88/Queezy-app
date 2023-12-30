import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Root } from "#navigation";
import {
  AuthContextProvider,
  QuizContextProvider,
  UserContextProvider,
} from "../store";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App: React.FC = () => {
  return (
    <>
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
