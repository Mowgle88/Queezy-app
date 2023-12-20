import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { AuthContext } from "#store";
import { toastConfig } from "#config";
import { AuthStack, AuthenticatedStack } from "./staks";

const Root: React.FC = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      SplashScreen.hide();
    };

    fetchToken();
  }, []);

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default Root;
