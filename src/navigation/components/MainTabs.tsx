import React, { ReactNode, useContext } from "react";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton } from "../../shared/ui";
import { Colors } from "../../shared/constants";
import { MainStackParamList } from "../types";
import { AuthContext } from "../../store";
import TabBarIcon from "./TabBarIcon";
import {
  AchievementsScreen,
  CreateQuizScreen,
  HomeScreen,
  ProfileInfoScreen,
  SearchScreen,
} from "../../screens";

const MainTab = createBottomTabNavigator<MainStackParamList>();

interface CustomTabBarButtonProps {
  children: ReactNode;
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent,
  ) => void;
}

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({
  children,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.customTabBarButtonContainer, styles.shadow]}
      onPress={onPress}>
      <View style={styles.customTabBarButtonInnerContainer}>{children}</View>
    </TouchableOpacity>
  );
};

const MainTabs: React.FC = () => {
  const authCtx = useContext(AuthContext);

  return (
    <MainTab.Navigator
      screenOptions={{
        headerRight: ({ tintColor }) => (
          <IconButton
            icon={"exit"}
            size={24}
            color={tintColor!}
            onPress={authCtx.logout}
          />
        ),
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          ...styles.shadow,
        },
        tabBarItemStyle: {
          bottom: 15,
        },
        tabBarBackground: () => (
          <Image
            source={require("../../assets/Bottom-tabs.png")}
            resizeMode="cover"
            style={styles.tabBarImageBackground}
          />
        ),
      }}>
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              source={require("../../assets/Home.png")}
            />
          ),
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              source={require("../../assets/Search.png")}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="CreateQuiz"
        component={CreateQuizScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              isCustom
              style={styles.customImage}
              source={require("../../assets/Plus.png")}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <MainTab.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              source={require("../../assets/Achievements.png")}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileInfoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              source={require("../../assets/Profile.png")}
            />
          ),
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  customTabBarButtonContainer: {
    bottom: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  customTabBarButtonInnerContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.royalBlue,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
  customImage: {
    width: 125,
    height: 125,
  },
  tabBarImageBackground: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default MainTabs;
