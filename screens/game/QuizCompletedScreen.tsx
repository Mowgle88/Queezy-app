import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import { Colors } from '../../constants/styles';
import CustomButton from '../../components/ui/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { QuizCompletedScreenRouteProp, QuizGameScreenNavigationProp } from '../../navigation/types';
import TitleValueBlock from '../../components/TitleValueBlock';
import { UserContext } from '../../store/user-context';
import { setPoints } from '../../util/editProfile';

export default function QuizCompletedScreen() {

  const navigation = useNavigation<QuizGameScreenNavigationProp>();
  const route = useRoute<QuizCompletedScreenRouteProp>();

  const userCtx = useContext(UserContext);

  const points = route.params.points;
  const correctAnswers = route.params.correctAnswers;
  const incorrectAnswers = route.params.incorrectAnswers;
  const numberOfQuestions = correctAnswers.length + incorrectAnswers.length;
  const completion = correctAnswers.length / numberOfQuestions * 100;

  const title = completion < 20 ? 'Very sad...' :
    completion >= 20 && completion < 50 ? 'Can be better' :
      completion >= 50 && completion < 80 ? 'Good Job!' :
        completion >= 80 && completion < 100 ? 'Excellent!!' : 'Perfect!!!';

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    })
  }, [points, navigation])

  function goToStatistics() {
    navigation.navigate('ReviewQuiz', {
      correctAnswers: correctAnswers,
      incorrectAnswers: incorrectAnswers
    })
  }

  function exitTheGame() {
    navigation.navigate('Home');
    setPoints(points, userCtx);
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../../assets/Illustration-5.png')} />
        <Text style={styles.text}>You get +{points} Quiz Points</Text>
        <CustomButton style={styles.button} onPress={goToStatistics}>Check Correct Answer</CustomButton>
      </View>
      <View style={styles.resultContainer}>
        <TitleValueBlock title={'COMPLETION'} value={`${completion}%`} />
        <View style={styles.answerContainer}>
          <TitleValueBlock title={'CORRECT ANSWER'} value={`${correctAnswers.length} questions`} />
          <TitleValueBlock title={'INCORRECT ANSWER'} value={`${incorrectAnswers.length} questions`} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton style={styles.doneButton} onPress={exitTheGame}>Done</CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.white
  },
  innerContainer: {
    height: 318,
    margin: 24,
    padding: 24,
    alignItems: 'center',
    backgroundColor: Colors.pinkSalmon,
    borderRadius: 20
  },
  text: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white
  },
  button: {
    width: 237,
    backgroundColor: Colors.pastelPink
  },
  resultContainer: {
    alignItems: 'center',
  },
  answerContainer: {
    width: '100%',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 24,
    alignItems: 'center',
  },
  doneButton: {
    width: 237,
  }
})