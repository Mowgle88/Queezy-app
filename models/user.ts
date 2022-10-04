export interface IUser {
  userId: string,
  email: string,
  password: string,
  userName: string,
  date: string
}

export type IUserData = Omit<IUser, "userId">;

export type ILocalStorageUserData = Omit<IUser, "email" | "password" | "date">;