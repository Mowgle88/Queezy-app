import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/styles';
import CustomButton from '../../components/ui/CustomButton';
import TitleValueBlock from '../../components/titleValueBlock';

export default function QuizCompletedScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../../assets/Illustration-5.png')} />
        <Text style={styles.text}>You get +80 Quiz Points</Text>
        <CustomButton style={styles.button} onPress={() => { }}>Check Correct Answer</CustomButton>
      </View>
      <View style={styles.resultContainer}>
        <TitleValueBlock title={'COMPLETION'} value={'80%'} />
        <View style={styles.answerContainer}>
          <TitleValueBlock title={'CORRECT ANSWER'} value={'7 questions'} />
          <TitleValueBlock title={'INCORRECT ANSWER'} value={'1 questions'} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton style={styles.doneButton} onPress={() => { }}>Done</CustomButton>
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