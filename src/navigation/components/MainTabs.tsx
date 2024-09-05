import React from "react";
import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { IconButton } from "#ui";
import { MainStackParamList } from "../types";
import { tabBarIcons } from "#constants";
import { logout, removeUser } from "#store/slices";
import CustomTabBarButton from "./CustomTabBarButton";
import TabButton from "./TabButton";
import { tabs } from "#navigation/tabs";

const MainTab = createBottomTabNavigator<MainStackParamList>();

const MainTabs: React.FC = () => {
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();

  return (
    <MainTab.Navigator
      screenOptions={{
        headerRight: ({ tintColor }) => (
          <IconButton
            icon={"exit"}
            size={24}
            color={tintColor!}
            onPress={() => {
              dispatch(logout());
              dispatch(removeUser());
            }}
          />
        ),
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        // tabBarItemStyle: {
        //   bottom: insets.bottom ? -10 : 20,
        // },
        tabBarBackground: () => (
          <Image
            source={tabBarIcons.BottomTabs}
            resizeMode="cover"
            style={styles.tabBarImageBackground}
          />
        ),
      }}>
      {tabs.map(tab => (
        <MainTab.Screen
          key={tab.id}
          name={tab.screen as keyof MainStackParamList}
          component={tab.Component}
          options={{
            tabBarButton: tab?.isCustomButton
              ? props => <CustomTabBarButton insets={insets} {...props} />
              : props => <TabButton insets={insets} item={tab} {...props} />,
            headerShown: tab.headerShown,
          }}
        />
      ))}
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 6,
  },
  tabBarImageBackground: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default MainTabs;
