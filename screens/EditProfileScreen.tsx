import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../constants/styles';
import { AuthContext } from '../store/auth-context';
import EditProfileForm from '../components/EditProfileForm';
import { ICredentials } from '../components/auth/AuthForm';
import { EditProfileScreenProps } from '../navigation/types';

export default function EditProfileScreen({ route }: EditProfileScreenProps) {

  const [isChangeUsername, setIsChangeUsername] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const authCtx = useContext(AuthContext);

  const typeScreen = route.params.typeScreen;

  useEffect(() => {
    switch (typeScreen) {
      case 'profile':
        setIsChangeUsername(true);
        break;
      case 'email':
        setIsChangeEmail(true);
        break;
      case 'password':
        setIsChangePassword(true);
        break;
    }
  }, [typeScreen])

  function submitHandler(credentials: ICredentials) {
    let { userName, email, password, confirmPassword } = credentials;

    userName = userName.trim();
    email = email.trim();
    password = password.trim();
    const date = new Date().toISOString().slice(0, 10);

    const userNameIsValid = userName.length > 3;
    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (
      (isChangeUsername && !userNameIsValid) ||
      (isChangeEmail && !emailIsValid) ||
      (isChangePassword && !passwordIsValid || !passwordsAreEqual)
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
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {isChangeUsername &&
          <>
            <Text style={styles.title}>Change username</Text>
            <Text style={styles.text}>Current username: {authCtx.userName}</Text>
          </>
        }
        {isChangeEmail &&
          <>
            <Text style={styles.title}>Change email</Text>
            <Text style={styles.text}>Current email: {authCtx.email}</Text>
          </>
        }
        {isChangePassword &&
          <Text style={styles.title}>Change password</Text>
        }
      </View>
      <EditProfileForm onSubmit={submitHandler} credentialsInvalid={credentialsInvalid}
        isChangeUsername={isChangeUsername} isChangeEmail={isChangeEmail} isChangePassword={isChangePassword}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey5,
    paddingHorizontal: 20,
    paddingBottom: 40,
    // justifyContent: 'space-between'
  },
  textContainer: {
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    color: Colors.grey,
    textAlign: 'center'
  },
  text: {
    marginVertical: 10,
    fontSize: 16,
    color: Colors.grey2,
    textAlign: 'center'

  }
})