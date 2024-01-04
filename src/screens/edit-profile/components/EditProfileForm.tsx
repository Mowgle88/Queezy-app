import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { CustomButton, CustomInput, RadioButtons } from "#ui";
import { difficultyData, DifficultyData, formIcons } from "#constants";
import { ICredentialsInvalid } from "#types";
import { selectors } from "#store/selectors";

interface EditProfileFormProps {
  isChangeUsername?: boolean;
  isChangeEmail?: boolean;
  isChangePassword?: boolean;
  isChangeDifficulty?: boolean;
  onSubmit: (credentials: IDataToEdit) => void;
  credentialsInvalid: ICredentialsInvalid;
}

export interface IDataToEdit {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  difficulty?: DifficultyData;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  isChangeUsername,
  isChangeEmail,
  isChangePassword,
  isChangeDifficulty,
  onSubmit,
  credentialsInvalid,
}) => {
  const settings = useSelector(selectors.settings);

  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyData | null>(null);
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);

  const {
    userName: userNameIsInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  const updateSecurePasswordHandler = () => {
    setIsSecurePassword(!isSecurePassword);
  };

  const updateSecureConfirmPasswordHandler = () => {
    setIsSecureConfirmPassword(!isSecureConfirmPassword);
  };

  const submitHandler = () => {
    onSubmit({
      userName: enteredUserName,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      difficulty: selectedDifficulty!,
    });
  };

  return (
    <View style={styles.form}>
      <View>
        {isChangeUsername && (
          <CustomInput
            label=""
            onUpdateValue={setEnteredUserName}
            value={enteredUserName}
            keyboardType="email-address"
            isInvalid={userNameIsInvalid}
            secure={false}
            placeholder={"Your username"}
            source={formIcons.User}
          />
        )}
        {isChangeEmail && (
          <CustomInput
            label=""
            onUpdateValue={setEnteredEmail}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
            secure={false}
            placeholder={"Your email address"}
            source={formIcons.Email}
          />
        )}
        {isChangePassword && (
          <>
            <CustomInput
              label=""
              onUpdateValue={setEnteredPassword}
              value={enteredPassword}
              isInvalid={passwordIsInvalid}
              keyboardType={"default"}
              secure={isSecurePassword}
              placeholder={"Your password"}
              isPassword
              onUpdateSecure={updateSecurePasswordHandler}
              source={formIcons.Password}
            />
            <CustomInput
              label="Confirm Password"
              onUpdateValue={setEnteredConfirmPassword}
              value={enteredConfirmPassword}
              isInvalid={passwordsDontMatch}
              keyboardType={"default"}
              secure={isSecureConfirmPassword}
              placeholder={"Confirm password"}
              isPassword
              onUpdateSecure={updateSecureConfirmPasswordHandler}
              source={formIcons.Password}
            />
          </>
        )}
        {isChangeDifficulty && (
          <RadioButtons
            passValue={value => {
              setSelectedDifficulty(value);
            }}
            defaultValue={settings.difficulty}
            radioButtons={difficultyData}
          />
        )}
      </View>
      <View style={styles.button}>
        <CustomButton onPress={submitHandler}>Confirm</CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "space-between",
  },
  button: {
    marginTop: 12,
  },
  radioButtonsContainer: {
    marginTop: 50,
  },
});

export default EditProfileForm;
