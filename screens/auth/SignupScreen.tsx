import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthContent from '../../components/auth/AuthContent'
import { createUser } from '../../util/auth'
import LoadingOverlay from '../../components/ui/LoadingOverlay';

export default function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);


  async function signupHandler({ email, password }: { email: string, password: string }) {
    setIsAuthenticating(true);
    try {
      await createUser(email, password);
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