import React from "react";
import { StyleSheet, View } from "react-native";
import { CustomButton } from "#ui";
import MultipleContent from "./MultipleContent";
import CheckboxContent from "./CheckboxContent";
import TrueOrFalseContent from "./TrueOrFalseContent";
import TypeAnswerContent from "./TypeAnswerContent";

interface AnswersBlockProps {
  answers: string[];
  quizType: string;
  onPress: (answer: string) => void;
}

const AnswersBlock: React.FC<AnswersBlockProps> = ({
  answers,
  quizType,
  onPress,
}) => {
  return (
    <View>
      {quizType === "Multiple" &&
        answers.map(answer => (
          <MultipleContent
            onPress={answer => {
              onPress(answer);
            }}
            answer={answer}
            key={answer}
          />
        ))}
      {quizType === "TrueOrFalse" && <TrueOrFalseContent answer={answers[0]} />}
      {quizType === "TypeAnswer" && (
        <TypeAnswerContent
          onPress={answer => {
            onPress(answer);
          }}
        />
      )}
      {quizType === "Checkbox" &&
        answers.map(answer => <CheckboxContent answer={answer} key={answer} />)}
      {quizType === "Checkbox" && (
        <CustomButton style={styles.button} onPress={() => {}}>
          Confirm
        </CustomButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
  },
});

export default AnswersBlock;
