import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import getTimeOfDay from '../util/date';
import { Colors } from '../constants/styles';

interface GreetingBoardProps {
  userName: string
}

export default function GreetingBoard({ userName }: GreetingBoardProps) {

  const TIME_OF_DAY = getTimeOfDay();
  const greatingText = `Good ${TIME_OF_DAY}`;

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        {TIME_OF_DAY === 'Day' || TIME_OF_DAY === 'Morning' ?
          <Icon name="sunny-outline" size={30} color={Colors.pastelPink} /> :
          <Icon name="moon-outline" size={30} color={Colors.pastelPink} />
        }
        <Text style={styles.greetingText}>{greatingText.toUpperCase()}</Text>
      </View>
      <Text style={styles.userNameText}>{userName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10
  },
  greetingText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.pastelPink,
    marginLeft: 10,
  },
  userNameText: {
    fontWeight: 'bold',
    fontSize: 26,
    color: 'white',
    marginLeft: 50
  }
})