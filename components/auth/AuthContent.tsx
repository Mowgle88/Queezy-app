import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import CustomButton from '../ui/CustomButton';
import { Colors } from '../../constants/styles';

function AuthContent() {

  function switchAuthModeHandler() {
  }

  function submitHandler() {
  }

  return (
    <View style={styles.authContent}>
      <TextInput style={styles.input} />
      <CustomButton onPress={submitHandler}>
        Log In
      </CustomButton>
      <View style={styles.buttons}>
        <CustomButton mode='flat' onPress={switchAuthModeHandler}>
          Login
        </CustomButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 100,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 20,
    backgroundColor: Colors.hawkesBlue,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  input: {
    height: 50,
    padding: 10,
    marginVertical: 20,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.royalBlue,
    backgroundColor: Colors.white
  },
  buttons: {
    marginTop: 8,
  },
});