import { Image, ImageRequireSource, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/styles';

interface TabBarIconProps {
  focused?: boolean,
  source: ImageRequireSource,
  style?: StyleProp<ImageStyle>,
  isCustom?: boolean
}

export default function TabBarIcon({ focused, source, style, isCustom }: TabBarIconProps) {
  return (
    <Image
      source={source}
      resizeMode="contain"
      style={[!isCustom ? {
        width: focused ? 35 : 25,
        height: focused ? 35 : 25,
        tintColor: focused ? Colors.royalBlue : Colors.grey2
      } : null, style]}
    />
  )
}

const styles = StyleSheet.create({})