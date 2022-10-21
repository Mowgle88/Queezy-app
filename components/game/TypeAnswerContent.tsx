import { StyleSheet, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../ui/CustomButton';
import { Colors } from '../../constants/styles';

interface TypeAnswerContentProps {
  answer: string
}

export default function TypeAnswerContent({ answer }: TypeAnswerContentProps) {
  const [value, setValue] = useState('');

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder={'Write your answer'}
        onChangeText={setValue}
        value={value}
      />
      <CustomButton style={styles.button} onPress={() => { }}>Confirm</CustomButton>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: Colors.grey5
  },
  button: {
    marginTop: 24
  },
})