import { Alert, Image, ImageBackground, StyleSheet, useWindowDimensions, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import QuizDetalsContent from '../../components/QuizDetalsContent';
import QuizTypesModal from '../../components/QuizTypesModal';
import { QuizDetailsScreenNavigationProp, QuizDetailsScreenRouteProp } from '../../navigation/types';

export default function QuizDetailsScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const { width } = useWindowDimensions();

  const navigation = useNavigation<QuizDetailsScreenNavigationProp>();
  const route = useRoute<QuizDetailsScreenRouteProp>();

  const title = route.params.title;
  const difficulty = route.params.difficulty;
  const quizzes = route.params.quizzesOfThisCategory;

  function changeModalIsVisible() {
    setModalVisible((currentModalIsVisible) => !currentModalIsVisible);
  }

  function selectType(quizType: string) {
    navigation.navigate('QuizGame', {
      quizType: quizType,
      quizzesOfThisCategory: quizzes
    })
    Alert.alert(title, quizType);
  }

  return (
    <ImageBackground style={styles.imageBgContainer} source={require('../../assets/QuizDetails-background.png')}>
      <QuizTypesModal
        visible={modalVisible}
        onCancel={changeModalIsVisible}
        onSelectType={selectType}
      />
      <View style={styles.container}>
        <Image
          style={[styles.image, { width: width }]}
          source={require('../../assets/Illustration-4.png')}
        />
        <QuizDetalsContent
          title={title}
          number={quizzes ? quizzes.length : 0}
          difficulty={difficulty}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBgContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 55,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: "center",
    top: 4
  },
})