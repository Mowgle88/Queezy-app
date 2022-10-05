import { IUser, IUserData } from "../models/user";
import { updateUser } from "./http";

interface IAuthCtx {
  token: string;
  userId: string;
  userName: string;
  email: string;
  password: string;
  date: string;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
  setUser: (userData: IUser) => void;
}

export function changeUserName(userData: IUserData, authCtx: IAuthCtx) {
  const user = {
    userName: userData.userName,
    email: authCtx.email,
    password: authCtx.password,
    date: authCtx.date
  }
  updateUser(authCtx.userId, user);
  authCtx.setUser({ ...user, userId: authCtx.userId })
}