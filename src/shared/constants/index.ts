import { ImageSourcePropType } from "react-native";

export interface IStartContentData {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

export type RadioButtonProps<Type> = {
  key: Type;
  value: string;
};

export type DifficultyData = "easy" | "medium" | "hard";

export const avatarSource = [
  { id: "1", src: require("../../assets/avatars/Avatar-1.png") },
  { id: "2", src: require("../../assets/avatars/Avatar-2.png") },
  { id: "3", src: require("../../assets/avatars/Avatar-3.png") },
  { id: "4", src: require("../../assets/avatars/Avatar-4.png") },
  { id: "5", src: require("../../assets/avatars/Avatar-5.png") },
  { id: "6", src: require("../../assets/avatars/Avatar-6.png") },
  { id: "7", src: require("../../assets/avatars/Avatar-7.png") },
  { id: "8", src: require("../../assets/avatars/Avatar-8.png") },
  { id: "9", src: require("../../assets/avatars/Avatar-9.png") },
  { id: "10", src: require("../../assets/avatars/Avatar-10.png") },
  { id: "11", src: require("../../assets/avatars/Avatar-11.png") },
  { id: "12", src: require("../../assets/avatars/Avatar-12.png") },
];

export const badgeSource = {
  defaultBadge: require("../../assets/badges/Badge-1.png"),
  achievement_1: require("../../assets/badges/Badge-2.png"),
  achievement_2: require("../../assets/badges/Badge-3.png"),
  achievement_3: require("../../assets/badges/Badge-4.png"),
  achievement_4: require("../../assets/badges/Badge-5.png"),
  achievement_5: require("../../assets/badges/Badge-6.png"),
};

export const logo = {
  src: require("../../assets/queezy.png"),
};

export const google = {
  src: require("../../assets/icons/Icon-google.svg"),
};

export const backgrounds = {
  Profile: require("../../assets/Profile-background.png"),
  QuizDetails: require("../../assets/QuizDetails-background.png"),
  Recent: require("../../assets/Recent-background.png"),
  Featured: require("../../assets/Featured-background.png"),
  Auth: require("../../assets/auth-image-bachground.png"),
};

export const pictures = {
  Illustration_4: require("../../assets/Illustration-4.png"),
  Illustration_5: require("../../assets/Illustration-5.png"),
  IconFeatured_1: require("../../assets/Icon-featured-1.png"),
  IconFeatured_2: require("../../assets/Icon-featured-2.png"),
};

export const tabBarIcons = {
  BottomTabs: require("../../assets/Bottom-tabs.png"),
  Home: require("../../assets/icons/Icon-home.svg"),
  Search: require("../../assets/icons/Icon-search.svg"),
  Plus: require("../../assets/Plus.png"),
  Leaderboard: require("../../assets/icons/Icon-leaderboard.svg"),
  Profile: require("../../assets/icons/Icon-profile.svg"),
};

export const formIcons = {
  User: require("../../assets//icons/Icon-user.svg"),
  Email: require("../../assets/icons/Icon-email.svg"),
  Password: require("../../assets/icons/Icon-password.svg"),
  Difficulty: require("../../assets/icons/Icon-difficulty.svg"),
  Secure: require("../../assets/icons/Icon-secure.svg"),
  Unprotected: require("../../assets/icons/Icon-unprotected.svg"),
  FindFriends: require("../../assets/icons/Icon-find-friends.svg"),
};

export const profile = {
  LocalRank: require("../../assets/icons/Icon-localRank.svg"),
};

export const quizTypesIcons = {
  Multiple: require("../../assets/categories/Icon-Multiple-small.png"),
  TrueOrFalse: require("../../assets/categories/Icon-TrueOrFalse-small.png"),
  TypeAnswer: require("../../assets/categories/Icon-TypeAnswer-small.png"),
  Checkbox: require("../../assets/categories/Icon-Checkbox-small.png"),
};

export const icons = {
  Questions: require("../../assets/icons/Icon-questions.svg"),
  Difficulty: require("../../assets/icons/Icon-difficulty-2.svg"),
};

export const startContentData: IStartContentData[] = [
  {
    id: "1",
    title: "Create gamified quizzes becomes simple",
    image: require("../../assets/Illustration-1.png"),
  },
  {
    id: "2",
    title: "Find quizzes to test out your knowledge",
    image: require("../../assets/Illustration-2.png"),
  },
  {
    id: "3",
    title: "Take part in challenges with friends",
    image: require("../../assets/Illustration-3.png"),
  },
];

export const difficultyData: RadioButtonProps<DifficultyData>[] = [
  {
    key: "easy",
    value: "easy",
  },
  {
    key: "medium",
    value: "medium",
  },
  {
    key: "hard",
    value: "hard",
  },
];
