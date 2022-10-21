import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface IconButtonProps {
  icon: string,
  size: number,
  color: string,
  onPress: () => void,
  style?: StyleProp<ViewStyle>
}

function IconButton({ icon, color, size, onPress, style }: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
      onPress={onPress}
    >
      <Icon name={icon} color={color} size={size} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
