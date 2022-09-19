import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import CustomButton from '../ui/CustomButton';
import { Colors } from '../../constants/styles';
import AuthForm, { ICredentials } from './AuthForm';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

interface AuthContentProps {
  isLogin: boolean,
  onAuthenticate: ({ email, password }: { email: string, password: string }) => void
}

type NativeStackProps = NativeStackNavigationProp<RootStackParamList, 'Signup', 'Login'>;

function AuthContent({ isLogin, onAuthenticate }: AuthContentProps) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const navigation = useNavigation<NativeStackProps>();

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials: ICredentials) {
    let { userName, email, password, confirmPassword } = credentials;

    userName = userName.trim();
    email = email.trim();
    password = password.trim();

    const userNameIsValid = email.length > 3;
    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !userNameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && !passwordsAreEqual)
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        userName: !userNameIsValid,
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <CustomButton mode='flat' onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </CustomButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 100,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 20,
    backgroundColor: Colors.hawkesBlue,
    elevation: 2,
    shadowColor: 'black',
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
    backgroundColor: Colors.white
  },
  buttons: {
    marginTop: 8,
  },
});