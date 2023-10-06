import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "#ui";
import { Colors } from "#styles";

interface TrueOrFalseContentProps {
  answer: string;
}

const TrueOrFalseContent: React.FC<TrueOrFalseContentProps> = ({ answer }) => {
  return (
    <View>
      <View style={styles.answerContainer}>
        <Text style={styles.answer}>{answer}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton
          style={[styles.button, styles.trueButton]}
          onPress={() => {}}>
          true
        </CustomButton>
        <CustomButton
          style={[styles.button, styles.falseButton]}
          onPress={() => {}}>
          false
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    marginVertical: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.grey5,
  },
  answer: {
    fontSize: 16,
    lineHeight: 28,
  },
  buttonsContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 156,
  },
  trueButton: {
    backgroundColor: Colors.green,
  },
  falseButton: {
    backgroundColor: Colors.red,
  },
});

export default TrueOrFalseContent;
