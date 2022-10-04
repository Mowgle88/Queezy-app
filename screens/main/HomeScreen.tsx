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
import { AuthContext } from '../../store/auth-context';
import RecentQuizBoard from '../../components/RecentQuizBoard';
import FeaturedBoard from '../../components/FeaturedBoard';
import { fetchUser } from '../../util/http';
import { ILocalStorageUserData } from '../../models/user';

interface renderCategoryItemProps {
  item: Category
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchUserData() {
      const userData = await AsyncStorage.getItem('userData');

      if (userData) {
        const lSUserData: ILocalStorageUserData = JSON.parse(userData);
        const user = await fetchUser(lSUserData.userId)
        authCtx.setUser({ ...user, userId: lSUserData.userId })
      }
    }
    fetchUserData();
  }, [])

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['40%', '85%'], []);

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
      <RecentQuizBoard />
      <FeaturedBoard />
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