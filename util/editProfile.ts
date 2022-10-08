import { IUser, IUserData } from "../models/user";
import { changeUserPassword, changeUserEmail } from "./auth";
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

export async function changeEmail(userData: IUserData, authCtx: IAuthCtx) {
  const user = {
    userName: authCtx.userName,
    email: userData.email,
    password: authCtx.password,
    date: authCtx.date
  }
  updateUser(authCtx.userId, user);
  authCtx.setUser({ ...user, userId: authCtx.userId });
  const token = await changeUserEmail(user.email, authCtx.token);
  authCtx.authenticate(token);
}

export async function changePassword(userData: IUserData, authCtx: IAuthCtx) {
  const user = {
    userName: authCtx.userName,
    email: authCtx.email,
    password: userData.password,
    date: userData.date
  }
  updateUser(authCtx.userId, user);
  authCtx.setUser({ ...user, userId: authCtx.userId });
  const token = await changeUserPassword(user.password, authCtx.token);
  authCtx.authenticate(token);
}