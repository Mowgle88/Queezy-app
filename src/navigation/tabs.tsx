import {
  AchievementsScreen,
  CreateQuizScreen,
  HomeScreen,
  ProfileInfoScreen,
  SearchScreen,
} from "#screens";
import { tabBarIcons } from "#constants";

export const tabs = [
  {
    id: 1,
    title: "Home",
    screen: "Home",
    Component: HomeScreen,
    icon: tabBarIcons.Home,
    headerShown: false,
  },
  {
    id: 2,
    title: "Search",
    screen: "Search",
    Component: SearchScreen,
    icon: tabBarIcons.Search,
    headerShown: true,
  },
  {
    id: 3,
    title: "CreateQuiz",
    screen: "CreateQuiz",
    Component: CreateQuizScreen,
    icon: tabBarIcons.Plus,
    isCustomButton: true,
    headerShown: true,
  },
  {
    id: 4,
    title: "Leaderboard",
    screen: "Leaderboard",
    Component: AchievementsScreen,
    icon: tabBarIcons.Leaderboard,
    headerShown: true,
  },
  {
    id: 5,
    title: "Profile",
    screen: "Profile",
    Component: ProfileInfoScreen,
    icon: tabBarIcons.Profile,
    headerShown: false,
  },
];
