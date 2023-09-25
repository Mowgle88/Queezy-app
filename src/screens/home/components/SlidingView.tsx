import React, { ReactNode, useEffect, useRef } from "react";
import { Animated } from "react-native";

interface SlidingViewProps {
  children: ReactNode;
  distance: number;
}

const SlidingView: React.FC<SlidingViewProps> = ({ children, distance }) => {
  const rightPosition = useRef(new Animated.Value(distance)).current;

  const translateX = rightPosition.interpolate({
    inputRange: [0, 175],
    outputRange: [0, 350],
  });
  const opacity = rightPosition.interpolate({
    inputRange: [0, 175],
    outputRange: [1, 0.1],
  });

  useEffect(() => {
    const startAnimate = () => {
      const config = { toValue: 0, useNativeDriver: true, duration: 1000 };
      Animated.parallel([Animated.timing(rightPosition, config)]).start();
    };
    startAnimate();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateX }], opacity }}>
      {children}
    </Animated.View>
  );
};

export default SlidingView;
