import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "#ui";
import { CounterBlock } from "#components";
import { Colors } from "#styles";
import { SettingsScreenNativeStackProps } from "#navigation/types";
import { EditProfileScreenType, ISettings } from "#types";
import { SettingItem } from "./components";
import { formIcons } from "#constants";
import { logout, removeUser } from "#store/slices";
import { selectors } from "#store/selectors";
import { updateSettings } from "#utils";

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNativeStackProps>();

  const dispatch = useDispatch();
  const user = useSelector(selectors.user);

  const insets = useSafeAreaInsets();

  const pressHandler = (type: EditProfileScreenType) => {
    navigation.navigate("EditProfile", {
      screenType: type,
    });
  };

  const changeValue = (value: Partial<ISettings>) => {
    updateSettings(value, user, dispatch);
  };

  const onLogoutHandler = () => {
    dispatch(logout());
    dispatch(removeUser());
  };

  return (
    <View style={[styles.container, { paddingTop: 45 + insets.top }]}>
      <Text style={styles.categoryTitle}>Account</Text>
      <SettingItem
        title={"Update Profile"}
        description={"Update username, country, etc"}
        type={"profile"}
        source={formIcons.User}
        onPress={pressHandler}
      />
      <SettingItem
        title={"Change Email Address"}
        description={user.email}
        type={"email"}
        source={formIcons.Email}
        onPress={pressHandler}
      />
      <SettingItem
        title={"Change Password"}
        description={`last change ${user.date}`}
        type={"password"}
        source={formIcons.Password}
        onPress={pressHandler}
      />
      <Text style={styles.categoryTitle}>Other</Text>
      <View style={styles.timeGameContainer}>
        <Text style={styles.switchTitle}>Time game</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchTitle}>
            {user.settings.isTimeGame ? "on" : "off"}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: Colors.royalBlue }}
            thumbColor={
              user.settings.isTimeGame ? Colors.hawkesBlue : "#f4f3f4"
            }
            onValueChange={(value: boolean) =>
              changeValue({ isTimeGame: value })
            }
            value={user.settings.isTimeGame}
          />
        </View>
      </View>
      {user.settings.isTimeGame && (
        <CounterBlock
          title={"Time to answer"}
          number={user.settings.timeOnAnswer}
          step={30}
          changeNumber={(count: number) => changeValue({ timeOnAnswer: count })}
        />
      )}
      <SettingItem
        title={"Change Difficulty"}
        description={"Easy, normal, hard"}
        type={"difficulty"}
        source={formIcons.Difficulty}
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
    marginRight: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 80,
  },
});

export default SettingsScreen;
