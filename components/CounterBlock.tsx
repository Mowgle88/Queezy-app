import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Counter from './Counter';

interface CounterBlockProps {
  title: string,
  number: number,
  step: number,
  maxNumber?: number,
  changeNumber: (count: number) => void,
}

export default function CounterBlock({ title, number, step, maxNumber, changeNumber }: CounterBlockProps) {
  return (
    <View style={styles.counterContainer}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <Counter
          number={number}
          step={step}
          maxNumber={maxNumber}
          changeNumber={changeNumber}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  counterContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})