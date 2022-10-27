import { StyleSheet, View, Image } from 'react-native';
import React from 'react';

import { badgeSource } from '../constants/badges';

interface BadgeBoardProps {
  isAchieved_1: boolean,
  isAchieved_2: boolean,
  isAchieved_3: boolean,
  isAchieved_4: boolean,
  isAchieved_5: boolean,
}

export default function BadgeBoard(props: BadgeBoardProps) {
  const { isAchieved_1, isAchieved_2, isAchieved_3, isAchieved_4, isAchieved_5 } = props;
  const {
    defaultBadge,
    achievement_1,
    achievement_2,
    achievement_3,
    achievement_4,
    achievement_5
  } = badgeSource;

  return (
    <>
      <View style={styles.row}>
        <View style={styles.container}>
          <Image source={isAchieved_1 ? achievement_1 : defaultBadge} />
        </View>
        <View style={styles.container}>
          <Image source={isAchieved_2 ? achievement_2 : defaultBadge} />
        </View>
        <View style={styles.container}>
          <Image source={isAchieved_3 ? achievement_3 : defaultBadge} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.container}>
          <Image source={isAchieved_4 ? achievement_4 : defaultBadge} />
        </View>
        <View style={styles.container}>
          <Image source={isAchieved_5 ? achievement_5 : defaultBadge} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16
  },
  row: {
    flexDirection: 'row',
  }
})