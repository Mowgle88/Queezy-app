import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import { LoadingOverlay } from "../../shared/ui";
import { UserData } from "../../shared/types";
import { createUser } from "../../shared/utils";
import { AuthContext, UserContext } from "../../store";
import { addUserToDatabase } from "../../shared/api";
import { AuthContent } from "./components";

const SignupScreen: React.FC = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  const signupHandler = async ({
    email,
    password,
    userName,
    date,
  }: UserData) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
      const userID = await addUserToDatabase({
        email,
        password,
        userName,
        date,
      });
      const userData = {
        userId: userID,
        email: email,
        password: password,
        userName: userName,
        date: date,
      };
      userCtx.setUser(userData);
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
