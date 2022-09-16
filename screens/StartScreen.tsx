import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import React from 'react'
import StartContent from '../components/StartContent'

export default function StartScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/auth-image-bachground.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/Illustration.png')}
          />
        </View>
        <View style={styles.contentContainer}>
          <StartContent />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end"

  },
  image: {
    flex: 1,
    // justifyContent: "flex-end"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
})