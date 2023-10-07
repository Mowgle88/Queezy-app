import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DifficultyDataType, RadioButtonProps } from "#types";
import { Colors } from "#styles";

interface RadioButtonsProps {
  radioButtons: RadioButtonProps<DifficultyDataType>[];
  defaultValue: DifficultyDataType;
  passValue: (value: DifficultyDataType) => void;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({
  radioButtons,
  defaultValue,
  passValue,
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <View>
      {radioButtons.map(res => {
        return (
          <View key={res.key} style={styles.container}>
            <TouchableOpacity
              style={styles.radioCircle}
              onPress={() => {
                setValue(res.key);
                passValue(res.key);
              }}>
              {value === res.key && <View style={styles.selectedRb} />}
            </TouchableOpacity>
            <Text style={styles.radioText}>{res.value}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2
  },
  radioCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: Colors.royalBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  radioText: {
    marginLeft: 15,
    fontSize: 20,
    color: Colors.grey,
    fontWeight: "bold",
  },
  selectedRb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.royalBlue,
  },
});

export default RadioButtons;
