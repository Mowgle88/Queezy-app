import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { ICredentials, ICredentialsInvalid } from './auth/AuthForm';
import CustomButton from './ui/CustomButton';
import CustomInput from './ui/CustomInput';

interface EditProfileFormProps {
  isChangeUsername?: boolean,
  isChangeEmail?: boolean,
  isChangePassword?: boolean,
  onSubmit: (credentials: ICredentials) => void,
  credentialsInvalid: ICredentialsInvalid
}

export default function EditProfileForm(this: any, { isChangeUsername, isChangeEmail, isChangePassword, onSubmit, credentialsInvalid }: EditProfileFormProps) {
  const [enteredUserName, setEnteredUserName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);

  const {
    userName: userNameIsInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateSecurePasswordHandler() {
    setIsSecurePassword(!isSecurePassword)
  }

  function updateSecureConfirmPasswordHandler() {
    setIsSecureConfirmPassword(!isSecureConfirmPassword)
  }

  function submitHandler() {
    onSubmit({
      userName: enteredUserName,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  const updateUserNameHandler = (value: string) => setEnteredUserName(value);
  const updateEmailHandler = (value: string) => setEnteredEmail(value);
  const updatePasswordHandler = (value: string) => setEnteredPassword(value);
  const updateConfirmPasswordHandler = (value: string) => setEnteredConfirmPassword(value);

  return (
    <View style={styles.form}>
      <View>
        {isChangeUsername && (
          <CustomInput
            label=""
            onUpdateValue={updateUserNameHandler}
            value={enteredUserName}
            keyboardType="email-address"
            isInvalid={userNameIsInvalid}
            secure={false}
            placeholder={'Your username'}
            source={require('../assets/icons/Icon-user.svg')}
          />
        )}
        {isChangeEmail &&
          <CustomInput
            label=""
            onUpdateValue={updateEmailHandler}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
            secure={false}
            placeholder={'Your email address'}
            source={require('../assets/icons/Icon-email.svg')}
          />
        }
        {isChangePassword && (
          <>
            <CustomInput
              label=""
              onUpdateValue={updatePasswordHandler}
              value={enteredPassword}
              isInvalid={passwordIsInvalid}
              keyboardType={'default'}
              secure={isSecurePassword}
              placeholder={'Your password'}
              isPassword
              onUpdateSecure={updateSecurePasswordHandler}
              source={require('../assets/icons/Icon-password.svg')}
            />
            <CustomInput
              label="Confirm Password"
              onUpdateValue={updateConfirmPasswordHandler}
              value={enteredConfirmPassword}
              isInvalid={passwordsDontMatch}
              keyboardType={'default'}
              secure={isSecureConfirmPassword}
              placeholder={'Confirm password'}
              isPassword
              onUpdateSecure={updateSecureConfirmPasswordHandler}
              source={require('../assets/icons/Icon-password.svg')}
            />
          </>
        )}
      </View>
      <View style={styles.button}>
        <CustomButton onPress={submitHandler}>Confirm</CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 12,
  },
})