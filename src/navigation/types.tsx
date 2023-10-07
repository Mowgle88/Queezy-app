import {
  CompositeNavigationProp,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  DifficultyDataType,
  EditProfileScreenType,
  IAnswersData,
  IQuizItem,
} from "#types";

export type RootStackParamList = {
  AuthStack: AuthStackParamList;
  AuthenticatedStack: AuthenticatedStackParamList;
};

export type AuthStackParamList = {
  StartScreen: undefined;
  Login: undefined;
  Signup: undefined;
};

export type AuthenticatedStackParamList = {
  Main: MainStackParamList;
  Settings: undefined;
  EditProfile: {
    screenType: EditProfileScreenType;
  };
  QuizDetails: {
    title: string;
    difficulty: DifficultyDataType;
    quizzesOfThisCategory: IQuizItem[];
  };
  QuizGame: {
    quizType: string;
    quizzesOfThisCategory: IQuizItem[];
    numberOfQuastions: number;
  };
  QuizCompleted: {
    points: number;
    correctAnswers: IAnswersData[];
    incorrectAnswers: IAnswersData[];
  };
  ReviewQuiz: {
    correctAnswers: IAnswersData[];
    incorrectAnswers: IAnswersData[];
  };
};

export type MainStackParamList = {
  Home: undefined;
  Search: undefined;
  CreateQuiz: undefined;
  Achievements: undefined;
  Profile: undefined;
};

export type StartContentNavigationProp = NavigationProp<
  AuthStackParamList,
  "StartScreen"
>;

export type AuthContentNativeStackProps = NativeStackNavigationProp<
  AuthStackParamList,
  "Signup",
  "Login"
>;

export type ProfileScreenNativeStackProps = NativeStackNavigationProp<
  AuthenticatedStackParamList,
  "Main",
  "Settings"
>;

export type SettingsScreenNativeStackProps = NativeStackNavigationProp<
  AuthenticatedStackParamList,
  "Settings"
>;

export type EditProfileScreenNavigationProp = NativeStackNavigationProp<
  AuthenticatedStackParamList,
  "EditProfile"
>;

export type EditProfileScreenRouteProp = RouteProp<
  AuthenticatedStackParamList,
  "EditProfile"
>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  AuthenticatedStackParamList,
  "Main"
>;

export type QuizDetailsScreenNavigationProp = NativeStackNavigationProp<
  AuthenticatedStackParamList,
  "QuizDetails"
>;

export type QuizDetailsScreenRouteProp = RouteProp<
  AuthenticatedStackParamList,
  "QuizDetails"
>;

export type QuizGameScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackParamList>,
  NativeStackNavigationProp<AuthenticatedStackParamList>
>;

export type QuizGameScreenRouteProp = RouteProp<
  AuthenticatedStackParamList,
  "QuizGame"
>;

export type QuizCompletedScreenRouteProp = RouteProp<
  AuthenticatedStackParamList,
  "QuizCompleted"
>;

export type ReviewQuizScreenNavigationProp = NativeStackNavigationProp<
  AuthenticatedStackParamList,
  "ReviewQuiz"
>;

export type ReviewQuizScreenRouteProp = RouteProp<
  AuthenticatedStackParamList,
  "ReviewQuiz"
>;
