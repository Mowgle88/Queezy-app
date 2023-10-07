import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "#styles";

interface MultipleContentProps {
  answer: string;
  onPress: (answer: string) => void;
}

const MultipleContent: React.FC<MultipleContentProps> = ({
  answer,
  onPress,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Pressable
      style={[styles.answerContainer, isSelected && styles.selectedContainer]}
      onPress={() => {
        onPress(answer);
        setIsSelected(currentState => !currentState);
      }}>
      <Text style={styles.answer}>{answer}</Text>
    </Pressable>
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
  selectedContainer: {
    backgroundColor: Colors.hawkesBlue,
  },
  answer: {
    fontSize: 16,
    lineHeight: 28,
  },
});

export default MultipleContent;
