import React, { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { LoadingOverlay } from "#ui";
import { UserData } from "#types";
import { createUser, signUp } from "#utils";
import { AuthContent } from "./components";
import { authenticate, setUserData } from "#store/slices";

const SignupScreen: React.FC = () => {
  const dispatch = useDispatch();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signupHandler = async ({
    email,
    password,
    userName,
    date,
  }: UserData) => {
    setIsAuthenticating(true);
    try {
      const { userId, token } = await signUp(email, password);
      const userData = await createUser({
        userId,
        email,
        userName,
        date,
      });
      dispatch(authenticate({ token }));
      dispatch(setUserData(userData));
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user. Please check your input and try again later!",
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating user..."} />;
  }

  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
};

export default SignupScreen;
