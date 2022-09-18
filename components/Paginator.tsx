import { Animated, StyleProp, StyleSheet, Text, useWindowDimensions, View, ViewStyle } from 'react-native';
import React from 'react';
import { IStartContentData } from '../constants/startContentData';
import { Colors } from '../constants/styles';

interface PaginatorProps {
  data: IStartContentData[],
  scrollX: Animated.Value,
  style?: StyleProp<ViewStyle>
}

export default function Paginator({ data, scrollX, style }: PaginatorProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={[{ flexDirection: 'row', height: 64, alignItems: 'center' }, style]}>
      {data.map((_, i) => {

        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotSize = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        })

        return <Animated.View style={[styles.dot, { width: dotSize, height: dotSize, borderRadius: dotSize, opacity }]} key={i.toString()} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    marginHorizontal: 8,
    backgroundColor: Colors.hawkesBlue,
  }
})