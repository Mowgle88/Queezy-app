import { Alert, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'

import AuthContent from '../../components/auth/AuthContent'
import { login } from '../../util/auth';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { AuthContext } from '../../store/auth-context';
import { fetchUsers } from '../../util/http';
import { UserContext } from '../../store/user-context';

export default function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  async function signupHandler({ email, password }: { email: string, password: string }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
      const users = await fetchUsers();
      const userData = users.filter((userData) => userData.user.email === email)[0];
      userCtx.setUser(userData.user);
      userCtx.setSettings(userData.settings);
      userCtx.setQuizData(userData.quizData);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      )
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={'Logging you in...'} />
  }

  return (
    <AuthContent isLogin onAuthenticate={signupHandler} />
  )
}

const styles = StyleSheet.create({})