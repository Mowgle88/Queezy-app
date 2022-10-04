import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import IconButton from '../../components/ui/IconButton';
import { Colors } from '../../constants/styles';
import { AuthContext } from '../../store/auth-context';
import { avatarSource } from '../../constants/avatar';
import StatisticsBoard from '../../components/StatisticsBoard';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreenNativeStackProps } from '../../navigation/types';

export default function ProfileScreen() {
  const [indexIcon, setIndexIcon] = useState(0);

  const authCtx = useContext(AuthContext);

  const navigation = useNavigation<ProfileScreenNativeStackProps>();

  return (
    <ImageBackground style={styles.imageBgContainer} source={require('../../assets/Profile-background.png')}>
      <View style={styles.iconButton}>
        <IconButton icon={'settings-sharp'} size={24} color={Colors.hawkesBlue} onPress={() => {
          navigation.navigate('Settings')
        }} />
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileInnerContainer}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatarImage} source={avatarSource[indexIcon].src} />
            <View style={styles.photoIconContainer}>
              <IconButton icon={'camera'} size={16} color={'black'} onPress={() => { }} />
            </View>
          </View>
          <Text style={styles.userNameText}>{authCtx.userName}</Text>
          <StatisticsBoard />

        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBgContainer: {
    flex: 1,
  },
  iconButton: {
    marginTop: 16,
    marginRight: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 68,
    marginHorizontal: 8,
    borderRadius: 32,
    backgroundColor: Colors.grey5,
  },
  profileInnerContainer: {
    bottom: 68,
    alignItems: 'center',
  },
  avatarContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 16
  },
  avatarImage: {
    height: 100,
    width: 100,
  },
  photoIconContainer: {
    height: 34,
    width: 34,
    borderRadius: 17,
    borderWidth: 1,
    bottom: 30,
    left: 70,
    backgroundColor: Colors.hawkesBlue,
  },
  userNameText: {
    fontWeight: 'bold',
    fontSize: 26,
    color: Colors.grey,
    marginBottom: 24
  },
})