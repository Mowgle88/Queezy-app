import { StyleSheet, View } from 'react-native';
import React from 'react';
import MultipleContent from './MultipleContent';
import TrueOrFalseContent from './TrueOrFalseContent';
import TypeAnswerContent from './TypeAnswerContent';
import CheckboxContent from './CheckboxContent';
import CustomButton from '../ui/CustomButton';

interface AnswersBlockProps {
  answers: string[],
  correctAnswer: string,
  quizType: string
}

export default function AnswersBlock({ answers, correctAnswer, quizType }: AnswersBlockProps) {
  return (
    <View>
      {quizType === 'Multiple' && answers.map((answer) => (
        <MultipleContent answer={answer} key={answer} />
      ))}
      {quizType === 'TrueOrFalse' && (
        <TrueOrFalseContent answer={answers[0]} />
      )}
      {quizType === 'TypeAnswer' && (
        <TypeAnswerContent answer={answers[0]} />
      )}
      {quizType === 'Checkbox' && answers.map((answer) => (
        <CheckboxContent answer={answer} key={answer} />
      ))}
      {quizType === 'Checkbox' && (
        <CustomButton style={styles.button} onPress={() => { }}>Confirm</CustomButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24
  },
})