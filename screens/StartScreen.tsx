import {
  Animated,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import React, {useRef, useState} from 'react';

import {startContentData} from '../constants/startContentData';
import StartContent from '../components/StartContent';
import Paginator from '../components/Paginator';
import RotatingImages from '../components/RotatingImages';

export default function StartScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(
    ({
      viewableItems,
    }: {
      viewableItems: Array<ViewToken>;
      changed: Array<ViewToken>;
    }) => {
      setCurrentIndex(viewableItems[0].index!);
    },
  ).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <ImageBackground
      source={require('../assets/auth-image-bachground.png')}
      resizeMode="cover"
      style={styles.container}>
      <RotatingImages
        data={startContentData}
        scrollX={scrollX}
        style={styles.rotatingImages}
      />

      <View style={styles.startContent}>
        <FlatList
          data={startContentData}
          renderItem={({item}) => <StartContent item={item} />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />

        <Paginator
          style={styles.paginator}
          data={startContentData}
          scrollX={scrollX}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotatingImages: {
    flex: 0.7,
  },
  startContent: {
    flex: 0.3,
    alignItems: 'center',
  },
  paginator: {
    position: 'absolute',
    bottom: 250,
  },
});
