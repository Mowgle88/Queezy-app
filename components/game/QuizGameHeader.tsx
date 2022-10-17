import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../constants/styles';
import IconButton from '../ui/IconButton';

interface QuizGameHeaderProps {
  points: number,
  onPress: () => void,
}

export default function QuizGameHeader({ points, onPress }: QuizGameHeaderProps) {

  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconContainer}>
        <IconButton
          style={styles.button}
          icon="exit-outline"
          color={'white'}
          size={24}
          onPress={onPress}
        />
      </View>
      <View style={styles.pointsContainer}>
        <Icon name="star-outline" color={'white'} size={20} />
        <Text style={styles.points}>{points}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    alignItems: 'center',
    backgroundColor: Colors.dullLavender,
    borderRadius: 12,
  },
  button: {
    marginVertical: 4,
  },
  pointsContainer: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.dullLavender,
    borderRadius: 12,
  },
  points: {
    color: 'white',
    fontSize: 16,
    marginLeft: 4
  },
})