import React, { useContext } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CustomButton } from "../../shared/ui";
import { CounterBlock } from "../../shared/components";
import { Colors } from "../../shared/constants";
import { SettingsScreenNativeStackProps } from "../../navigation/types";
import { EditProfileScreenType } from "../../shared/types";
import { utils } from "./duck";
import { AuthContext, UserContext } from "../../store";
import { SettingItem } from "./components";

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNativeStackProps>();

  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  const isTimeGame = userCtx.settings.isTimeGame;
  const timeOnAnswer = userCtx.settings.timeOnAnswer;

  const pressHandler = (type: EditProfileScreenType) => {
    navigation.navigate("EditProfile", {
      screenType: type,
    });
  };

  const changeValue = (value: boolean) => {
    utils.setTimeGame(value, userCtx);
  };

  const changeTime = (count: number) => {
    utils.changeTimeGame(count, userCtx);
  };

  const onLogoutHandler = () => {
    authCtx.logout();
    userCtx.removeUser();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>Account</Text>
      <SettingItem
        title={"Update Profile"}
        description={"Update username, country, etc"}
        type={"profile"}
        source={require("../../assets/icons/Icon-user.svg")}
        onPress={pressHandler}
      />
      <SettingItem
        title={"Change Email Address"}
        description={userCtx.user.email}
        type={"email"}
        source={require("../../assets/icons/Icon-email.svg")}
        onPress={pressHandler}
      />
      <SettingItem
        title={"Change Password"}
        description={`last change ${userCtx.user.date}`}
        type={"password"}
        source={require("../../assets/icons/Icon-password.svg")}
        onPress={pressHandler}
      />
      <Text style={styles.categoryTitle}>Other</Text>
      <View style={styles.timeGameContainer}>
        <Text style={styles.switchTitle}>Time game</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchTitle}>{isTimeGame ? "on" : "off"}</Text>
          <Switch
            trackColor={{ false: "#767577", true: Colors.royalBlue }}
            thumbColor={isTimeGame ? Colors.hawkesBlue : "#f4f3f4"}
            onValueChange={changeValue}
            value={isTimeGame}
          />
        </View>
      </View>
      {isTimeGame && (
        <CounterBlock
          title={"Time to answer"}
          number={timeOnAnswer}
          step={30}
          changeNumber={changeTime}
        />
      )}
      <SettingItem
        title={"Change Difficulty"}
        description={"Easy, normal, hard"}
        type={"difficulty"}
        source={require("../../assets/icons/Icon-difficulty.svg")}
        onPress={pressHandler}
      />
      <View style={styles.buttonContainer}>
        <CustomButton mode="flat" onPress={onLogoutHandler}>
          Logout
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  categoryTitle: {
    marginTop: 24,
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
  },
  timeGameContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    marginTop: 80,
  },
});

export default SettingsScreen;
