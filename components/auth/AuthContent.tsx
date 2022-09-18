import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CustomButton from '../ui/CustomButton';
import { Colors } from '../../constants/styles';
import AuthForm from './AuthForm';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

interface AuthContentProps {
  isLogin: boolean,
}

type NativeStackProps = NativeStackNavigationProp<RootStackParamList, 'Signup', 'Login'>;

function AuthContent({ isLogin }: AuthContentProps) {
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

  function submitHandler() {
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