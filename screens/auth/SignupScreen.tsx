import { Alert, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'

import AuthContent from '../../components/auth/AuthContent'
import { createUser } from '../../util/auth'
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { AuthContext } from '../../store/auth-context';
import { addUserToDatabase } from '../../util/http';
import { IUserData } from '../../models/user';
import { UserContext } from '../../store/user-context';

export default function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  async function signupHandler({ email, password, userName, date }: IUserData) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
      const userID = await addUserToDatabase({ email, password, userName, date });
      const userData = {
        userId: userID,
        email: email,
        password: password,
        userName: userName,
        date: date
      }
      userCtx.setUser(userData);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not create user. Please check your input andr try again later!'
      )
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={'Creating user...'} />
  }

  return (
    <AuthContent isLogin={false} onAuthenticate={signupHandler} />
  )
}

const styles = StyleSheet.create({})