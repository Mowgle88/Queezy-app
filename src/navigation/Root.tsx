import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { toastConfig } from "#config";
import { AuthStack, AuthenticatedStack } from "./staks";
import { selectors } from "#store/selectors";

const Root: React.FC = () => {
  const { isAuthenticated } = useSelector(selectors.auth);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default Root;
