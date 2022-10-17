import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/styles'
import CustomButton from './ui/CustomButton'

export default function FeaturedBoard() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} resizeMode="cover" source={require('../assets/Featured-background.png')}>
        <Image style={styles.topImage} source={require('../assets/Icon-featured-1.png')} />
        <Text style={styles.text}>FEATURED</Text>
        <Text style={styles.description}>Take part in challenges with friends or other players</Text>
        <Image style={styles.bottomImage} source={require('../assets/Icon-featured-2.png')} />
        <CustomButton style={styles.button} mode={'light'} onPress={() => { }}>Find Friends</CustomButton>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 25,
    height: 232,
    backgroundColor: Colors.dullLavender,
    borderRadius: 20,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    marginTop: 35,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    marginTop: 20,
    marginHorizontal: 60,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  topImage: {
    position: 'absolute',
    left: '4.89%',
    right: '80.43%',
    top: '6.9%',
    bottom: '72.41%',
  },
  bottomImage: {
    position: 'absolute',
    width: 63.93,
    height: 56,
    left: 260,
    top: 134
  },
  button: {
    marginTop: 30,
  }
})