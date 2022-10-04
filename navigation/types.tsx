import { NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  StartScreen: undefined,
  Login: undefined,
  Signup: undefined,
  Main: MainStackParamList,
  QuizDetails: undefined,
  Settings: undefined,
  EditProfile: {
    typeScreen: 'profile' | 'email' | 'password' | 'difficulty'
  }
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

export type ProfileScreenNativeStackProps = NativeStackNavigationProp<RootStackParamList, 'Main', 'Settings'>;

export type SettingsScreenNativeStackProps = NativeStackNavigationProp<RootStackParamList, 'Settings', 'EditProfile'>;

export type EditProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;
