import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CustomButton from '../ui/CustomButton';
import CustomInput from '../ui/CustomInput';

interface AuthFormProps {
  isLogin: boolean,
  onSubmit: (credentials: ICredentials) => void,
  credentialsInvalid: ICredentialsInvalid
}

export interface ICredentials {
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
}

export interface ICredentialsInvalid {
  userName: boolean,
  email: boolean,
  password: boolean,
  confirmPassword: boolean
}

function AuthForm(this: any, { isLogin, onSubmit, credentialsInvalid }: AuthFormProps) {
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

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case 'userName':
        setEnteredUserName(enteredValue);
        break;
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

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

  return (
    <View style={styles.form}>
      <View>
        {!isLogin && (
          <CustomInput
            label="User Name"
            onUpdateValue={updateInputValueHandler.bind(this, 'userName')}
            value={enteredUserName}
            keyboardType="email-address"
            isInvalid={userNameIsInvalid}
            secure={false}
            placeholder={'Your username'}
            source={require('../../assets/icons/Icon-user.svg')}
          />
        )}
        <CustomInput
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          secure={false}
          placeholder={'Your email address'}
          source={require('../../assets/icons/Icon-email.svg')}
        />
        <CustomInput
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
          keyboardType={'default'}
          secure={isSecurePassword}
          placeholder={'Your password'}
          isPassword
          onUpdateSecure={updateSecurePasswordHandler}
          source={require('../../assets/icons/Icon-password.svg')}
        />
        {!isLogin && (
          <CustomInput
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword'
            )}
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
            keyboardType={'default'}
            secure={isSecureConfirmPassword}
            placeholder={'Confirm password'}
            isPassword
            onUpdateSecure={updateSecureConfirmPasswordHandler}
            source={require('../../assets/icons/Icon-password.svg')}
          />
        )}
        <View style={styles.buttons}>
          <CustomButton onPress={submitHandler}>
            {isLogin ? 'Login' : 'Sign Up'}
          </CustomButton>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  form: {

  },
  buttons: {
    marginTop: 12,
  },
});
