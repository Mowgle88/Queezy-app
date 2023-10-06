import { ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import VectorImage from "react-native-vector-image";
import { Colors } from "#styles";
import { formIcons } from "#constants";

interface CustomButtonProps {
  children: ReactNode;
  onPress: () => void;
  mode?: "flat" | "light";
  style?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onPress,
  mode,
  style,
}) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}>
        <View
          style={[
            styles.button,
            mode === "flat" && styles.flat,
            style,
            mode === "light" && styles.light,
          ]}>
          {mode === "light" && (
            <VectorImage
              style={styles.vectorImage}
              source={formIcons.FindFriends}
            />
          )}
          <Text
            style={[
              styles.buttonText,
              mode === "flat" && styles.flatText,
              mode === "light" && styles.lightText,
            ]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 15,
    backgroundColor: Colors.royalBlue,
  },
  flat: {
    backgroundColor: "transparent",
    elevation: 0,
  },
  light: {
    width: 146,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  flatText: {
    color: Colors.royalBlue,
    backgroundColor: "transparent",
  },
  lightText: {
    color: Colors.royalBlue,
    fontSize: 14,
  },
  pressed: {
    opacity: 0.75,
  },
  vectorImage: {
    // marginRight: 8
  },
});

export default CustomButton;
