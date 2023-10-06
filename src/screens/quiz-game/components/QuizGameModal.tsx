import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomButton } from "#ui";
import { Colors } from "#styles";

interface QuizGameModalProps {
  visible: boolean;
  onPass: () => void;
  index: number;
  question: string;
  numberOfQuizzes: number;
  correctAnswer: string;
  selectedAnswer: string;
}

const QuizGameModal: React.FC<QuizGameModalProps> = props => {
  const {
    visible,
    onPass,
    index,
    numberOfQuizzes,
    question,
    correctAnswer,
    selectedAnswer,
  } = props;
  const trueAnswer = selectedAnswer === correctAnswer;

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View>
          <Text style={styles.title}>
            QUESTION {index} OF {numberOfQuizzes}
          </Text>
          <Text style={styles.question}>{question}</Text>
          <Text style={styles.title}>SELECTED ANSWER</Text>
          <View
            style={[
              styles.answerContainer,
              trueAnswer
                ? styles.correctAswerContainer
                : styles.wrongAswerContainer,
            ]}>
            <Text
              style={[
                styles.answer,
                trueAnswer ? styles.correctAnswer : styles.wrongAnswer,
              ]}>
              {selectedAnswer}
            </Text>
            {trueAnswer ? (
              <Icon name="checkmark-outline" color={Colors.white} size={32} />
            ) : (
              <Icon name="close-outline" color={Colors.red} size={32} />
            )}
          </View>
          <Text style={styles.title}>CORRECT ANSWER</Text>
          <View style={[styles.answerContainer, styles.correctAswerContainer]}>
            <Text style={[styles.answer, styles.correctAnswer]}>
              {correctAnswer}
            </Text>
            <Icon name="checkmark-outline" color={Colors.white} size={32} />
          </View>
        </View>
        <CustomButton onPress={onPass}>Next</CustomButton>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "space-between",
    margin: 8,
    marginTop: 76,
    padding: 16,
    backgroundColor: Colors.grey5,
    borderRadius: 32,
  },
  title: {
    marginVertical: 8,
    fontWeight: "bold",
  },
  question: {
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 28,
    marginTop: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  answerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    marginBottom: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  correctAswerContainer: {
    backgroundColor: Colors.green,
  },
  wrongAswerContainer: {
    borderWidth: 2,
    borderColor: Colors.red,
  },
  answer: {
    fontSize: 16,
    lineHeight: 28,
  },
  correctAnswer: {
    fontWeight: "bold",
    color: Colors.white,
  },
  wrongAnswer: {
    color: Colors.red,
  },
});

export default QuizGameModal;
