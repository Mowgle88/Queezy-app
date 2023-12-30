import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import AvatarsModal from "./AvatarsModal";
import { Colors } from "#styles";
import { getTimeOfDay } from "#utils";
import { avatarSource } from "#constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface GreetingBoardProps {
  userName: string;
}

const GreetingBoard: React.FC<GreetingBoardProps> = ({ userName }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [indexIcon, setIndexIcon] = useState(0);

  const insets = useSafeAreaInsets();

  const TIME_OF_DAY = getTimeOfDay();
  const greatingText = `Good ${TIME_OF_DAY}`;

  const changeModalIsVisible = () => {
    setModalVisible(currentModalIsVisible => !currentModalIsVisible);
  };

  return (
    <LinearGradient
      colors={["#C4D0FB", "#9087E5", "#6A5AE0"]}
      style={[styles.container, { paddingTop: 20 + insets.top }]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <AvatarsModal
        visible={modalVisible}
        onCancel={changeModalIsVisible}
        onSubmitImage={(index: number) => {
          setIndexIcon(index);
        }}
      />
      <View>
        <View style={styles.greetingContainer}>
          {TIME_OF_DAY === "Day" || TIME_OF_DAY === "Morning" ? (
            <Icon name="sunny-outline" size={30} color={Colors.pastelPink} />
          ) : (
            <Icon name="moon-outline" size={30} color={Colors.pastelPink} />
          )}
          <Text style={styles.greetingText}>{greatingText.toUpperCase()}</Text>
        </View>
        <Text style={styles.userNameText}>{userName}</Text>
      </View>
      <Pressable onPress={changeModalIsVisible}>
        <Image style={styles.image} source={avatarSource[indexIcon].src} />
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  greetingText: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.pastelPink,
    marginLeft: 10,
  },
  userNameText: {
    fontWeight: "bold",
    fontSize: 26,
    color: "white",
    marginLeft: 40,
  },
  image: {
    width: 56,
    height: 56,
  },
});

export default GreetingBoard;
