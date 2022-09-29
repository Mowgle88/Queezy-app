import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants/styles';

export default function RecentQuizBoard() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} resizeMode="cover" source={require('../assets/Recent-background.png')}>
        <Text style={styles.text}>RECENT QUIZ</Text>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    height: 70,
    backgroundColor: Colors.pastelPink,
    borderRadius: 15
  },
  image: {
    flex: 1,
  },
  text: {
    marginTop: 15,
    marginLeft: 15,
    color: '#660012',
    fontWeight: 'bold',
  }
})