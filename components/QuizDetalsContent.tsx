import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants/styles';
import LinearGradient from 'react-native-linear-gradient';
import VectorImage from 'react-native-vector-image';
import CustomButton from './ui/CustomButton';

interface QuizDetalsContentProps {
  title: string,
  number: number,
  difficulty: 'easy' | 'medium' | 'hard',
  onPress: () => void
}

export default function QuizDetalsContent({ title, number, difficulty, onPress }: QuizDetalsContentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.boardContainer}>
        <View style={styles.boardInnerContainer}>
          <VectorImage source={require('../assets/icons/Icon-questions.svg')} />
          <Text style={styles.text}>{number} questions</Text>
        </View>
        <LinearGradient
          colors={['#cccccc1a', '#cccccc80', '#cccccc1a']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <View style={styles.boardInnerContainer}>
          <VectorImage source={require('../assets/icons/Icon-difficulty-2.svg')} />
          <Text style={styles.text}>{difficulty}</Text>
        </View>
      </View>
      <Text style={styles.title}>Description</Text>
      <Text style={styles.text}>Any time is a good time for a quiz and even better if that happens to be {title} themed quiz!</Text>
      <Text style={styles.title}>Quiz Types</Text>
      <View style={styles.quizTipesContainer}>
        <Image source={require('../assets/categories/Icon-Multiple-small.png')} />
        <Image source={require('../assets/categories/Icon-TrueOrFalse-small.png')} />
        <Image source={require('../assets/categories/Icon-TypeAnswer-small.png')} />
        <Image source={require('../assets/categories/Icon-Checkbox-small.png')} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={onPress}>Play Quiz</CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 504,
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 16,
    borderRadius: 32,
    backgroundColor: Colors.white
  },
  title: {
    marginVertical: 12,
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.grey2,
    textTransform: 'uppercase',
  },
  boardContainer: {
    height: 64,
    marginVertical: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    backgroundColor: Colors.grey5,
  },
  boardInnerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24
  },
  gradient: {
    position: 'absolute',
    width: 2,
    height: 32,
    left: '50%',
    top: 16,
  },
  quizTipesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    marginTop: 50,
  }
})