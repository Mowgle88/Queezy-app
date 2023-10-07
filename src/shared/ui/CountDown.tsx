import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "#styles";

interface CountDownProps {
  timeOnAnswer: number;
  finishTheGame: () => void;
}

const CountDown: React.FC<CountDownProps> = ({
  timeOnAnswer,
  finishTheGame,
}) => {
  const minutes = Math.floor(timeOnAnswer / 60);
  const seconds = timeOnAnswer % 60;

  const [[m, s], setTime] = useState([minutes, seconds]);

  const tick = () => {
    if (m === 0 && s === 0) {
      finishTheGame();
      return;
    } else if (s == 0) {
      setTime([m - 1, 59]);
    } else {
      setTime([m, s - 1]);
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 130,
    marginVertical: 20,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: Colors.royalBlue,
  },
  text: {
    fontSize: 40,
    color: Colors.royalBlue,
  },
});

export default CountDown;
