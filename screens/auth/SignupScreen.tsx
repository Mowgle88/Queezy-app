import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthContent from '../../components/auth/AuthContent'
import { createUser } from '../../util/auth'

export default function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);


  async function signupHandler({ email, password }: { email: string, password: string }) {
    createUser(email, password);
  }

  return (
    <AuthContent isLogin={false} onAuthenticate={signupHandler} />
  )
}

const styles = StyleSheet.create({})