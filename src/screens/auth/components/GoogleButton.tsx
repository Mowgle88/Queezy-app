import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import VectorImage from "react-native-vector-image";
import { Colors } from "#styles";
import { google } from "#constants";

interface GoogleButtonProps {
  onPress: () => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <VectorImage style={styles.vectorImage} source={google.src} />
      <Text style={styles.buttonText}>
        Sign In with <Text style={{ color: "#4285F4" }}>G</Text>
        <Text style={{ color: "#EA4336" }}>o</Text>
        <Text style={{ color: "#FBBC04" }}>o</Text>
        <Text style={{ color: "#4285F4" }}>g</Text>
        <Text style={{ color: "#34A853" }}>l</Text>
        <Text style={{ color: "#EA4336" }}>e</Text>
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: Colors.grey5,
  },
  buttonText: {
    color: Colors.royalBlue,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
  vectorImage: {
    // width: 80,
    // height: 80,
    marginRight: 12,
    position: "absolute",
    left: 0,
    // right: 80,
  },
});

export default GoogleButton;
