import React, { useEffect } from "react";
import { StyleSheet, View, Image, Animated } from "react-native";
import { badgeSource } from "../../../shared/constants";

interface BadgeBoardProps {
  isAchieved_1: boolean;
  isAchieved_2: boolean;
  isAchieved_3: boolean;
  isAchieved_4: boolean;
  isAchieved_5: boolean;
  valueOfScale: Animated.Value;
  valueOfRotate: Animated.Value;
}

const BadgeBoard: React.FC<BadgeBoardProps> = props => {
  const {
    isAchieved_1,
    isAchieved_2,
    isAchieved_3,
    isAchieved_4,
    isAchieved_5,
    valueOfScale,
    valueOfRotate,
  } = props;

  const {
    defaultBadge,
    achievement_1,
    achievement_2,
    achievement_3,
    achievement_4,
    achievement_5,
  } = badgeSource;

  const rotate = valueOfRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animationStyles = {
    transform: [{ scale: valueOfScale }, { rotate }],
  };

  useEffect(() => {
    const startAnimate = () => {
      Animated.parallel([
        Animated.timing(valueOfScale, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000,
        }),
        Animated.timing(valueOfRotate, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000,
        }),
      ]).start();
    };
    startAnimate();
  }, []);

  return (
    <>
      <View style={styles.row}>
        <Animated.View style={[styles.container, animationStyles]}>
          <Image source={isAchieved_1 ? achievement_1 : defaultBadge} />
        </Animated.View>
        <Animated.View style={[styles.container, animationStyles]}>
          <Image source={isAchieved_2 ? achievement_2 : defaultBadge} />
        </Animated.View>
        <Animated.View style={[styles.container, animationStyles]}>
          <Image source={isAchieved_3 ? achievement_3 : defaultBadge} />
        </Animated.View>
      </View>
      <View style={styles.row}>
        <Animated.View style={[styles.container, animationStyles]}>
          <Image source={isAchieved_4 ? achievement_4 : defaultBadge} />
        </Animated.View>
        <Animated.View style={[styles.container, animationStyles]}>
          <Image source={isAchieved_5 ? achievement_5 : defaultBadge} />
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  row: {
    flexDirection: "row",
  },
});

export default BadgeBoard;
