import {
  CategoryName,
  DifficultyDataType,
  IQuizCategoriesData,
  IQuizItem,
} from "#types";
import { createSlice } from "@reduxjs/toolkit";

export interface QuizState {
  categories: IQuizCategoriesData | null;
}

const initialState: QuizState = {
  categories: null,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      const { payload } = action;
      return {
        categories: {
          ...state.categories,
          ...payload,
        },
      };
    },
    addNewQuiz: (
      state,
      action: {
        payload: IQuizItem;
        type: string;
      },
    ) => {
      const { category, difficulty } = action.payload;
      state.categories?.[category as CategoryName]?.[
        difficulty as DifficultyDataType
      ].push(action.payload);
    },
  },
});

export const { setCategories, addNewQuiz } = quizSlice.actions;

export default quizSlice.reducer;
