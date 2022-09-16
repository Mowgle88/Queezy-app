import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from './ui/CustomButton'
import { Colors } from '../constants/styles'

export default function StartContent() {
  function goSignupHandler() {
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create gamified quizzes becomes simple</Text>
      <CustomButton style={styles.button} onPress={goSignupHandler}>Sign Up</CustomButton>
      <View style={styles.textContainer}>
        <Text style={styles.text2}>Already have an account? </Text>
        <CustomButton mode='flat' onPress={goSignupHandler}>Login</CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 24,
    color: Colors.black,
    lineHeight: 36,
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 25
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text2: {
    paddingVertical: 12,
    color: Colors.grey
  },
  button: {
    width: 310,
  }
})