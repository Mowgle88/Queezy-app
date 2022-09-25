import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import Category from '../../models/category';
import CategoryGridTile from '../../components/CategoryGridTile';
import { CATEGORIES } from '../../data/category-data';
import { Colors } from '../../constants/styles';
import QuizTypesModal from '../../components/QuizTypesModal';

interface renderCategoryItemProps {
  item: Category
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  function renderCategoryItem(itemData: renderCategoryItemProps) {
    function pressHandler() {
      setModalVisible(true);
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        description={0}
        onPress={pressHandler}
      />
    );
  }

  function confirmHandler() {
    setModalVisible(false);
  }

  function changeModalIsVisible() {
    setModalVisible((currentModalIsVisible) => !currentModalIsVisible);
  }

  return (
    <View style={styles.container}>
      <QuizTypesModal
        visible={modalVisible}
        onConfirmCategory={confirmHandler}
        onCancel={changeModalIsVisible}
      />
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={
          <Text style={styles.flatTitle}>Categories</Text>
        }
        ListFooterComponent={<View></View>}
        ListFooterComponentStyle={{ marginBottom: 50 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
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