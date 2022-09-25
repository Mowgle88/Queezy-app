import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import Category from '../../models/category';
import CategoryGridTile from '../../components/CategoryGridTile';
import { CATEGORIES } from '../../data/category-data';
import { Colors } from '../../constants/styles';
import QuizTypesModal from '../../components/QuizTypesModal';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

interface renderCategoryItemProps {
  item: Category
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['40%', '90%'], []);

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

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
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
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