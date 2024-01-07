import React, { useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { CategoryGridTile } from "#ui";
import { Colors } from "#styles";
import { Category } from "#models";
import { CATEGORIES } from "#data";
import { HomeScreenNavigationProp } from "#navigation/types";
import { CategoryName } from "#types";
import {
  FeaturedBoard,
  GreetingBoard,
  RecentQuizBoard,
  SlidingView,
} from "./components";
import { selectors } from "#store/selectors";

interface renderCategoryItemProps {
  item: Category;
}

const HomeScreen: React.FC = () => {
  const user = useSelector(selectors.user);
  const categories = useSelector(selectors.categories);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["40%", "85%"], []);

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  const renderCategoryItem = (itemData: renderCategoryItemProps) => {
    const categoryName = itemData.item.title.toLowerCase();
    const difficulty = user.settings?.difficulty;
    const quizzes = categories?.[categoryName as CategoryName]?.[difficulty];

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
      <GreetingBoard userName={user.userName} />

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
