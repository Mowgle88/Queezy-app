import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import { Colors } from '../constants/styles';

export default function StatisticsBoard() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Icon name="star-outline" size={25} color='white'></Icon>
        <Text style={styles.text}>POINTS</Text>
        <Text style={styles.count}>0</Text>
      </View>
      <LinearGradient
        colors={['#ffffff1a', '#ffffff80', '#ffffff1a']}
        style={styles.gradient1}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <View style={styles.section}>
        <Icon name="globe-outline" size={25} color='white'></Icon>
        <Text style={styles.text}>WORLD RANK</Text>
        <Text style={styles.count}>#1</Text>
      </View>
      <LinearGradient
        colors={['#ffffff1a', '#ffffff80', '#ffffff1a']}
        style={[styles.gradient1, styles.gradient2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <View style={styles.section}>
        <Icon name="locate-outline" size={25} color='white'></Icon>
        <Text style={styles.text}>LOCAL RANK</Text>
        <Text style={styles.count}>#1</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 101,
    width: 327,
    borderRadius: 27,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.royalBlue
  },
  section: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: Colors.grey3,
  },
  count: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  gradient1: {
    position: 'absolute',
    width: 1,
    height: 69,
    left: 109,
    top: 15,
  },
  gradient2: {
    left: 218,
  }
})