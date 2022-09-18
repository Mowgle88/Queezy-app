import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AuthContent from '../../components/auth/AuthContent'

export default function SignupScreen() {
  return (
    <AuthContent isLogin={false} />
  )
}

const styles = StyleSheet.create({})