import { IQuizData, ISettings } from "../store/user-context";

export interface IUser {
  userId: string,
  email: string,
  password: string,
  userName: string,
  date: string
}

export type IUserData = Omit<IUser, "userId">;

export interface IUserBackendData {
  user: IUser,
  settings: ISettings,
  quizData: IQuizData,
}

export type ILocalStorageUserData = Omit<IUser, "email" | "password" | "date">;