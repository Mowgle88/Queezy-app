import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import Category from '../../models/category';
import CategoryGridTile from '../../components/CategoryGridTile';
import { CATEGORIES } from '../../data/category-data';
import { Colors } from '../../constants/styles';
import QuizTypesModal from '../../components/QuizTypesModal';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import GreetingBoard from '../../components/GreetingBoard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUsers } from '../../util/http';
import { AuthContext } from '../../store/auth-context';
import SplashScreen from 'react-native-splash-screen';

interface renderCategoryItemProps {
  item: Category
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const userId = await AsyncStorage.getItem('userId');
      const userName = await AsyncStorage.getItem('userName');

      if (userId && userName) {
        authCtx.setUser(userId, userName)
      }
    }
    fetchToken();
  }, [])

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

  function changeModalIsVisible() {
    setModalVisible((currentModalIsVisible) => !currentModalIsVisible);
  }

  return (
    <View style={styles.container}>
      <QuizTypesModal
        visible={modalVisible}
        onCancel={changeModalIsVisible}
      />
      <GreetingBoard userName={authCtx.userName} />
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