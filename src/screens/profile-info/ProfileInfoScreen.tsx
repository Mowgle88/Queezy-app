import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { avatarSource, backgrounds } from "#constants";
import { Colors } from "#styles";
import { IconButton } from "#ui";
import { ProfileScreenNativeStackProps } from "#navigation/types";
import { fetchUsers } from "#api";
import { BadgeBoard, RotatingView, StatisticsBoard } from "./components";
import { selectors } from "#store/selectors";

const ProfileInfoScreen: React.FC = () => {
  const {
    userId,
    userName,
    quizData: { points },
  } = useSelector(selectors.user);

  const [indexIcon, setIndexIcon] = useState(0);
  const [worldPrank, setWorldPrank] = useState(0);

  const insets = useSafeAreaInsets();

  const isFocused = useIsFocused();

  const navigation = useNavigation<ProfileScreenNativeStackProps>();

  useLayoutEffect(() => {
    const fetchUsersData = async () => {
      const usersData = await fetchUsers();
      const sortedUsersData = usersData.sort(
        (prev, next) => next.quizData.points - prev.quizData.points,
      );
      sortedUsersData.forEach((userData, index) => {
        if (userData.userId === userId) {
          setWorldPrank(index + 1);
        }
      });
    };
    fetchUsersData();
  }, [isFocused]);

  const valueOfScale = useRef(new Animated.Value(0)).current;
  const valueOfRotate = useRef(new Animated.Value(0)).current;

  return (
    <ImageBackground
      style={[styles.imageBgContainer, { paddingTop: insets.top }]}
      source={backgrounds.Profile}>
      <View style={styles.iconButton}>
        <IconButton
          icon={"settings-sharp"}
          size={24}
          color={Colors.hawkesBlue}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        />
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileInnerContainer}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatarImage}
              source={avatarSource[indexIcon].src}
            />
            <View style={styles.photoIconContainer}>
              <IconButton
                icon={"camera"}
                size={16}
                color={"black"}
                onPress={() => {}}
              />
            </View>
          </View>
          <Text style={styles.userNameText}>{userName}</Text>
          <RotatingView valueOfScale={valueOfScale}>
            <StatisticsBoard points={points} worldPrank={worldPrank} />
          </RotatingView>
          <BadgeBoard
            isAchieved_1={false}
            isAchieved_2={false}
            isAchieved_3={false}
            isAchieved_4={false}
            isAchieved_5={false}
            valueOfRotate={valueOfRotate}
            valueOfScale={valueOfScale}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBgContainer: {
    flex: 1,
  },
  iconButton: {
    marginTop: 16,
    marginRight: 24,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 68,
    marginHorizontal: 8,
    borderRadius: 32,
    backgroundColor: Colors.grey5,
  },
  profileInnerContainer: {
    bottom: 68,
    alignItems: "center",
  },
  avatarContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  avatarImage: {
    height: 100,
    width: 100,
  },
  photoIconContainer: {
    height: 34,
    width: 34,
    borderRadius: 17,
    borderWidth: 1,
    bottom: 30,
    left: 70,
    backgroundColor: Colors.hawkesBlue,
  },
  userNameText: {
    fontWeight: "bold",
    fontSize: 26,
    color: Colors.grey,
    marginBottom: 24,
  },
});

export default ProfileInfoScreen;
