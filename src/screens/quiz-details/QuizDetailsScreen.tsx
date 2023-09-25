import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { shuffle } from "../../shared/utils";
import { CommonStyles } from "../../shared/constants";
import {
  QuizDetailsScreenNavigationProp,
  QuizDetailsScreenRouteProp,
} from "../../navigation/types";
import { QuizDetalsContent, QuizTypesModal } from "./components";

const QuizDetailsScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [numberOfQuastions, setNumberOfQuastions] = useState(10);

  const { width } = useWindowDimensions();

  const navigation = useNavigation<QuizDetailsScreenNavigationProp>();
  const route = useRoute<QuizDetailsScreenRouteProp>();

  const title = route.params.title;
  const difficulty = route.params.difficulty;
  const quizzes = route.params.quizzesOfThisCategory;

  const changeModalIsVisible = () => {
    setModalVisible(currentModalIsVisible => !currentModalIsVisible);
  };

  const selectType = (quizType: string) => {
    const mixedQuizzes = shuffle(quizzes);

    navigation.navigate("QuizGame", {
      quizType: quizType,
      quizzesOfThisCategory: mixedQuizzes,
      numberOfQuastions: numberOfQuastions,
    });
    setModalVisible(false);
  };

  return (
    <ImageBackground
      style={styles.imageBgContainer}
      source={require("../../assets/QuizDetails-background.png")}>
      <QuizTypesModal
        visible={modalVisible}
        onCancel={changeModalIsVisible}
        onSelectType={selectType}
      />
      <View style={styles.container}>
        <Image
          style={[CommonStyles.center, styles.image, { width: width }]}
          source={require("../../assets/Illustration-4.png")}
        />
        <QuizDetalsContent
          title={title}
          number={quizzes ? quizzes.length : 0}
          initialNumber={numberOfQuastions}
          difficulty={difficulty}
          onPress={() => setModalVisible(true)}
          changeNumber={count => {
            setNumberOfQuastions(count);
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBgContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 55,
  },
  image: {
    top: 4,
  },
});

export default QuizDetailsScreen;
