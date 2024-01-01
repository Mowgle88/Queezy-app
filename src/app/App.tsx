import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Root } from "#navigation";
import {
  AuthContextProvider,
  QuizContextProvider,
  UserContextProvider,
  persistor,
  store,
} from "../store";

const App: React.FC = () => {
  return (
    <>
      <SafeAreaProvider>
        <StatusBar />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthContextProvider>
              <UserContextProvider>
                <QuizContextProvider>
                  <GestureHandlerRootView style={styles.container}>
                    <Root />
                  </GestureHandlerRootView>
                </QuizContextProvider>
              </UserContextProvider>
            </AuthContextProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
