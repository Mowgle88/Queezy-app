import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "../ui";
import { Colors } from "#styles";

interface CounterProps {
  number: number;
  step: number;
  maxNumber?: number;
  changeNumber: (count: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  number,
  step,
  maxNumber = 300,
  changeNumber,
}) => {
  const [count, setCount] = useState(number);

  const increment = () => {
    if (count < maxNumber) {
      setCount(prev => (prev += step));
      changeNumber(count);
    }
  };
  const decrement = () => {
    if (count > 0) {
      setCount(prev => (prev -= step));
      changeNumber(count);
    }
  };
  return (
    <View style={styles.container}>
      <IconButton
        icon={"arrow-down-circle"}
        size={30}
        color={Colors.dullLavender}
        onPress={decrement}
      />
      <Text style={styles.text}>{count}</Text>
      <IconButton
        icon={"arrow-up-circle"}
        size={30}
        color={Colors.dullLavender}
        onPress={increment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Counter;
