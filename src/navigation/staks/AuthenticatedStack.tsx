import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "#styles";
import { AuthenticatedStackParamList } from "../types";
import { MainTabs } from "../components";
import {
  EditProfileScreen,
  QuizCompletedScreen,
  QuizDetailsScreen,
  QuizGameScreen,
  QuizReviewScreen,
  SettingsScreen,
} from "#screens";

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

const AuthenticatedStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          // headerShadowVisible: true,
          headerTransparent: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 24,
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.grey5,
          },
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="QuizDetails"
        component={QuizDetailsScreen}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="QuizGame"
        component={QuizGameScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="QuizCompleted"
        component={QuizCompletedScreen}
        options={{
          headerBackVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 24,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ReviewQuiz"
        component={QuizReviewScreen}
        options={{
          title: "Review Answers",
          headerBackVisible: false,
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
