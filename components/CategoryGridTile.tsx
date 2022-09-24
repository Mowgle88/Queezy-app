import { Pressable, StyleSheet, Text, View, Image, Platform } from 'react-native';
import React from 'react';

interface CategoryGridTileProps {
  title: string,
  color: string,
  description: number
}

export default function CategoryGridTile({ title, color, description }: CategoryGridTileProps) {

  let source;

  switch (title) {
    case 'Art':
      source = require('../assets/categories/Icon-Art.png');
      break;
    case 'Math':
      source = require('../assets/categories/Icon-Math.png');
      break;
    case 'Science':
      source = require('../assets/categories/Icon-Science.png');
      break;
    case 'Sport':
      source = require('../assets/categories/Icon-Sport.png');
      break;
    case 'Music':
      source = require('../assets/categories/Icon-Music.png');
      break;
    case 'Tech':
      source = require('../assets/categories/Icon-Tech.png');
      break;
    case 'Travel':
      source = require('../assets/categories/Icon-Travel.png');
      break;
    case 'History':
      source = require('../assets/categories/Icon-History.png');
      break;
  }

  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.button, pressed ? styles.buttonPressed : null
        ]}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Image style={styles.image} source={source} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description} Quizzes</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 132,
    borderRadius: 25,
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 48,
    height: 48
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  description: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white'
  }
})