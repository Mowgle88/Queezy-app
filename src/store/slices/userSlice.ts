import { IQuizData, ISettings } from "#types";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  userId: string;
  email: string;
  userName: string;
  date: string;
  settings: ISettings;
  quizData: IQuizData;
}

const initialState: UserState = {
  userId: "",
  userName: "",
  email: "",
  date: "",
  settings: {
    difficulty: "medium",
    isTimeGame: false,
    timeOnAnswer: 60,
  },
  quizData: {
    points: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { payload }: { payload: Partial<UserState> } = action;
      return {
        ...state,
        ...payload,
      };
    },
    changeSettings: (state, action) => {
      const { payload }: { payload: Partial<ISettings> } = action;
      return {
        ...state,
        settings: {
          ...state.settings,
          ...payload,
        },
      };
    },
    updateQuizData: (state, action) => {
      const { payload }: { payload: Partial<IQuizData> } = action;
      return {
        ...state,
        quizData: {
          ...state.quizData,
          ...payload,
        },
      };
    },
    removeUser: () => {
      return { ...initialState };
    },
  },
});

export const { setUserData, changeSettings, updateQuizData, removeUser } =
  userSlice.actions;

export default userSlice.reducer;
