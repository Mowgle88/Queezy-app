import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import { LoadingOverlay } from "../../shared/ui";
import { login } from "../../shared/utils";
import { fetchUsers } from "../../shared/api";
import { AuthContext, UserContext } from "../../store";
import { AuthContent } from "./components";

const LoginScreen: React.FC = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

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
      authCtx.authenticate(token);
      const users = await fetchUsers();
      const userData = users.filter(
        userData => userData.user.email === email,
      )[0];
      userCtx.setUser(userData.user);
      userCtx.setSettings(userData.settings);
      userCtx.setQuizData(userData.quizData);
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
