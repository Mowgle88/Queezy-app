import React, { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { LoadingOverlay } from "#ui";
import { login } from "#utils";
import { fetchUsers } from "#api";
import { AuthContent } from "./components";
import { authenticate, setUserData } from "#store/slices";

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signinHandler = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      dispatch(authenticate({ token }));
      const users = await fetchUsers();
      const userData = users.filter(userData => userData.email === email)[0];
      dispatch(setUserData(userData));
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!",
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message={"Logging you in..."} />;
  }

  return <AuthContent isLogin onAuthenticate={signinHandler} />;
};

export default LoginScreen;
