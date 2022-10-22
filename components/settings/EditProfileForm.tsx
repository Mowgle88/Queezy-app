import { StyleSheet, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { ICredentialsInvalid } from '../auth/AuthForm';
import CustomButton from '../ui/CustomButton';
import CustomInput from '../ui/CustomInput';
import { difficultyData, difficultyDataType } from '../../constants/difficultyData';
import RadioButtons from '../ui/RadioButtons';
import { UserContext } from '../../store/user-context';

interface EditProfileFormProps {
  isChangeUsername?: boolean,
  isChangeEmail?: boolean,
  isChangePassword?: boolean,
  isChangeDifficulty?: boolean,
  onSubmit: (credentials: IDataToEdit) => void,
  credentialsInvalid: ICredentialsInvalid
}

export interface IDataToEdit {
  userName: string,
  email: string,
  password: string,
  confirmPassword: string,
  difficulty?: difficultyDataType
}

export default function EditProfileForm(this: any, { isChangeUsername, isChangeEmail, isChangePassword, isChangeDifficulty, onSubmit, credentialsInvalid }: EditProfileFormProps) {
  const [enteredUserName, setEnteredUserName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<difficultyDataType | null>(null);
  const [isSecurePassword, setIsSecurePassword] = useState(true);
  const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);

  const userCtx = useContext(UserContext);

  const {
    userName: userNameIsInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateSecurePasswordHandler() {
    setIsSecurePassword(!isSecurePassword)
  }

  function updateSecureConfirmPasswordHandler() {
    setIsSecureConfirmPassword(!isSecureConfirmPassword)
  }

  function submitHandler() {
    onSubmit({
      userName: enteredUserName,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      difficulty: selectedDifficulty!
    });
  }

  return (
    <View style={styles.form}>
      <View>
        {isChangeUsername && (
          <CustomInput
            label=""
            onUpdateValue={setEnteredUserName}
            value={enteredUserName}
            keyboardType="email-address"
            isInvalid={userNameIsInvalid}
            secure={false}
            placeholder={'Your username'}
            source={require('../../assets/icons/Icon-user.svg')}
          />
        )}
        {isChangeEmail &&
          <CustomInput
            label=""
            onUpdateValue={setEnteredEmail}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
            secure={false}
            placeholder={'Your email address'}
            source={require('../../assets/icons/Icon-email.svg')}
          />
        }
        {isChangePassword && (
          <>
            <CustomInput
              label=""
              onUpdateValue={setEnteredPassword}
              value={enteredPassword}
              isInvalid={passwordIsInvalid}
              keyboardType={'default'}
              secure={isSecurePassword}
              placeholder={'Your password'}
              isPassword
              onUpdateSecure={updateSecurePasswordHandler}
              source={require('../../assets/icons/Icon-password.svg')}
            />
            <CustomInput
              label="Confirm Password"
              onUpdateValue={setEnteredConfirmPassword}
              value={enteredConfirmPassword}
              isInvalid={passwordsDontMatch}
              keyboardType={'default'}
              secure={isSecureConfirmPassword}
              placeholder={'Confirm password'}
              isPassword
              onUpdateSecure={updateSecureConfirmPasswordHandler}
              source={require('../../assets/icons/Icon-password.svg')}
            />
          </>
        )}
        {isChangeDifficulty && (
          <RadioButtons
            passValue={(value) => { setSelectedDifficulty(value) }}
            defaultValue={userCtx.settings.difficulty} radioButtons={difficultyData}
          />
        )}
      </View>
      <View style={styles.button}>
        <CustomButton onPress={submitHandler}>Confirm</CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 12,
  },
  radioButtonsContainer: {
    marginTop: 50,
  }
})