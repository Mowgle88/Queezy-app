import { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Colors } from '../../constants/styles';

interface CustomButtonProps {
  children: ReactNode,
  onPress: () => void,
  mode?: 'flat',
  style?: StyleProp<ViewStyle>
}

export default function CustomButton({ children, onPress, mode, style }: CustomButtonProps) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === 'flat' && styles.flat, style]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 15,
    backgroundColor: Colors.royalBlue,
  },
  flat: {
    backgroundColor: 'transparent',
    elevation: 0
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  flatText: {
    color: Colors.royalBlue,
    backgroundColor: 'white',
  },
  pressed: {
    opacity: 0.75,
  }
})