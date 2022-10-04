import { StyleSheet, Switch, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';

import SettingItem from '../components/SettingItem';
import { Colors } from '../constants/styles';
import Counter from '../components/Counter';
import CustomButton from '../components/ui/CustomButton';
import { AuthContext } from '../store/auth-context';

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);

  const authCtx = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>Account</Text>
      <SettingItem
        title={'Update Profile'}
        description={'Update username, country, etc'}
        type={'profile'}
        source={require('../assets/icons/Icon-user.svg')}
        onPress={() => { }} />
      <SettingItem
        title={'Change Email Address'}
        description={authCtx.email}
        type={'email'}
        source={require('../assets/icons/Icon-email.svg')}
        onPress={() => { }} />
      <SettingItem
        title={'Change Password'}
        description={`last change ${authCtx.date}`}
        type={'password'}
        source={require('../assets/icons/Icon-password.svg')}
        onPress={() => { }} />
      <Text style={styles.categoryTitle}>Other</Text>
      <View style={styles.timeGameContainer}>
        <Text style={styles.switchTitle}>Time game</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchTitle}>{isEnabled ? 'on' : 'off'}</Text>
          <Switch
            trackColor={{ false: "#767577", true: Colors.royalBlue }}
            thumbColor={isEnabled ? Colors.hawkesBlue : "#f4f3f4"}
            onValueChange={() => setIsEnabled(previousState => !previousState)}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={[styles.timeGameContainer, styles.timeToAnswerContainer]}>
        <Text style={styles.switchTitle}>Time to answer</Text>
        <View>
          <Counter stringNumber='60' />
        </View>
      </View>
      <SettingItem
        title={'Change Difficulty'}
        description={'Easy, normal, hard'}
        type={'difficulty'}
        source={require('../assets/icons/Icon-difficulty.svg')}
        onPress={() => { }} />
      <View style={styles.buttonContainer}>
        <CustomButton mode='flat' onPress={authCtx.logout}>Logout</CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: 24,
    backgroundColor: 'white'
  },
  categoryTitle: {
    marginTop: 24,
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase'
  },
  timeGameContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row'
  },
  timeToAnswerContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 80
  }
})