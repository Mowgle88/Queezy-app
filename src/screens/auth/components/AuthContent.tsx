import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { AuthContentNativeStackProps } from "#navigation/types";
import { CustomButton } from "#ui";
import { Colors } from "#styles";
import { UserData } from "#types";
import AuthForm, { type ICredentials } from "./AuthForm";

interface AuthContentProps {
  isLogin: boolean;
  onAuthenticate: ({ email, password, userName, date }: UserData) => void;
}

const AuthContent: React.FC<AuthContentProps> = ({
  isLogin,
  onAuthenticate,
}) => {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const navigation = useNavigation<AuthContentNativeStackProps>();

  const switchAuthModeHandler = () => {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  };

  const submitHandler = (credentials: ICredentials) => {
    let { userName, email, password } = credentials;
    const { confirmPassword } = credentials;

    userName = userName.trim();
    email = email.trim();
    password = password.trim();
    const date = new Date().toISOString().slice(0, 10);

    const userNameIsValid = userName.length > 3;
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (
      (!isLogin && !userNameIsValid) ||
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && !passwordsAreEqual)
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        userName: !userNameIsValid,
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password, userName, date });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["#9087E5", "#C4D0FB"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardAvoidingView}>
          <View style={styles.authContent}>
            <AuthForm
              isLogin={isLogin}
              onSubmit={submitHandler}
              credentialsInvalid={credentialsInvalid}
            />
            <View style={styles.buttons}>
              <CustomButton mode="flat" onPress={switchAuthModeHandler}>
                {isLogin ? "Create a new user" : "Log in instead"}
              </CustomButton>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  authContent: {
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 20,
    backgroundColor: Colors.hawkesBlue,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  input: {
    height: 50,
    padding: 10,
    marginVertical: 20,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.royalBlue,
    backgroundColor: Colors.white,
  },
  buttons: {
    marginTop: 8,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
});

export default AuthContent;
