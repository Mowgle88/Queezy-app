import React, { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { LoadingOverlay } from "#ui";
import { createUser, login, signInWithGoogle } from "#utils";
import { fetchUser } from "#api";
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
      const { userId, token } = await login(email, password);
      const user = await fetchUser(userId);
      dispatch(authenticate({ token }));
      dispatch(setUserData(user));
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!",
      );
      setIsAuthenticating(false);
    }
  };

  const signinWithGoogleHandler = async () => {
    try {
      setIsAuthenticating(true);
      const { userData, token } = await signInWithGoogle();

      let user = await fetchUser(userData.userId);

      if (!user) {
        user = await createUser(userData);
      }

      dispatch(authenticate({ token }));
      dispatch(setUserData(user));
    } catch (error: any) {
      Alert.alert("An error occurred", error.message);
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message={"Logging you in..."} />;
  }

  return (
    <AuthContent
      isLogin
      onAuthenticate={signinHandler}
      onSignInWithGoogle={signinWithGoogleHandler}
    />
  );
};

export default LoginScreen;
