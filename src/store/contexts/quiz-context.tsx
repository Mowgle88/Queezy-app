import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IQuizCategoriesData } from "#types";

interface QuizContextProviderProps {
  children: React.ReactNode;
}

export interface IQuizContext {
  quizCategoryData: IQuizCategoriesData | null;
  setQuizCategoryData: (quizCategoryData: IQuizCategoriesData) => void;
  removeQuizCategoryData: () => void;
}

export const QuizContext = createContext<IQuizContext>({
  quizCategoryData: null,
  setQuizCategoryData: (quizCategoryData: IQuizCategoriesData) => {},
  removeQuizCategoryData: () => {},
});

export const QuizContextProvider: React.FC<QuizContextProviderProps> = ({
  children,
}) => {
  const [quizData, setQuizData] = useState<IQuizCategoriesData | null>(null);

  function setQuizCategoryData(quizCategoryData: IQuizCategoriesData) {
    setQuizData(quizCategoryData);
    AsyncStorage.setItem("quizCategoryData", JSON.stringify(quizCategoryData));
  }

  function removeQuizCategoryData() {
    setQuizData(null);
    AsyncStorage.removeItem("quizCategoryData");
  }

  const value = {
    quizCategoryData: quizData,
    setQuizCategoryData: setQuizCategoryData,
    removeQuizCategoryData: removeQuizCategoryData,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
