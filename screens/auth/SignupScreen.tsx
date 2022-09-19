import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthContent from '../../components/auth/AuthContent'
import { createUser } from '../../util/auth'
import LoadingOverlay from '../../components/ui/LoadingOverlay';

export default function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);


  async function signupHandler({ email, password }: { email: string, password: string }) {
    setIsAuthenticating(true);
    createUser(email, password);
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={'Creating user...'} />
  }

  return (
    <AuthContent isLogin={false} onAuthenticate={signupHandler} />
  )
}

const styles = StyleSheet.create({})