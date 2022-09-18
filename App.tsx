import React from 'react';
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';

const App = () => {

  return (
    <>
      <ImageBackground
        source={require('./assets/auth-image-bachground.png')}
        resizeMode="cover"
        style={styles.container}>
        <StatusBar />
        <StartScreen />
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
