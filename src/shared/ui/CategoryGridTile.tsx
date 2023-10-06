import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from "react-native";
import { Colors } from "#styles";
import { getSourcePath } from "#utils";

interface CategoryGridTileProps {
  title: string;
  color: string;
  description?: number;
  onPress: () => void;
  isQuizTypes?: boolean;
}

const CategoryGridTile: React.FC<CategoryGridTileProps> = ({
  title,
  color,
  description,
  onPress,
  isQuizTypes,
}) => {
  let source = getSourcePath(title);

  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}>
        <View
          style={[
            { backgroundColor: color },
            styles.innerContainer,
            isQuizTypes && styles.innerContainerHeight,
          ]}>
          <Image
            style={isQuizTypes ? styles.quizTypesimage : styles.categoryImage}
            source={source}
          />
          <Text style={[styles.title, isQuizTypes && styles.quizTypesTitle]}>
            {title}
          </Text>
          {!isQuizTypes && (
            <Text style={styles.description}>{description} Quizzes</Text>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    borderRadius: 25,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 132,
  },
  innerContainerHeight: {
    height: 100,
  },
  categoryImage: {
    width: 48,
    height: 48,
  },
  quizTypesimage: {
    width: 40,
    height: 40,
  },
  title: {
    fontWeight: "bold",
    marginTop: 5,
    color: "white",
    fontSize: 20,
  },
  quizTypesTitle: {
    color: Colors.royalBlue,
    fontSize: 14,
  },
  description: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
});

export default CategoryGridTile;
