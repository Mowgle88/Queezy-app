import { Alert, Animated, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constants/styles';
import Category from '../../models/category';
import { CATEGORIES } from '../../data/category-data';
import CategoryGridTile from '../../components/CategoryGridTile';
import GreetingBoard from '../../components/GreetingBoard';
import RecentQuizBoard from '../../components/RecentQuizBoard';
import FeaturedBoard from '../../components/FeaturedBoard';
import { fetchUser, getQuizCategories } from '../../util/http';
import { UserContext } from '../../store/user-context';
import { ILocalStorageUserData } from '../../models/user';
import { HomeScreenNavigationProp } from '../../navigation/types';
import { IQuizCategoriesData, ICategoryName } from '../../models/quizData';
import { QuizContext } from '../../store/quiz-context';

interface renderCategoryItemProps {
  item: Category
}

export default function HomeScreen() {

  const userCtx = useContext(UserContext);
  const quizCtx = useContext(QuizContext);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    async function fetchUserData() {
      const userData = await AsyncStorage.getItem('userData');

      if (userData) {
        const lSUserData: ILocalStorageUserData = JSON.parse(userData);
        const user = await fetchUser(lSUserData.userId);
        userCtx.setUser({ ...user, userId: lSUserData.userId })
        userCtx.setSettings(user.settings);
        userCtx.setQuizData(user.quizData);
      }
    }
    fetchUserData();
  }, [])

  useEffect(() => {
    async function fetchQuizCategoriesData() {
      const categoriesData = await AsyncStorage.getItem('quizСategoryData');

      if (categoriesData) {
        const lsCategoriesData: IQuizCategoriesData = JSON.parse(categoriesData);
        quizCtx.setQuizСategoryData(lsCategoriesData);
      } else {
        const categoriesData: IQuizCategoriesData = await getQuizCategories()
        quizCtx.setQuizСategoryData(categoriesData);
      }
    }
    fetchQuizCategoriesData();
  }, [])

  const bottomSheetRef = useRef<BottomSheet>(null);

  const rightPosition = useRef(new Animated.Value(350)).current;
  const leftPosition = useRef(new Animated.Value(-350)).current;

  const translateX = rightPosition.interpolate({ inputRange: [0, 175], outputRange: [0, 350] });
  const opacity = rightPosition.interpolate({ inputRange: [0, 175], outputRange: [1, 0.1] });
  const translateX2 = leftPosition.interpolate({ inputRange: [0, 175], outputRange: [0, 350] });
  const opacity2 = leftPosition.interpolate({ inputRange: [0, 175], outputRange: [1, 0.1] });

  useEffect(() => {
    const startAnimate = () => {
      const config = { toValue: 0, useNativeDriver: true, duration: 1000 };
      Animated.parallel([
        Animated.timing(rightPosition, config),
        Animated.timing(leftPosition, config)
      ]).start()
    }
    startAnimate();
  }, []);

  const snapPoints = useMemo(() => ['40%', '85%'], []);

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  function renderCategoryItem(itemData: renderCategoryItemProps) {

    const categoryName = itemData.item.title.toLowerCase();
    const difficulty = userCtx.settings.difficulty;
    const quizzes = quizCtx.quizСategoryData && quizCtx.quizСategoryData[categoryName as ICategoryName] ?
      quizCtx.quizСategoryData[categoryName as ICategoryName][difficulty] :
      null;

    function pressHandler() {
      navigation.navigate('QuizDetails', {
        title: itemData.item.title,
        difficulty: difficulty,
        quizzesOfThisCategory: quizzes!
      });
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        description={quizzes ? quizzes.length : 0}
        onPress={pressHandler}
      />
    );
  }

  return (
    <View style={styles.container}>
      <GreetingBoard userName={userCtx.user.userName} />
      <Animated.View style={{ transform: [{ translateX }], opacity }} >
        <RecentQuizBoard />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateX: translateX2 }], opacity: opacity2 }} >
        <FeaturedBoard />
      </Animated.View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
        handleStyle={styles.bottomSheetContainer}
      >
        <BottomSheetFlatList
          data={CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ListHeaderComponent={
            <Text style={styles.flatTitle}>Categories</Text>
          }
          contentContainerStyle={styles.bottomSheetFlatListContainer}
        />
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: Colors.royalBlue,
  },
  bottomSheetContainer: {
    backgroundColor: Colors.grey5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bottomSheetFlatListContainer: {
    paddingBottom: 100,
    backgroundColor: Colors.grey5
  },
  flatTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: Colors.grey2,
    textAlign: 'center',
    textDecorationLine: 'underline',
    borderEndWidth: 2,
    borderBottomColor: Colors.grey2,
    marginVertical: 10
  }
})