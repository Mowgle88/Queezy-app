import React from "react";
import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../shared/constants";
import { AuthStackParamList } from "../types";
import { LoginScreen, SignupScreen, StartScreen } from "../../screens";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const HeaderBackground = () => {
  return (
    <LinearGradient
      colors={["#9087E5", "#C4D0FB"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />
  );
};

const HeaderRightImage = () => {
  return (
    <Image
      style={{ width: 35, height: 35 }}
      source={require("../../assets/queezy.png")}
    />
  );
};

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.royalBlue,
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: Colors.grey5 },
        animation: "fade",
      }}>
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerBackground: () => <HeaderBackground />,
          headerRight: () => <HeaderRightImage />,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: "Sign Up",
          presentation: "card",
          headerBackground: () => <HeaderBackground />,
          headerRight: () => <HeaderRightImage />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
