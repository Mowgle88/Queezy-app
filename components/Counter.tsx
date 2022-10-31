import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import IconButton from './ui/IconButton';
import { Colors } from '../constants/styles';

interface Counter {
  number: number,
  step: number,
  maxNumber?: number,
  changeNumber: (count: number) => void,
}

export default function Counter({ number, step, maxNumber = 300, changeNumber }: Counter) {
  let [count, setCount] = useState(number);

  function increment() {
    if (count < maxNumber) {
      setCount(count += step);
      changeNumber(count)
    }
  }
  function decrement() {
    if (count > 0) {
      setCount(count -= step);
      changeNumber(count)
    }
  }
  return (
    <View style={styles.container}>
      <IconButton icon={'arrow-down-circle'} size={30} color={Colors.dullLavender} onPress={decrement} />
      <Text style={styles.text}>{count}</Text>
      <IconButton icon={'arrow-up-circle'} size={30} color={Colors.dullLavender} onPress={increment} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  }
})