import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { AuthContext } from "../store";
import { toastConfig } from "../shared/config";
import { AuthStack, AuthenticatedStack } from "./staks";

const Root: React.FC = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(true);
    };

    fetchToken();
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (isTryingLogin) {
      SplashScreen.hide();
    } else {
      SplashScreen.show();
    }
  }, [isTryingLogin]);

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default Root;
