import { IQuizData, ISettings } from "../store/user-context";

export interface IUser {
  userId: string,
  email: string,
  password: string,
  userName: string,
  date: string
}

export type IUserData = Omit<IUser, "userId"> & {
  difficulty: 'medium' | 'easy' | 'hard'
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