import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants/styles';

interface MultipleContentProps {
  answer: string,
}

export default function MultipleContent({ answer }: MultipleContentProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Pressable
      style={[styles.answerContainer, isSelected && styles.selectedContainer]}
      onPress={() => setIsSelected((currentState) => !currentState)}
    >
      <Text style={styles.answer}>{answer}</Text>
    </Pressable>
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
  selectedContainer: {
    backgroundColor: Colors.hawkesBlue
  },
  answer: {
    fontSize: 16,
    lineHeight: 28
  }
})