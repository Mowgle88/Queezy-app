import React from "react";
import { Image, ImageRequireSource, ImageStyle, StyleProp } from "react-native";
import { Colors } from "../../shared/constants";

interface TabBarIconProps {
  focused?: boolean;
  source: ImageRequireSource;
  style?: StyleProp<ImageStyle>;
  isCustom?: boolean;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({
  focused,
  source,
  style,
  isCustom,
}) => {
  return (
    <Image
      source={source}
      resizeMode="contain"
      style={[
        !isCustom
          ? {
              width: focused ? 35 : 25,
              height: focused ? 35 : 25,
              tintColor: focused ? Colors.royalBlue : Colors.grey2,
            }
          : null,
        style,
      ]}
    />
  );
};

export default TabBarIcon;
