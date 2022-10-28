import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface titleValueBlock {
  title: string,
  value: string
}

export default function TitleValueBlock({ title, value }: titleValueBlock) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.number}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
  },
})