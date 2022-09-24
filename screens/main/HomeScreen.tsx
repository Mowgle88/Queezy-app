import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Category from '../../models/category';
import CategoryGridTile from '../../components/CategoryGridTile';
import { CATEGORIES } from '../../data/category-data';
import { Colors } from '../../constants/styles';

interface renderCategoryItemProps {
  item: Category
}

function renderCategoryItem(itemData: renderCategoryItemProps) {
  return <CategoryGridTile title={itemData.item.title} color={itemData.item.color} description={0} />;
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
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