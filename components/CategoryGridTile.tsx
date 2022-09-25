import { Pressable, StyleSheet, Text, View, Image, Platform } from 'react-native';
import React from 'react';
import { Colors } from '../constants/styles';

interface CategoryGridTileProps {
  title: string,
  color: string,
  description?: number,
  onPress: () => void,
  isQuizTypes?: boolean
}

export default function CategoryGridTile({ title, color, description, onPress, isQuizTypes }: CategoryGridTileProps) {

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
    case 'Multiple':
      source = require('../assets/categories/Icon-Multiple.png');
      break;
    case 'TrueOfFalse':
      source = require('../assets/categories/Icon-TrueOfFalse.png');
      break;
    case 'TypeAnswer':
      source = require('../assets/categories/Icon-TypeAnswer.png');
      break;
    case 'Checkbox':
      source = require('../assets/categories/Icon-Checkbox.png');
      break;
  }

  const style = {
    innerContainerHeight: 132,
    imageStyle: {
      width: 48,
      height: 48,
    },
    title: {
      color: 'white',
      fontSize: 20,
    }
  }

  if (isQuizTypes) {
    style.innerContainerHeight = 100;
    style.imageStyle.width = 40;
    style.imageStyle.height = 40;
    style.title.color = Colors.royalBlue;
    style.title.fontSize = 14;
  }

  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.button, pressed ? styles.buttonPressed : null
        ]}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color, height: style.innerContainerHeight }]}>
          <Image style={style.imageStyle} source={source} />
          <Text style={[styles.title, style.title]}>{title}</Text>
          {!isQuizTypes && <Text style={styles.description}>{description} Quizzes</Text>}
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
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
  title: {
    fontWeight: 'bold',
    marginTop: 5
  },
  description: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white'
  }
})