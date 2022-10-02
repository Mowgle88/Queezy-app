import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import IconButton from './ui/IconButton';
import { Colors } from '../constants/styles';

export default function Counter({ stringNumber }: { stringNumber: string }) {
  let [count, seCount] = useState(+stringNumber);

  function increment() {
    seCount(count += 30);
  }
  function decrement() {
    if (count > 0) {
      seCount(count -= 30);
    }
  }
  return (
    <View style={styles.container}>
      <IconButton icon={'arrow-down-circle'} size={30} color={Colors.dullLavender} onPress={decrement} />
      <Text style={styles.text}>{count.toString()}</Text>
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