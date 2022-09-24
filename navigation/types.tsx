import { NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  StartScreen: undefined,
  Login: undefined,
  Signup: undefined,
  Main: MainStackParamList,
  QuizDetails: undefined,
  Settings: undefined,
};

export type MainStackParamList = {
  Home: undefined,
  Search: undefined,
  CreateQuiz: undefined,
  Achievements: undefined,
  Profile: undefined,
}

export type StartContentNavigationProp = NavigationProp<RootStackParamList, 'StartScreen'>;

export type AuthContentNativeStackProps = NativeStackNavigationProp<RootStackParamList, 'Signup', 'Login'>;

