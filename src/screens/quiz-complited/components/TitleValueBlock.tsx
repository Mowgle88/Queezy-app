import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface titleValueBlock {
  title: string;
  value: string;
}

const TitleValueBlock: React.FC<titleValueBlock> = ({ title, value }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.number}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  number: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 16,
  },
});

export default TitleValueBlock;
