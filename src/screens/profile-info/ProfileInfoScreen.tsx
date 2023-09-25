import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { IconButton } from "../../shared/ui";
import { Colors, avatarSource } from "../../shared/constants";
import { UserContext } from "../../store";
import { ProfileScreenNativeStackProps } from "../../navigation/types";
import { fetchUsers } from "../../shared/api";
import { BadgeBoard, RotatingView, StatisticsBoard } from "./components";

const ProfileInfoScreen = () => {
  const [indexIcon, setIndexIcon] = useState(0);
  const [worldPrank, setWorldPrank] = useState(0);
  const [isAchieved_1, setIsAchieved_1] = useState(false);
  const [isAchieved_2, setIsAchieved_2] = useState(false);
  const [isAchieved_3, setIsAchieved_3] = useState(false);
  const [isAchieved_4, setIsAchieved_4] = useState(false);
  const [isAchieved_5, setIsAchieved_5] = useState(false);

  const isFocused = useIsFocused();

  const navigation = useNavigation<ProfileScreenNativeStackProps>();

  const userCtx = useContext(UserContext);

  useLayoutEffect(() => {
    const fetchUsersData = async () => {
      const usersData = await fetchUsers();
      const sortedUsersData = usersData.sort(
        (prev, next) => next.quizData.points - prev.quizData.points,
      );
      sortedUsersData.forEach((userData, index) => {
        if (userData.user.userId === userCtx.user.userId) {
          setWorldPrank(index + 1);
        }
      });
    };
    fetchUsersData();
  }, [isFocused]);

  const points = userCtx.quizData.points;

  const valueOfScale = useRef(new Animated.Value(0)).current;
  const valueOfRotate = useRef(new Animated.Value(0)).current;

  return (
    <ImageBackground
      style={styles.imageBgContainer}
      source={require("../../assets/Profile-background.png")}>
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
          <Text style={styles.userNameText}>{userCtx.user.userName}</Text>
          <RotatingView valueOfScale={valueOfScale}>
            <StatisticsBoard points={points} worldPrank={worldPrank} />
          </RotatingView>
          <BadgeBoard
            isAchieved_1={isAchieved_1}
            isAchieved_2={isAchieved_2}
            isAchieved_3={isAchieved_3}
            isAchieved_4={isAchieved_4}
            isAchieved_5={isAchieved_5}
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
