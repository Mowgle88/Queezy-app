import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CustomButton, CustomInput } from "#ui";
import { ICredentialsInvalid } from "#types";
import { formIcons } from "#constants";

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (credentials: ICredentials) => void;
  credentialsInvalid: ICredentialsInvalid;
}

export interface ICredentials {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function AuthForm(
  this: any,
  { isLogin, onSubmit, credentialsInvalid }: AuthFormProps,
) {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);

  const {
    userName: userNameIsInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case "userName":
        setEnteredUserName(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function updateSecurePasswordHandler() {
    setIsSecurePassword(!isSecurePassword);
  }

  function updateSecureConfirmPasswordHandler() {
    setIsSecureConfirmPassword(!isSecureConfirmPassword);
  }

  function submitHandler() {
    onSubmit({
      userName: enteredUserName,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View>
      <View>
        {!isLogin && (
          <CustomInput
            label="User Name"
            onUpdateValue={updateInputValueHandler.bind(this, "userName")}
            value={enteredUserName}
            keyboardType="email-address"
            isInvalid={userNameIsInvalid}
            secure={false}
            placeholder={"Your username"}
            source={formIcons.User}
          />
        )}
        <CustomInput
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          secure={false}
          placeholder={"Your email address"}
          source={formIcons.Email}
        />
        <CustomInput
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
          keyboardType={"default"}
          secure={isSecurePassword}
          placeholder={"Your password"}
          isPassword
          onUpdateSecure={updateSecurePasswordHandler}
          source={formIcons.Password}
        />
        {!isLogin && (
          <CustomInput
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword",
            )}
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
            keyboardType={"default"}
            secure={isSecureConfirmPassword}
            placeholder={"Confirm password"}
            isPassword
            onUpdateSecure={updateSecureConfirmPasswordHandler}
            source={formIcons.Password}
          />
        )}
        <View style={styles.buttons}>
          <CustomButton onPress={submitHandler}>
            {isLogin ? "Login" : "Sign Up"}
          </CustomButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});

export default AuthForm;
