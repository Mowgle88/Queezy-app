import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Colors } from "../../../shared/constants";

interface CheckboxContentProps {
  answer: string;
}

const CheckboxContent: React.FC<CheckboxContentProps> = ({ answer }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View
      style={[styles.answerContainer, isSelected && styles.selectedContainer]}>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
        onChange={() => {
          setIsSelected(currentState => !currentState);
        }}
        tintColors={{ true: Colors.royalBlue }}
      />
      <Text style={styles.answer}>{answer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    flexDirection: "row",
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
    marginLeft: 10,
  },
});

export default CheckboxContent;
