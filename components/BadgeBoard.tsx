import {StyleSheet, View, Image, Animated} from 'react-native';
import React from 'react';

import {badgeSource} from '../constants/badges';

interface BadgeBoardProps {
  isAchieved_1: boolean;
  isAchieved_2: boolean;
  isAchieved_3: boolean;
  isAchieved_4: boolean;
  isAchieved_5: boolean;
  valueOfScale: Animated.Value;
  rotate: Animated.AnimatedInterpolation<string | number>;
}

export default function BadgeBoard(props: BadgeBoardProps) {
  const {
    isAchieved_1,
    isAchieved_2,
    isAchieved_3,
    isAchieved_4,
    isAchieved_5,
    valueOfScale,
    rotate,
  } = props;

  const {
    defaultBadge,
    achievement_1,
    achievement_2,
    achievement_3,
    achievement_4,
    achievement_5,
  } = badgeSource;

  const animationStyles = {
    transform: [{scale: valueOfScale}, {rotate: rotate}],
  };

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
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  row: {
    flexDirection: 'row',
  },
});
