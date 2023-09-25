import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface IconButtonProps {
  icon: string;
  size: number;
  color: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  color,
  size,
  onPress,
  style,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
      onPress={onPress}>
      <Icon name={icon} color={color} size={size} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default IconButton;
