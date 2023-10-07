import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { CustomButton } from "#ui";
import { Colors } from "#styles";

interface TypeAnswerContentProps {
  answer: string;
}
const TypeAnswerContent: React.FC<TypeAnswerContentProps> = ({ answer }) => {
  const [value, setValue] = useState("");

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder={"Write your answer"}
        onChangeText={setValue}
        value={value}
      />
      <CustomButton style={styles.button} onPress={() => {}}>
        Confirm
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: Colors.grey5,
  },
  button: {
    marginTop: 24,
  },
});

export default TypeAnswerContent;
