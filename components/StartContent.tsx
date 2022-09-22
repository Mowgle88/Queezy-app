import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { IStartContentData } from '../constants/startContentData';
import { Colors } from '../constants/styles';
import CustomButton from './ui/CustomButton';
import { StartContentNavigationProp } from '../navigation/types';

interface StartContentProps {
  item: IStartContentData,
}

export default function StartContent({ item }: StartContentProps) {
  const { width } = useWindowDimensions();

  const navigation = useNavigation<StartContentNavigationProp>();

  function goSignupHandler() {
    navigation.navigate('Signup');
  }

  function goLoginHandler() {
    navigation.navigate('Login');
  }

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.imageContainer}>
        <Image
          style={[styles.image, { width: width - 30, resizeMode: 'contain' }]}
          source={(item.image)}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>{item.title}</Text>
        <CustomButton style={styles.button} onPress={goSignupHandler}>Sign Up</CustomButton>
        <View style={styles.textContainer}>
          <Text style={styles.text2}>Already have an account? </Text>
          <CustomButton mode='flat' onPress={goLoginHandler}>Login</CustomButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  contentContainer: {
    flex: 0.3,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
    // justifyContent: "flex-end"
  },
  text: {
    fontSize: 24,
    color: Colors.black,
    lineHeight: 36,
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 25,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text2: {
    paddingVertical: 12,
    color: Colors.grey
  },
  button: {
    width: 310,
  }
})