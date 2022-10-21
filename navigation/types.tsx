import { NavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IQuizItem } from "../models/quizData";

export type RootStackParamList = {
  AuthStack: AuthStackParamList,
  AuthenticatedStack: AuthenticatedStackParamList
};

export type AuthStackParamList = {
  StartScreen: undefined,
  Login: undefined,
  Signup: undefined,
}

export type AuthenticatedStackParamList = {
  Main: MainStackParamList,
  Settings: undefined,
  EditProfile: {
    typeScreen: 'profile' | 'email' | 'password' | 'difficulty'
  },
  QuizDetails: {
    title: string,
    difficulty: "medium" | "easy" | "hard",
    quizzesOfThisCategory: IQuizItem[]
  },
  QuizGame: {
    quizType: string,
    quizzesOfThisCategory: IQuizItem[]
  },
  QuizCompleted: undefined,
  ReviewQuiz: undefined,
};

export type MainStackParamList = {
  Home: undefined,
  Search: undefined,
  CreateQuiz: undefined,
  Achievements: undefined,
  Profile: undefined,
}

export type StartContentNavigationProp = NavigationProp<AuthStackParamList, 'StartScreen'>;

export type AuthContentNativeStackProps = NativeStackNavigationProp<AuthStackParamList, 'Signup', 'Login'>;

export type ProfileScreenNativeStackProps = NativeStackNavigationProp<AuthenticatedStackParamList, 'Main', 'Settings'>;

export type SettingsScreenNativeStackProps = NativeStackNavigationProp<AuthenticatedStackParamList, 'Settings', 'EditProfile'>;

export type EditProfileScreenNavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList, 'EditProfile'>;

export type EditProfileScreenRouteProp = RouteProp<AuthenticatedStackParamList, 'EditProfile'>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList, 'Main'>;

export type QuizDetailsScreenNavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList, 'QuizDetails'>;

export type QuizDetailsScreenRouteProp = RouteProp<AuthenticatedStackParamList, 'QuizDetails'>;

export type QuizGameScreenNavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList, 'QuizGame'>;

export type QuizGameScreenRouteProp = RouteProp<AuthenticatedStackParamList, 'QuizGame'>;
