import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Counter from "./Counter";

interface CounterBlockProps {
  title: string;
  number: number;
  step: number;
  maxNumber?: number;
  changeNumber: (count: number) => void;
}

const CounterBlock: React.FC<CounterBlockProps> = ({
  title,
  number,
  step,
  maxNumber,
  changeNumber,
}) => {
  return (
    <View style={styles.counterContainer}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <Counter
          number={number}
          step={step}
          maxNumber={maxNumber}
          changeNumber={changeNumber}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CounterBlock;
