import { ImageSourcePropType } from "react-native";

export interface IStartContentData {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

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
