import { ImageRequireSource, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../constants/styles';
import VectorImage from 'react-native-vector-image';

interface SettingItemProps {
  title: string,
  description: string,
  type: 'profile' | 'email' | 'password' | 'difficulty',
  source?: ImageRequireSource,
  onPress: (type: 'profile' | 'email' | 'password' | 'difficulty') => void
}

export default function SettingItem({ title, description, source, onPress, type }: SettingItemProps) {

  const onPressHandler = () => onPress(type);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPressHandler}
    >
      <View style={styles.iconContainer}>
        <VectorImage source={source!} />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Icon name="chevron-forward-outline" size={20} color={'black'} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 76,
    width: '100%',
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.grey5,
    borderRadius: 16
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: Colors.grey2
  }
})