import React, { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { LoadingOverlay } from "#ui";
import { UserData } from "#types";
import { createUser } from "#utils";
import { addUserToDatabase } from "#api";
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
      const token = await createUser(email, password);
      dispatch(authenticate({ token }));
      const userID = await addUserToDatabase({
        email,
        userName,
        date,
      });
      const userData = {
        userId: userID,
        email,
        userName,
        date,
      };
      dispatch(setUserData(userData));
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user. Please check your input andr try again later!",
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
