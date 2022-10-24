import { IQuizData, ISettings } from "../store/user-context";

export interface IUser {
  userId: string,
  email: string,
  password: string,
  userName: string,
  date: string
}

export type IUserData = Omit<IUser, "userId">;

export type IUserSettingsData = {
  difficulty: 'medium' | 'easy' | 'hard',
  isTimeGame: boolean,
  timeOnAnswer: number,
};

export type IUserQuizData = {
  points: number
};

export interface IUserBackendData {
  email: string,
  password: string,
  userName: string,
  date: string,
  settings: ISettings,
  quizData: IQuizData,
}

export type ILocalStorageUserData = Omit<IUser, "email" | "password" | "date">;