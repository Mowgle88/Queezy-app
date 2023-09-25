import React, { ReactNode, useEffect } from "react";
import { Animated } from "react-native";

interface RotatingViewProps {
  children: ReactNode;
  valueOfScale: Animated.Value;
}

const RotatingView: React.FC<RotatingViewProps> = ({
  children,
  valueOfScale,
}) => {
  useEffect(() => {
    const startAnimate = () => {
      Animated.parallel([
        Animated.timing(valueOfScale, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000,
        }),
      ]).start();
    };
    startAnimate();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scaleX: valueOfScale }] }}>
      {children}
    </Animated.View>
  );
};

export default RotatingView;
