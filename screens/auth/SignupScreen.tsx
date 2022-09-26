import { Alert, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'

import AuthContent from '../../components/auth/AuthContent'
import { createUser } from '../../util/auth'
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { AuthContext } from '../../store/auth-context';
import { addUserToDatabase } from '../../util/http';
import { IUser } from '../../models/user';

export default function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password, userName }: IUser) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
      const userId = await addUserToDatabase({ email, password, userName });
      authCtx.setUser(userId, userName);
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