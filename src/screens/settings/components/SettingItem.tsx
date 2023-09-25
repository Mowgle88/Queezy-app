import React from "react";
import {
  ImageRequireSource,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import VectorImage from "react-native-vector-image";
import { EditProfileScreenType } from "../../../shared/types";
import { Colors } from "../../../shared/constants";

interface SettingItemProps {
  title: string;
  description: string;
  type: EditProfileScreenType;
  source?: ImageRequireSource;
  onPress: (type: EditProfileScreenType) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  description,
  source,
  onPress,
  type,
}) => {
  const onPressHandler = () => onPress(type);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPressHandler}>
      <View style={styles.iconContainer}>
        <VectorImage source={source!} />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Icon name="chevron-forward-outline" size={20} color={"black"} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 76,
    width: "100%",
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.grey5,
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: Colors.grey2,
  },
});

export default SettingItem;
