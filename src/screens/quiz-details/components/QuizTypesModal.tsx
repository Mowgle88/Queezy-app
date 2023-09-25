import React from "react";
import { Button, FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { CategoryGridTile } from "../../../shared/ui";
import { Colors, CommonStyles } from "../../../shared/constants";
import { QUIZ_TYPES } from "../../../shared/data";
import { Category } from "../../../shared/models";

interface QuizTypesModalProps {
  visible: boolean;
  onCancel: () => void;
  onSelectType: (quizType: string) => void;
}

interface renderCategoryItemProps {
  item: Category;
}

const QuizTypesModal: React.FC<QuizTypesModalProps> = ({
  visible,
  onCancel,
  onSelectType,
}) => {
  const renderCategoryItem = (itemData: renderCategoryItemProps) => {
    const pressHandler = () => {
      onSelectType(itemData.item.title);
    };

    return (
      <CategoryGridTile
        isQuizTypes
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={[CommonStyles.center, styles.centeredView]}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Choose the type of quiz</Text>
          <View style={styles.gridContainer}>
            <FlatList
              data={QUIZ_TYPES}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Cancel"
              onPress={onCancel}
              color={Colors.pinkSalmon}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    marginTop: 16,
    width: 130,
    marginHorizontal: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default QuizTypesModal;
