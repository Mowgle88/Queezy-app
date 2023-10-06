import React, { useContext, useEffect, useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { CategoryGridTile } from "#ui";
import { Colors } from "#styles";
import { Category } from "#models";
import { CATEGORIES } from "#data";
import { HomeScreenNavigationProp } from "#navigation/types";
import {
  CategoryName,
  IQuizCategoriesData,
  LocalStorageUserData,
} from "#types";
import { QuizContext, UserContext } from "#store";
import { fetchUser, getQuizCategories } from "#api";
import {
  FeaturedBoard,
  GreetingBoard,
  RecentQuizBoard,
  SlidingView,
} from "./components";

interface renderCategoryItemProps {
  item: Category;
}

const HomeScreen: React.FC = () => {
  const userCtx = useContext(UserContext);
  const quizCtx = useContext(QuizContext);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (userData) {
        const lSUserData: LocalStorageUserData = JSON.parse(userData);
        const user = await fetchUser(lSUserData.userId);
        userCtx.setUser({ ...user, userId: lSUserData.userId });
        userCtx.setSettings(user.settings);
        userCtx.setQuizData(user.quizData);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchQuizCategoriesData = async () => {
      const categoriesData = await AsyncStorage.getItem("quizCategoryData");

      if (categoriesData) {
        const lsCategoriesData: IQuizCategoriesData =
          JSON.parse(categoriesData);
        quizCtx.setQuizCategoryData(lsCategoriesData);
      } else {
        const categoriesData: IQuizCategoriesData = await getQuizCategories();
        quizCtx.setQuizCategoryData(categoriesData);
      }
    };
    fetchQuizCategoriesData();
  }, []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["40%", "85%"], []);

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  const renderCategoryItem = (itemData: renderCategoryItemProps) => {
    const categoryName = itemData.item.title.toLowerCase();
    const difficulty = userCtx.settings.difficulty;
    const quizzes =
      quizCtx.quizCategoryData &&
      quizCtx.quizCategoryData[categoryName as CategoryName]
        ? quizCtx.quizCategoryData[categoryName as CategoryName][difficulty]
        : null;

    const pressHandler = () => {
      navigation.navigate("QuizDetails", {
        title: itemData.item.title,
        difficulty: difficulty,
        quizzesOfThisCategory: quizzes!,
      });
    };

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        description={quizzes ? quizzes.length : 0}
        onPress={pressHandler}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GreetingBoard userName={userCtx.user.userName} />

      <SlidingView distance={350}>
        <RecentQuizBoard />
      </SlidingView>

      <SlidingView distance={-350}>
        <FeaturedBoard />
      </SlidingView>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
        handleStyle={styles.bottomSheetContainer}>
        <BottomSheetFlatList
          data={CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          numColumns={2}
          ListHeaderComponent={<Text style={styles.flatTitle}>Categories</Text>}
          contentContainerStyle={styles.bottomSheetFlatListContainer}
        />
      </BottomSheet>
    </View>
  );
};

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
    backgroundColor: Colors.grey5,
  },
  flatTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.grey2,
    textAlign: "center",
    textDecorationLine: "underline",
    borderEndWidth: 2,
    borderBottomColor: Colors.grey2,
    marginVertical: 10,
  },
});

export default HomeScreen;
