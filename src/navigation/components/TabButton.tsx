import React, { useEffect, useRef } from "react";
import {
  AccessibilityState,
  Animated,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import VectorImage from "react-native-vector-image";
import { Tab } from "#navigation/types";
import { Colors } from "#styles";
import { EdgeInsets } from "react-native-safe-area-context";

interface TabButtonProps {
  item: Tab;
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent,
  ) => void;
  accessibilityState?: AccessibilityState;
  insets: EdgeInsets;
}

const TabButton: React.FC<TabButtonProps> = ({
  item,
  onPress,
  accessibilityState,
  insets,
}) => {
  const selected = !!accessibilityState!.selected;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    handleAnimated();
  }, [selected]);

  const handleAnimated = () => {
    Animated.timing(animatedValue, {
      toValue: selected ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const translateStyles = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -24],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const scaleStyles = {
    opacity: animatedValue.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0.5, 1],
      extrapolate: "clamp",
    }),
    transform: [
      {
        scale: animatedValue,
      },
    ],
  };

  const iconScaleStyles = {
    width: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [24, 32],
      extrapolate: "clamp",
    }),
    height: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [24, 32],
      extrapolate: "clamp",
    }),
  };

  return (
    <TouchableOpacity
      style={[styles.container, { bottom: insets.bottom ? 5 : 35 }]}
      onPress={onPress}>
      <Animated.View style={[styles.button, translateStyles]}>
        <Animated.View style={[styles.buttonBackground, scaleStyles]} />
        <Animated.View style={iconScaleStyles}>
          <VectorImage
            style={[
              styles.icon,
              { tintColor: selected ? Colors.royalBlue : Colors.grey2 },
            ]}
            source={item.icon}
          />
        </Animated.View>
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity: animatedValue }]}>
        {item.title}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 83,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  buttonBackground: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: "absolute",
    backgroundColor: Colors.hawkesBlue,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  title: {
    position: "absolute",
    bottom: 24,
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.royalBlue,
  },
});

export default TabButton;
