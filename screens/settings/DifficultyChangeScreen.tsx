import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

const radioButtonsData: RadioButtonProps[] = [{
  id: '1', // acts as primary key, should be unique and non-empty string
  label: 'Option 1',
  value: 'option1'
}, {
  id: '2',
  label: 'Option 2',
  value: 'option2'
}]

export default function DifficultyChangeScreen() {
  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>(radioButtonsData)

  function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
    setRadioButtons(radioButtonsArray);
  }

  return (
    <RadioGroup
      radioButtons={radioButtons}
      onPress={onPressRadioButton}
    />
  );
}

const styles = StyleSheet.create({})