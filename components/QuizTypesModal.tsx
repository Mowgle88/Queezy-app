import { Alert, Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants/styles';
import { QUIZ_TYPES } from '../data/category-data';
import CategoryGridTile from './CategoryGridTile';
import Category from '../models/category';

interface QuizTypesModalProps {
  visible: boolean,
  onConfirmCategory: () => void,
  onCancel: () => void,
}

interface renderCategoryItemProps {
  item: Category
}

export default function QuizTypesModal({ visible, onConfirmCategory, onCancel }: QuizTypesModalProps) {

  function renderCategoryItem(itemData: renderCategoryItemProps) {

    function pressHandler() {
      // TODO:  I will implement the logic of transition to the game screen
      Alert.alert(itemData.item.title)
    }

    return (
      <CategoryGridTile
        isQuizTypes
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Choose the type of quiz</Text>
          <View style={styles.gridContainer}>
            <FlatList
              data={QUIZ_TYPES}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
            />
          </View>
          <View style={styles.button}>
            <Button
              title='Cancel'
              onPress={onCancel}
              color={Colors.pinkSalmon}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 20
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    marginTop: 16,
    width: 130,
    marginHorizontal: 8,
    borderRadius: 10,
    overflow: 'hidden'
  }
})