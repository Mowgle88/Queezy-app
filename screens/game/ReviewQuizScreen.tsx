import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ReviewQuizScreenNavigationProp, ReviewQuizScreenRouteProp } from '../../navigation/types';
import { IAnswersData } from './QuizGameScreen';
import CustomButton from '../../components/ui/CustomButton';

interface renderCategoryItemProps {
  item: IAnswersData,
  index: number
}

export default function ReviewQuizScreen() {

  const navigation = useNavigation<ReviewQuizScreenNavigationProp>();
  const route = useRoute<ReviewQuizScreenRouteProp>();
  const correctAnswers = route.params.correctAnswers;
  const incorrectAnswers = route.params.incorrectAnswers;
  const answers = [...correctAnswers, ...incorrectAnswers];

  function renderItem(itemData: renderCategoryItemProps) {

    const question = itemData.item.question;
    const selectedAnswer = itemData.item.selectedAnswer;
    const isTrueAnswer = itemData.item.selectedAnswer === itemData.item.correctAnswer;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.circle}>
          <Text style={styles.index}>{itemData.index + 1}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.question}>{question}</Text>
          <Text style={[styles.answer, isTrueAnswer && styles.correctAnswer]}>{selectedAnswer}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Answers</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={answers}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListFooterComponent={
            <CustomButton onPress={() => { navigation.goBack() }}>Back</CustomButton>
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  title: {
    fontSize: 24,
    margin: 24,
    color: Colors.black
  },
  flatListContainer: {
    flex: 1,
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: Colors.grey5,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  itemContainer: {
    flex: 1,
    marginVertical: 16,
    flexDirection: 'row',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  index: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.royalBlue,
    textAlign: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  question: {
    fontSize: 18,
    color: Colors.black,
  },
  answer: {
    fontSize: 16,
    color: Colors.red
  },
  correctAnswer: {
    color: Colors.green
  },
  bottomSheetFlatListContainer: {
    paddingBottom: 100,
    backgroundColor: Colors.grey5
  },
})