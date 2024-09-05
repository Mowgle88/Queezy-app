import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import { Colors } from "#styles";
import { tabBarIcons } from "#constants";

export interface CustomTabBarButtonProps {
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent,
  ) => void;
  insets: EdgeInsets;
}

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({
  onPress,
  insets,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.customTabBarButtonContainer,
        styles.shadow,
        { bottom: insets.bottom ? 30 : 60 },
      ]}
      onPress={onPress}>
      <FastImage style={styles.customImage} source={tabBarIcons.Plus} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customTabBarButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.royalBlue,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 6,
  },
  customImage: {
    width: 125,
    height: 125,
  },
});

export default CustomTabBarButton;
