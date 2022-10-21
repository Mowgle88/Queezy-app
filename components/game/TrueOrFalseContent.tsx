import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/styles';
import CustomButton from '../ui/CustomButton';

interface TrueOrFalseContentProps {
  answer: string,
}

export default function TrueOrFalseContent({ answer }: TrueOrFalseContentProps) {
  return (
    <View>
      <View style={styles.answerContainer}>
        <Text style={styles.answer}>{answer}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton style={[styles.button, styles.trueButton]} onPress={() => { }}>true</CustomButton>
        <CustomButton style={[styles.button, styles.falseButton]} onPress={() => { }}>false</CustomButton>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  answerContainer: {
    marginVertical: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.grey5
  },
  answer: {
    fontSize: 16,
    lineHeight: 28
  },
  buttonsContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: 156,
  },
  trueButton: {
    backgroundColor: Colors.green
  },
  falseButton: {
    backgroundColor: Colors.red
  }
})