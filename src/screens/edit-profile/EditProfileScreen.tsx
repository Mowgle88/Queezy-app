import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "#styles";
import {
  EditProfileScreenNavigationProp,
  EditProfileScreenRouteProp,
} from "#navigation/types";
import { EditProfileForm, type IDataToEdit } from "./components";
import {
  changeEmail,
  changePassword,
  updateInfo,
  updateSettings,
} from "#utils";
import { selectors } from "#store/selectors";

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const route = useRoute<EditProfileScreenRouteProp>();
  const screenType = route.params.screenType;

  const dispatch = useDispatch();
  const user = useSelector(selectors.user);

  const [isChangeUsername, setIsChangeUsername] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isChangeDifficulty, setIsChangeDifficulty] = useState(false);

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    switch (screenType) {
      case "profile":
        setIsChangeUsername(true);
        break;
      case "email":
        setIsChangeEmail(true);
        break;
      case "password":
        setIsChangePassword(true);
        break;
      case "difficulty":
        setIsChangeDifficulty(true);
        break;
    }
  }, [screenType]);

  const submitHandler = (credentials: IDataToEdit) => {
    let { userName, email, password } = credentials;
    const { confirmPassword, difficulty } = credentials;

    userName = userName.trim();
    email = email.trim();
    password = password.trim();
    const date = new Date().toISOString().slice(0, 10);

    const userNameIsValid = userName.length > 3;
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    const isValidUserName = isChangeUsername && !userNameIsValid;
    const isValidEmail = isChangeEmail && !emailIsValid;
    const isValidPassword =
      (isChangePassword && !passwordIsValid) || !passwordsAreEqual;

    if (isValidUserName || isValidEmail || isValidPassword) {
      Toast.show({
        type: "error",
        text1: "Please check your entered credentials",
      });
      setCredentialsInvalid({
        userName: !userNameIsValid,
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }

    switch (screenType) {
      case "profile":
        updateInfo({ userName }, dispatch);
        break;
      case "email":
        changeEmail({ email }, dispatch);
        break;
      case "password":
        changePassword({ password, date }, dispatch);
        break;
      case "difficulty":
        updateSettings({ difficulty }, dispatch);
        break;
    }
    navigation.goBack();

    const valueChange = userName
      ? "Username"
      : email
        ? "Email"
        : password
          ? "Password"
          : "Difficulty";

    Toast.show({
      type: "success",
      text1: `${valueChange} changed successfully`,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Change
          {isChangeUsername && " username"}
          {isChangeEmail && " email"}
          {isChangePassword && " password"}
          {isChangeDifficulty && " difficulty"}
        </Text>
        {isChangeUsername && (
          <Text style={styles.text}>Current username: {user.userName}</Text>
        )}
        {isChangeEmail && (
          <Text style={styles.text}>Current email: {user.email}</Text>
        )}
      </View>
      <EditProfileForm
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
        isChangeUsername={isChangeUsername}
        isChangeEmail={isChangeEmail}
        isChangePassword={isChangePassword}
        isChangeDifficulty={isChangeDifficulty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey5,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  textContainer: {
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    color: Colors.grey,
    textAlign: "center",
  },
  text: {
    marginVertical: 10,
    fontSize: 16,
    color: Colors.grey2,
    textAlign: "center",
  },
});

export default EditProfileScreen;
