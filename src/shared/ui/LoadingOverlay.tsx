import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { CommonStyles } from "#styles";

interface LoadingOverlayProps {
  message: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  return (
    <View style={[CommonStyles.center, styles.rootContainer]}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});

export default LoadingOverlay;
