import { Animated, FlatList, ImageBackground, StyleSheet, View, ViewToken } from 'react-native';
import React, { useRef, useState } from 'react';

import { startContentData } from '../constants/startContentData';
import StartContent from '../components/StartContent';
import Paginator from '../components/Paginator';

export default function StartScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
    setCurrentIndex(viewableItems[0].index!)
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <ImageBackground
      source={require('../assets/auth-image-bachground.png')}
      resizeMode="cover"
      style={styles.container}>
      <FlatList
        data={startContentData}
        renderItem={({ item }) => <StartContent item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
      <Paginator style={styles.paginator} data={startContentData} scrollX={scrollX} />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paginator: {
    position: 'absolute',
    bottom: 250,
  }
})