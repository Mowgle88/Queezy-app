import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthContent from '../../components/auth/AuthContent'
import { login } from '../../util/auth';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

export default function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);


  async function signupHandler({ email, password }: { email: string, password: string }) {
    setIsAuthenticating(true);
    try {
      await login(email, password);
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