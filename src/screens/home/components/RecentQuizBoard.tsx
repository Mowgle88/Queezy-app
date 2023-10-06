import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Colors } from "#styles";
import { backgrounds } from "#constants";

const RecentQuizBoard: React.FC = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        resizeMode="cover"
        source={backgrounds.Recent}>
        <Text style={styles.text}>RECENT QUIZ</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    height: 70,
    backgroundColor: Colors.pastelPink,
    borderRadius: 15,
  },
  image: {
    flex: 1,
  },
  text: {
    marginTop: 15,
    marginLeft: 15,
    color: Colors.maroon,
    fontWeight: "bold",
  },
});

export default RecentQuizBoard;
