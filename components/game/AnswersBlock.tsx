import { StyleSheet, View } from 'react-native';
import React from 'react';
import MultipleContent from './MultipleContent';
import TrueOrFalseContent from './TrueOrFalseContent';
import TypeAnswerContent from './TypeAnswerContent';
import CheckboxContent from './CheckboxContent';
import CustomButton from '../ui/CustomButton';

interface AnswersBlockProps {
  answers: string[],
  quizType: string,
  onPress: (answer: string) => void
}

export default function AnswersBlock({ answers, quizType, onPress }: AnswersBlockProps) {
  return (
    <View>
      {quizType === 'Multiple' && answers.map((answer) => (
        <MultipleContent
          onPress={(answer) => { onPress(answer) }}
          answer={answer}
          key={answer}
        />
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