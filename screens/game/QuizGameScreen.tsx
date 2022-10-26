import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { QuizGameScreenNavigationProp, QuizGameScreenRouteProp } from '../../navigation/types';
import { Colors } from '../../constants/styles';
import QuizGameHeader from '../../components/game/QuizGameHeader';
import AnswersBlock from '../../components/game/AnswersBlock';
import QuizGameModal from '../../components/QuizGameModal';
import { shuffle } from '../../shuffle';

export default function QuizGameScreen() {
  const [points, setPoints] = useState(0);
  const [index, seIndex] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const navigation = useNavigation<QuizGameScreenNavigationProp>();
  const route = useRoute<QuizGameScreenRouteProp>();

  const quizType = route.params.quizType;
  const quizzes = route.params.quizzesOfThisCategory;
  const answers = [quizzes[index].correctAnswer, ...quizzes[index].incorrectAnswers];
  const jumbledAnswers = useMemo(() => shuffle(answers), [index]);
  const correctAnswer = quizzes[index].correctAnswer;

  function pressHandler(answer: string) {
    if (correctAnswer === answer) {
      setPoints((prevState) => prevState + 10)
    }
    setModalVisible((currentModalIsVisible) => !currentModalIsVisible);
    setSelectedAnswer(answer);
  }

  function goToNextQuestion() {
    setModalVisible((currentModalIsVisible) => !currentModalIsVisible);
    seIndex((prevState) => prevState + 1)
  }

  return (
    <View style={styles.container}>
      <QuizGameModal
        visible={modalVisible}
        onPass={goToNextQuestion}
        index={index}
        numberOfQuizzes={quizzes.length}
        question={quizzes[index].question}
        correctAnswer={correctAnswer}
        selectedAnswer={selectedAnswer}
      />
      <QuizGameHeader points={points} onPress={() => { navigation.navigate('Home') }} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>QUESTION {index} OF {quizzes.length}</Text>
        <View style={styles.quizContainer}>
          <Text style={styles.question}>{quizzes[index].question}</Text>
          <AnswersBlock
            answers={jumbledAnswers}
            quizType={quizType}
            onPress={pressHandler}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.royalBlue
  },
  innerContainer: {
    flex: 1,
    margin: 8,
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 32,
  },
  title: {
    marginVertical: 8,
    fontWeight: 'bold',
  },
  quizContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  question: {
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 16,
    textAlign: 'center',
    borderBottomWidth: 1
  }
})