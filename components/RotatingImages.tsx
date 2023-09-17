import React from 'react';
import {
  Animated,
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import {IStartContentData} from '../constants/startContentData';

interface RotatingImagesProps {
  data: IStartContentData[];
  scrollX: Animated.Value;
  style?: StyleProp<ViewStyle>;
}

const RotatingImages = ({data, scrollX, style}: RotatingImagesProps) => {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, style]}>
      {data.map((item, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const opacity = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: [-1, 1, -1],
          extrapolate: 'clamp',
          easing: input => (input === 1 ? input : input),
        });

        const rotate = scrollX.interpolate({
          inputRange,
          outputRange: ['180deg', '360deg', '180deg'],
          extrapolate: 'clamp',
        });

        const animationStyles = {
          transform: [{rotateY: rotate}],
          opacity,
        };

        return (
          <Animated.View
            style={[styles.imageContainer, animationStyles]}
            key={i.toString()}>
            <Image
              style={[styles.image, {width: width - 30}]}
              source={item.image}
            />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  image: {
    justifyContent: 'center',
    resizeMode: 'contain',
  },
});

export default RotatingImages;
