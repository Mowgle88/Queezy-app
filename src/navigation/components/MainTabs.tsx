import React, { ReactNode, useContext } from "react";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VectorImage from "react-native-vector-image";
import FastImage from "react-native-fast-image";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton } from "#ui";
import { Colors } from "#styles";
import { MainStackParamList } from "../types";
import { AuthContext } from "#store";
import {
  AchievementsScreen,
  CreateQuizScreen,
  HomeScreen,
  ProfileInfoScreen,
  SearchScreen,
} from "#screens";
import { tabBarIcons } from "#constants";

const MainTab = createBottomTabNavigator<MainStackParamList>();

interface CustomTabBarButtonProps {
  children: ReactNode;
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent,
  ) => void;
  insets: EdgeInsets;
}

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({
  children,
  onPress,
  insets,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.customTabBarButtonContainer,
        styles.shadow,
        { bottom: insets.bottom ? 30 : 60 },
      ]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const MainTabs: React.FC = () => {
  const authCtx = useContext(AuthContext);

  const insets = useSafeAreaInsets();

  const iconStyle = (focused: boolean) => ({
    width: focused ? 35 : 25,
    height: focused ? 35 : 25,
    tintColor: focused ? Colors.royalBlue : Colors.grey2,
  });

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
          bottom: insets.bottom ? -10 : 20,
        },
        tabBarBackground: () => (
          <Image
            source={tabBarIcons.BottomTabs}
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
            <VectorImage style={iconStyle(focused)} source={tabBarIcons.Home} />
          ),
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <VectorImage
              style={iconStyle(focused)}
              source={tabBarIcons.Search}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="CreateQuiz"
        component={CreateQuizScreen}
        options={{
          tabBarIcon: () => (
            <FastImage style={styles.customImage} source={tabBarIcons.Plus} />
          ),
          tabBarButton: props => (
            <CustomTabBarButton insets={insets} {...props} />
          ),
        }}
      />
      <MainTab.Screen
        name="Leaderboard"
        component={AchievementsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <VectorImage
              style={iconStyle(focused)}
              source={tabBarIcons.Leaderboard}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileInfoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <VectorImage
              style={iconStyle(focused)}
              source={tabBarIcons.Profile}
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
    justifyContent: "center",
    alignItems: "center",
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
    elevation: 6,
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
