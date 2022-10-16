import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IQuizCategoriesData } from "../models/quizData";

interface QuizContextProviderProps {
  children: React.ReactNode
}

export interface IQuizContext {
  quizСategoryData: IQuizCategoriesData | null,
  setQuizСategoryData: (quizСategoryData: IQuizCategoriesData) => void,
  removeQuizСategoryData: () => void,
}

export const QuizContext = createContext<IQuizContext>({
  quizСategoryData: null,
  setQuizСategoryData: (quizСategoryData: IQuizCategoriesData) => { },
  removeQuizСategoryData: () => { },
})

function QuizContextProvider({ children }: QuizContextProviderProps) {
  const [quizData, setQuizData] = useState<IQuizCategoriesData | null>(null);

  function setQuizСategoryData(quizСategoryData: IQuizCategoriesData) {
    setQuizData(quizСategoryData);
    AsyncStorage.setItem('quizСategoryData', JSON.stringify(quizСategoryData));
  }

  function removeQuizСategoryData() {
    setQuizData(null);
    AsyncStorage.removeItem('quizСategoryData');
  }

  const value = {
    quizСategoryData: quizData,
    setQuizСategoryData: setQuizСategoryData,
    removeQuizСategoryData: removeQuizСategoryData,
  }

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export default QuizContextProvider;