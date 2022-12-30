import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/styles';
import { AuthContext } from '../../store/auth-context';
import EditProfileForm, { IDataToEdit } from '../../components/settings/EditProfileForm';
import { EditProfileScreenNavigationProp, EditProfileScreenRouteProp } from '../../navigation/types';
import { changeDifficulty, changeEmail, changePassword, changeUserName } from '../../util/editProfile';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../store/user-context';
import Toast from 'react-native-toast-message';

export default function EditProfileScreen() {

  const [isChangeUsername, setIsChangeUsername] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isChangeDifficulty, setIsChangeDifficulty] = useState(false);

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const route = useRoute<EditProfileScreenRouteProp>();

  const typeScreen = route.params.typeScreen;

  useEffect(() => {
    switch (typeScreen) {
      case 'profile':
        setIsChangeUsername(true);
        break;
      case 'email':
        setIsChangeEmail(true);
        break;
      case 'password':
        setIsChangePassword(true);
        break;
      case 'difficulty':
        setIsChangeDifficulty(true);
        break;
    }
  }, [typeScreen])

  function submitHandler(credentials: IDataToEdit) {
    let { userName, email, password, confirmPassword, difficulty } = credentials;

    userName = userName.trim();
    email = email.trim();
    password = password.trim();
    const date = new Date().toISOString().slice(0, 10);

    const userNameIsValid = userName.length > 3;
    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    const isValidUserName = isChangeUsername && !userNameIsValid;
    const isValidEmail = isChangeEmail && !emailIsValid;
    const isValidPassword = isChangePassword && !passwordIsValid || !passwordsAreEqual;

    if (isValidUserName || isValidEmail || isValidPassword) {
      Toast.show({
        type: "error",
        text1: `Please check your entered credentials`,
      });
      setCredentialsInvalid({
        userName: !userNameIsValid,
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }

    const userData = {
      userName,
      email,
      password,
      date,
    };

    const userSettingsData = {
      difficulty: difficulty as 'medium' | 'easy' | 'hard',
      isTimeGame: userCtx.settings.isTimeGame,
      timeOnAnswer: userCtx.settings.timeOnAnswer
    }

    switch (typeScreen) {
      case 'profile':
        changeUserName(userData, userCtx)
        break;
      case 'email':
        changeEmail(userData, authCtx, userCtx)
        break;
      case 'password':
        changePassword(userData, authCtx, userCtx)
        break;
      case 'difficulty':
        changeDifficulty(userSettingsData, userCtx)
        break;
    }
    navigation.goBack();

    const valueChange = userName ? 'Username' : email ? 'Email' : password ? 'Password' : 'Difficulty';

    Toast.show({
      type: "success",
      text1: `${valueChange} changed successfully`,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Change
          {isChangeUsername && ' username'}
          {isChangeEmail && ' email'}
          {isChangePassword && ' password'}
          {isChangeDifficulty && ' difficulty'}
        </Text>
        {isChangeUsername &&
          <Text style={styles.text}>Current username: {userCtx.user.userName}</Text>
        }
        {isChangeEmail &&
          <Text style={styles.text}>Current email: {userCtx.user.email}</Text>
        }
      </View>
      <EditProfileForm
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
        isChangeUsername={isChangeUsername}
        isChangeEmail={isChangeEmail}
        isChangePassword={isChangePassword}
        isChangeDifficulty={isChangeDifficulty}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey5,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  textContainer: {
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    color: Colors.grey,
    textAlign: 'center'
  },
  text: {
    marginVertical: 10,
    fontSize: 16,
    color: Colors.grey2,
    textAlign: 'center'

  }
})