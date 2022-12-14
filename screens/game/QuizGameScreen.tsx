import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { QuizGameScreenNavigationProp, QuizGameScreenRouteProp } from '../../navigation/types';
import { Colors } from '../../constants/styles';
import QuizGameHeader from '../../components/game/QuizGameHeader';
import AnswersBlock from '../../components/game/AnswersBlock';
import QuizGameModal from '../../components/QuizGameModal';
import { shuffle } from '../../shuffle';
import CountDown from '../../components/CountDown';
import { UserContext } from '../../store/user-context';

export interface IAnswersData {
  id: string,
  question: string,
  correctAnswer: string,
  selectedAnswer: string
}

export default function QuizGameScreen() {
  const [points, setPoints] = useState(0);
  const [index, seIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState<IAnswersData[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<IAnswersData[]>([]);

  const userCtx = useContext(UserContext);
  let isTimeGame = userCtx.settings.isTimeGame;
  const timeOnAnswer = userCtx.settings.timeOnAnswer;

  const navigation = useNavigation<QuizGameScreenNavigationProp>();
  const route = useRoute<QuizGameScreenRouteProp>();
  const isFocused = useIsFocused();

  const quizType = route.params.quizType;
  const numberOfQuastions = route.params.numberOfQuastions;
  const quizzes = route.params.quizzesOfThisCategory.slice(0, numberOfQuastions);
  const answers = [quizzes[index].correctAnswer, ...quizzes[index].incorrectAnswers];
  const jumbledAnswers = useMemo(() => shuffle(answers), [index]);
  const correctAnswer = quizzes[index].correctAnswer;

  function pressHandler(answer: string) {
    const answersData = {
      id: quizzes[index].id,
      question: quizzes[index].question,
      correctAnswer: correctAnswer,
      selectedAnswer: answer
    }
    if (correctAnswer === answer) {
      setPoints((prevState) => prevState + 10);
      setCorrectAnswers((prevState) => [...prevState, { ...answersData }])
    } else {
      setIncorrectAnswers((prevState) => [...prevState, { ...answersData }])
    }
    setModalVisible((currentModalIsVisible) => !currentModalIsVisible);
    setSelectedAnswer(answer);
  }

  function goToNextQuestion() {
    setModalVisible((currentModalIsVisible) => !currentModalIsVisible);
    if (index === quizzes.length - 1) {
      finishTheGame();
    } else {
      seIndex((prevState) => prevState + 1);
    }
  }

  function finishTheGame() {
    navigation.navigate('QuizCompleted', {
      points: points,
      correctAnswers: correctAnswers,
      incorrectAnswers: incorrectAnswers
    })
  }

  return (
    <View style={styles.container}>
      <QuizGameModal
        visible={modalVisible}
        onPass={goToNextQuestion}
        index={index + 1}
        numberOfQuizzes={quizzes.length}
        question={quizzes[index].question}
        correctAnswer={correctAnswer}
        selectedAnswer={selectedAnswer}
      />
      <QuizGameHeader points={points} onPress={() => { navigation.navigate('Home') }} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>QUESTION {index + 1} OF {quizzes.length}</Text>
        <View style={styles.quizContainer}>
          {isTimeGame && isFocused && (
            <View style={styles.countDownContainer}>
              <CountDown
                timeOnAnswer={timeOnAnswer}
                finishTheGame={finishTheGame}
              />
            </View>
          )}
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
  countDownContainer: {
    alignItems: 'center',
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